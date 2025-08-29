import { type LayoutRectangle } from 'react-native';
import type { TourOptions } from '../types';
export interface TourModalHandle {
    animateMove: (obj: LayoutRectangle) => Promise<void>;
}
export declare const TourModal: import("react").ForwardRefExoticComponent<TourOptions & import("react").RefAttributes<TourModalHandle>>;
//# sourceMappingURL=TourModal.d.ts.map