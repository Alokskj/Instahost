import { NavItem } from './NavItem';

export const Navigation = () => {
    return (
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <NavItem to="/#features" label="Features" />
            <NavItem to="/#how-it-works" label="How It Works" />
            <NavItem to="/#pricing" label="Pricing" />
        </nav>
    );
};
