import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Menu({ navigationItems = [] }) {


    return (
        <nav
            className={cn(
                "text-foreground relative z-60 hidden md:flex p-5 space-x-6"
            )}
        >

            {navigationItems.filter(f => f.isDesktop).map((item, index) => {


                return (
                    <Link key={index} href={item.slug} className="relative no-underline!">
                        <div
                            className={cn(
                                "relative font-semibold hover:text-primary transition-colors uppercase"
                            )}
                        >
                            {item.label}
                        </div>
                    </Link>
                );
            })}

        </nav >
    );
}
