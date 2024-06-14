import { toursActions } from "./reducer";
import axios from "axios";

export function getAllTours() {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/tours");
      dispatch(toursActions.setAllTours(res.data.data.docs));
      return res.data.data.docs;
    } catch (error) {
      //   console.error("Error fetching tours:", error);
      dispatch(toursActions.setError(error.message));
    }
  };
}
