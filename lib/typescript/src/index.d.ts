export { walkthroughable } from './hocs/walkthroughable';
export { TourStep } from './components/TourStep';
export { TourProvider } from './contexts/TourProvider';
export { useTour } from './hooks/useTour';
export type { TourOptions as TourProps, TooltipProps } from './types';
export declare const DefaultUI: {
    StepNumber: import("react").FunctionComponent<import("./types").StepNumberProps>;
    Tooltip: ({ labels, goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep, }: import("./types").TooltipProps) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=index.d.ts.map