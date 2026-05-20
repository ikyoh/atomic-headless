'use client'

import { useAside } from "@/context/AsideContext"
import { cn } from "@/lib/utils"
import Image from "next/image"

const Aside = ({ children }) => {

    const { isActive, toggle } = useAside()

    return (
        <nav
            className={cn(
                "flex fixed top-25 md:top-40 z-30 w-70 transition-all duration-300 ease-in-out right-2 md:-right-2",
                isActive ? "translate-x-0 right-0 md:right-12 md:translate-x-full" : "translate-x-full md:translate-x-0"
            )}
        >
            <div
                className="bg-tertiary flex-none w-7 h-14 rounded-l-full absolute -left-7 top-9 cursor-pointer flex items-center"
                onClick={toggle}
            >
                <Image
                    alt="icon"
                    src="/icons/arrow.svg"
                    height={14}
                    width={21}
                    className={cn(
                        "h-4 ml-2 transition-transform duration-300",
                        isActive ? "rotate-180 md:rotate-0" : "rotate-0 md:rotate-180"
                    )}
                />
            </div>

            {children}
        </nav>
    )
}

export default Aside
