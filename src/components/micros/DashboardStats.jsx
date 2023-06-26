const DashboardStats = ({ books, users }) => {

  let availableBooksCount = books?.reduce((acc, book)=> acc+ book.count, 0 );
  let userCount = users?.length;

  return (
    <div className=" flex justify-center stats shadow">
      <div className="stat place-items-center">
        <div className="stat-title">Available Books</div>
        <div className="stat-value">{availableBooksCount}</div>
        <div className="stat-desc"></div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Users</div>
        <div className="stat-value text-secondary">{userCount}</div>
      </div>
    </div>
  );
};

export default DashboardStats;
