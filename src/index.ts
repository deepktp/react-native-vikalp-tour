import { StepNumber } from "./components/default-ui/StepNumber";
import { Tooltip } from "./components/default-ui/Tooltip";
export { walkthroughable } from "./hocs/walkthroughable";
export { CoachMarkStep } from "./components/CoachMarkStep";
export { CoachMarkProvider, useCoachMark } from "./contexts/CoachMarkProvider";
export type { CoachMarkOptions as CoachMarkProps, TooltipProps } from "./types";

export const DefaultUI = {
  StepNumber,
  Tooltip,
};
