import parseJSON from "@/lib/parseJSON";
import { cn } from "@/lib/utils";
import { gql } from "@apollo/client";
import { WordPressBlocksViewer, getStyles, useBlocksTheme } from "@faustwp/blocks";

export default function CoreGroup({ attributes, innerBlocks, ...props }) {

	const theme = useBlocksTheme();
	const styles = getStyles(theme, {
		...props,
		attributes: attributes,
	});
	

	const layout = parseJSON(attributes?.layout);
	const style = parseJSON(attributes?.style);

	const mergedStyles = {
		...styles,
		...(style?.spacing?.blockGap && { gap: style.spacing.blockGap })
	};

	return (

		<div
			id={attributes?.anchor || undefined}
			className={cn(
				attributes?.cssClassName,
				attributes?.className,
				layout?.type === "grid" && layout?.columnCount && `grid-cols-${layout.columnCount}!`,
				layout?.type === "flex" && "flex",
				layout?.type === "flex" && layout?.orientation === "vertical" && "flex-col",
				layout?.type === "flex" && layout?.justifyContent && `justify-${layout.justifyContent}`,
				layout?.type === "flex" && layout?.verticalAlignment && `items-${layout.verticalAlignment}`,
				layout?.type === "flex" && layout?.flexWrap === "wrap" && "flex-wrap",
				layout?.type === "flex" && layout?.flexWrap === "nowrap" && "flex-nowrap",
			)}
			style={mergedStyles}
		>
			{Array.isArray(innerBlocks) && (
				<WordPressBlocksViewer blocks={innerBlocks} />
			)}
		</div>
	);
}

CoreGroup.fragments = {
	key: `CustomCoreGroupBlockFragment`,
	entry: gql`
		fragment CustomCoreGroupBlockFragment on CoreGroup {
			attributes {
				cssClassName
				className
				backgroundColor
				textColor
				style
				layout
				anchor
			}
		}
	`,
};

CoreGroup.displayName = "CoreGroup";