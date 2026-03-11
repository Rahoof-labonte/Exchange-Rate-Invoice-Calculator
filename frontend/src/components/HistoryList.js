import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../redux/conversionSlice";

function HistoryList() {

  const dispatch = useDispatch();
  const { history, error } = useSelector(state => state.conversion);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  return (

    <div>

      <h4 className="mb-3">Conversion History</h4>
      {
        error && error.status === 404 && (
          <div className="alert alert-warning">
            No conversion history found.
          </div>
        )
      }

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

    </div>

  );
}

export default HistoryList;