import { render, screen } from '@testing-library/react';
import * as apiHooks from './lib/api-hooks';
import { FetchState } from './types';
import App from './App';

describe('<App />', () => {
  const renderComponent = () => render(<App />);
  const defaultText =
    'Hello there, click the button below to get the list of posts from the API.';
  const loadingText = 'Fetching posts...';
  const errorText = 'Oops! Something went wrong. Please try again.';
  const successText = "Here's the list of posts:";

  it('should render default state', () => {
    renderComponent();

    const stateEl = screen.queryByText(defaultText);

    expect(stateEl).toBeInTheDocument();
  });

  it('should render error state on error', () => {
    const fetchState = FetchState.ERROR;

    jest
      .spyOn(apiHooks, 'useGetPosts')
      .mockReturnValue([[], fetchState, jest.fn()]);

    renderComponent();

    const stateEl = screen.queryByText(errorText);

    expect(stateEl).toBeInTheDocument();
  });
});

