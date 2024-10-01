import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './pages/Error';
import { Layout } from './pages/Layout';
import Login from './features/login/Login';
import Register from './features/register/Register';
import VerifyMail from './features/verify-mail/VerifyMail';
import ProtectedRoutes from './features/protected-routes/ProtectedRoutes';
import Dashboard from './features/dashboard/Dashboard';
import Home from './features/home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/sign-in',
                element: <Login />,
            },
            {
                path: '/sign-up',
                element: <Register />,
            },
            {
                path: '/verify-mail',
                element: <VerifyMail />,
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
