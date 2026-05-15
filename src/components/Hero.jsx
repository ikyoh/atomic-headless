
import { cn } from "@/lib/utils";
import Image from "next/image";
export default function Hero({ featuredURL, title, subtitle, isImageContain }) {
    return (
        <div className="relative">
            <div className={cn("md:-top-9.5 relative h-[calc(40dvh-60px)] md:h-122 bg-[radial-gradient(50%_50%_at_50%_50%,#344C6B_0%,#17273F_100%)]")}>
                {featuredURL &&
                    <Image
                        src={featuredURL}
                        alt={title || "Featured Image"}
                        fill
                        sizes="(max-width: 768px) 150vw, 100vw"
                        quality={90}
                        priority
                        className={cn(isImageContain ? "object-contain" : "object-cover")}
                    />
                }

            </div>
            <div className="md:absolute w-full flex flex-col items-center justify-end pb-5 md:pb-6 md:bottom-10">
                {title &&
                    <h1 className="px-5 text-3xl! md:text-[2.5rem] font-black! text-center text-black dark:text-white md:text-white! uppercase text-shadow-primary md:text-shadow-[0_5px_20px] mb-0 ">
                        {title}
                    </h1>
                }
                {subtitle &&
                    <div className="px-5 text-lg! font-black! text-center uppercase text-black! dark:text-white! md:text-white! text-shadow-primary/50 md:text-shadow-[0_5px_15px]">
                        {subtitle}
                    </div>
                }
                {/* <Link href={"#content"} className="z-3 md:hidden animate-bounce flex items-center justify-center text-white size-12 bg-neutral-500/50 rounded-full absolute bottom-10">
                    <ChevronDown color="white" />
                </Link> */}
            </div>
        </div>
    );
}