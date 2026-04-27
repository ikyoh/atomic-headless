
"use client";
import { gql } from "@apollo/client";
import AchievementsList from "../components/AchievementsList";
import QueryProvider from "../lib/queryProvider";

export default function OtherAchievements() {
	return (
		<QueryProvider>
			<div className="mx-auto max-w-[calc(100vw-100px)] md:max-w-(--wp--style--global--wide-size) relative my-3">
				<AchievementsList />
			</div>
		</QueryProvider>
	);
}

OtherAchievements.fragments = {
	key: `OtherAchievementsBlockFragment`,
	entry: gql`
		fragment OtherAchievementsBlockFragment on OtherAchievements {
			__typename
		}
	`,
};

OtherAchievements.displayName = "OtherAchievements";