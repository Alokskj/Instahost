import Spinner from '@/components/ui/spinner';
import { useUser } from '@/lib/hooks/useUser';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { data: user, isLoading } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading) {
            console.log(user);
            if (!user) {
                navigate('/login', { replace: true });
            }
            if (user && !user.verified) {
                navigate('/verify-mail', { replace: true });
            }
        }
    }, [isLoading, user, navigate]);
    if (isLoading) {
        return <Spinner />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
