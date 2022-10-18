import React from 'react';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from './RegisterForm';

describe('RegisterForm verification', () => {
  test('01 - should render form', async () => {
    render(<RegisterForm />);

    expect(await screen.findByText('Register form')).toBeInTheDocument();
  });

  test('02 - should render error when username is not entered', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Send data' }));

    await waitFor(() => {
      expect(screen.getByText('* Username is required')).toBeInTheDocument();
    });
  });

  test('03 - should not render error when email is valid', async () => {
    render(<RegisterForm />);

    const input = screen.getByPlaceholderText('Username');

    await userEvent.type(input, 'valid@email.com');

    fireEvent.click(screen.getByRole('button', { name: 'Send data' }));

    await waitFor(() => {
      expect(screen.queryByText('* Email is required')).not.toBeInTheDocument();
    });
  });

  test('04 - should render form', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Send data' }));
    const input: HTMLInputElement = screen.getByPlaceholderText(/Email/i);

    await userEvent.type(input, 'invalidemail.com');

    await waitFor(() => {
      expect(screen.getByText('* Invalid email format')).toBeInTheDocument();
    });
  });
});
