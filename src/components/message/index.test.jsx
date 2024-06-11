import { render, screen } from "@testing-library/react";
import Message from "./index";

describe("Message component", () => {
  test("Message component renders the correct content", () => {
    const testMessage = "Test message";
    render(<Message content={testMessage} />);

    const messageElement = screen.getByText(testMessage);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass("text-white w-full bg-red");
  });
});
