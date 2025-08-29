import { type Emitter } from 'mitt';
import { type PropsWithChildren } from 'react';
import { type ScrollView } from 'react-native';
import { type TourOptions, type Step } from '../types';
type Events = {
    start: undefined;
    stop: undefined;
    stepChange: Step | undefined;
};
interface TourContextType {
    registerStep: (step: Step) => void;
    unregisterStep: (stepName: string) => void;
    currentStep: Step | undefined;
    start: (fromStep?: string, suppliedScrollView?: ScrollView | null) => Promise<void>;
    stop: () => Promise<void>;
    goToNext: () => Promise<void>;
    goToNth: (n: number) => Promise<void>;
    goToPrev: () => Promise<void>;
    visible: boolean;
    tourEvents: Emitter<Events>;
    isFirstStep: boolean;
    isLastStep: boolean;
    currentStepNumber: number;
    totalStepsNumber: number;
}
export type { TourContextType };
declare const TourContext: import("react").Context<TourContextType | undefined>;
export { TourContext };
export declare const TourProvider: ({ verticalOffset, children, ...rest }: PropsWithChildren<TourOptions>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TourProvider.d.ts.map