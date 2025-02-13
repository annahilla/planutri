import { JSX } from "react";
import {
  PiBowlFoodThin,
  PiBowlSteamThin,
  PiCoffeeThin,
  PiOrangeThin,
} from "react-icons/pi";

export const mealIcons: { [key: string]: JSX.Element } = {
  Breakfast: <PiCoffeeThin />,
  Lunch: <PiBowlFoodThin />,
  Snack: <PiOrangeThin />,
  Dinner: <PiBowlSteamThin />,
};
