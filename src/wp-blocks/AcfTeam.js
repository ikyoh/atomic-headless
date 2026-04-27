import TeamBlock from "@/components/animate/TeamBlock";
import { gql } from "@apollo/client";
import Image from "next/image";

export default function AcfTeam({blockTeam}) {

	return (
		<div className="mx-auto max-w-screen md:max-w-(--wp--style--global--content-size)">
			<div className="text-xl font-bold mb-5 border-b">
				{blockTeam.title}
			</div>
			<TeamBlock>
				{blockTeam?.persons?.map((person, index) => (
					<div key={"team_" + index} className="flex-none w-36 transition-all duration-500 ease-in-out">
						<Image
							src={person.image.node.mediaItemUrl}
							alt={person.name}
							width={96}
							height={96}
							className="w-24 rounded-full! aspect-square object-cover p-1 border shadow-sm bg-white"
							/>
						<div>
						<div className="text-sm font-bold">{person.name}</div>
						<div className="text-xs">{person.job}</div>
					</div>
				</div>
				))}
			</TeamBlock>
		</div>
	);
}

AcfTeam.fragments = {
	key: `AcfTeamBlockFragment`,
	entry: gql`
		fragment AcfTeamBlockFragment on AcfTeam {
			blockTeam {
					title
					persons {
						name
						job
						image {
							node {
								mediaItemUrl
							}
					}
				}
				}
		}
	`,
};

AcfTeam.displayName = "AcfTeam";

