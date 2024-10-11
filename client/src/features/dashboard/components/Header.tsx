import { Logo } from '@/features/header/Logo';
import { UserMenu } from '@/features/user/UserMenu';

const Header = () => {
    return (
        <div className="border-b">
            <div className="flex justify-between items-center h-20 wrapper">
                <Logo />
                <UserMenu />
            </div>
        </div>
    );
};

export default Header;
