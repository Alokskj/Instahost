import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Trash2 } from 'lucide-react';
import { isValidZip } from '../utils/isValidZip';
import { toast } from 'sonner';

export default function FolderUpload({
    zipFile,
    setZipFile,
}: {
    zipFile: File | null;
    setZipFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
    const onDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        try {
            const zip = new JSZip();
            let indexHtmlFound = false;

            // Load the zip files and check for index.html
            for (const file of acceptedFiles) {
                zip.file(file.webkitRelativePath || file.name, file);
                if (
                    (!file.webkitRelativePath && file.name === 'index.html') ||
                    (file.webkitRelativePath.split('/').length === 2 &&
                        file.name === 'index.html')
                ) {
                    console.log(file);
                    indexHtmlFound = true;
                }
            }

            if (!indexHtmlFound) {
                toast.error(
                    'The uploaded folder must contain an index.html file',
                );
                return;
            }

            // If index.html is found, proceed with generating the zip
            const content = await zip.generateAsync({ type: 'blob' });
            const file = new File([content], 'uploaded_files.zip', {
                type: 'application/zip',
            });

            const isValid = isValidZip(file);
            if (!isValid) return;

            setZipFile(file);
        } catch (error: any) {
            console.error('Error creating ZIP file:', error);
            toast.error(error.message);
        }
    };

    const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone(
        {
            onDrop,
            onDragEnter: () => {},
            onDragOver: () => {},
            onDragLeave: () => {},
            multiple: true,
            accept: {},
            noKeyboard: true,
        },
    );

    const clearFiles = () => {
        setZipFile(null);
    };

    return (
        <div className="flex flex-col items-center pt-2 w-full ">
            {zipFile ? (
                <div className="w-full flex items-center gap-2">
                    <Alert className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                                Files uploaded successfully
                            </AlertDescription>
                        </div>
                        <Button onClick={clearFiles} variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete All Files
                        </Button>
                    </Alert>
                </div>
            ) : (
                <div
                    {...getRootProps({
                        className:
                            'border-2 border-dashed border-gray-400 px-6 py-8 rounded-lg w-full text-center',
                    })}
                >
                    <input
                        {...getInputProps()}
                        /* @ts-expect-error there is no type for this */
                        directory=""
                        webkitdirectory=""
                        multiple
                        ref={inputRef}
                    />
                    {isDragActive ? (
                        <p className="text-blue-600">
                            Drop the files or folder here ...
                        </p>
                    ) : (
                        <p>
                            Drag & drop a folder or files here, or click to
                            select folder
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
