// Import necessary libraries
import { userEvent } from "@testing-library/user-event";
import { act, render, waitFor } from "@testing-library/react";
import Logout from "./index";
import Api from "../../util/api";

// Mock the Api.logout function
const mockLogout = vi.fn();
(Api.logout as any) = mockLogout;

// Mock the navigate function to ensure the test
// does not fail due to the use of the hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Logout", () => {
  beforeAll(() => {
    vi.resetAllMocks();
  });

  it("should navigate to /login on successful logout", async () => {
    // ARRANGE
    mockLogout.mockReset();
    mockLogout.mockImplementation(() => {
      return Promise.resolve();
    });
    const { getByText } = render(<Logout />);
    const logoutButton = getByText("Logout");
    userEvent.setup();

    // ACT
    await userEvent.click(logoutButton);

    // ASSERT
    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it("should display an error message on failed logout", async () => {
    // ARRANGE

    // Mock failed logout
    mockLogout.mockReset();
    mockLogout.mockImplementation(() => {
      return Promise.reject(new Error("Logout failed"));
    });

    userEvent.setup();
    const { getByText } = render(<Logout />);
    const logoutButton = getByText("Logout");

    // ACT
    act(() => {
      userEvent.click(logoutButton);
    });

    // ASSERT
    waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(mockLogout).toHaveBeenCalled();
      expect(getByText("Logout failed")).toBeDefined();
    });
  });
});
