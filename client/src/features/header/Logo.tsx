import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <Link className="flex items-center justify-center" to="/">
            <img src="/logo.png" alt="Instahost logo" className="w-6" />
            <span className="ml-2 text-3xl font-bold font-poppins">
                Instahost
            </span>
        </Link>
    );
};
