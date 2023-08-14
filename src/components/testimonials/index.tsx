"use client";

import MwebCard from "@/components/ui/mwebCard/MwebCard";
import {
  iTestimonialCardProps,
  iTestimonialProps,
} from "@/components/ui/mwebCard/CardStyles";
import MwebButton from "@/components/ui/mwebButtons/MwebButtonMain";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";

interface IProps {
  testimonialsList: iTestimonialProps[];
  heading: string;
}

export default function Testimonials({ testimonialsList, heading }: IProps) {
  const slider = useRef<any>(null);
  const [currslide, setcurrslide] = useState<number>(0);

  const slideSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    className: "center",
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          centerMode: true,
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 904,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "60px",
        },
      },
    ],
  };

  function handleChange(type: "back" | "next") {
    // next button
    if (type === "next") {
      slider?.current?.slickNext();

      if (currslide === testimonialsList.length-1) {
        setcurrslide(0);
      } else {
        setcurrslide(currslide + 1);
      }
    }
    // back button
    else {
      slider?.current?.slickPrev();

      if (currslide === 0) {
        setcurrslide(testimonialsList.length-1);
      } else {
        setcurrslide(currslide - 1);
      }
    }
  }

  return (
    <div className="bg-white py-24 w-full mx-auto">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-center text-mwTextMobileH2Bold desktop:text-mwTextDeskH1Bold">
          {heading}
        </h2>
      </div>
      {/* SLIDER */}
      <Slider ref={slider} {...slideSettings} className="flex items-stretch">
        {testimonialsList.map((item, index) => {
          return (
            <div key={index} className="h-full" style={{ width: "unset" }}>
              <div className="h-[350px] md:flex hidden mx-3">
                <MwebCard
                  onClickCallback={() => {}}
                  type="testimonial"
                  isSelected={false}
                  size="large"
                  cardDetails={
                    {
                      firstName: item.firstName,
                      size: "large",
                      testimonialText: item.testimonialText,
                      icon:item.icon,
                    } as iTestimonialCardProps
                  }
                />
              </div>
              <div key={index} className="h-full flex md:hidden mx-3">
                <MwebCard
                  onClickCallback={() => {}}
                  type="testimonial"
                  isSelected={false}
                  size="small"
                  cardDetails={
                    {
                      firstName: item.firstName,
                      size: "small",
                      testimonialText: item.testimonialText,
                      icon: item.icon,
                    } as iTestimonialCardProps
                  }
                />
              </div>
            </div>
          );
        })}
      </Slider>

      <div className={`${testimonialsList.length<4?"lg:hidden":"desktop:flex"} mt-6 md:mt-10 w-full flex flex-row justify-center items-center gap-4 md:gap-6`}>
        {/* Back */}
        <div>
          <div className="hidden lg:flex">
            <MwebButton
              isFullWidth
              color="primary"
              size="large"
              btnText=""
              hasIcon={true}
              iconProps={{
                variant: "functional",
                color: "",
                icon: "arrow-left",
                size: 20,
                iconPosition: "icon-only",
              }}
              isDisabled={false}
              onClickFunction={() => handleChange("back")}
            />
          </div>
          <div className="lg:hidden flex">
            <MwebButton
              isFullWidth
              color="primary"
              size="medium"
              btnText=""
              iconProps={{
                variant: "functional",
                color: "",
                icon: "arrow-left",
                size: 20,
                iconPosition: "icon-only",
              }}
              isDisabled={false}
              onClickFunction={() => handleChange("back")}
              hasIcon={true}
            />
          </div>
        </div>

        {/* Next  */}
        <div>
          <div className="hidden lg:flex">
            <MwebButton
              isFullWidth
              color="primary"
              size="large"
              btnText={""}
              hasIcon={true}
              iconProps={{
                variant: "functional",
                color: "",
                icon: "arrow-right",
                size: 20,
                iconPosition: "icon-only",
              }}
              isDisabled={false}
              onClickFunction={() => handleChange("next")}
            />
          </div>
          <div className="lg:hidden flex">
            <MwebButton
              isFullWidth
              color="primary"
              size="large"
              btnText={""}
              hasIcon={true}
              iconProps={{
                variant: "functional",
                color: "",
                icon: "arrow-right",
                size: 20,
                iconPosition: "icon-only",
              }}
              isDisabled={false}
              onClickFunction={() => handleChange("next")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
