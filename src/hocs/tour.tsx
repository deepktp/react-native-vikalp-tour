import { type FunctionComponent, type ComponentType } from 'react';
import { TourProvider, useTour } from '../contexts/TourProvider';
import { type TourOptions } from '../types';

const ComponentWithTourContext = (WrappedComponent: ComponentType) => {
  const Component: FunctionComponent<any> = (props) => {
    const Tour = useTour();
    return <WrappedComponent {...props} {...Tour} />;
  };

  Component.displayName = `TourInjector(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`;

  return Component;
};

/**
 * @deprecated The HOC is deprecated. Please use `TourProvider` instead.
 */
export function Tour<P = any>(options: TourOptions) {
  return (WrappedComponent: ComponentType) => {
    const OuterComponent: FunctionComponent<P> = (props) => {
      const InnerComponentWithTourContext =
        ComponentWithTourContext(WrappedComponent);

      return (
        <TourProvider {...options}>
          <InnerComponentWithTourContext {...props} />
        </TourProvider>
      );
    };

    OuterComponent.displayName = `Tour(${
      WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
    })`;

    return OuterComponent;
  };
}
