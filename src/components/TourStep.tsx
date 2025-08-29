import React, { useEffect, useMemo, useRef } from 'react';
import { type NativeMethods } from 'react-native';

import { useTour } from '../contexts/TourProvider';

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

export const TourStep = ({
  name,
  order,
  text,
  children,
  active = true,
  version = undefined,
}: Props) => {
  const registeredName = useRef<string | null>(null);
  const { registerStep, unregisterStep } = useTour();
  // ref starts as null until attached to a native element
  const wrapperRef = React.useRef<NativeMethods | null>(null);

  const measure = async () => {
    return await new Promise<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>((resolve) => {
      const measure = () => {
        // Wait until the wrapper element appears
        if (wrapperRef.current != null && 'measure' in wrapperRef.current) {
          wrapperRef.current.measure((_ox, _oy, width, height, x, y) => {
            resolve({
              x,
              y,
              width,
              height,
            });
          });
        } else {
          requestAnimationFrame(measure);
        }
      };

      measure();
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
          visible: true,
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

  const tourProps = useMemo(
    () => ({
      ref: wrapperRef,
      onLayout: () => {}, // Android hack
    }),
    []
  );

  return React.cloneElement(children, { tour: tourProps });
};
