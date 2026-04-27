import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function OtherBreadcrumb() {

	const pathname = usePathname()

	const slugs = pathname.split('/').filter(Boolean); 

    return (
	<Breadcrumb>
		<BreadcrumbList>

		{slugs.map((slug, index) => {
			const isLast = index === slugs.length - 1; // Check if it's the last segment
			const href = '/' + slugs.slice(0, index + 1).join('/'); // Construct the href for the breadcrumb link

			return isLast ?
				<BreadcrumbItem key={index}>
					<BreadcrumbPage className="text-lg uppercase font-semibold text-primary">{slug}</BreadcrumbPage>	
				</BreadcrumbItem>
				: index === 0 ?
					<BreadcrumbItem>
					<Link href={slugs[0]} className="pb-1">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M18.6 22H5.40003C5.08385 22 4.77078 21.9375 4.47881 21.8162C4.18684 21.6948 3.92173 21.5169 3.69872 21.2928C3.4757 21.0687 3.29917 20.8027 3.17926 20.5101C3.05936 20.2176 2.99845 19.9042 3.00003 19.588V8.332C3.00003 7.95 3.18003 7.598 3.48003 7.367L11.26 2.241C11.4674 2.08444 11.7202 1.99974 11.98 1.99974C12.2399 1.99974 12.4926 2.08444 12.7 2.241L20.52 7.367C20.82 7.598 21 7.95 21 8.332V19.588C21.0016 19.9042 20.9407 20.2176 20.8208 20.5101C20.7009 20.8027 20.5244 21.0687 20.3013 21.2928C20.0783 21.5169 19.8132 21.6948 19.5213 21.8162C19.2293 21.9375 18.9162 22 18.6 22Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round" className="stroke-dark"/>
							<path d="M9.8 12H14.2C14.64 12 15 12.36 15 12.8V22H9V12.8C9 12.36 9.36 12 9.8 12Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round" className="stroke-dark"/>
						</svg>
					</Link> /
					</BreadcrumbItem>
				:
					<BreadcrumbItem key={index} >
						<BreadcrumbLink render={<Link href={href} className="text-lg text-dark! uppercase font-semibold no-underline!">{slug}</Link>} /> /
					</BreadcrumbItem>
		})}
		</BreadcrumbList>
	</Breadcrumb>
    );
}