import Image from 'next/image';
import defaultCardImage from '../../../public/card-image-placeholder.svg';


const Cards = (props: {
    image: string | undefined;    
    title: string;
    altTitle?: string;
}) => {
    const { image, title, altTitle = '' } = props;

    return (
        <div className='w-[156px] lg:w-[232px] flex flex-col items-center gap-4'>
            <section id='card-image' className={`relative h-14 w-14`}>
                <Image
                    alt={altTitle}
                    src={image ? image : defaultCardImage}
                    fill={true}
                    className='object-contain'
                />
            </section>

            <div id='card-title' className='text-center text-mwGrey-900 text-mwTextParaSmallSemi lg:text-mwTextParaLargeSemi'>
                {title}
            </div>
        </div>
    );
};

export default Cards;
