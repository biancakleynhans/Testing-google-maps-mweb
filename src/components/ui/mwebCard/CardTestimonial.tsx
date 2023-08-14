import React from "react";

import { iTestimonialProps } from "./CardStyles";
import MwebIconIllustration from "../mwebIcon/MwebIconIllustration";

interface iProps {
  cardDetails: iTestimonialProps;
}

export default function CardTestimonial(props: iProps) {
  const { size, icon, testimonialText, firstName } = props.cardDetails;

  return (
    <div
      className={`pt-12 pb-10 px-10 border-b-[6px] justify-between flex flex-col items-center bg-mwBlueGrey-25 rounded-2xl ${
        size === "small" ? "w-[296px]" : "w-[590px]"
      }`}
    >
      {/* ICON  */}
      <div className="justify-center flex">
        <MwebIconIllustration
          size={size === "small" ? 46 : 56}
          illustrationName={icon}
        />
      </div>
      {/* TEXT  */}
      <div
        className={`pt-4 md:pt-6 w-full text-center text-mwPrimary-600  ${
          size === "small"
            ? "text-mwTextParaLargeSemi"
            : "line-clamp-5 text-mwTextParaXLargeSemi"
        }`}
      >
        {testimonialText}
      </div>

      {/* AUTHOR  */}
      <div className="pt-4 md:pt-6 flex justify-center">
        <div
          className={`w-full text-center ${
            size === "small"
              ? "text-mwTextParaSmallSemi"
              : "text-mwTextParaBaseSemi"
          } text-mwPrimary-900 `}
        >
          {firstName}
        </div>
      </div>
    </div>
  );
}
