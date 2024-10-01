import React from 'react';

const HowItWorksSection: React.FC = () => {
    return (
        <section
            id="how-it-works"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                    How It Works
                </h2>
                <div className="grid gap-6 lg:grid-cols-3">
                    <StepCard
                        number={1}
                        title="Upload ZIP"
                        description="Drag and drop your project ZIP file or select it from your computer."
                    />
                    <StepCard
                        number={2}
                        title="We Deploy"
                        description="Our system automatically deploys your static website with SSL."
                    />
                    <StepCard
                        number={3}
                        title="Go Live"
                        description="Your website is live on your free subdomain, ready to share with the world."
                    />
                </div>
            </div>
        </section>
    );
};

interface StepCardProps {
    number: number;
    title: string;
    description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
    return (
        <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg bg-white shadow-sm">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-full text-2xl font-bold">
                {number}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {description}
            </p>
        </div>
    );
};

export default HowItWorksSection;
