import React from 'react';
import { Upload, Zap, Globe, Lock, Github, Code } from 'lucide-react';

const FeaturesSection: React.FC = () => {
    return (
        <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                    Key Features
                </h2>
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    <FeatureCard
                        icon={
                            <Upload className="h-8 w-8 mb-2 text-purple-600" />
                        }
                        title="Easy Upload"
                        description="Simply drag and drop your project ZIP file to deploy."
                    />
                    <FeatureCard
                        icon={<Zap className="h-8 w-8 mb-2 text-purple-600" />}
                        title="Lightning Fast"
                        description="Deploy your site in seconds and enjoy blazing-fast load times."
                    />
                    <FeatureCard
                        icon={
                            <Globe className="h-8 w-8 mb-2 text-purple-600" />
                        }
                        title="Free Subdomain"
                        description="Get a free lifetime subdomain for your project."
                    />
                    <FeatureCard
                        icon={<Lock className="h-8 w-8 mb-2 text-purple-600" />}
                        title="Free SSL"
                        description="Secure your site with free SSL certificates, automatically renewed."
                    />
                    <FeatureCard
                        icon={
                            <Github className="h-8 w-8 mb-2 text-purple-600" />
                        }
                        title="GitHub Integration"
                        description="Optionally deploy directly from your GitHub repository with ease."
                    />
                    <FeatureCard
                        icon={<Code className="h-8 w-8 mb-2 text-purple-600" />}
                        title="Custom Domains"
                        description="Easily connect your own domain to your Instahost site."
                    />
                </div>
            </div>
        </section>
    );
};

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
            {icon}
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {description}
            </p>
        </div>
    );
};

export default FeaturesSection;
