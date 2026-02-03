import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders landing hero title", () => {
  render(<App />);
  const title = screen.getByText(/Gourmet Delivery Platform/i);
  expect(title).toBeInTheDocument();
});
