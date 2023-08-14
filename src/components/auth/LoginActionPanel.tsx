export default function LoginActionPanel({
    handleOnClick,
}: {
    handleOnClick: () => void;
}) {
    return (
        <section
            className='bg-mwPrimary-50 rounded-lg px-4 py-3 flex items-center justify-between gap-2.5 lg:p-4'
            data-testid='location_popup_panel'
        >
            <p className='text-mwTextParaSmall text-left lg:text-mwTextParaBase text-mwGrey-600'>Already have an account?</p>
            <button onClick={handleOnClick}>
                <p className='text-mwButtonTextSmall lg:text-mwButtonTextMedium font-semibold text-left text-mwPrimary-900'>Log In</p>
            </button>
        </section>
    );
}
