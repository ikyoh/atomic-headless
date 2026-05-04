
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Hero({ featuredURL, title, subtitle, isImageContain }) {
    return (
        <div className={cn("md:-top-9.5 relative h-[calc(100dvh-124px)] md:h-122 bg-[radial-gradient(50%_50%_at_50%_50%,#344C6B_0%,#17273F_100%)]")}>
            {featuredURL &&
                <Image
                    src={featuredURL}
                    alt={title || "Featured Image"}
                    fill
                    className={cn(isImageContain ? "object-contain" : "object-cover")}
                />
            }
            <div className="z-2 absolute h-full left-0 right-0 flex flex-col items-center justify-end pb-40 md:pb-6">
                {title &&
                    <h1 className="px-5 text-[2.5rem] font-black! text-center text-white! uppercase text-shadow-primary text-shadow-[0_5px_20px] mb-3">
                        {title}
                    </h1>
                }
                {subtitle &&
                    <div className="px-5 text-lg! font-bold! text-center uppercase text-white text-shadow-primary/50 text-shadow-[0_5px_15px]">
                        {subtitle}
                    </div>
                }
                <Link href={"#content"} className="z-3 md:hidden animate-bounce flex items-center justify-center text-white size-12 bg-neutral-500/50 rounded-full absolute bottom-10">
                    <ChevronDown color="white" />
                </Link>
            </div>

        </div>
    );
}