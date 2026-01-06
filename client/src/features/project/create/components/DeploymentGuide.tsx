import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lightbulb, ChevronUp, ChevronDown, Terminal, FolderArchive, Rocket } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeploymentGuide() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className=" border-2 border-primary-foreground bg-primary/5" id='deployment-guide'>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                            <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">
                                New to Deployment?
                            </CardTitle>
                            <CardDescription>
                                Quick guide for React, Vue & other SPA apps
                            </CardDescription>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary"
                    >
                        {isExpanded ? (
                            <>
                                Hide Guide{' '}
                                <ChevronUp className="ml-1 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Show Guide{' '}
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </CardHeader>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <CardContent className="space-y-6">
                            {/* Skip Note for plain HTML/CSS/JS */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>📌 Skip this guide</strong> if you're
                            uploading a plain HTML, CSS, or JavaScript project.
                            Just upload your folder directly — no build step
                            needed!
                        </p>
                    </div>

                    {/* Important Notice */}
                    <Alert className="bg-amber-500/10 border-amber-500/50">
                        <AlertTitle className="text-amber-600 dark:text-amber-400 flex items-center gap-2">
                            ⚠️ Important
                        </AlertTitle>
                        <AlertDescription className="text-amber-700 dark:text-amber-300">
                            Instahost hosts static files only not backend servers.
                            You need to{' '}
                           build your project first and upload
                            the generated folder (usually{' '}
                            <code className="px-1.5 py-0.5 rounded bg-amber-500/20 text-sm font-mono">
                                dist
                            </code>{' '}
                            or{' '}
                            <code className="px-1.5 py-0.5 rounded bg-amber-500/20 text-sm font-mono">
                                build
                            </code>
                            ).
                        </AlertDescription>
                    </Alert>

                    {/* Step by Step Guide */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-base">
                            3 Simple Steps to Deploy:
                        </h4>

                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                    1
                                </div>
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">
                                        Build Your Project
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Open your terminal in your project folder
                                    and run the build command:
                                </p>
                                <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-3 font-mono text-sm text-green-400">
                                    <span className="text-zinc-500">$ </span>
                                    npm run build
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                    2
                                </div>
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <FolderArchive className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">
                                        Find the Build Folder
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    After building, a new folder will be created
                                    with your production-ready files:
                                </p>
                                <div className="bg-muted rounded-lg p-3 text-sm space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">
                                            📁
                                        </span>
                                        <span>your-project/</span>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <span className="text-muted-foreground">
                                            📁
                                        </span>
                                        <span className="text-primary font-medium">
                                            dist/
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            ← Upload this folder!
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 ml-8 text-muted-foreground">
                                        <span>📄</span>
                                        <span>index.html</span>
                                    </div>
                                    <div className="flex items-center gap-2 ml-8 text-muted-foreground">
                                        <span>📁</span>
                                        <span>assets/</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                    3
                                </div>
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <Rocket className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">
                                        Upload & Deploy
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Select "Upload Files" above, then drag &
                                    drop your{' '}
                                    <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">
                                        dist
                                    </code>{' '}
                                    or{' '}
                                    <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">
                                        build
                                    </code>{' '}
                                    folder. That's it! 🎉
                                </p>
                            </div>
                        </div>
                    </div>
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}