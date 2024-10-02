import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

export const NavItem = ({ to, label }: { to: string; label: string }) => {
    const location = useLocation();
    const pathname = location.pathname + location.hash;
    return (
        <Link
            className={cn(
                'text-sm font-medium text-gray-600 hover:text-black',
                { 'text-black': pathname === to },
            )}
            to={to}
        >
            {label}
        </Link>
    );
};
