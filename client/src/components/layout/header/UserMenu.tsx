import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/features/auth/user/useUser';
import { useLogout } from '@/features/auth/logout/useLogout';
const NavLinks = [
    // { label: 'Profile', href: '/profile' },
    { label: 'Dashboard', href: '/dashboard' },
    // { label: 'Settings', href: '/settings' },
];
export const UserMenu = () => {
    const { mutate } = useLogout();
    const { data: user } = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                        {user?.username[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {NavLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                        <Link to={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => mutate()}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
