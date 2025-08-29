"use strict";

import { Text, View } from 'react-native';
import { styles } from "../style.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const StepNumber = ({
  currentStepNumber
}) => {
  return /*#__PURE__*/_jsx(View, {
    style: styles.stepNumber,
    children: /*#__PURE__*/_jsx(Text, {
      style: styles.stepNumberText,
      children: currentStepNumber
    })
  });
};
//# sourceMappingURL=StepNumber.js.map