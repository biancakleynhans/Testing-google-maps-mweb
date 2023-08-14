import Cards from './Cards';
import CTAButton from './CTAButton';
import Heading from './Heading';
import styles from './ShowSwitchBlock.module.css';
import MwebButton from '@/components/ui/mwebButtons/MwebButtonMain';

import type { IVasSwitchBlock, IVasSwitchBlockHeading } from '@/models/Switch';

const ShowSwitchBlock = ({ vasFeatureDescription }: { vasFeatureDescription: any[] }) => {
    //
    const headingSection: IVasSwitchBlockHeading | undefined =
        vasFeatureDescription?.find(
            (item: any) =>
                item.__typename === 'vasFeatureDescription_featureGroupHeading_BlockType'
        );
    //
    const cardsData: IVasSwitchBlock[] =
        vasFeatureDescription?.filter(
            (item: any) => item.__typename === 'vasFeatureDescription_features_BlockType'
        ) ?? [];

    return (
        <div className='w-full flex flex-col justify-center items-center py-14 lg:pt-[86px] px-4 lg:pb-[96px]'>
            <Heading title={headingSection?.heading ?? ''} className="pb-8 lg:pb-10"/>

            <div
                className={`${styles.container} grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6`}
            >
                {cardsData?.map((switchItem: IVasSwitchBlock, index: number) => {
                    // get feature Image to display
                    const switchImage = switchItem.featureImage[0];

                    // check if image path from craft exists
                    const imageUrl = switchImage?.path
                        ? process.env.NEXT_PUBLIC_MEDIA_BASE_URL + '/' + switchImage?.path
                        : undefined;

                    return (
                        <Cards
                            key={switchImage?.path + index}
                            image={imageUrl}
                            title={switchItem.featureName}
                        />
                    );
                })}
            </div>

            <CTAButton
                action={null}
                color='primary'
                copyText=''
                ctaBtnText='Switch To Mweb'
            />
        </div>
    );
};

export default ShowSwitchBlock;
