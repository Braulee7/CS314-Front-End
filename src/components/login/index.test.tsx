import { render } from "@testing-library/react";
import Login from ".";

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
