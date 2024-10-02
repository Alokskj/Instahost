import { useUser } from '@/lib/hooks/useUser';
import { Navigation } from '../navigation/Navigation';
import { UserMenu } from '../user/UserMenu';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
    const { data: user, isLoading } = useUser();
    return (
        <header className="px-4 h-16 lg:px-6  flex items-center justify-between  z-10 text-black wrapper">
            <div className="flex items-center gap-6 ">
                <Logo />
                <Navigation />
            </div>
            {!isLoading &&
                (user ? (
                    <div className="flex items-center gap-4">
                        <Link to={'/dashboard'}>
                            <Button variant={'outline'}>Dashboard</Button>
                        </Link>
                        <UserMenu />
                    </div>
                ) : (
                    <div className="space-x-2">
                        <Link to={'/login'}>
                            <Button variant={'outline'}>Log in</Button>
                        </Link>
                        <Link to={'/signup'}>
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                ))}
        </header>
    );
};

export default Header;
