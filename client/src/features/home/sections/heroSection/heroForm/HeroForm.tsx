import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidZip } from '@/features/create-project/utils/isValidZip';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
const HeroFormSchema = z.object({
    gitUrl: z.string().url('Invalid URL'),
});
const HeroForm = () => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof HeroFormSchema>>({
        resolver: zodResolver(HeroFormSchema),
    });
    const handleFormSubmit = (values: z.infer<typeof HeroFormSchema>) => {
        navigate('/dashboard/new-project', {
            state: { projectType: 'git', gitUrl: values.gitUrl },
        });
    };
    const handleZipFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const isValid = isValidZip(file);
            if (!isValid) return;
            navigate('/dashboard/new-project', {
                state: { projectType: 'zip', zipFile: file },
            });
        }
    };
    return (
        <div className="mt-10 w-full max-w-md space-y-4">
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
            >
                <div className="flex-grow">
                    <Input
                        className=" placeholder:text-gray-200 bg-white/10 border-white/20 focus:border-white/40"
                        placeholder="Enter your GitHub repo URL"
                        type="text"
                        {...form.register('gitUrl')}
                    />
                    {form.formState.errors.gitUrl && (
                        <p className="text-sm text-yellow-400 mt-1 ml-2">
                            {form.formState.errors.gitUrl.message}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full sm:w-auto bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition-colors"
                >
                    Deploy
                </Button>
            </form>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <input
                    type="file"
                    accept=".zip"
                    onChange={handleZipFileChange}
                    className="hidden"
                    ref={inputFileRef}
                />
                <Button
                    variant="outline"
                    onClick={() => inputFileRef.current?.click()}
                    className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border-white/20"
                >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload ZIP
                </Button>
            </div>
        </div>
    );
};

export default HeroForm;
