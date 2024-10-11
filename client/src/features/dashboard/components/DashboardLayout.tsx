import { Outlet } from 'react-router-dom';
import Header from './Header';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
