import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Login from ".";

// Mock the navigate function to ensure the test
// does not fail due to the use of the hook
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Login form", () => {
  test("It Renders correctly", () => {
    // ARRANGE
    const { getByLabelText } = render(<Login />);
    const username_input = getByLabelText("Username:");
    const password_input = getByLabelText("Password:");
    // ACT
    // nothing to act on
    // ASSERT
    expect(username_input).toBeDefined();
    expect(password_input).toBeDefined();
  });
});
