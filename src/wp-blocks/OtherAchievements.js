
"use client";
import { gql } from "@apollo/client";
import AchievementsList from "../components/AchievementsList";
import QueryProvider from "../lib/queryProvider";

export default function OtherAchievements() {
	return (
		<QueryProvider>
				<AchievementsList />
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