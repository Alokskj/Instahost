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
import LoginWithGoogle from '@/components/blocks/LoginWithGoogle';
import { useRegister } from './useRegister';
import { toast } from 'sonner';
import { useUser } from '@/features/auth/user/useUser';
import { ChevronLeft } from 'lucide-react';

const schema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
    const [step, setStep] = useState(0);
    const { data: user } = useUser();
    const { mutate, isPending } = useRegister();
    const navigate = useNavigate();
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onTouched', // Validate on change
    });

    useEffect(() => {
        if (user && user.verified) {
            navigate('/', { replace: true });
        }
    }, [navigate, user]);

    const handleGoBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const { trigger } = form;

    const onSubmit = (data: FormData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success(
                    'An verification email has been sent to your email address.',
                );
                navigate('/verify-mail', { replace: true });
            },
            onError: (error) => {
                form.setError('root', error);
            },
        });
    };

    const handleStepChange = async () => {
        let valid = false;

        if (step === 0) {
            valid = await trigger('username'); // Validate username field
        } else if (step === 1) {
            valid = await trigger('email'); // Validate email field
        } else if (step === 2) {
            valid = await trigger('password'); // Validate password field
        }

        if (valid && step < 3) {
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
                        Create your account
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
                                        key="username"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={inputVariants}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Username
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                )}
                                {step === 1 && (
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
                                {step >= 2 && (
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
                                    type={step === 3 ? 'submit' : 'button'}
                                    className="w-full"
                                    disabled={isPending}
                                    onClick={
                                        step < 3 ? handleStepChange : undefined
                                    }
                                >
                                    {step < 2 ? 'Next' : 'Sign up'}
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
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            replace
                            className="font-medium text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                    <p className="text-center text-xs text-muted-foreground">
                        By signing up, you agree to our{' '}
                        <Link
                            to="/privacy-policy"
                            className="font-medium text-primary hover:underline"
                        >
                            Privacy Policy
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
