import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { gql } from "@apollo/client";
import Image from "next/image";

export default function AcfLogos({blockLogos}) {

	return (
        <div className="mx-auto max-w-full! overflow-hidden relative group my-3">
            <div className="relative">
                <InfiniteSlider
                    speed={40}
                    gap={40}
                    reverse={blockLogos.isReverse}>
                    {
                        blockLogos.logos?.nodes?.map((logo, index) => (
							<div
								key={index}
								className="w-25 h-25 bg-white rounded-full overflow-hidden"
							>
                                    <Image
										src={logo.mediaItemUrl}
                                        alt={logo.altText}
                                        className="w-full h-full object-cover"
                                        width={100}
                                        height={100}
                                    />
									</div>
                        ))
                    }

                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-30"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-30"></div>
                <ProgressiveBlur
                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                    direction="left"
                    blurIntensity={0.5}
                />
                <ProgressiveBlur
                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                    direction="right"
                    blurIntensity={0.5}
                />
            </div>
        </div>
	);
}

AcfLogos.fragments = {
	key: `AcfLogosBlockFragment`,
	entry: gql`
		fragment AcfLogosBlockFragment on AcfLogos {
			blockLogos {
				isReverse
				logos {
					nodes {
					mediaItemUrl
					altText
					}
				}
			}
		}
	`,
};

AcfLogos.displayName = "AcfLogos";

