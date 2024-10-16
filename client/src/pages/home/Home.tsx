import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import FeaturesSection from './sections/FeaturesSection';
import HowItWorksSection from './sections/HowItWorksSection';
// import PricingSection from './sections/PricingSection';
import { HeroSection } from './sections/heroSection';
import Header from '@/components/layout/header/Header';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen ">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                {/* <PricingSection /> */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#a855f7] to-[#4f46e5] text-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Ready to Deploy Your Website?
                                </h2>
                                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join thousands of developers who trust
                                    Instahost with their static websites. It's
                                    free, fast, and secure.
                                </p>
                            </div>
                            <Button className="bg-white text-purple-600 hover:bg-gray-100">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
