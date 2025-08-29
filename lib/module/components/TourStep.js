"use strict";

import React, { useEffect, useMemo, useRef } from 'react';
import { useTour } from "../hooks/useTour.js";
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

export const TourStep = ({
  name,
  order,
  text,
  children,
  active = true,
  version = undefined
}) => {
  const registeredName = useRef(null);
  const {
    registerStep,
    unregisterStep
  } = useTour();
  // ref starts as null until attached to a native element
  const wrapperRef = React.useRef(null);
  const measure = async () => {
    return await new Promise(resolve => {
      const doMeasure = () => {
        // Wait until the wrapper element appears
        if (wrapperRef.current != null && 'measure' in wrapperRef.current) {
          wrapperRef.current.measure((_ox, _oy, width, height, x, y) => {
            resolve({
              x,
              y,
              width,
              height
            });
          });
        } else {
          requestAnimationFrame(doMeasure);
        }
      };
      doMeasure();
    });
  };
  useEffect(() => {
    if (active) {
      if (registeredName.current && registeredName.current !== name) {
        unregisterStep(registeredName.current);
      }
      if (wrapperRef.current) {
        registerStep({
          name,
          text,
          order,
          measure,
          wrapperRef,
          visible: true
        });
        registeredName.current = name;
      }
    }
  }, [name, order, registerStep, unregisterStep, active, version]); //listing for text changes and it is and component then it will cause infinite loop

  useEffect(() => {
    if (active) {
      return () => {
        if (registeredName.current) {
          unregisterStep(registeredName.current);
        }
      };
    }
    return () => {};
  }, [name, unregisterStep, active]);
  const tourProps = useMemo(() => ({
    ref: wrapperRef,
    onLayout: () => {} // Android hack
  }), []);
  return /*#__PURE__*/React.cloneElement(children, {
    tour: tourProps
  });
};
//# sourceMappingURL=TourStep.js.map