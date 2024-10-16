import { UserMenu } from '@/components/layout/header/UserMenu';
import { Logo } from '@/components/ui/logo';

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
