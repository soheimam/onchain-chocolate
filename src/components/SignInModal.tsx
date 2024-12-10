'use client';

import GlassButton from '@/components/GlassButton';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SignIn, useSignIn } from '@clerk/nextjs';
import { useState } from 'react';

export default function SignInModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoaded } = useSignIn();

    if (!isLoaded) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <GlassButton>
                    Login
                </GlassButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Welcome Back</DialogTitle>
                    <DialogDescription>
                        Sign in to your account to continue
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <div id="clerk-captcha" className="mb-4"></div>

                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "w-full shadow-none p-0",
                                formButtonPrimary: "bg-primary",
                                footerActionLink: "text-primary hover:text-primary-foreground",
                            }
                        }}
                        routing="hash"
                        signUpUrl="#sign-up"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
} 