"use strict";

import React from 'react';

// tour prop is intentionally permissive — it will be spread onto
// native components. We allow a nullable ref and any additional keys.
import { jsx as _jsx } from "react/jsx-runtime";
export function walkthroughable(WrappedComponent) {
  // The returned component intentionally accepts arbitrary props because
  // tests and consumers may pass test-only props which should be forwarded
  // to the wrapped native component.
  const Component = props => {
    const {
      tour,
      ...rest
    } = props;
    return /*#__PURE__*/_jsx(WrappedComponent, {
      ...tour,
      ...rest
    });
  };
  Component.displayName = 'Walkthroughable';
  return Component;
}
//# sourceMappingURL=walkthroughable.js.map