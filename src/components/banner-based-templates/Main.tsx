'use client';
import TemplateOneBanner from './TemplateOneBanner';
import TemplateTwoBanner from './TemplateTwoBanner';

import type { ITemplateBanner } from '@/models/TemplateBasedBanner';

export default function BannerBasedTemplate({
    templateOne,
    templateTwo,
}: {
    templateOne?: ITemplateBanner[];
    templateTwo?: ITemplateBanner;
}) {
    return (
        <div className=''>
            {templateOne && <TemplateOneBanner banners={templateOne}></TemplateOneBanner>}

            {templateTwo && <TemplateTwoBanner banner={templateTwo}></TemplateTwoBanner>}
        </div>
    );
}
