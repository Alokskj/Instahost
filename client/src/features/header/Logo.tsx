import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <Link className="flex items-center justify-center" to="/">
                <img src="/logo.png" alt="Instahost logo" className="w-6" />
                <span className="ml-2 text-2xl font-bold font-poppins">
                    Instahost
                </span>
            </Link>
            <div className="beta border rounded-full px-2.5 text-xs font-medium border-purple-500 font-poppins">
                Beta
            </div>
        </div>
    );
};
