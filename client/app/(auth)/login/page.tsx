"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import { FaApple, FaFacebook, FaEnvelope, FaCheck } from "react-icons/fa"
import { MdEmail } from "react-icons/md" // Alternative for Email

// Using standard react-icons
// Google: FcGoogle (Flat Color)
// Apple: FaApple
// Facebook: FaFacebook
// Email: MdEmail or FaEnvelope (Let's use FaEnvelope or generic SVG replacement)

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground mt-2">Welcome Back, Please enter Your details</p>
            </div>

            {/* Toggle Button */}
            <div className="bg-muted/50 p-1 rounded-lg grid grid-cols-2 gap-1">
                <div className="flex items-center justify-center bg-background rounded-md shadow-sm py-2 px-4 transition-all">
                    <span className="font-semibold text-sm">Sign In</span>
                </div>
                <Link
                    href="/signup"
                    className="flex items-center justify-center text-muted-foreground hover:text-foreground py-2 px-4 transition-all"
                >
                    <span className="font-medium text-sm">Signup</span>
                </Link>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-3 text-muted-foreground/60">
                            <MdEmail size={18} />
                        </div>
                        <Input id="email" placeholder="ialirezamp@gmail.com" type="email" className="pl-10" />
                        {/* Check icon for valid state (mocked) */}
                        <div className="absolute right-3 top-3 text-green-500">
                            <FaCheck size={14} />
                        </div>
                    </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-xl h-12 text-base font-semibold">
                    Continue
                </Button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or Continue With
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="icon-lg" className="rounded-full border-gray-200">
                    <FcGoogle size={20} />
                </Button>
                <Button variant="outline" size="icon-lg" className="rounded-full bg-black hover:bg-black/90 text-white border-black">
                    <FaApple size={20} />
                </Button>
                <Button variant="outline" size="icon-lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600">
                    <FaFacebook size={20} />
                </Button>
            </div>
        </div>
    )
}
