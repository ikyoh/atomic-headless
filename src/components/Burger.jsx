import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";


import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";

export default function Burger({ navigationItems = [] }) {

    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    className="md:hidden flex rounded-full h-10 w-10 md:w-auto px-2.5! drop-shadow-primary/50 drop-shadow-lg bg-linear-to-r from-primary to-primary hover:from-red-400 transition duration-400 ease-in-out hover:scale-105"
                >
                    {open ? <X className='flex-none h-full! w-full!' /> : <Menu className='flex-none h-full! w-full!' />}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto h-screen! max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle></DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">

                        {navigationItems.filter(f => f.isMobile).map((item, index) => {

                            return (
                                <Link key={index} href={item.slug} className="relative no-underline!">
                                    <div
                                        className={cn(
                                            "relative font-semibold text-xl hover:text-primary transition-colors text-primary flex items-center justify-start px-2 flex-1",
                                        )}
                                    >

                                        {item.icon?.node?.sourceUrl && (

                                            <Image
                                                src={item.icon.node.sourceUrl}
                                                alt=""
                                                width={50}
                                                height={50}
                                            />

                                        )}

                                        {item.label}


                                    </div>

                                </Link>
                            );
                        })}

                    </div>

                </div>
            </DrawerContent>
        </Drawer >
    );
}
