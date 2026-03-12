import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, deleteConversion } from "../redux/conversionSlice";

function HistoryList() {
  const dispatch = useDispatch();
  const { history, total, listError } = useSelector(state => state.conversion);
  // console.log('listError',listError);
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

  const handleDelete = (id) => {
    if (window.confirm("Delete this conversion?")) {
      dispatch(deleteConversion(id))
      .unwrap()
      .then((res) => {
        alert(`Conversion ${res.id} deleted successfully`);
      })
      .catch((err) => {
        alert(err);
      });
    }
  };
  const pages = getPages();

  const getRateBadge = (source) => {
    switch (source) {
      case "BOJ":
        return <span className="badge bg-primary p-2">BOJ</span>;
      case "Mizuho TTM":
        return <span className="badge bg-success p-2">Mizuho TTM</span>;
      case "Manual":
        return <span className="badge bg-warning text-dark p-2">Manual</span>;
      default:
        return <span className="badge bg-secondary p-2">{source}</span>;
    }
  };
  return (
    <div>
      <div className=" d-flex justify-content-between bg-secondary bg-gradient bg-opacity-100 text-white p-2">
        <h6 >CONVERSION HISTORY</h6>
        <div className="d-flex gap-2">
          <input type="date" className="form-control w-auto" value={date} onChange={(e) => { setPage(1); setDate(e.target.value); }} />
          <button className="btn btn-light" onClick={() => { setDate(""); setPage(1); }}> CLEAR</button>
        </div>  
      </div>
      {listError && (
        <div className="alert alert-warning">{listError}</div>
      )}
      <div className="px-3 py-2">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "70px" }}>Sl No.</th>
              <th className="text-center" style={{ width: "60px" }}>Id</th>
              <th>USD</th>
              <th>Rate</th>
              <th>JPY</th>
              <th>Source</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item.id} className="history-row">
                <td className="position-relative text-center">
                  {offset + index + 1}
                  <span onClick={() => handleDelete(item.id)} className="delete-icon" >DELETE</span>
                </td>
                <td className="text-center">{item.id}</td>
                <td>{item.usd_amount}</td>
                <td>{item.rate}</td>
                <td>{item.jpy_amount}</td>
                <td>{getRateBadge(item.rate_source)}</td>
                <td>{item.conversion_date}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
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
      <style>
        {`
          .history-row .delete-icon {display: none;position: absolute;cursor: pointer;color: #ffffff;font-size: 12px;background: red;padding: 4px;border-radius: 4px;font-weight: 700;left: 10px;}
          .history-row:hover .delete-icon {display: inline;}
        `}
      </style>
    </div>
  );
}

export default HistoryList;