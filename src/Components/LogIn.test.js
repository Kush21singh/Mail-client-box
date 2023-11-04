import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LogIn from './LogIn'; // Import your LogIn component

// Mock the React Router's useNavigate function
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('LogIn Component', () => {
  it('should render the login form', () => {
    const { getByLabelText, getByText } = render(<LogIn />);

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('LogIn');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const { getByLabelText, getByText } = render(<LogIn />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('LogIn');

    // Mock a successful API response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'Logged in successfully' }),
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' });

    fireEvent.click(loginButton);

    // Wait for the form submission and API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('identitytoolkit.googleapis.com'));
      expect(fetch.mock.calls[0][0].method).toBe('POST');
      expect(fetch.mock.calls[0][0].body).toContain('test@example.com');
      expect(fetch.mock.calls[0][0].body).toContain('password123');
    });

    // Assert that the success message is displayed
    const successMessage = await screen.findByText('Logged in Successfully');
    expect(successMessage).toBeInTheDocument();
  });

  it('should handle form submission with an error', async () => {
    const { getByLabelText, getByText } = render(<LogIn />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('LogIn');

    // Mock an API response with an error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' });

    fireEvent.click(loginButton);

    // Wait for the form submission and API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Assert that an error alert is displayed
    const errorAlert = await screen.findByText('Network error');
    expect(errorAlert).toBeInTheDocument();
  });
});
