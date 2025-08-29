import React, { type FunctionComponent } from 'react';

// copilot prop is intentionally permissive — it will be spread onto
// native components. We allow a nullable ref and any additional keys.
interface CopilotType {
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
    const { copilot, ...rest } = props as { copilot?: CopilotType } & P;
    return <WrappedComponent {...(copilot as any)} {...(rest as any)} />;
  };

  Component.displayName = 'Walkthroughable';

  return Component;
}
