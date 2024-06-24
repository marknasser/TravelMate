import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

interface DetailsGalleryProps {
  gallery: string[];
}

const DetailsGallery: React.FC<DetailsGalleryProps> = ({ gallery }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container w-3/4  m-auto  ">
      <Slider {...settings} className="">
        {gallery.map((img) => (
          <div className="h-[300px]">
            <img
              src={`http://127.0.0.1:8000/img/tours/${img}`}
              alt=""
              className="w-full object-cover h-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DetailsGallery;
