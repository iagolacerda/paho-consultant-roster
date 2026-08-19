import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the dashboard home page', () => {
  render(<App />);
  expect(screen.getByText(/Bem-vindo\(a\)/i)).toBeInTheDocument();
});
