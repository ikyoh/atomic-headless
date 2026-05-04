'use client'

import { useAside } from "@/context/AsideContext"
import { cn } from "@/lib/utils"
import Image from "next/image"

const Aside = ({ children }) => {

    const { isActive, toggle } = useAside()

    return (
        <nav
            className={cn(
                "flex fixed top-25 md:top-40 z-30 w-70 transition-all duration-300 ease-in-out",
                isActive ? "translate-x-0 right-0" : "translate-x-full right-2 md:right-12"
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
                        isActive ? "rotate-180" : "rotate-0"
                    )}
                />
            </div>

            {children}
        </nav>
    )
}

export default Aside
