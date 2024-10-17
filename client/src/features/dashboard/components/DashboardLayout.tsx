import { Outlet } from 'react-router-dom';
import Header from './Header';
import { ProjectDeleteAlertDialog } from '@/features/project/components/ProjectDeleteAlertDialog';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Outlet />
            <ProjectDeleteAlertDialog />
        </div>
    );
};

export default DashboardLayout;
