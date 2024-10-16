import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, Zap, Globe } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            id="how-it-works"
            className="hidden md:block w-full py-20 bg-gradient-to-b from-gray-50 to-white"
            ref={sectionRef}
        >
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900">
                        How It Works
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Deploy your static website in three simple steps. Fast,
                        secure, and effortless.
                    </p>
                </motion.div>
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                    <div className="space-y-24">
                        <StepCard
                            number={1}
                            title="Upload Your Project"
                            description="Drag & drop your ZIP file or select from your computer. We support all major static site generators."
                            icon={<Upload className="w-6 h-6" />}
                            isInView={isInView}
                        />
                        <StepCard
                            number={2}
                            title="Automated Deployment"
                            description="Our system deploys your site, sets up SSL, and distributes content across our global CDN."
                            icon={<Zap className="w-6 h-6" />}
                            isInView={isInView}
                        />
                        <StepCard
                            number={3}
                            title="Go Live Instantly"
                            description="Your site is live on a free subdomain. Connect your custom domain if desired. Ready for visitors!"
                            icon={<Globe className="w-6 h-6" />}
                            isInView={isInView}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

interface StepCardProps {
    number: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    isInView: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
    number,
    title,
    description,
    icon,
    isInView,
}) => {
    const cardRef = useRef(null);
    const isCardInView = useInView(cardRef, { once: true, amount: 0.5 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={
                isInView && isCardInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.6, delay: number * 0.2 }}
            className="flex items-center"
        >
            <div className="w-1/2 flex justify-end pr-8">
                {number % 2 !== 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                        <h3 className="text-2xl font-bold mb-2">{title}</h3>
                        <p className="text-gray-600">{description}</p>
                    </div>
                )}
            </div>
            <div className="w-14 flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    {icon}
                </div>
                <div className="h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <div className="w-1/2 pl-8">
                {number % 2 === 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                        <h3 className="text-2xl font-bold mb-2">{title}</h3>
                        <p className="text-gray-600">{description}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default HowItWorksSection;
