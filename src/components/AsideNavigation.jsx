'use client';

import { useAside } from "@/context/AsideContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Aside from "./Aside";


const AsideNavigation = ({ items }) => {

    const { isActive, toggle, setIsActive } = useAside()


    return (
        <Aside>
            <ul className="bg-medium/50 p-1 space-y-2 flex-1 rounded-l-md backdrop-blur-md">
                {items?.map((item, index) => (
                    <li key={index}>
                        <AnchorLink
                            icon={item["icon"]?.node?.mediaItemUrl}
                            anchor={item["ancre"]}
                            title={item["intitule"]}
                            setIsActive={setIsActive}
                        />
                    </li>
                ))}
            </ul>
        </Aside>
    )
}



const AnchorLink = ({ anchor, title, icon, setIsActive }) => {

    const [activeId, setActiveId] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const handleScroll = () => {
            document.querySelectorAll("#content [id]").forEach((element) => {
                const rect = element.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                    setActiveId(element.id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [setActiveId]);


    return (
        <button
            // href={(`#${anchor}`)}
            className={cn("group flex items-center gap-3 w-full rounded-sm px-2 py-1 text-sm transition-all duration-300 ease-in hover:bg-primary hover:text-white! no-underline!", activeId === anchor && "bg-primary text-white!")}
            onClick={() => {
                setIsActive(false);
                router.replace(`#${anchor}`, undefined, { shallow: true });
            }}
        >
            <Image
                src={icon}
                alt={title}
                width={24}
                height={24}
                className={cn("h-6 w-6 object-cover my-0! rounded-none! transition-all duration-150 ease-in dark:invert group-hover:invert", activeId === anchor && "invert")}
            />
            {title}
        </button>
    );
};

export default AsideNavigation;
