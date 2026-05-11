import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CardZoomLink({imageURL, text, link, backgroundGradient=false, imageClassName}) {


    if (!imageURL || !text ) return null;

    return (
        <Link href={link} className="no-underline! block">
            <div className={cn("rounded-md sm:aspect-square flex overflow-hidden p-0 relative shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 border-0 group", backgroundGradient ? "bg-[radial-gradient(50%_50%_at_50%_50%,#344C6B_0%,#17273F_100%)]" : "bg-medium")}>
                <Image
                    src={imageURL}
                    alt={text}
                    width={200}
                    height={160}
                    className={cn("object-cover w-15 h-15 sm:w-full sm:h-[calc(100%-40px)]", imageClassName)}
                    />
                    <div className="grow bg-linear-to-r from-primary from-50% to-black to-300% group-hover:to-400% text-white sm:h-10 sm:absolute sm:bottom-0 sm:left-0 sm:right-0 flex items-center justify-center transition-colors duration-300 ease-in-out">
                        <p className="text-center text-(size:--wp--preset--font-size--small) leading-3.5">
                            {text}
                        </p>
                    </div>
            </div>
        </Link>
    );
}
