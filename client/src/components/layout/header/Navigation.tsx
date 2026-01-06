import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const Navigation = ({ className }: { className?: string }) => {
     const handlePricingClick = () => {
        toast("💸 Pricing", {
            id: "pricing_toast",
            description: "It's free! We're students too, we know the struggle. No hidden fees, no credit card, no kidney required. 🎉",
        });
    };
    return (
        <nav
            className={cn(
                'hidden md:flex ml-auto items-center gap-4 sm:gap-6',
                className,
            )}
        >
            <a href="/#features">Features</a>
            <a href="/#how-it-works">How It Works</a>
            <div className='cursor-pointer' onClick={handlePricingClick}>Pricing</div>
        </nav>
    );
};
