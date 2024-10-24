import { motion } from 'framer-motion';
import { FeatureBadge } from '../featureBadge';
import { TextAnimation } from '../textAnimation';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/features/auth/user/useUser';

const HeroSection = () => {
    const { data: user } = useUser();
    const navigate = useNavigate();
    const handleGetStarted = () => {
        if (user) {
            return navigate('/dashboard');
        } else {
            return navigate('/login');
        }
    };
    return (
        <section className="w-full min-h-[calc(100dvh-64px)]  flex items-center justify-center  overflow-hidden bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <FeatureBadge />
                    <div className="text-center max-w-4xl mx-auto text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-4xl font-bold font-poppins tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                        >
                            Deploy Your Static Website <TextAnimation />
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mt-6 text-base md:text-xl text-gray-100 max-w-2xl mx-auto"
                        >
                            Free, fast, and secure static website hosting. Just
                            upload your project ZIP or connect your GitHub repo
                            and go live in seconds.
                        </motion.p>
                    </div>
                    {/* <HeroForm /> */}
                    <div className="flex gap-4 mt-8">
                        <Button
                            size={'lg'}
                            onClick={handleGetStarted}
                            className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors font-medium"
                        >
                            Get Started
                        </Button>
                        <Button
                            size={'lg'}
                            variant={'outline'}
                            className="bg-transparent text-white"
                            asChild
                        >
                            <Link to={'/#features'}>Explore More</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1 }}
                />
            </div>
        </section>
    );
};

export default HeroSection;
