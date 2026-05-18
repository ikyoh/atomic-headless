'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectTrigger,
	MultiSelectValue,
} from "@/components/ui/multi-select";
import { useAside } from "@/context/AsideContext";
import { gql, useQuery } from "@apollo/client";
import { SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const OtherAchievementsFilter = () => {

	const { setIsActive } = useAside()

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const searchRef = useRef("searchRef")

	const [search, setSearch] = useState(searchParams.get('recherche') || "")
	const [filtersOpen, setFiltersOpen] = useState(false)

	const GET_ACHIEVEMENTS = gql`
		query OptionAchievements {
			optionAchievement {
				id
				menuTitle
				pageTitle
				settingsAchievement {
					critria {
						elements {
							order
							tag
							titre
							icon {
								node {
									mediaItemUrl
								}
							}
						}
						ordre
						titre
						icon {
							node {
								mediaItemUrl
							}
						}
					}
				}
			}
		}
	`



	const { data, loading } = useQuery(GET_ACHIEVEMENTS)

	useEffect(() => {

		const timeout = setTimeout(() => {

			const params = new URLSearchParams(searchParams.toString())

			params.delete('recherche')

			if (search) {
				params.append('recherche', search)
			}

			if (params.toString()) {
				router.replace(`${pathname}?${params.toString()}`)
			}

		}, 400)

		return () => clearTimeout(timeout)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search])



	const handleSetSearchParams = (key, values) => {

		const params = new URLSearchParams(searchParams.toString())

		params.delete(key)

		values.forEach((value) => {
			params.append(key, value)
		})

		router.replace(`${pathname}?${params.toString()}`, undefined, { scroll: false })
	}

	if (loading || !data?.optionAchievement) {
		return null
	}

	return (
		<>
			<div className="md:hidden flex items-center justify-center w-full">
				<Button
					variant="outline"
					size="sm"
					onClick={() => setFiltersOpen((v) => !v)}
					aria-expanded={filtersOpen}
					aria-controls="other-achievements-filters"
					className="rounded-full"
				>
					<SlidersHorizontal className="h-4 w-4" />
					{filtersOpen ? "Fermer" : "Filtres"}
				</Button>
			</div>

			<div
				id="other-achievements-filters"
				className={cn(
					"gap-2 items-center justify-center bg-medium p-2 rounded-xl flex-wrap w-auto max-w-full!",
					filtersOpen ? "grid grid-cols-1" : "hidden",
					"md:flex"
				)}
			>

				<div className="flex items-center bg-white rounded-lg pl-2.5 gap-3">
					<span
						onClick={() => {
							setIsActive(true);
							searchRef.current.focus();
						}}
						style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
					>
						<SearchIcon />
					</span>
					<Input
						ref={searchRef}
						placeholder="Rechercher"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="border-0 h-8 text-black bg-transparent focus-visible:ring-0"
					/>
				</div>

			{data.optionAchievement.settingsAchievement.critria.map((item, index) => (
				<div key={index}>
					<MultiSelect
						onValuesChange={(values) => handleSetSearchParams(slugify(item.titre), values)}
						values={searchParams.getAll(slugify(item.titre)) || []}
					>

						<MultiSelectTrigger className="w-full group">
							<Image
								src={item?.icon?.node?.mediaItemUrl}
								alt={item.titre}
								width={24}
								height={24}
								className="h-6 w-6 rounded-none dark:invert group-hover:invert"
							/>

							<MultiSelectValue
								placeholder={item.titre}
								className="flex-none w-full"
							/>

						</MultiSelectTrigger>

						<MultiSelectContent search={false}>
							<MultiSelectGroup>

								{item?.elements?.map((element, index) => (
									<MultiSelectItem
										key={index}
										value={element.tag}
										className="text-dark"
										badgeLabel={
											<Image
												src={element?.icon?.node?.mediaItemUrl}
												alt={element.titre}
												width={20}
												height={20}
												className="h-5 w-5 not-even:invert dark:invert-0 object-cover rounded-none"
											/>
										}
									>
										{element.titre}
									</MultiSelectItem>
								))}

							</MultiSelectGroup>
						</MultiSelectContent>

					</MultiSelect>
				</div>
			))}
			<Button
				onClick={() => {
					router.replace(pathname)
				}}
				className="flex rounded-full h-7 w-7 bg-tertiary place-self-center"
			>
				<X className="h-4 w-4" color="black" />
			</Button>
			</div>
		</>

	)
}

const slugify = (str) =>
	str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")

export default OtherAchievementsFilter

function SearchIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="20" height="20"
			viewBox="0 0 20 20"
			fill="none">
			<path d="M2.70872 19.728L6.60287 15.8332C6.77863 15.6574 6.87628 15.4191 6.87628 15.1691L6.87628 14.5323C8.25505 15.6105 9.98926 16.2512 11.8758 16.2512C16.3636 16.2512 20 12.6142 20 8.12559C20 3.63698 16.3636 -1.5895e-07 11.8758 -3.5512e-07C7.38795 -5.5129e-07 3.75159 3.63698 3.75159 8.12559C3.75159 10.0125 4.39215 11.747 5.47017 13.126L4.83351 13.126C4.58354 13.126 4.34528 13.2236 4.16952 13.3994L0.275363 17.2942C-0.0917881 17.6614 -0.0917881 18.2552 0.275363 18.6185L1.38072 19.7241C1.74787 20.0913 2.34157 20.0913 2.70872 19.728ZM6.87628 8.12559C6.87628 5.36367 9.11044 3.12523 11.8758 3.12523C14.6372 3.12523 16.8753 5.35977 16.8753 8.12559C16.8753 10.8875 14.6411 13.126 11.8758 13.126C9.11434 13.126 6.87628 10.8914 6.87628 8.12559Z" fill="#333333" />
		</svg>
	)
}