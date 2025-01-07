import React, { type FunctionComponent, type ComponentType } from "react";
import { CoachMarkProvider, useCoachMark } from "../contexts/CoachMarkProvider"; 
import { type CoachMarkOptions } from "../types";

const ComponentWithCoachMarkContext = (WrappedComponent: ComponentType) => {
  const Component: FunctionComponent<any> = (props) => {
    const coachMark = useCoachMark();
    return <WrappedComponent {...props} {...coachMark} />;
  };

  Component.displayName = `CoachMarkInjector(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"
  })`;

  return Component;
};

/**
 * @deprecated The HOC is deprecated. Please use `CoachMarkProvider` instead.
 */
export function coachMark<P = any>(options: CoachMarkOptions) {
  return (WrappedComponent: ComponentType) => {
    const OuterComponent: FunctionComponent<P> = (props) => {
      const InnerComponentWithCoachMarkContext =
        ComponentWithCoachMarkContext(WrappedComponent);

      return (
        <CoachMarkProvider {...options}>
          <InnerComponentWithCoachMarkContext {...props} />
        </CoachMarkProvider>
      );
    };

    OuterComponent.displayName = `coachMark(${
      WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"
    })`;

    return OuterComponent;
  };
}
