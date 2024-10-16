import { cn } from '@/lib/utils';
import { NavItem } from './NavItem';

export const Navigation = ({ className }: { className?: string }) => {
    return (
        <nav
            className={cn(
                'hidden md:flex ml-auto items-center gap-4 sm:gap-6',
                className,
            )}
        >
            <NavItem to="/#features" label="Features" />
            <NavItem to="/#how-it-works" label="How It Works" />
            <NavItem to="/#pricing" label="Pricing" />
        </nav>
    );
};
