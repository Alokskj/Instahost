'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export default function FileManagement() {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Implement file upload logic here
        console.log('Uploading files:', event.target.files);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>File Management</CardTitle>
                <CardDescription>
                    Upload and manage your project files.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="fileUpload" className="cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                                Click to upload or drag and drop
                            </p>
                        </div>
                        <Input
                            id="fileUpload"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}
