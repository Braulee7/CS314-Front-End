import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Iniitial test", () => {
  test("It is set up correctly", () => {
    render(<App />);
    const element = document.querySelector("div");
    expect(element).toHaveTextContent("Hello world");
  });
});
