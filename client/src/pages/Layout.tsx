import { Toaster } from '@/components/ui/sonner';
import Footer from '@/features/footer/Footer';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Outlet />
                <Footer />
                <Toaster />
            </QueryClientProvider>
        </>
    );
};
