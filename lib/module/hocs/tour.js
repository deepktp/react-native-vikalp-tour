"use strict";

import { TourProvider } from "../contexts/TourProvider.js";
import { useTour } from "../hooks/useTour.js";
import { jsx as _jsx } from "react/jsx-runtime";
const ComponentWithTourContext = WrappedComponent => {
  const Component = props => {
    const tour = useTour();
    return /*#__PURE__*/_jsx(WrappedComponent, {
      ...props,
      ...tour
    });
  };
  Component.displayName = `TourInjector(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
  return Component;
};

/**
 * @deprecated The HOC is deprecated. Please use `TourProvider` instead.
 */
export function Tour(options) {
  return WrappedComponent => {
    const OuterComponent = props => {
      const InnerComponentWithTourContext = ComponentWithTourContext(WrappedComponent);
      return /*#__PURE__*/_jsx(TourProvider, {
        ...options,
        children: /*#__PURE__*/_jsx(InnerComponentWithTourContext, {
          ...props
        })
      });
    };
    OuterComponent.displayName = `Tour(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
    return OuterComponent;
  };
}
//# sourceMappingURL=tour.js.map