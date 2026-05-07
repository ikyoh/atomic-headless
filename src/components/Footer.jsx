import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '@faustwp/core';

export default function Footer({ editorBlocks }) {
    if (!editorBlocks?.length) return null;

    const blockList = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });

    return (
        <footer className="*:max-w-full! *:w-full! overflow-hidden">
            <WordPressBlocksViewer blocks={blockList} />
        </footer>
    );
}
