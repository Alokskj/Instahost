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
import DashboardLayout from './features/dashboard/components/DashboardLayout';

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
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
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
                        element: <DashboardLayout />,
                        children: [
                            {
                                path: '',
                                element: <Dashboard />,
                            },
                        ],
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
