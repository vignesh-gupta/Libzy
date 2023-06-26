import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calulatePenalty, sendEmail } from "../../utils/util-functions";
import moment from "moment";

const TransactionTable = ({ transactions }) => {
  
  // to_name: "Vignesh",
  // panelty_amount: "400",
  // book_name: "Test",
  // issued_date: "06/16/2023",
  // send_to: "vignesh.gupta@hcl.com",

  function handleNotify(email, name, book, issuedDate , panelty){
    sendEmail(email, name, book, issuedDate , panelty)
  }

  return (
    <div className="overflow-x-auto py-5 ">
      <table className="table table-auto table-pin-rows table-pin-cols shadow-xl">
        <caption className="caption-top text-lg font-semibold mb-2">
          Transactions
        </caption>
        <thead>
          <tr>
            <th></th>
            <th>Book Name</th>
            <th>Borrowed By</th>
            <th>Issued Data</th>
            <th>Due Date</th>
            <th>Return Date</th>
            <th>Penalty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {transactions?.map(({id , bookName , user , issuedDate , dueDate, returnDate, userEmail})=>(
          <tr key={id} className="hover">
          <td>{id}</td>
          <td>{bookName}</td>
          <td>{user}</td>
          <td>{issuedDate}</td>
          <td>{dueDate}</td>
          <td>{returnDate ? returnDate :"Not Returned"}</td>
          <td>{calulatePenalty(returnDate ? returnDate :moment(), dueDate)}</td>
          <td className="flex gap-2 tooltip tooltip-left" data-tip={` Ask ${user} to return ${bookName} `}>
            <button
              className="btn btn-outline btn-square btn-secondary"
              onClick={()=> handleNotify(userEmail , user , bookName , issuedDate , calulatePenalty(moment() , dueDate))}
              disabled={returnDate}
            >
              <FontAwesomeIcon icon={faCommentDots} />
            </button>
          </td>
        </tr>
         ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
