import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import Menu from './Menu';
import ThemeToggle from './theme/ThemeToggle';
import { Button } from './ui/button';

import threedPicto from '../../public/picto-3D.svg';
import phonePicto from '../../public/picto-phone.svg';

export default function Header({ navigationItems = [] }) {

    console.log('HEADER navigationItems', navigationItems)
    return (
        <header className="sticky z-60 top-0 border-b border-primary h-15 md:h-22.5 bg-background w-full overflow-hidden">
            <div className="flex mx-auto max-w-7xl items-center justify-between h-full px-5">
                <div className="basis-full">
                    <Link href="/" className="w-15.5 h-12.5 md:w-21.75 md:h-17.5 block cursor-pointer">
                        <Logo width="100%" height="100%" />
                    </Link>
                </div>
                <Menu navigationItems={navigationItems} />
                <div className="basis-full flex items-center justify-end gap-2">
                    <ThemeToggle />
                    <Button asChild className="flex rounded-full h-10 w-10 p-0 drop-shadow-primary/50 drop-shadow-lg bg-linear-to-r from-primary to-primary hover:from-red-400 transition duration-400 ease-in-out hover:scale-105">
                        <Link href="/">
                            <Image
                                src={threedPicto}
                                alt="Pictogramme vue 3D"
                                width={18}
                                height={18}
                            />
                        </Link>
                    </Button>
                    <Button asChild className="flex rounded-full h-10 w-10 md:w-auto md:px-4 p-0 drop-shadow-primary/50 drop-shadow-lg bg-linear-to-r from-primary to-primary hover:from-red-400 transition duration-400 ease-in-out hover:scale-105">
                        <Link href="/contact" className="no-underline!">
                            <span className="hidden md:inline text-white uppercase">
                                Contact
                            </span>
                            <Image
                                src={phonePicto}
                                alt="Pictogramme téléphone"
                                width={17}
                                height={22}
                            />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}