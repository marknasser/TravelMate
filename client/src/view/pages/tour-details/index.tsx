import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsHeader from "./DetailsHeader";
import DetailStats from "./deails-stats/DetailStats";
import DetailsGallery from "./DetailsGallery";
import DetailsReviews from "./DetailsReviews";

import { Tour } from "../../../types/general";
import NotFound from "../NotFound";
import BookNow from "./BookNow";
import BaseContainer from "../../layouts/BaseContainer";
import Spinner from "../../components/Spinner";

function TourDetails() {
  let { id } = useParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/tours/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const tour = await res.json();
        setTour(tour.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(tour, isLoading, error);
  return (
    <>
      {!tour && isLoading ? (
        <BaseContainer>
          <Spinner />
        </BaseContainer>
      ) : error && !isLoading && !tour ? (
        <NotFound onClick={() => {}} />
      ) : (
        tour &&
        !isLoading && (
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
              guides={tour.guides}
              difficulty={tour.difficulty}
              maxGroupSize={tour.maxGroupSize}
              ratingsAverage={tour.ratingsAverage}
              startDates={tour.startDates}
            />
            <DetailsGallery gallery={tour.images} />
            <DetailsReviews reviews={tour.reviews} />
            <BookNow gallery={tour.images} />
          </>
        )
      )}
    </>
  );
}

export default TourDetails;
