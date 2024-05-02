import { render } from "@testing-library/react";
import CreateUser from ".";

describe("Create user form", () => {
  test("It Renders correctly", () => {
    // ARRANGE
    const { getByLabelText } = render(<CreateUser />);
    const username_input = getByLabelText("Username:");
    const password_input = getByLabelText("Password:");
    // ACT
    // nothing to act on
    // ASSERT
    expect(username_input).toBeDefined();
    expect(password_input).toBeDefined();
  });
});
