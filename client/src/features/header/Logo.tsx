import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <Link className="flex items-center justify-center" to="/">
            <Globe className="h-6 w-6 text-white" />
            <span className="ml-2 text-2xl font-bold text-white">
                Instahost
            </span>
        </Link>
    );
};
