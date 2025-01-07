import { ViewStyle, Animated, NativeMethods, LayoutRectangle, ScrollView } from 'react-native';
import * as React$1 from 'react';
import React__default, { PropsWithChildren } from 'react';
import { Emitter } from 'mitt';

interface Step {
    name: string;
    order: number;
    visible: boolean;
    wrapperRef: React.RefObject<NativeMethods>;
    measure: () => Promise<LayoutRectangle>;
    text: React.ReactElement<any> | string;
}
interface ValueXY {
    x: number;
    y: number;
}
type SvgMaskPathFunction = (args: {
    size: Animated.ValueXY;
    position: Animated.ValueXY;
    canvasSize: ValueXY;
    step: Step;
}) => string;
type Labels = Partial<Record<"skip" | "previous" | "next" | "finish", string>>;
interface TooltipProps {
    labels: Labels;
}
interface CoachMarkOptions {
    easing?: ((value: number) => number) | undefined;
    overlay?: "svg" | "view";
    animationDuration?: number;
    tooltipComponent?: React.ComponentType<TooltipProps>;
    tooltipStyle?: ViewStyle;
    stepNumberComponent?: React.ComponentType<any>;
    animated?: boolean;
    labels?: Labels;
    androidStatusBarVisible?: boolean;
    svgMaskPath?: SvgMaskPathFunction;
    verticalOffset?: number;
    arrowColor?: string;
    arrowSize?: number;
    margin?: number;
    stopOnOutsideClick?: boolean;
    backdropColor?: string;
}

declare function walkthroughable<P = any>(WrappedComponent: React__default.ComponentType<P>): React__default.FunctionComponent<P>;

interface Props {
    name: string;
    order: number;
    text: React__default.ReactElement<any> | string;
    children: React__default.ReactElement<any>;
    active?: boolean;
    verison?: string | number;
}
/**
 *
 * @props name: string - Unique id for step
 * @props order: number - Order of step
 * @props text: React.ReactElement<any> | string - String or React element to display in tooltip
 * @props children: React.ReactElement<any> - Child element to wrap with copilot
 * @props active?: boolean - If step is active
 * @props verison?: string | number - Change this prop to force update the component
 * @returns
 */
declare const CoachMarkStep: ({ name, order, text, children, active, verison }: Props) => React__default.ReactElement<any, string | React__default.JSXElementConstructor<any>>;

type Events = {
    start: undefined;
    stop: undefined;
    stepChange: Step | undefined;
};
interface CoachMarkContextType {
    registerStep: (step: Step) => void;
    unregisterStep: (stepName: string) => void;
    currentStep: Step | undefined;
    start: (fromStep?: string, suppliedScrollView?: ScrollView | null) => Promise<void>;
    stop: () => Promise<void>;
    goToNext: () => Promise<void>;
    goToNth: (n: number) => Promise<void>;
    goToPrev: () => Promise<void>;
    visible: boolean;
    coachMarkEvents: Emitter<Events>;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentStepNumber: number;
    totalStepsNumber: number;
}
declare const CoachMarkProvider: ({ verticalOffset, children, ...rest }: PropsWithChildren<CoachMarkOptions>) => React__default.JSX.Element;
declare const useCoachMark: () => CoachMarkContextType;

declare const DefaultUI: {
    StepNumber: React$1.FunctionComponent<unknown>;
    Tooltip: ({ labels }: TooltipProps) => React$1.JSX.Element;
};

export { type CoachMarkOptions as CoachMarkProps, CoachMarkProvider, CoachMarkStep, DefaultUI, type TooltipProps, useCoachMark, walkthroughable };
