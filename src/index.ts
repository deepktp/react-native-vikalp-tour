import { StepNumber } from './components/default-ui/StepNumber';
import { Tooltip } from './components/default-ui/Tooltip';
export { walkthroughable } from './hocs/walkthroughable';
export { TourStep } from './components/TourStep';
export { TourProvider } from './contexts/TourProvider';
export { useTour } from './hooks/useTour';
export type { TourOptions as TourProps, TooltipProps } from './types';

export const DefaultUI = {
  StepNumber,
  Tooltip,
};
