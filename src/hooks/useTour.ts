import { useContext } from 'react';
import { TourContext, type TourContextType } from '../contexts/TourProvider';

export const useTour = (): TourContextType => {
  const value = useContext(TourContext);
  if (value == null) {
    throw new Error('You must wrap your app inside TourProvider');
  }

  return value;
};
