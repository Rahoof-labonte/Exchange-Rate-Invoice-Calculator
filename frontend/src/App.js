import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ConverterForm from "./components/ConverterForm";
import HistoryList from "./components/HistoryList";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 bg-secondary bg-opacity-50 text-white vh-100 p-3">
            <h5 className="text-center mb-4 text-primary-emphasis fw-bold">EXCHANGE RATE CALCULATOR</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2 fw-bold">
                <NavLink to="/" className="nav-link text-white">Converter</NavLink>
              </li>
              <li className="nav-item fw-bold">
                <NavLink to="/history" className="nav-link text-white">History</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-9 col-lg-10 p-0">
            <Routes>
              <Route path="/" element={<ConverterForm />} />
              <Route path="/history" element={<HistoryList />} />
            </Routes>
          </div>
        </div>
      </div>
      <style>
        {`
          .nav-link.active {
            background: #2a3442ff;
            border-radius: 5px;
          }
        `}
      </style>
    </BrowserRouter>
  );
}

export default App;