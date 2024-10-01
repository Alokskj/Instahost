import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { FileUp, Github } from 'lucide-react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import AnimatedSphere from '../components/AnimatedSphere';

const HeroSection: React.FC = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-white overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none xl:text-8xl/none">
                                Deploy Your Static Website{' '}
                                <span className="text-yellow-300">
                                    Instantly
                                </span>
                            </h1>
                            <p className="max-w-[600px] text-gray-200 md:text-xl dark:text-gray-400">
                                Free, fast, and secure static website hosting.
                                Just upload your project ZIP and go live in
                                seconds.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input
                                    className="max-w-lg flex-1 bg-white/10 text-white placeholder:text-gray-300"
                                    placeholder="Enter your GitHub repo URL"
                                    type="text"
                                />
                                <Button type="submit" variant="secondary">
                                    Deploy
                                </Button>
                            </form>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button
                                variant="outline"
                                className="bg-white/20 text-white hover:bg-white/30"
                            >
                                <FileUp className="mr-2 h-4 w-4" />
                                Upload ZIP
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white/20 text-white hover:bg-white/30"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Connect GitHub
                            </Button>
                        </div>
                    </div>
                    <div className="lg:mt-0 lg:ml-auto">
                        <Card className="bg-white/10 border-gray-200/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">
                                    Preview Your Site
                                </CardTitle>
                                <CardDescription className="text-gray-200">
                                    See how your site will look
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-[16/9] rounded-md overflow-hidden bg-gray-800/50">
                                    <div className="w-full h-full bg-gray-800/50 flex items-center justify-center text-white">
                                        Your Site Preview
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                                    View Live Demo
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            {/* <div className="absolute inset-0 z-0 opacity-30">
                <Canvas>
                    <OrbitControls enableZoom={false} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[-2, 5, 2]} intensity={1} />
                    <AnimatedSphere />
                </Canvas>
            </div> */}
        </section>
    );
};

export default HeroSection;
