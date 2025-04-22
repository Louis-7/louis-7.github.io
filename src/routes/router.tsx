import { createBrowserRouter } from 'react-router-dom';

import Root from '../pages/Root';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Resume from '../pages/Resume';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/resume',
        element: <Resume />,
      },
    ],
  },
]);
