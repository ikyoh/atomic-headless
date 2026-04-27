import { getGraphqlEndpoint, getWordPressProps, WordPressTemplate } from "@faustwp/core";

import "../../faust.config.js";

const ALL_CONTENT_NODES_QUERY = `
  query AllContentNodes($first: Int!, $after: String) {
    contentNodes(where: { status: PUBLISH }, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        uri
      }
    }
  }
`;

async function fetchAllContentNodeUris() {
  const endpoint = getGraphqlEndpoint();
  const allUris = new Set();
  let hasNextPage = true;
  let after = null;

  while (hasNextPage) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALL_CONTENT_NODES_QUERY,
        variables: {
          first: 100,
          after,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`WPGraphQL request failed: ${response.status}`);
    }

    const payload = await response.json();
    if (payload.errors?.length) {
      const message = payload.errors.map((error) => error.message).join("; ");
      throw new Error(`WPGraphQL errors: ${message}`);
    }

    const connection = payload.data?.contentNodes;
    const nodes = connection?.nodes ?? [];
    nodes.forEach((node) => {
      if (node?.uri) {
        allUris.add(node.uri);
      }
    });

    hasNextPage = Boolean(connection?.pageInfo?.hasNextPage);
    after = connection?.pageInfo?.endCursor ?? null;
  }

  return Array.from(allUris);
}



export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx, revalidate: false });
}

export async function getStaticPaths() {
  const uris = await fetchAllContentNodeUris();
  const paths = uris
    .map((uri) => uri?.trim())
    .filter((uri) => uri && uri !== "/")
    .map((uri) => ({
      params: {
        wordpressNode: uri.replace(/^\/+|\/+$/g, "").split("/"),
      },
    }));

  return {
    paths,
    fallback: false,
  };
}


