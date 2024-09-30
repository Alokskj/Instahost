import { HashLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center primary-gradient">
            <HashLoader color="white" />
        </div>
    );
};

export default Spinner;
