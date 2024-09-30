import { useUser } from '@/lib/hooks/useUser';

const Dashboard = () => {
    const { data: user } = useUser();
    return <div>Hello {user?.username} 👋</div>;
};

export default Dashboard;
