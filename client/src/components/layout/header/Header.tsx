import { useUser } from '@/features/auth/user/useUser';
import { Logo } from '../../ui/logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { Navigation } from './Navigation';
import { GitHubStarsButton } from '@/components/ui/github-stars-button';

const Header = () => {
    const { data: user, isLoading } = useUser();
    return (
        <header className="px-4 h-16 lg:px-6  flex items-center justify-between  z-10 text-black wrapper">
            <div className="flex items-center gap-6 ">
                <Logo />
                <Navigation />
            </div>
            <div className='flex items-center gap-4'>
                <GitHubStarsButton />
                {!isLoading &&
                    (user ? (
                        <div className="flex items-center gap-4">
                            <Link to={'/dashboard'} className="max-sm:hidden">
                                <Button variant={'outline'}>Dashboard</Button>
                            </Link>
                            <UserMenu />
                        </div>
                    ) : (
                        <div className="space-x-2">
                            <Link to={'/signup'} className="max-sm:hidden">
                                <Button variant={'outline'}>Sign Up</Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button>Log in</Button>
                            </Link>
                        </div>
                    ))}
                

            </div>
        </header>
    );
};

export default Header;
