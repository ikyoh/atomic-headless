import { gql } from "@apollo/client";

export default function AcfYoutube({ blockYoutube }) {

	return (
		<iframe width="100%" height="auto" className="aspect-video" src={blockYoutube.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	);

}

AcfYoutube.fragments = {
	key: `AcfYoutubeBlockFragment`,
	entry: gql`
		fragment AcfYoutubeBlockFragment on AcfYoutube {
			blockYoutube{
				youtube
}
		}
	`,
};

AcfYoutube.displayName = "AcfYoutube";
