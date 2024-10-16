import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/layout/Footer';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export const Layout = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Outlet />
                <Footer />
                <Toaster />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
};
