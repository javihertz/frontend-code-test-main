import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createClient, Provider } from 'urql';
import PersonPage from './pages/PersonPage';
import Home from './pages/home/home';

const client = createClient({
  url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/person/:personId',
    element: <PersonPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
