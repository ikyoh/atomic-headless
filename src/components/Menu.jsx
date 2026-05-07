import { cn } from "@/lib/utils";
import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function Menu({ isMobile = false }) {

    const router = useRouter();

    const GET_MENU = gql`
    query menu{
        optionNavigation {
            settingsNavigation {
                navigation {
                    isDesktop
                    isMobile
                    label
                    labelMobile
                    slug
                    icon {
                        node {
                            sourceUrl
                        }
                    }
                }
            }
        }
    }
    `;

    const { data } = useQuery(GET_MENU);

    const items = useMemo(
        () =>
            data?.optionNavigation?.settingsNavigation?.navigation?.filter((item) =>
                isMobile ? item.isMobile === isMobile : item.isDesktop !== isMobile
            ) ?? [],
        [data, isMobile]
    );

    return (
        <nav
            className={cn(
                "text-foreground relative z-60",
                isMobile
                    ? "overflow-hidden flex md:hidden fixed bottom-0 w-full -space-x-4 justify-around bg-background border-t border-primary py-1"
                    : "hidden md:flex p-5 space-x-6"
            )}
        >

            {items.map((item, index) => {

                const isActive = router.asPath === item.slug;

                return (
                    <Link key={index} href={item.slug} className="relative no-underline!">
                        <div
                            className={cn(
                                "relative font-semibold hover:text-primary transition-colors",
                                isMobile
                                    ? "text-primary text-xs flex flex-col items-center justify-center px-2 flex-1"
                                    : "uppercase"
                            )}
                        >

                            {isMobile && item.icon?.node?.sourceUrl && (
                                <div className="flex-none w-10 h-10 p-1.5">
                                    <Image
                                        src={item.icon.node.sourceUrl}
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            )}

                            {isMobile ? item.labelMobile : item.label}

                            {isActive && (
                                <motion.div
                                    layoutId={isMobile ? "menu-indicator-mobile" : "menu-indicator-desktop"}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 30
                                    }}
                                    className={cn(
                                        "absolute left-0 right-0 mx-auto overflow-hidden",
                                        isMobile
                                            ? "w-14 h-5 -top-1"
                                            : "w-26 h-6 -bottom-9.5"
                                    )}
                                >
                                    <div className={cn("absolute bg-primary rounded-full shadow-md shadow-primary left-1/2 -translate-x-1/2", isMobile ? "bottom-4 size-14" : "top-4 rotate-180 size-36")} />
                                </motion.div>
                            )}

                        </div>

                    </Link>
                );
            })}

        </nav >
    );
}
