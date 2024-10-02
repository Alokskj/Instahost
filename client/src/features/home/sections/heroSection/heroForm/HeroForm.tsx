import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Upload } from 'lucide-react';

const HeroForm = () => (
    <div className="mt-10 w-full max-w-md space-y-4">
        <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
                className="flex-grow placeholder:text-gray-400 bg-white/10 border-white/20 focus:border-white/40"
                placeholder="Enter your GitHub repo URL"
                type="text"
            />
            <Button
                type="submit"
                className="w-full sm:w-auto bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition-colors"
            >
                Deploy
            </Button>
        </form>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
                variant="outline"
                className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border-white/20"
            >
                <Upload className="mr-2 h-4 w-4" />
                Upload ZIP
            </Button>
            <Button
                variant="outline"
                className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border-white/20"
            >
                <Github className="mr-2 h-4 w-4" />
                Connect GitHub
            </Button>
        </div>
    </div>
);

export default HeroForm;
