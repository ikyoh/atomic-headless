import { gql } from "@apollo/client";

export default function CoreCode({ attributes }) {
	return (
		<pre className={attributes?.cssClassName} style={{backgroundColor : 'pink'}}>
            AAAAAAA
			<code>{`${attributes?.content}`}</code>
		</pre>
	);
}

CoreCode.fragments = {
	key: `CustomCoreCodeBlockFragment`,
	entry: gql`
		fragment CustomCoreCodeBlockFragment on CoreCode {
			attributes {
				content
				cssClassName
			}
		}
	`,
};

CoreCode.displayName = "CoreCode";