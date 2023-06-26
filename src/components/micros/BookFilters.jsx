

const BookFilters = ({ filters , setFilters , booksList , setBooks}) => {


  function handleFilter() {
    const filteredData = booksList.filter(
      ({ title, description, rating, author }) => {
        let serachResult = true,
          ratingResult = true;
        if (filters.search) {
          serachResult =
            title.toLocaleLowerCase().includes(filters.search) ||
            description.toLocaleLowerCase().includes(filters.search) ||
            author.toLocaleLowerCase().includes(filters.search);
        }
        if (filters.rating > 0) {
          ratingResult = rating > filters.rating;
        }

        return ratingResult && serachResult;
      }
    );

    setBooks(filteredData);
  }

  function handleClearFilter() {
    setBooks(booksList);
    setFilters({ search: "", rating: 0 });
  }

  return (
    <div className="bg-base-300 w-100 p-2 rounded-md m-2 flex join justify-center">
      <div className="w-1/2">
        <div className="w-full">
          <input
            className="input join-item w-full"
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value.toLocaleLowerCase(),
              })
            }
            placeholder="Search..."
            value={filters.search}
          />
        </div>
      </div>
      <select
        className="select join-item"
        onChange={(e) =>
          setFilters({ ...filters, rating: parseInt(e.target.value) })
        }
        value={filters.rating}
      >
        <option value={0}>Rating</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <div>
        <button className="btn join-item btn-secondary" onClick={handleFilter}>
          Search
        </button>
        <button className="btn join-item" onClick={handleClearFilter}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default BookFilters;
