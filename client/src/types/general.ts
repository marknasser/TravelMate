import { TourDifficulty, UserRoles } from "./enum";

export type Location = {
  coordinates: number[];
  day: number;
  description: string;
  type: string;
  _id: string;
};

// _________TOURS TYPES_________
export type BaseTour = {
  description: string;
  difficulty: TourDifficulty;
  duration: number;
  durationWeeks: number;
  guides: UserTour[];
  id: string;
  imageCover: string;
  images: string[];
  locations: Location[];
  maxGroupSize: number;
  name: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  secretTour: boolean;
  slug: string;
  startDates: string[];
  startLocation: {
    type: string;
    description: string;
    coordinates: number[];
    address: string;
  };
  summary: string;
  _id: string;
};

export type Tour = BaseTour & {
  reviews: ReviewTour[];
};

// _________USERS TYPES_________
export type User = {
  email: string;
  name: string;
  photo: string;
  role: string;
  __v: number;
  _id: string;
};

export type UserView = {
  photo: string;
  _id: string;
  name: string;
};

export type UserTour = {
  email: string;
  name: string;
  photo: string;
  role: UserRoles;
  _id: string;
};

// _________REVIEWS TYPES_________
export type Review = {};

export type ReviewTour = {
  createdAt: string;
  id: string;
  rating: number;
  review: string;
  tour: string;
  user: UserView;
  __v: number;
  _id: string;
};
