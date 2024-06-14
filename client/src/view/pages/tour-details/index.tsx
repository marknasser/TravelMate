import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsHeader from "./DetailsHeader";

import DetailStats from "./deails-stats/DetailStats";
import DetailsGallery from "./DetailsGallery";
import DetailsReviews from "./DetailsReviews";

import { Tour } from "../../../types/general";
import NotFound from "../NotFound";

function TourDetails() {
  let { id } = useParams();
  const [tour, setTour] = useState<Tour>(null);

  useEffect(() => {
    const call = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/tours/${id}`);
      const tour = await res.json();
      setTour(tour.data);
      console.log(tour);
    };
    try {
      call();
    } catch (error) {
      console.log("errorr");
    }
  }, []);

  if (!tour) {
    return <NotFound />;
  }

  return (
    <>
      <DetailsHeader
        imageCover={tour.imageCover}
        name={tour.name}
        startLocationDescription={tour?.startLocation?.description}
        duration={tour.duration}
      />
      <DetailStats
        description={tour.description}
        name={tour.name}
        guids={tour.guides}
        difficulty={tour.difficulty}
        maxGroupSize={tour.maxGroupSize}
        ratingsAverage={tour.ratingsAverage}
        startDates={tour.startDates}
      />

      <DetailsGallery gallery={tour.images} />
      <DetailsReviews reviews={tour.reviews} />
    </>
  );
}

export default TourDetails;
