import Image from 'next/image';
import skeletonImage from '../../../public/image-skeleton.svg';
import styles from './ImageSkeletonLoader.module.css';

const ImageSkeletonLoader = () => {
    return (
        <div className="relative flex flex-col">
            <div className="w-full h-full flex flex-col justify-between items-center">
                <div
                    className={`${styles.blockHeading} ${styles.pulsate}`}
                ></div>
                <div className="w-full h-full flex flex-col xl:flex-row justify-between items-center">
                    <div className="w-full xl:w-6/12 relative py-28 my-10 xl:py-48 xl:m-0">
                        <div className="absolute top-0 w-full h-full">
                            <Image
                                fill={true}
                                src={skeletonImage}
                                alt=""
                                quality={100}
                                className={``}
                            />
                        </div>
                    </div>
                    <div className="w-full xl:w-6/12 h-full flex flex-col py-2 px-10">
                        <div className="w-full flex justify-between items-center mb-8">
                            <div
                                className={`${styles.circle} ${styles.pulsate} mr-5`}
                            ></div>
                            <div
                                className={`${styles.block} ${styles.pulsate}`}
                            ></div>
                        </div>
                        <div className="w-full flex justify-between items-center mb-8">
                            <div
                                className={`${styles.circle} ${styles.pulsate} mr-5`}
                            ></div>
                            <div
                                className={`${styles.block} ${styles.pulsate}`}
                            ></div>
                        </div>
                        <div className="w-full flex justify-between items-center mb-8">
                            <div
                                className={`${styles.circle} ${styles.pulsate} mr-5`}
                            ></div>
                            <div
                                className={`${styles.block} ${styles.pulsate}`}
                            ></div>
                        </div>
                        <div className="w-full flex justify-between items-center mb-8">
                            <div
                                className={`${styles.circle} ${styles.pulsate} mr-5`}
                            ></div>
                            <div
                                className={`${styles.block} ${styles.pulsate}`}
                            ></div>
                        </div>
                        <div className="w-full flex justify-between items-center mb-8">
                            <div
                                className={`${styles.circle} ${styles.pulsate} mr-5`}
                            ></div>
                            <div
                                className={`${styles.block} ${styles.pulsate}`}
                            ></div>
                        </div>
                        <div className="w-full flex justify-between items-center mb-8">
                            <div
                                className={`${styles.circle} ${styles.pulsate} mr-5`}
                            ></div>
                            <div
                                className={`${styles.block} ${styles.pulsate}`}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSkeletonLoader;
