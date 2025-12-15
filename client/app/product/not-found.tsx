"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-6 h-64 w-64 sm:h-80 sm:w-80">
                <Image
                    src="/images/product-not-found.png"
                    alt="Product Not Found"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}
