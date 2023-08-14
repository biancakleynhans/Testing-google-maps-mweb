'use client';
import MwebIconIllustration from '../ui/mwebIcon/MwebIconIllustration';

export default function Deals() {
    return (
        <div className='flex flex-col gap-y-10'>
            <h3 className='text-center text-mwTextDeskH2Bold'>Deals Headline Placeholder</h3>

            <ul className='grid grid-cols-3 gap-6'>
                {[
                    {
                        illustrationType: 'lte',
                        providerName: 'LTE',
                        price: 'R134pm',
                        description: 'Connect your home in 1, 2, 3 with plug and play LTE',
                    },
                    {
                        illustrationType: 'fibre',
                        providerName: 'Fibre',
                        price: 'R199pm',
                        description: 'No buffering, just lots of bingeing with Fibre',
                    },
                    {
                        illustrationType: '5g',
                        providerName: '5G',
                        price: 'R249pm',
                        description: 'Say goodbye to waiting and hello to real-time 5G',
                    },
                ].map((item) => (
                    <li
                        key={item.illustrationType}
                        className='p-6 bg-mwBlueGrey-25 rounded-xl shadow-md flex flex-col items-center gap-4'
                    >
                        <MwebIconIllustration illustrationName={item.illustrationType} size={112} />

                        <div className='flex flex-col justify-between gap-0 text-center h-full'>
                            <h3 className='text-mwPrimary-900 desktop:text-mwTextParaBaseSemi'>{item.providerName}</h3>
                            <div className='px-4'>
                                <p className='desktop:text-mwTextDeskH5 text-[#101828]'>{item.description}</p>
                            </div>
                            <p className='text-mwTextParaBase'>
                                Starting from <span className='text-mwTextParaBaseSemi'>{item.price}</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
