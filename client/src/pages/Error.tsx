import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError() as Error & { statusText?: string };

    return (
        <div
            id="error-page"
            className=" min-h-screen flex flex-col gap-4 items-center justify-center"
        >
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
