import MwebSliceContainer from '@/components/shared/MwebSliceContainer';

export default function Loading() {
    return (
        <MwebSliceContainer sectionId='page_skeleton' padding='md:my-24 md:px-[182px]'>
            <div className='animate-pulse'>
                <section className='flex justify-center mt-4'>
                    <p className='w-4/12 h-4 bg-gray-200 ring-1 ring-gray-300' />
                </section>

                <br />

                <section className='md:grid md:grid-cols-10 md:gap-4'>
                    <div className='col-span-6 flex flex-col gap-8'>
                        <p className='px-4 py-8 border-[1px] bg-gray-100'></p>

                        <section className='border-[1px] p-4 flex flex-col gap-4'>
                            <p className='w-6/12 h-2 bg-gray-300' />
                            <div className='flex flex-col gap-1'>
                                <p className='w-full h-2 bg-gray-300' />
                                <p className='w-full h-2 bg-gray-300' />
                            </div>

                            <p className='border-[1px] h-5'></p>
                            <p className='border-[1px] h-5'></p>
                            <p className='border-[1px] h-5'></p>
                        </section>

                        <section className='border-[1px] px-4 py-8'>
                            <p className='w-6/12 h-2 bg-gray-300' />
                            <br />
                            <div className='flex flex-col gap-1'>
                                <p className='w-full h-2 bg-gray-300' />
                                <p className='w-full h-2 bg-gray-300' />
                            </div>
                        </section>
                    </div>

                    <div className='col-span-4'>
                        <section className='shadow-md border-[1px] h-[300px]'></section>
                    </div>
                </section>
            </div>
        </MwebSliceContainer>
    );
}
