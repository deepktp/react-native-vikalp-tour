import React, { type FunctionComponent } from 'react';

// tour prop is intentionally permissive — it will be spread onto
// native components. We allow a nullable ref and any additional keys.
interface TourType {
  ref?: React.RefObject<any> | null;
  onLayout?: () => void;
  [key: string]: any;
}

export function walkthroughable<P = any>(
  WrappedComponent: React.ComponentType<P>
) {
  // The returned component intentionally accepts arbitrary props because
  // tests and consumers may pass test-only props which should be forwarded
  // to the wrapped native component.
  const Component: FunctionComponent<any> = (props: any) => {
    const { tour, ...rest } = props as { tour?: TourType } & P;
    return <WrappedComponent {...(tour as any)} {...(rest as any)} />;
  };

  Component.displayName = 'Walkthroughable';

  return Component;
}
