import Link from "next/link";
import Image from "next/image";
import logoImg from "./logo.png";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
                <Image
                    src={logoImg}
                    alt="WorkZen Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                WorkZen
            </span>
        </Link>
    );
}
