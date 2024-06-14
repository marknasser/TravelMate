import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewTour } from "../../../types/general";

interface DetailsReviewsProps {
  reviews: ReviewTour[];
}

function DetailsReviews({ reviews }: DetailsReviewsProps) {
  console.log(reviews);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container w-3/4  m-auto mt-11">
      <Slider {...settings} className="">
        {reviews.map((review) => (
          <div className="p-11 flex justify-center items-center text-[#777]">
            <div className="flex justify-center items-center gap-8">
              <figure className=" w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/img/users/${review.user.photo}`}
                  alt=""
                />
              </figure>
              <h3 className="font-bold">{review.user.name}</h3>
            </div>
            <div className="font-light">{review.review}</div>
            <div className="flex justify-center items-center">
              {review.rating}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DetailsReviews;
