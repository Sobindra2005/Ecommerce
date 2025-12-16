import Image from "next/image"
import { IoShieldCheckmarkSharp } from "react-icons/io5"; // Safe/Shield icon

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
            {/* Left Side - Form Area */}
            <div className="flex flex-col justify-center px-8 py-12 md:px-12 lg:px-16 xl:px-24">
                <div className="mx-auto w-full max-w-[440px]">
                    <div className="mb-8 flex items-center gap-2">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <IoShieldCheckmarkSharp className="h-7 w-7 text-blue-600" />
                            <span>SmartSave</span>
                        </div>
                    </div>

                    {children}

                    <p className="mt-8 text-center text-xs text-muted-foreground/60">
                        Join the millions of smart investors who trust us to manage their finances.
                        Log in to access your personalized dashboard.
                    </p>
                </div>
            </div>

            {/* Right Side - Visual Area */}
            <div className="relative hidden bg-gradient-to-t from-blue-50 to-blue-100 lg:flex lg:flex-col lg:items-center lg:justify-center p-12">
                {/* Background elements if any */}
                <div className="relative aspect-square w-full max-w-[600px]">
                    <Image
                        src="/assets/auth-safe.png"
                        alt="Secure Vault Illustration"
                        fill
                        priority
                        className="object-contain drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    )
}
