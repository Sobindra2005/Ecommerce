import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
            <div className="relative mb-8 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
                <Image
                    src="/images/404-illustration.png"
                    alt="404 Not Found"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}
