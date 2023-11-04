import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

test("it should render the sign-up form correctly", () => {
  render(
    <MemoryRouter> {/* Wrap your component with MemoryRouter */}
      <SignUp />
    </MemoryRouter>
  );

  // Check if the form elements are present
  const emailInput = screen.getByLabelText("Email Address");
  const passwordInput = screen.getByLabelText("Password");
  const confirmPassInput = screen.getByLabelText("Confirm Password");
  const signUpButton = screen.getByText("SignUp");
  
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPassInput).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});

test("it should display an error message when passwords do not match", () => {
  render(
    <MemoryRouter> {/* Wrap your component with MemoryRouter */}
      <SignUp />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText("Email Address");
  const passwordInput = screen.getByLabelText("Password");
  const confirmPassInput = screen.getByLabelText("Confirm Password");
  const signUpButton = screen.getByText("SignUp");

  userEvent.type(emailInput, "test@example.com");
  userEvent.type(passwordInput, "password123");
  userEvent.type(confirmPassInput, "password456"); // Passwords don't match
  
  userEvent.click(signUpButton);
  
  const errorMessage = screen.getByText("Password do not match");
  expect(errorMessage).toBeInTheDocument();
});

// You can add more tests to cover different scenarios in your sign-up form.
