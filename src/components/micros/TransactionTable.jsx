import { calulatePenalty } from "../../utils/util-functions";
import moment from "moment";
import SendEmailBtn from "./SendEmailBtn";

const TransactionTable = ({ transactions }) => {
  return (
    <div className="py-5 overflow-x-auto ">
      <table className="table shadow-xl table-auto table-pin-rows table-pin-cols">
        <caption className="mb-2 text-lg font-semibold caption-top">
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
          {transactions?.map(
            ({
              id,
              bookName,
              user,
              issuedDate,
              dueDate,
              returnDate,
              userEmail,
            }) => (
              <tr key={id} className="hover">
                <td>{id}</td>
                <td>{bookName}</td>
                <td>{user}</td>
                <td>{issuedDate}</td>
                <td>{dueDate}</td>
                <td>{returnDate ? returnDate : "Not Returned"}</td>
                <td>
                  {calulatePenalty(returnDate ? returnDate : moment(), dueDate)}
                </td>
                <SendEmailBtn
                  userEmail={userEmail}
                  user={user}
                  bookName={bookName}
                  issuedDate={issuedDate}
                  dueDate={dueDate}
                  returnDate={returnDate}
                />
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
