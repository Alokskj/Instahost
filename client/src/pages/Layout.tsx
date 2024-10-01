import { Toaster } from '@/components/ui/sonner';
import Footer from '@/features/footer/Footer';
import Header from '@/features/header/Header';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Header />
                <Outlet />
                <Footer />
                <Toaster />
            </QueryClientProvider>
        </>
    );
};
