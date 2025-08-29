"use strict";

import mitt from 'mitt';
import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import { findNodeHandle } from 'react-native';
import { TourModal } from "../components/TourModal.js";
import { OFFSET_WIDTH } from "../components/style.js";
import { useStateWithAwait } from "../hooks/useStateWithAwait.js";
import { useStepsMap } from "../hooks/useStepsMap.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/*
This is the maximum wait time for the steps to be registered before starting the tutorial
At 60fps means 2 seconds
*/
const MAX_START_TRIES = 120;
const TourContext = /*#__PURE__*/createContext(undefined);
export { TourContext };
export const TourProvider = ({
  verticalOffset = 0,
  children,
  ...rest
}) => {
  const startTries = useRef(0);
  const tourEvents = useRef(mitt()).current;
  const modal = useRef(null);
  const [visible, setVisibility] = useStateWithAwait(false);
  const [scrollView, setScrollView] = useState(null);
  const {
    currentStep,
    currentStepNumber,
    totalStepsNumber,
    getFirstStep,
    getPrevStep,
    getNextStep,
    getNthStep,
    isFirstStep,
    isLastStep,
    setCurrentStepState,
    steps,
    registerStep,
    unregisterStep
  } = useStepsMap();
  const moveModalToStep = useCallback(async step => {
    const size = await step?.measure();
    if (!size) {
      return;
    }
    await modal.current?.animateMove({
      width: size.width + OFFSET_WIDTH,
      height: size.height + OFFSET_WIDTH,
      x: size.x - OFFSET_WIDTH / 2,
      y: size.y - OFFSET_WIDTH / 2 + verticalOffset
    });
  }, [verticalOffset]);
  const setCurrentStep = useCallback(async (step, move = true) => {
    setCurrentStepState(step);
    tourEvents.emit('stepChange', step);
    if (scrollView != null) {
      const nodeHandle = findNodeHandle(scrollView);
      if (nodeHandle) {
        step?.wrapperRef.current?.measureLayout(nodeHandle, (_x, y, _w, h) => {
          const yOffset = y > 0 ? y - h / 2 : 0;
          scrollView.scrollTo({
            y: yOffset,
            animated: false
          });
        });
      }
    }
    setTimeout(() => {
      if (move && step) {
        moveModalToStep(step).catch(() => {});
      }
    }, scrollView != null ? 100 : 0);
  }, [tourEvents, moveModalToStep, scrollView, setCurrentStepState]);
  const start = useCallback(async (fromStep, suppliedScrollView = null) => {
    if (scrollView == null) {
      setScrollView(suppliedScrollView);
    }
    const stepToStart = fromStep ? steps[fromStep] : getFirstStep();
    if (startTries.current > MAX_START_TRIES) {
      startTries.current = 0;
      return;
    }
    if (stepToStart == null) {
      startTries.current += 1;
      requestAnimationFrame(() => {
        start(fromStep).catch(() => {});
      });
    } else {
      tourEvents.emit('start');
      await setCurrentStep(stepToStart);
      await moveModalToStep(stepToStart);
      await setVisibility(true);
      startTries.current = 0;
    }
  }, [tourEvents, getFirstStep, moveModalToStep, scrollView, setCurrentStep, setVisibility, steps]);
  const stop = useCallback(async () => {
    await setVisibility(false);
    tourEvents.emit('stop');
  }, [tourEvents, setVisibility]);
  const next = useCallback(async () => {
    await setCurrentStep(getNextStep());
  }, [getNextStep, setCurrentStep]);
  const nth = useCallback(async n => {
    await setCurrentStep(getNthStep(n));
  }, [getNthStep, setCurrentStep]);
  const prev = useCallback(async () => {
    await setCurrentStep(getPrevStep());
  }, [getPrevStep, setCurrentStep]);
  const value = useMemo(() => ({
    registerStep,
    unregisterStep,
    currentStep,
    start,
    stop,
    visible,
    tourEvents,
    goToNext: next,
    goToNth: nth,
    goToPrev: prev,
    isFirstStep,
    isLastStep,
    currentStepNumber,
    totalStepsNumber
  }), [registerStep, unregisterStep, currentStep, start, stop, visible, tourEvents, next, nth, prev, isFirstStep, isLastStep, currentStepNumber, totalStepsNumber]);
  return /*#__PURE__*/_jsx(TourContext.Provider, {
    value: value,
    children: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TourModal, {
        ref: modal,
        ...rest
      }), children]
    })
  });
};
//# sourceMappingURL=TourProvider.js.map