import { userEvent } from "@testing-library/user-event";
import { render } from "@testing-library/react";
import Api from "../../util/api";
import Login from "./index";

// Mock the navigate function to ensure the test
// does not fail due to the use of the hook
Api.Login = vi.fn().mockImplementation(async (user, password) => {
  console.log(`Logging in user: ${user} with password: ${password}`);
  return Promise.resolve();
});

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Login form", () => {
  beforeAll(() => {
    vi.resetAllMocks();
  });

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

  test("makes a request to the server", async () => {
    // ARRANGE
    const { getByTestId } = render(<Login />);
    const username_input = getByTestId("username-input");
    const password_input = getByTestId("password-input");
    const submit_button = getByTestId("submit-button");

    // set up the mock user
    userEvent.setup();

    // ACT
    // type into the input fields
    await userEvent.type(username_input, "user");
    await userEvent.type(password_input, "password");
    // click the submit button
    await userEvent.click(submit_button);
    // ASSERT
    expect(Api.Login).toHaveBeenCalledWith("user", "password");
  });
});
