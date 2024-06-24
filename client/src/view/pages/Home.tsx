import React, { useEffect, useState } from "react";
import { toursActions } from "../../store/tours/reducer";
import Spinner from "../components/Spinner";

import BaseContainer from "../layouts/BaseContainer";

import TourCard from "../components/TourCard";
import { BaseTour } from "../../types/general";

import { getAllTours } from "../../store/tours/operations";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/tours");
        console.log(res);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setTours(data.data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, handle error state or notify the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BaseContainer>
      <div className="flex  justify-center items-stretch flex-wrap gap-20 p-20 bg-[#f5f5f5]">
        {tours.length > 0 && !isLoading ? (
          tours.map((tour: BaseTour) => <TourCard key={tour._id} data={tour} />)
        ) : (
          <Spinner />
        )}
      </div>
    </BaseContainer>
  );
}

export default Home;
