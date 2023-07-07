const DashboardStats = ({ books, users }) => {

  let availableBooksCount = books?.reduce((acc, book)=> acc+ parseInt(book.count), 0 );

  return (
    <div className=" flex justify-center stats shadow">
      <div className="stat place-items-center">
        <div className="stat-title">Books</div>
        <div className="stat-value">{books?.length}</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Available Books</div>
        <div className="stat-value text-secondary">{availableBooksCount}</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Users</div>
        <div className="stat-value ">{users?.length}</div>
      </div>
    </div>
  );
};

export default DashboardStats;
