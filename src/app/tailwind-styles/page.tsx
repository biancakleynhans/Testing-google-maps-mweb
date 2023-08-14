import MwebSliceContainer from "@/components/shared/MwebSliceContainer";

export default function MwebHome() {
    return (
        <>
            <div className={'flex flex-col w-full h-full justify-center items-center bg-black py-4'}>
                <div className={'text-3xl text-teal-400 font-bold py-6 px-20 uppercase border border-1 border-teal-400 mb-4'}>Mweb New Dawn</div>


                {/* MWEB COLORS */}
                <div className={'text-4xl text-mwGrey-400 font-bold py-5'}>Mweb Colors</div>

                {/* MWEB PRIMARY COLORS */}
                <div className={'text-3xl text-mwPrimary-500 font-bold py-2 px-8 border border-1 border-mwPrimary-500'}>-mwPrimary-</div>

                <div className={'p-6 justify-around'}>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwPrimary-25 text-mwTextDeskH4Semi'}>-mwPrimary-25</div>
                        <div className={'text-mwPrimary-25 text-mwTextDeskH4Semi'}>Hex: #F4F7F9</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwPrimary-50 text-mwTextDeskH4Semi'}>-mwPrimary-50</div>
                        <div className={'text-mwPrimary-50 text-mwTextDeskH4Semi'}>Hex: #E9EFF2</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwPrimary-100 text-mwTextDeskH4Semi'}>-mwPrimary-100</div>
                        <div className={'text-mwPrimary-100 text-mwTextDeskH4Semi'}>Hex: #D3DFE5</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwPrimary-200 text-mwTextDeskH4Semi'}>-mwPrimary-200</div>
                        <div className={'text-mwPrimary-200 text-mwTextDeskH4Semi'}>Hex: #BECED8</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwPrimary-500 text-mwTextDeskH4Semi'}>-mwPrimary-500</div>
                        <div className={'text-mwPrimary-500 text-mwTextDeskH4Semi'}>Hex: #7C9EB2</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwPrimary-800 text-mwTextDeskH4Semi'}>-mwPrimary-800</div>
                        <div className={'text-mwPrimary-800 text-mwTextDeskH4Semi'}>Hex: #3B6D8B</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwPrimary-900 text-mwTextDeskH4Semi'}>-mwPrimary-900</div>
                        <div className={'text-mwPrimary-900 text-mwTextDeskH4Semi'}>Hex: #255D7E</div>
                    </div>
                </div>

                {/* MWEB DESIGN GREY */}
                <div className={'text-3xl text-mwGrey-400 font-bold py-2 px-8 border border-1 border-mwPrimary-500'}>-mwGrey-</div>
                <div className={'p-6 justify-around'}>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwGrey-300 text-mwTextDeskH4Semi'}>-mwGrey-300</div>
                        <div className={'text-mwGrey-300 text-mwTextDeskH4Semi'}>Hex: #D0D5DD</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwGrey-400 text-mwTextDeskH4Semi'}>-mwGrey-400</div>
                        <div className={'text-mwGrey-400 text-mwTextDeskH4Semi'}>Hex: #98A2B3</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwGrey-600 text-mwTextDeskH4Semi'}>-mwGrey-600</div>
                        <div className={'text-mwGrey-600 text-mwTextDeskH4Semi'}>Hex: #475467</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwGrey-900 text-mwTextDeskH4Semi'}>-mwGrey-900</div>
                        <div className={'text-mwGrey-900 text-mwTextDeskH4Semi'}>Hex: #101828</div>
                    </div>
                </div>

                {/* MWEB SECONDARY COLORS */}
                <div className={'text-3xl text-mwPrimary-500 font-bold py-2 px-8 border border-1 border-mwPrimary-500'}>Secondary Colours</div>

                <div className={'p-6 justify-around'}>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwLightTeal-200 text-mwTextDeskH4Semi'}>-mwLightTeal-200</div>
                        <div className={'text-mwLightTeal-200 text-mwTextDeskH4Semi'}>Hex: #C8ECE9</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwLightTeal-500 text-mwTextDeskH4Semi'}>-mwLightTeal-500</div>
                        <div className={'text-mwLightTeal-500 text-mwTextDeskH4Semi'}>Hex: #95D0CF</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwLightTeal-900 text-mwTextDeskH4Semi'}>-mwLightTeal-900</div>
                        <div className={'text-mwLightTeal-900 text-mwTextDeskH4Semi'}>Hex: #4FB1AF</div>
                    </div>
                </div>

                <div className={'p-6 justify-around'}>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwBlueGrey-25 text-mwTextDeskH4Semi'}>-mwBlueGrey-25</div>
                        <div className={'text-mwBlueGrey-25 text-mwTextDeskH4Semi'}>Hex: #F4F5F9</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwBlueGrey-50 text-mwTextDeskH4Semi'}>-mwBlueGrey-50</div>
                        <div className={'text-mwBlueGrey-50 text-mwTextDeskH4Semi'}>Hex: #E8EBF3</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwBlueGrey-100 text-mwTextDeskH4Semi'}>-mwBlueGrey-100</div>
                        <div className={'text-mwBlueGrey-100 text-mwTextDeskH4Semi'}>Hex: #D2D8E7</div>
                    </div>
                </div>


                {/* Mweb Font Sizes */}
                <div className={'text-mwTextMobileH1Bold md:text-mwTextDeskH1Bold text-mwGrey-300 font-bold my-5 py-2 px-8 border border-2 border-mwPrimary-500'}>Mweb Font Sizes</div>
                <div className={'flex flex-col p-6 gap-y-2'}>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextMobileDisplayLg md:text-mwTextDeskDisplayLg text-mwPrimary-500'}>text-mwTextDeskDisplayLg</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextMobileDisplaySm md:text-mwTextDeskDisplaySm text-mwPrimary-200'}>text-mwTextDeskDisplaySm</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextMobileH1Bold md:text-mwTextDeskH1Bold text-mwPrimary-500'}>text-mwTextDeskDisplayH1Bold</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextMobileH2Bold md:text-mwTextDeskH2Bold text-mwPrimary-200'}>text-mwTextDeskDisplayH2Bold</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextMobileH3Bold md:text-mwTextDeskH3Bold text-mwPrimary-500'}>text-mwTextDeskDisplayH3Bold</div>
                        <div className={'text-mwTextMobileH3Semi md:text-mwTextDeskH3Semi text-mwPrimary-500'}>text-mwTextDeskDisplayH3Semi</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextMobileH4Bold md:text-mwTextDeskH4Bold text-mwPrimary-200'}>text-mwTextDeskDisplayH4Bold</div>
                        <div className={'text-mwTextMobileH4Semi md:text-mwTextDeskH4Semi text-mwPrimary-200'}>text-mwTextDeskDisplayH4Semi</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextMobileH5Semi md:text-mwTextDeskH5Semi text-mwPrimary-500'}>text-mwTextDeskH5Semi</div>
                        <div className={'text-mwTextMobileH5 md:text-mwTextDeskH5 text-mwPrimary-500'}>text-mwTextDeskH5</div>
                        <div className={'text-mwTextMobileH5Semi md:text-mwTextDeskH5Semi text-mwPrimary-500 line-through'}>text-mwTextDeskH5Semi</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextMobileH6Semi md:text-mwTextDeskH6Semi text-mwPrimary-200'}>text-mwTextDeskH6Semi</div>
                        <div className={'text-mwTextMobileH6 md:text-mwTextDeskH6 text-mwPrimary-200'}>text-mwTextDeskH6</div>
                        <div className={'text-mwTextMobileH6Semi md:text-mwTextDeskH6Semi text-mwPrimary-200 line-through'}>text-mwTextDeskH6Semi</div>
                    </div>
                </div>

                {/* Mweb Paragraphs */}
                <div className={'flex flex-col p-6 gap-y-2'}>
                    <div className={'flex justify-around gap-10 mb-8'}>
                        <div className={'text-mwTextParaXLargeSemi text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / XLarge Semibold <br />[text-mwTextParaXLargeSemi]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                        <div className={'text-mwTextParaXLarge text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / XLarge Regular <br />[text-mwTextParaXLarge]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                    </div>
                    <div className={'flex justify-around gap-10 mb-8'}>
                        <div className={'text-mwTextParaLargeSemi text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / Large Semibold <br />[text-mwTextParaLargeSemi]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                        <div className={'text-mwTextParaLarge text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / Large Regular <br />[text-mwTextParaLarge]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                    </div>
                    <div className={'flex justify-around gap-10 mb-8'}>
                        <div className={'text-mwTextParaBaseSemi text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / Base Semibold <br />[text-mwTextParaBaseSemi]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                        <div className={'text-mwTextParaBase text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / Base Regular <br />[text-mwTextParaBase]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                    </div>
                    <div className={'flex justify-around gap-10 mb-8'}>
                        <div className={'text-mwTextParaSmallSemi text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / Small Semibold <br />[text-mwTextParaSmallSemi]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                        <div className={'text-mwTextParaSmall text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / Small Regular <br />[text-mwTextParaSmall]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                    </div>
                    <div className={'flex justify-around gap-10 mb-8'}>
                        <div className={'text-mwTextParaXSmallSemi text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / XSmall Semibold <br />[text-mwTextParaXSmallSemi]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                        <div className={'text-mwTextParaXSmall text-mwPrimary-500'}>
                            <p className={'text-mwGrey-400'}>Paragraph / XSmall Regular <br />[text-mwTextParaXSmall]</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                    </div>
                </div>

                {/* Mweb Link Text */}
                <div className={'text-mwTextMobileH3Semi md:text-mwTextDeskH3Semi text-mwGrey-300 my-5 py-2 px-8 border border-2 border-mwPrimary-500'}>Mweb Links</div>
                <div className={'flex flex-col p-6 gap-y-2'}>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextLinkLarge text-mwPrimary-500'}>Link / Large</div>
                        <div className={'text-mwTextLinkLarge text-mwPrimary-500'}>text-mwTextLinkLarge</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextLinkBase text-mwPrimary-200'}>Link / Base</div>
                        <div className={'text-mwTextLinkBase text-mwPrimary-200'}>text-mwTextLinkBase</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextLinkSmall text-mwPrimary-500'}>Link / Small</div>
                        <div className={'text-mwTextLinkSmall text-mwPrimary-500'}>text-mwTextLinkSmall</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwTextLinkXSmall text-mwPrimary-200'}>Link / XSmall</div>
                        <div className={'text-mwTextLinkXSmall text-mwPrimary-200'}>text-mwTextLinkXSmall</div>
                    </div>
                </div>

                {/* Mweb Button Text */}
                <div className={'text-mwTextMobileH3Semi md:text-mwTextDeskH3Semi text-mwGrey-300 my-5 py-2 px-8 border border-2 border-mwPrimary-500'}>Mweb Button Text</div>
                <div className={'flex flex-col p-6 gap-y-2'}>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwButtonTextLarge text-mwPrimary-500'}>Button / Large</div>
                        <div className={'text-mwButtonTextLarge text-mwPrimary-500'}>text-mwButtonTextLarge</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwButtonTextMedium text-mwPrimary-200'}>Button / Medium</div>
                        <div className={'text-mwButtonTextMedium text-mwPrimary-200'}>text-mwButtonTextMedium</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwButtonTextSmall text-mwPrimary-500'}>Button / Small</div>
                        <div className={'text-mwButtonTextSmall text-mwPrimary-500'}>text-mwButtonTextSmall</div>
                    </div>
                </div>

                {/* Mweb Caption Text */}
                <div className={'text-mwTextMobileH3Semi md:text-mwTextDeskH3Semi text-mwGrey-300 my-5 py-2 px-8 border border-2 border-mwPrimary-500'}>Mweb Captions</div>
                <div className={'flex flex-col p-6 gap-y-2'}>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwCaptionLarge text-mwPrimary-500 normal'}>Caption / Large</div>
                        <div className={'text-mwCaptionLarge text-mwPrimary-500 normal'}>text-mwCaptionLarge</div>
                        <div className={'text-mwCaptionLarge text-mwPrimary-500'}>Lorem Ipsum</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwCaptionMedium text-mwPrimary-200 normal'}>Caption / Medium</div>
                        <div className={'text-mwCaptionMedium text-mwPrimary-200 normal'}>text-mwCaptionMedium</div>
                        <div className={'text-mwCaptionMedium text-mwPrimary-200'}>Lorem Ipsum</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwCaptionSmall text-mwPrimary-500 normal'}>Caption / Small</div>
                        <div className={'text-mwCaptionSmall text-mwPrimary-500 normal'}>text-mwCaptionSmall</div>
                        <div className={'text-mwCaptionSmall text-mwPrimary-500'}>Lorem Ipsum</div>
                    </div>
                    <div className={'flex justify-around gap-10'}>
                        <div className={'text-mwCaptionXSmall text-mwPrimary-200 normal'}>Caption / XSmall</div>
                        <div className={'text-mwCaptionXSmall text-mwPrimary-200 normal'}>text-mwCaptionXSmall</div>
                        <div className={'text-mwCaptionXSmall text-mwPrimary-200'}>Lorem Ipsum</div>
                    </div>
                </div>

                {/* MWEB DESIGN GRADIENT */}
                <div className={'text-3xl text-mwGrey-400 font-bold py-2 px-8 border border-1 border-mwPrimary-500 mb-4'}>Teal Gradient</div>

                <div className={'bg-gradient-to-r from-mwTealGradientFromLeft to-mwTealGradientToRight w-[352px] h-[128px] mb-5'}>&nbsp;</div>

                {/* MWEB POC GREY */}
                <div className={'text-3xl text-mwgray-400 font-bold py-2'}>-mwgray- POC<sup className={'text-mwError-500'}>*</sup></div>

                <div className={'p-6 justify-around'}>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwgray-100 text-mwTextDeskH4Semi'}>-mwgray-100</div>
                        <div className={'text-mwgray-100 text-mwTextDeskH4Semi'}>Hex: #F9F9F9</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwgray-200 text-mwTextDeskH4Semi'}>-mwgray-200</div>
                        <div className={'text-mwgray-200 text-mwTextDeskH4Semi'}>Hex: #F2F2F2</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwgray-300 text-mwTextDeskH4Semi'}>-mwgray-300</div>
                        <div className={'text-mwgray-300 text-mwTextDeskH4Semi'}>Hex: #F1F1F2</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwgray-400 text-mwTextDeskH4Semi'}>-mwgray-400</div>
                        <div className={'text-mwgray-400 text-mwTextDeskH4Semi'}>Hex: #BFBFBF</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwgray-700 text-mwTextDeskH4Semi'}>-mwgray-700</div>
                        <div className={'text-mwgray-700 text-mwTextDeskH4Semi'}>Hex: #646464</div>
                    </div>
                    <div className={'flex flex-row gap-10'}>
                        <div className={'text-mwgray-800 text-mwTextDeskH4Semi'}>-mwgray-800</div>
                        <div className={'text-mwgray-800 text-mwTextDeskH4Semi'}>Hex: #252423</div>
                    </div>
                </div>

            </div>

            {/* Test */}

            {/* MwebSliceContainer */}
            {/* Use this to wrap your Page Slice */}
            {/* bgColor :: Use this if your slice requires a background color. Use the appropriate tailwind class */}
            {/* padding :: Use this to set the internal padding (inside the 1366 container) (px, py or both). Use the appropriate tailwind class */}
            <MwebSliceContainer sectionId={'mweb-test-section'} bgColor={'bg-mwgray-400'} padding={'py-8'}>
                <div className={'py-8'}>
                    <h3 className={'text-mw2xl'}>Mweb Slice Container Example</h3>
                    <p className={'text-mwlg text-mwgray-800 text-left'}>|&lt;&lt;== Some copy and stuff over here on the left edge of 1366.</p>
                    <p className={'text-mwlg text-mwgray-800 text-right'}>Some more copy and stuff over here on the right edge of 1366 ==&gt;&gt;|</p>
                </div>
            </MwebSliceContainer>
        </>
    );
}
