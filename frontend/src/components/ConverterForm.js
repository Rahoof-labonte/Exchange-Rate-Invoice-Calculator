import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency, resetForm, clearCurrentConversion, setFormField } from "../redux/conversionSlice";

function ConverterForm() {
  const dispatch = useDispatch();
  const { currentConversion, loading, formError } = useSelector(state => state.conversion);
  const form = useSelector(state => state.conversion.formData);
  const handleChange = (e) => {
    dispatch(setFormField({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(convertCurrency(form));
  };
  const handleReset = () => {
    if (window.confirm("Clear form?")) {
      dispatch(clearCurrentConversion());
      dispatch(resetForm());
    }
  };
  useEffect(() => {
    return () => {
      dispatch(clearCurrentConversion());
    };
  }, [dispatch]);
  return (
    <div>
      <div className="bg-secondary bg-gradient bg-opacity-100 text-white p-2">
        <h6 >CONVERSION FORM</h6>
      </div>
      <div className="px-3 py-2">
        <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label>USD Amount</label>
              <input className="form-control" name="usd_amount" onChange={handleChange} required value={form.usd_amount}/>
            </div>
            <div className="col">
              <label>Rate</label>
              <input className="form-control" name="rate" onChange={handleChange} required value={form.rate}/>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label>Rate Source</label>
              <select className="form-control" name="rate_source" onChange={handleChange} value={form.rate_source}>
                <option>BOJ</option>
                <option>Mizuho TTM</option>
                <option>Manual</option>
              </select>
            </div>
            <div className="col">
              <label>Date</label>
              <input type="date" className="form-control" name="conversion_date" onChange={handleChange} required value={form.conversion_date}/>
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary me-2" disabled={loading}> Convert</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}> Reset</button>
          </div>
          {loading && <p className="mt-3">Processing...</p>}
          {formError && (
            <div className="alert alert-danger mt-3">
              {formError}
            </div>
          )}

          {currentConversion && (
            <div className="alert alert-success mt-3">
              JPY Amount: <b>{currentConversion.jpy_amount}</b>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ConverterForm;