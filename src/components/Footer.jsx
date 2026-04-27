import { gql, useQuery } from "@apollo/client";
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '@faustwp/core';
import blocks from '../wp-blocks';

export default function Footer() {


    const GET_TEMPLATE = gql`
        ${blocks.CoreParagraph.fragments.entry}
        ${blocks.CoreColumns.fragments.entry}
        ${blocks.CoreColumn.fragments.entry}
        ${blocks.CoreButtons.fragments.entry}
        ${blocks.CoreButton.fragments.entry}
        ${blocks.CoreQuote.fragments.entry}
        ${blocks.CoreImage.fragments.entry}
        ${blocks.CoreSeparator.fragments.entry}
        ${blocks.CoreList.fragments.entry}
        ${blocks.CoreHeading.fragments.entry}
        ${blocks.OtherFooterCta.fragments.entry}
        ${blocks.OtherProductsCategoriesCards.fragments.entry}
        ${blocks.AcfCardHeader.fragments.entry}
        ${blocks.AcfCardPicture.fragments.entry}
        ${blocks.AcfItemPicture.fragments.entry}
        ${blocks.AcfTeam.fragments.entry}
        ${blocks.AcfCarouselRoundedCards.fragments.entry}
        ${blocks.AcfCarouselLabelCards.fragments.entry}
        ${blocks.AcfKnowHowCard.fragments.entry}
        ${blocks.AcfLogos.fragments.entry}
        ${blocks.AcfTimeline.fragments.entry}
        ${blocks.AcfAccordionPicture.fragments.entry}
        ${blocks.CoreGroup.fragments.entry}
        query templatePart($id: ID!, $type: TemplatePartIdType!) {
            templatePart(id: $id, idType: $type) {
                ... on TemplatePart {
                    date
                    slug
                    content
                    blocks
                    editorBlocks {
                        apiVersion
                        blockEditorCategoryName
                        clientId
                        name
                        parentClientId
                        renderedHtml
                        type
                        innerBlocks {
                            apiVersion
                            blockEditorCategoryName
                            clientId
                            name
                            parentClientId
                            renderedHtml
                            type
                        }
                        ...${blocks.CoreParagraph.fragments.key}
                        ...${blocks.CoreColumns.fragments.key}
                        ...${blocks.CoreColumn.fragments.key}
                        ...${blocks.CoreButtons.fragments.key}
                        ...${blocks.CoreButton.fragments.key}
                        ...${blocks.CoreQuote.fragments.key}
                        ...${blocks.CoreImage.fragments.key}
                        ...${blocks.CoreSeparator.fragments.key}
                        ...${blocks.CoreList.fragments.key}
                        ...${blocks.CoreHeading.fragments.key}
                        ...${blocks.OtherFooterCta.fragments.key}
                        ...${blocks.OtherProductsCategoriesCards.fragments.key}
                        ...${blocks.AcfCardPicture.fragments.key}
                        ...${blocks.AcfCardHeader.fragments.key}
                        ...${blocks.AcfItemPicture.fragments.key}
                        ...${blocks.AcfTeam.fragments.key}
                        ...${blocks.AcfCarouselRoundedCards.fragments.key}
                        ...${blocks.AcfCarouselLabelCards.fragments.key}
                        ...${blocks.AcfKnowHowCard.fragments.key}
                        ...${blocks.AcfLogos.fragments.key}
                        ...${blocks.AcfAccordionPicture.fragments.key}
                        ...${blocks.AcfTimeline.fragments.key}
                        ...${blocks.CoreGroup.fragments.key}
                    }
                }
            }
        }
    `;

    const { data, loading, error } = useQuery(GET_TEMPLATE, {
        variables: { id: "footer", type: "SLUG" },
        fetchPolicy: "network-only",
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    const blockList = flatListToHierarchical(data?.templatePart?.editorBlocks, {
        childrenKey: 'innerBlocks',
        idKey: 'clientId',
        parentKey: 'parentClientId',
    });

    return (
        <footer className="*:max-w-full! *:w-full! overflow-hidden">



            <WordPressBlocksViewer blocks={blockList} />
        </footer>
    );
}
