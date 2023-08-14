"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import MwebIndicator from "../ui/mwebIndicators/MwebIndicator";

import "./Router.css";
import Image from "next/image";

interface iProps {
  images: any[];
  showFree: boolean;
}

export default function RouterImageSlider(props: iProps) {
  const { images, showFree } = props;

  const slider = React.useRef<any>(null);

  const [currslide, setcurrslide] = useState<number>(0);

  const settings = {
    beforeChange: (prev: number, next: number) => {
      setcurrslide(next);
    },

    customPaging: function (index: number) {
      return (
        <div
          className={`${
            index === currslide ? "w-8 bg-opacity-100" : "w-2 bg-opacity-60"
          }  h-2 rounded bg-mwPrimary-900`}
        />
      );
    },

    dots: true,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const outer = "col-span-12 md:col-span-6";
  const container =
    "w-full flex flex-col justify-center items-center content-center bg-mwBlueGrey-25 rounded-lg";

  return (
    <div className={outer}>
      <div className={container}>
        {/* free tag  */}
        {showFree && (
          <div
            className={`pl-6 pt-0 w-full flex flex-row justify-end items-end`}
          >
            <MwebIndicator label={"FREE"} size={"lg"} type="tag" />
          </div>
        )}

        {/* Image slider  */}
        <div className="w-full h-full px-[104px] pt-10 pb-8 desktop:py-12">
          <Slider ref={slider} {...settings}>
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt=""
                className="object-contain object-center h-[271px]"
                width={310} // add width
                height={310} // add height
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
