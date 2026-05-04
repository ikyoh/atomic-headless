
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
export default function HeroYoutube({ youtubeID = "YuN82rArMqM" }) {
    return (
        <div className={cn("md:-top-9 relative h-[calc(100dvh-124px)] md:h-[calc(100vh-90px)] w-full overflow-hidden")}>
            <iframe
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip
                        w-screen h-[56.25vw] min-h-[calc(100vh-90px)] min-w-[177.78dvh]"
                src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1&loop=1&playlist=${youtubeID}&mute=1&playsinline=1&iv_load_policy=3&controls=0&disablekb=1&fs=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <div className="z-2 absolute h-full left-0 right-0 flex flex-col items-center justify-end pb-40 md:pb-40">
                <Link href={"#content"} className="z-3 animate-bounce flex items-center justify-center text-white size-12 bg-neutral-500/50 rounded-full absolute bottom-10">
                    <ChevronDown color="white" />
                </Link>
            </div>

        </div>
    );
}

