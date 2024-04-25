import { render } from '@testing-library/react';
import App from './App';

describe('App comp test',()=>{
  test('renders App', () => {
    render(<App />);
  });
})
