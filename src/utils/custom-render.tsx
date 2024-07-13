import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const customRender = (children: React.ReactElement) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};
