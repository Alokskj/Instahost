import { Navigation } from '../navigation/Navigation';
import { UserMenu } from '../user/UserMenu';
import { Logo } from './Logo';

const Header = () => {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center bg-black  z-10">
            <Logo />
            <Navigation />
            <UserMenu />
        </header>
    );
};

export default Header;
