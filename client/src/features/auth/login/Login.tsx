import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from './useLogin';
import LoginWithGoogle from '@/components/blocks/LoginWithGoogle';
import { useUser } from '@/features/auth/user/useUser';
import { ChevronLeft } from 'lucide-react';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const { data: user } = useUser();
    const { mutate, isPending } = useLogin();
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onTouched', // Validate on change
    });

    const { trigger } = form;

    useEffect(() => {
        if (user && user.verified) {
            navigate('/', { replace: true });
        }
    }, [navigate, user]);

    const onSubmit = async (data: FormData) => {
        mutate(data, {
            onSuccess: (data) => {
                console.log(data);
                navigate('/');
            },
            onError: (error) => {
                form.setError('root', error);
            },
        });
    };
    const handleGoBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };
    const handleStepChange = async () => {
        let valid = false;

        if (step === 0) {
            valid = await trigger('email'); // Validate username field
        } else if (step === 1) {
            valid = await trigger('password'); // Validate email field
        }

        if (valid && step < 2) {
            setStep(step + 1);
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="min-h-svh flex justify-center items-center relative">
            <div className="back-btn absolute top-6 left-2">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
            <Card className="border-none shadow-none rounded-none w-full max-w-sm md:max-w-md h-full">
                <CardHeader>
                    <CardTitle className="mt-6 text-center text-3xl font-extrabold">
                        Welcome Back
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div
                                        key="email"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={inputVariants}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                )}
                                {step >= 1 && (
                                    <motion.div
                                        key="password"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={inputVariants}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                {form.formState.errors.root?.message && (
                                    <p className="text-red-500 font-medium">
                                        {form.formState.errors.root?.message}
                                    </p>
                                )}
                                <Button
                                    type={step === 2 ? 'submit' : 'button'}
                                    className="w-full"
                                    disabled={isPending}
                                    onClick={
                                        step < 2 ? handleStepChange : undefined
                                    }
                                >
                                    {step < 1 ? 'Next' : 'Sign in'}
                                </Button>
                                {step > 0 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleGoBack}
                                    >
                                        Back
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-background text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <LoginWithGoogle />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            replace
                            className="font-medium text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
