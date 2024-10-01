import { Link } from 'react-router-dom';

export const NavItem = ({ to, label }: { to: string; label: string }) => {
    return (
        <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-white"
            to={to}
        >
            {label}
        </Link>
    );
};
