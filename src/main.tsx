import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createClient, Provider } from 'urql';
import Home from './pages/home/home';
import Person from './pages/person/person';

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
    element: <Person />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
