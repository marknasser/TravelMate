import React, { useLayoutEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewTour } from "../../../types/general";

interface DetailsReviewsProps {
  reviews: ReviewTour[];
}

function DetailsReviews({ reviews }: DetailsReviewsProps) {
  console.log(reviews);
  const [numToShow, setNumToShow] = useState(3);
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 700) {
        setSettings({ ...settings, slidesToShow: 1 });
      } else if (window.innerWidth <= 1200)
        setSettings({ ...settings, slidesToShow: 2 });
      else {
        setSettings({ ...settings, slidesToShow: 3 });
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: numToShow,
  //   slidesToScroll: 1,
  // };

  return (
    <div className=" mt-11 gradient-bg-section  h-[400px] flex justify-center items-center">
      <Slider {...settings} className="w-3/4  m-auto">
        {reviews.map((review, index) => (
          <div key={index} className="px-3">
            <div className=" p-11 text-[#777] bg-[#f7f7f7] ">
              <div className="flex justify-center items-center gap-8">
                <figure className=" w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/img/users/${review.user.photo}`}
                    alt=""
                  />
                </figure>
                <h3 className="font-bold">{review.user.name}</h3>
              </div>
              <p className="font-light py-9 px-4 line-clamp-1">
                {review.review}
              </p>
              <div className="flex justify-center items-center">
                {review.rating}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DetailsReviews;
