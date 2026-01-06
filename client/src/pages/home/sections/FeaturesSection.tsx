import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, Zap, Globe, Lock, Github, Code } from 'lucide-react';

const FeaturesSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section
            ref={sectionRef}
            id="features"
            className="w-full py-20 bg-gradient-to-b from-white to-purple-50"
        >
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        Powerful Features
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the future of static website hosting with our
                        cutting-edge features designed to make your deployment
                        process seamless and efficient.
                    </p>
                </motion.div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={<Upload className="w-10 h-10" />}
                        title="Easy Upload"
                        description="Drag and drop your project folder or select it from your computer for instant deployment."
                        color="from-purple-500 to-indigo-500"
                    />
                    <FeatureCard
                        icon={<Zap className="w-10 h-10" />}
                        title="Lightning Fast"
                        description="Experience blazing-fast load times with our optimized global CDN infrastructure."
                        color="from-blue-500 to-cyan-500"
                    />
                    <FeatureCard
                        icon={<Globe className="w-10 h-10" />}
                        title="Free Subdomain"
                        description="Get a free lifetime subdomain for your project, ready to share with the world."
                        color="from-green-500 to-teal-500"
                    />
                    <FeatureCard
                        icon={<Lock className="w-10 h-10" />}
                        title="Free SSL"
                        description="Secure your site with free SSL certificates that are automatically renewed."
                        color="from-yellow-500 to-orange-500"
                    />
                    <FeatureCard
                        icon={<Github className="w-10 h-10" />}
                        title="GitHub Integration"
                        description="Deploy directly from your GitHub repository with our seamless integration."
                        color="from-red-500 to-pink-500"
                    />
                    <FeatureCard
                        icon={<Code className="w-10 h-10" />}
                        title="Custom Domains"
                        description="Easily connect your own domain to your Instahost site for a professional touch."
                        color="from-purple-500 to-indigo-500"
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
    color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
    color,
}) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.5 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
            }}
            className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 transform group"
        >
            <div
                className={`inline-block p-3 rounded-full bg-gradient-to-r ${color} text-white mb-4 transition-transform duration-500 group-hover:rotate-[360deg]`}
            >
                {icon}
            </div>
            <motion.h3
                className="text-xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {title}
            </motion.h3>
            <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {description}
            </motion.p>
        </motion.div>
    );
};

export default FeaturesSection;
