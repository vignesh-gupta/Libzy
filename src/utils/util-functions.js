import moment from "moment";
import { DATE_FORMAT } from "./constants";
import emailjs from "@emailjs/browser"

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0 && !c.includes("undefined")) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function toFirstUpper(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}


export function getReturnMsg(bookId, userIssuedBooks) {

  let returnDate = userIssuedBooks?.filter(book => book.bookId === bookId)[0]?.returnDate
  const returnTime = moment(returnDate, DATE_FORMAT).fromNow()

  if (returnTime.includes("ago")) {
    let now = moment()

    return `Your return date has passed ${returnTime}. Please return the Book with the panelty of Rs. ${calulatePenalty(now, returnDate)}.`
  }
  return `Please return the book ${returnTime} to avoid any panelty. `
}

export function calulatePenalty(startDate, endDate) {
  startDate = moment(startDate);
  endDate = moment(endDate);

  let result = (startDate.diff(endDate, 'days')) * 50
  return result.toString() === 'NaN' || result <= 0 ? "0" : result
}

export function sendEmail(email, name, book, issuedDate, panelty) {
  emailjs.send("service_rdm8gjo", "template_dssfjif", {
    to_name: name,
    panelty_amount: panelty.toString(),
    book_name: book,
    issued_date: issuedDate,
    send_to: email,
  }, "NpDJpmOA_tt9oKfnn")
    .then(res => console.log(res))
    .catch(e => console.log(e))
}