import { render, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  const { getByText } = render(<App />);
  await waitFor(() => getByText("rust-immgration"), { timeout: 10000 });
  expect(getByText("rust-immgration")).toBeInTheDocument();
});
