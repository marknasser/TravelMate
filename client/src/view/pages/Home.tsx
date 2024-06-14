import React, { useEffect, useState } from "react";
import { toursActions } from "../../store/tours/reducer";

import TourCard from "../components/TourCard";
import { BaseTour } from "../../types/general";

import { getAllTours } from "../../store/tours/operations";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  const [tours, setTours] = useState([]);

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  useEffect(() => {
    const call = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/v1/tours");
      const prods = await res.json();
      setTours(prods.data.docs);
      console.log(tours[0]);
    };
    try {
      call();
    } catch (error) {
      console.log("errorr");
    }
  }, []);
  return (
    <div className="flex  justify-center items-stretch flex-wrap gap-20 p-20">
      {tours.length > 0 &&
        tours.map((tour: BaseTour) => <TourCard key={tour._id} data={tour} />)}
    </div>
  );
}

export default Home;
