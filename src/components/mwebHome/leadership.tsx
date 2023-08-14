'use client';
import react, { useState, useEffect } from 'react';
import { IAboutUs } from '@/services/aboutUsService';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { IStaffProfile } from '@/services/staffProfileService';
import { Transition } from '@headlessui/react';
import Image from 'next/image';

export interface ILeadership {
    name: string;
    position: string;
    image: string;
}

interface ILeaderTeamData {
    aboutUsData?: IAboutUs | undefined;
    profileData?: IStaffProfile[] | undefined;
}

export default function LeadrshipTeam({ aboutUsData, profileData }: ILeaderTeamData) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<IStaffProfile>();

    const handleOpenModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, staff: IStaffProfile) => {
        setSelectedStaff(staff);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const NextArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div className={`block ${className}`} onClick={onClick}>
                <img src='/next-public/images/about_us/arrow-right.png' />
            </div>
        );
    };

    const PrevArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div className={`block ${className}`} onClick={onClick}>
                <img src='/next-public/images/about_us/arrow-left.png' />
            </div>
        );
    };

    const slideSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        nextArrow: <NextArrow className='slick-next' />,
        prevArrow: <PrevArrow className='slick-prev' />,

        responsive: [
            {
                breakpoint: 1102,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 904,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const mainHeading = aboutUsData?.aboutUsImageSlice?.[2]?.slideReference;

    const image1 = aboutUsData?.aboutUsImageSlice?.[2]?.imageItem1?.[0].path;
    const image2 = aboutUsData?.aboutUsImageSlice?.[2]?.imageItem2?.[0].path;

    return (
        <div className='py-[50px] flex flex-col gap-y-10'>
            <h3 className='text-center text-mwTextDeskH1Bold px-20'>{mainHeading}</h3>

            <div className=''>
                <p className='text-center text-mwTextParaBase'>{aboutUsData?.aboutUsImageSlice?.[2]?.summary}</p>
            </div>

            <Slider
                {...slideSettings}
                className={`flex flex-row w-full self-center items-center  max-w-[260px] md:max-w-[700px] lg:max-w-[1000px] gap-x-4`}
            >
                {profileData?.map((item, index) => {
                    const staffImage = item?.profilePicture?.[0].path;

                    return (
                        //returns 5 images but shows 4 at a time
                        <div key={index} className='col-span-1'>
                            <div className='flex flex-col items-center self-center px-2 w-full'>
                                {/* the team member image/profile picture */}
                                <div
                                    className='relative w-full h-[178px] flex flex-col self-center items-center cursor-pointer'
                                    onClick={(event) => handleOpenModal(event, item)}
                                >
                                    <Image
                                        className='rounded-tl-md rounded-tr-md border border-b-0'
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${staffImage}`}
                                        alt='staff image'
                                        fill={true}
                                        objectFit='cover'
                                    />
                                </div>

                                <div className='bg-mwBlueGrey-25 flex flex-col self-center w-full h-[120px] pt-2 items-center rounded-bl-md rounded-br-md  border border-t-0'>
                                    <div className='text-center text-mwPrimary-900 text-mwTextMobileH6Semi'>{item.title}</div>
                                    <div className='text-center text-mwCaptionSmall p-2'>{item.jobTitle}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>

            {isModalOpen && selectedStaff && (
                <Transition
                    show={isModalOpen}
                    enter='ease-out duration-700'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-700'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    className='fixed inset-0 backdrop-blur-md flex flex-col justify-center items-center'
                >
                    <section className='w-[250px] md:h-[250px] md:w-[700px] flex flex-col md:flex-row bg-white border-[1px] border-[#62636a]  rounded-md shadow-2xl'>
                        <div className='relative'>
                            <img
                                alt=''
                                className='w-[350px] h-[250px] md:rounded-l-md'
                                src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${selectedStaff.profilePicture[0]?.path}`}
                            />

                            <section className='absolute top-2 right-2 md:hidden'>
                                <button
                                    onClick={() => {
                                        handleCloseModal();
                                    }}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                        aria-hidden='true'
                                        className='w-4 h-4'
                                    >
                                        <path
                                            fill-rule='evenodd'
                                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                            clip-rule='evenodd'
                                        ></path>
                                    </svg>
                                </button>
                            </section>
                        </div>

                        <div className='w-full h-[250px] md:h-full overflow-y-auto relative px-2'>
                            <section className='hidden md:block md:absolute md:top-2 md:right-2'>
                                <button
                                    onClick={() => {
                                        handleCloseModal();
                                    }}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                        aria-hidden='true'
                                        className='w-4 h-4'
                                    >
                                        <path
                                            fill-rule='evenodd'
                                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                            clip-rule='evenodd'
                                        ></path>
                                    </svg>
                                </button>
                            </section>

                            <br />

                            <p
                                className='px-2 pt-2 text-gray-700 text-center text-[18px] leading-[22px] font-[900]'
                                style={{ textShadow: '0px 1px 0px gray' }}
                            >
                                {selectedStaff.firstName} <span>{selectedStaff.lastName}</span>
                            </p>
                            <p className='px-2 pt-1 text-center text-[12px] font-[400] leading-[13px] line-clamp-2 '>
                                {selectedStaff.jobTitle}
                            </p>

                            <br />

                            <p className='text-[11px] text-gray-500 px-1 py-2 whitespace-pre-line'>{selectedStaff.biography}</p>
                        </div>
                    </section>
                </Transition>
            )}
        </div>
    );
}
