import { StepNumber } from './components/default-ui/StepNumber';
import { Tooltip } from './components/default-ui/Tooltip';
export { walkthroughable } from './hocs/walkthroughable';
export { TourStep } from './components/TourStep';
export { TourProvider, useTour } from './contexts/TourProvider';
export type { TourOptions as TourProps, TooltipProps } from './types';

export const DefaultUI = {
  StepNumber,
  Tooltip,
};
