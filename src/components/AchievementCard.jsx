import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import Image from "next/image";
import AchievementTags from "./AchievementTags";


function parseSlug(slug) {
    const parts = slug.split('_');
    if (parts.length < 2) throw new Error("Slug invalide");

    const [product, ...rest] = parts;
    const title = rest.pop().replace(/-/g, ' ');

    return {
        product,
        tags: rest.map(tag => tag.toUpperCase()),
        title
    };
}



export default function AchievementCard({ achievement }) {

    const parsedSlug = parseSlug(achievement.slug);

    return (

        <Dialog>
            <DialogTrigger className="aspect-square overflow-hidden p-0 relative shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 border-0 group rounded-(--wp--preset--border-radius--large) cursor-zoom-in">
                <Image
                    src={achievement.source_url}
                    alt={achievement.title.rendered}
                    width={300}
                    height={300}
                    quality={50}
                    loading="lazy"
                    className="object-cover w-full h-full rounded-none"
                />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 bg-primary text-white text-sm p-2 text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {achievement.alt_text || parsedSlug.title}
                </div>

            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden h-auto sm:max-w-4xl">
                <div className="gap-0">
                    <div className="relative">
                        <Image
                            src={achievement.source_url}
                            alt={achievement.title.rendered}
                            width={300}
                            height={300}
                            quality={50}
                            loading="lazy"
                            className="aspect-3/4 md:aspect-4/3 object-cover w-full h-full"
                        />
                        <AchievementTags className="absolute bottom-0 left-0 right-0" product={parsedSlug.product} tags={parsedSlug.tags} />
                    </div>
                    <DialogTitle className="bg-primary rounded-none! text-white! text-lg! p-3 uppercase font-bold! text-center">{achievement.alt_text || parsedSlug.title}</DialogTitle>
                </div>
            </DialogContent>
        </Dialog>

    );
}


