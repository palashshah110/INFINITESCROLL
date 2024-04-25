import { render } from '@testing-library/react';
import App from './App';

describe('app comp test',()=>{
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('renders App', () => {
    render(<App />);
  });
})
