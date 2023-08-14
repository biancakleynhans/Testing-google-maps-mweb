import TextField from '@mui/material/TextField';

export default function RegisterPanel({ handleOnClick }: { handleOnClick: () => void }) {
    return (
        <div className='flex flex-col gap-6'>
            <section className='bg-mwPrimary-50 rounded-lg px-4 py-3 flex items-center gap-2.5 md:p-4'>
                <p className='text-mwTextParaSmall text-left lg:text-mwTextParaBase text-mwGrey-600'>
                    Don&apos;t have an account?
                </p>
                <button className='underline' onClick={handleOnClick}>
                    <p className='text-mwButtonTextSmall lg:text-mwButtonTextMedium font-semibold text-left text-mwPrimary-900'>
                        Register
                    </p>
                </button>
            </section>

            <section className='bg-white p-2 md:p-6 flex flex-col gap-4'>
                <p className='text-black text-xl font-semibold'>Login panel</p>
                <p className='text-black text-base'>
                    Log in using your Mweb username or email address and password.
                </p>
                <div className='flex flex-col gap-6'>
                    <section className='flex flex-col gap-4'>
                        <TextField id='username' label='Username' variant='outlined' />
                        <TextField id='password' label='Password' variant='outlined' />
                    </section>
                    <p className='text-black font-semibold underline text-base'>
                        Forgot Password
                    </p>
                </div>
            </section>
        </div>
    );
}
