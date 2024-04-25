import { render } from '@testing-library/react';
import App from './App';

describe('app comp test',()=>{
  test('renders App', () => {
    render(<App />);
  });
})
