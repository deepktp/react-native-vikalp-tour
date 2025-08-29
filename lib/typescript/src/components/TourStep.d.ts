import React from 'react';
interface Props {
    name: string;
    order: number;
    text: React.ReactElement<any> | string;
    children: React.ReactElement<any>;
    active?: boolean;
    version?: string | number;
}
/**
 *
 * @props name: string - Unique id for step
 * @props order: number - Order of step
 * @props text: React.ReactElement<any> | string - String or React element to display in tooltip
 * @props children: React.ReactElement<any> - Child element to wrap with tour
 * @props active?: boolean - If step is active
 * @props version?: string | number - Change this prop to force update the component
 * @returns
 */
export declare const TourStep: ({ name, order, text, children, active, version, }: Props) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export {};
//# sourceMappingURL=TourStep.d.ts.map