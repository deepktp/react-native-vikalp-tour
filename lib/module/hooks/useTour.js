"use strict";

import { useContext } from 'react';
import { TourContext } from "../contexts/TourProvider.js";
export const useTour = () => {
  const value = useContext(TourContext);
  if (value == null) {
    throw new Error('You must wrap your app inside TourProvider');
  }
  return value;
};
//# sourceMappingURL=useTour.js.map