import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/layout/Footer';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Outlet />
                <Footer />
                <Toaster richColors />
            </QueryClientProvider>
        </>
    );
};
