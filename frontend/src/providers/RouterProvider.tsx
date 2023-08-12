import { FC } from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from '../pages/layout/main.layout.tsx';
import MainPage from '../pages/main';
import { AuthGuard } from '../components/AuthGuard.tsx';
import Profile from '../pages/profile';
import { sessionStore } from '../stores/session.store.ts';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/login',
        element: null,
      },
      {
        path: '/profile',
        loader: async ({ request }) => {
          const profile = await fetch('api/user', {
            signal: request.signal,
            headers: {
              Authorization: `Bearer ${sessionStore.getState().access_token}`,
            },
          });

          const { _id } = await profile.json();

          return redirect(`/profile/${_id}`);
        },
        element: <></>,
      },
      {
        path: '/profile/:id',
        loader: async ({ request, params }) => {
          const res = await fetch(`/api/user/${params.id}`, {
            signal: request.signal,
          });
          return await res.json();
        },
        element: (
          <AuthGuard>
            <Profile />
          </AuthGuard>
        ),
      },
    ],
  },
]);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
