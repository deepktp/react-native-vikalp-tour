import { type FunctionComponent, type ComponentType } from 'react';
import { TourProvider } from '../contexts/TourProvider';
import { useTour } from '../hooks/useTour';
import { type TourOptions } from '../types';

const ComponentWithTourContext = (WrappedComponent: ComponentType) => {
  const Component: FunctionComponent<any> = (props) => {
    const tour = useTour();
    return <WrappedComponent {...props} {...tour} />;
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
