import FeaturesSection from './sections/FeaturesSection';
import HowItWorksSection from './sections/HowItWorksSection';
import { HeroSection } from './sections/heroSection';
import Header from '@/components/layout/header/Header';
import CTASection from './sections/CTASection';
import { useAutoToast } from '@/hooks/useAutoToast';

const Home = () => {
    // Initialize auto toast
    useAutoToast({
        initialDelay: 5000, // First toast after 5 seconds
        interval: 5 * 1000, // Then every 5 seconds
        enabled: true,
    });

    return (
        <div className="flex flex-col min-h-screen ">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                {/* <PricingSection /> */}
                <CTASection />
            </main>
        </div>
    );
};

export default Home;
