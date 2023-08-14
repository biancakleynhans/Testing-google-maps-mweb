export default function Jumpotron({ heading }: { heading: string }) {
    return (
        <div className='py-8 px-4 md:px-0  bg-mwgray-100 md:bg-inherit md:pt-[64px] md:pb-10'>
            <h3
                className='text-mwGrey-900 text-mwTextMobileH2Bold text-center md:text-mwTextDeskH2Bold'
                data-testid='checkout_jumpotron'
            >
                {heading}
            </h3>
        </div>
    );
}
