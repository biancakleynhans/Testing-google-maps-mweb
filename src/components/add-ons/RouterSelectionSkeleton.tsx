export default function RouterSelectionSkeleton() {
    return (
        <div className='animate-pulse flex flex-col items-center pt-8 pb-10 '>
            <p className='w-8/12 md:w-4/12 h-4 bg-gray-100  border'></p>

            {/** DESKTOP SKELETON */}
            <section className='hidden md:w-8/12 md:grid md: grid-cols-2 md: gap-10 md:pt-8'>
                <div className='col-span-1 h-96 bg-gray-50 border'></div>

                <div className='col-span-1 '>
                    <section className='pt-8'>
                        <p className='h-4 w-7/12 bg-gray-100' />

                        <p className='pt-4' />

                        <div className='flex flex-col gap-1'>
                            <p className='h-2 w-8/12 bg-gray-100'></p>
                            <p className='h-2 w-11/12 bg-gray-100'></p>
                            <p className='h-2 w-full bg-gray-100'></p>
                        </div>

                        <p className='pt-10' />

                        <div className='flex flex-col gap-1'>
                            <p className='h-2 w-8/12 bg-gray-100'></p>
                            <p className='h-2 w-11/12 bg-gray-100'></p>
                            <p className='h-2 w-full bg-gray-100'></p>
                        </div>
                        <div className='flex flex-col gap-1 pt-2'>
                            <p className='h-2 w-8/12 bg-gray-100'></p>
                            <p className='h-2 w-11/12 bg-gray-100'></p>
                            <p className='h-2 w-full bg-gray-100'></p>
                        </div>
                    </section>
                </div>
            </section>

            <section className='block w-10/12 pt-6  flex flex-col md:hidden'>
                <div className='w-full h-40 bg-gray-50 border'></div>

                <div className='flex flex-col gap-1 pt-6'>
                    <p className='h-2 w-8/12 bg-gray-100'></p>
                    <p className='h-2 w-11/12 bg-gray-100'></p>
                    <p className='h-2 w-full bg-gray-100'></p>
                </div>
                <div className='flex flex-col gap-1 pt-6'>
                    <p className='h-2 w-8/12 bg-gray-100'></p>
                    <p className='h-2 w-11/12 bg-gray-100'></p>
                    <p className='h-2 w-full bg-gray-100'></p>
                </div>
            </section>
        </div>
    );
}
