import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FaEnvelope, FaRedo } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useResendMail } from './useResendMail';
import { useUser } from '@/features/auth/user/useUser';
import { useEffect } from 'react';
import Spinner from '@/components/ui/spinner';

export default function VerifyMail() {
    const { mutate, isPending, status, error } = useResendMail();
    const { data: user, isLoading, refetch } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                navigate('/sign-in', { replace: true });
            }
            if (user?.verified) {
                navigate(-1);
            }
        }
    }, [user, navigate, isLoading]);
    useEffect(() => {
        const interval = setInterval(refetch, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [refetch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen primary-gradient flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Verify Your Email
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <FaEnvelope className="mx-auto text-4xl text-primary" />
                    </div>
                    <p className="text-center">
                        We've sent a verification link to {user?.email}. Please
                        check your email and click on the link to verify your
                        account.
                    </p>
                    {status === 'success' && (
                        <Alert variant="default">
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                A new verification email has been sent. Please
                                check your inbox.
                            </AlertDescription>
                        </Alert>
                    )}
                    {status === 'error' && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        onClick={() => mutate({ email: user?.email || '' })}
                        disabled={isPending}
                        className="w-full"
                    >
                        {isPending ? (
                            <>
                                <FaRedo className="mr-2 h-4 w-4 animate-spin" />
                                Resending...
                            </>
                        ) : (
                            <>
                                <FaRedo className="mr-2 h-4 w-4" />
                                Resend Verification Email
                            </>
                        )}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                        Didn't receive an email? Check your spam folder or{' '}
                        <Link
                            to="/contact-support"
                            className="font-medium text-primary hover:underline"
                        >
                            contact support
                        </Link>
                        .
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
