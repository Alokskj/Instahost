import React from 'react';
import { Button } from '@/components/ui/button';
import { Code, Zap, Globe, Lock, Github } from 'lucide-react';

const PricingSection: React.FC = () => {
    return (
        <section
            id="pricing"
            className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                    Pricing
                </h2>
                <div className="mx-auto max-w-sm border-2 border-purple-200 rounded-lg p-8 backdrop-blur-sm bg-white shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">
                        Free Forever
                    </h3>
                    <ul className="space-y-2 mb-6">
                        <PricingFeature
                            icon={
                                <Code className="mr-2 h-4 w-4 text-purple-600" />
                            }
                            text="Unlimited Projects"
                        />
                        <PricingFeature
                            icon={
                                <Zap className="mr-2 h-4 w-4 text-purple-600" />
                            }
                            text="Fast Global CDN"
                        />
                        <PricingFeature
                            icon={
                                <Globe className="mr-2 h-4 w-4 text-purple-600" />
                            }
                            text="Free Subdomain"
                        />
                        <PricingFeature
                            icon={
                                <Lock className="mr-2 h-4 w-4 text-purple-600" />
                            }
                            text="Free SSL Certificates"
                        />
                        <PricingFeature
                            icon={
                                <Github className="mr-2 h-4 w-4 text-purple-600" />
                            }
                            text="GitHub Integration"
                        />
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                        Get Started for Free
                    </Button>
                </div>
            </div>
        </section>
    );
};

interface PricingFeatureProps {
    icon: React.ReactNode;
    text: string;
}

const PricingFeature: React.FC<PricingFeatureProps> = ({ icon, text }) => {
    return (
        <li className="flex items-center">
            {icon}
            <span>{text}</span>
        </li>
    );
};

export default PricingSection;
