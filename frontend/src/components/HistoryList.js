import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../redux/conversionSlice";

function HistoryList() {
  const dispatch = useDispatch();
  const { history, total, listError } = useSelector(state => state.conversion);
  console.log('listError',listError);
  const limit = 10;
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(fetchHistory({ limit, offset, date }));
  }, [dispatch, offset, date]);

  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } 
    else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } 
      else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } 
      else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };
  const pages = getPages();
  return (
    <div>
      <h4 className="mb-3">Conversion History</h4>
      <div className="mb-3 d-flex gap-2">
        <input
          type="date"
          className="form-control w-auto"
          value={date}
          onChange={(e) => {
            setPage(1);
            setDate(e.target.value);
          }}
        />
        <button
          className="btn btn-secondary"
          onClick={() => {
            setDate("");
            setPage(1);
          }}
        >
          Clear
        </button>
      </div>
      {listError && (
        <div className="alert alert-warning">{listError}</div>
      )}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>USD</th>
            <th>Rate</th>
            <th>JPY</th>
            <th>Source</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.usd_amount}</td>
              <td>{item.rate}</td>
              <td>{item.jpy_amount}</td>
              <td>{item.rate_source}</td>
              <td>{item.conversion_date}</td>
            </tr>
          ))}

        </tbody>
      </table>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 align-self-center">...</span>
          ) : (
            <button
              key={i}
              className={`btn ${page === p ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          )
        )}
        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HistoryList;