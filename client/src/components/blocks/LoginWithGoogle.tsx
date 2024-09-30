import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';

const LoginWithGoogle = () => {
    return (
        <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.pathname = 'api/auth/google')}
        >
            <FaGoogle className="w-5 h-5 mr-2" />
            Sign up with Google
        </Button>
    );
};

export default LoginWithGoogle;
