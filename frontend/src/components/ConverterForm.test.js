import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import conversionReducer from "../redux/conversionSlice";
import ConverterForm from "./ConverterForm";

jest.mock("../api/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn()
}));

const store = configureStore({
  reducer: { conversion: conversionReducer }
});

test("renders conversion form title", () => {
  render(
    <Provider store={store}>
      <ConverterForm />
    </Provider>
  );

  expect(screen.getByText(/CONVERSION FORM/i)).toBeInTheDocument();
});