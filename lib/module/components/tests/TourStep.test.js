"use strict";

import { render, screen, waitFor } from '@testing-library/react-native';
import { TourProvider } from "../../contexts/TourProvider.js";
import { TourStep } from "../TourStep.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
jest.mock('../../hooks/useTour', () => ({
  useTour: jest.fn()
}));
const mockuseTour = jest.requireMock('../../hooks/useTour').useTour;

// 🔹 Helpers
const WrappedComponent = ({
  tour
}) => {
  if (tour?.ref && typeof tour.ref === 'object') {
    tour.ref.current = {
      measure: jest.fn()
    };
  }
  return null;
};
const renderWithProvider = ui => {
  return render(/*#__PURE__*/_jsx(TourProvider, {
    children: ui
  }));
};
describe('TourStep', () => {
  let registerStepSpy;
  let unregisterStepSpy;
  let stopSpy;
  beforeEach(() => {
    mockuseTour.mockClear();
    registerStepSpy = jest.fn();
    unregisterStepSpy = jest.fn();
    stopSpy = jest.fn();
    mockuseTour.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: unregisterStepSpy,
      stop: stopSpy
    });
  });
  test('passes the copilot prop to the child component', () => {
    renderWithProvider(/*#__PURE__*/_jsx(TourStep, {
      name: "Test",
      order: 0,
      text: "Hello",
      children: /*#__PURE__*/_jsx(WrappedComponent, {})
    }));
    const wrappedComponentElement = screen.UNSAFE_getByType(WrappedComponent);
    expect(wrappedComponentElement.props).toMatchObject({
      tour: {
        onLayout: expect.any(Function),
        ref: expect.any(Object)
      }
    });
  });
  test('registers multiple steps', async () => {
    renderWithProvider(/*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TourStep, {
        name: "Step 1",
        order: 0,
        text: "Hello! This is step 1!",
        children: /*#__PURE__*/_jsx(WrappedComponent, {})
      }), /*#__PURE__*/_jsx(TourStep, {
        name: "Step 2",
        order: 1,
        text: "And this is step 2",
        children: /*#__PURE__*/_jsx(WrappedComponent, {})
      })]
    }));
    await waitFor(() => {
      expect(registerStepSpy).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Step 1',
        text: 'Hello! This is step 1!',
        order: 0
      }));
      expect(registerStepSpy).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Step 2',
        text: 'And this is step 2',
        order: 1
      }));
    });
  });
  test('re-registers the step after text update', async () => {
    const {
      rerender
    } = renderWithProvider(/*#__PURE__*/_jsx(TourStep, {
      name: "Step 1",
      order: 0,
      text: "Hello! This is step 1!",
      children: /*#__PURE__*/_jsx(WrappedComponent, {})
    }));
    rerender(/*#__PURE__*/_jsx(TourProvider, {
      children: /*#__PURE__*/_jsx(TourStep, {
        name: "Step 1",
        order: 0,
        version: 2 // force update
        ,
        text: "Hello! This is the same step with updated text!",
        children: /*#__PURE__*/_jsx(WrappedComponent, {})
      })
    }));
    await waitFor(() => expect(registerStepSpy).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Step 1',
      text: 'Hello! This is the same step with updated text!'
    })));
  });
  test('unregisters the step after unmount', async () => {
    const {
      rerender
    } = renderWithProvider(/*#__PURE__*/_jsx(TourStep, {
      name: "Step 1",
      order: 0,
      text: "Hello! This is step 1!",
      children: /*#__PURE__*/_jsx(WrappedComponent, {})
    }));

    // Remove the step from the tree
    rerender(/*#__PURE__*/_jsx(TourProvider, {}));
    await waitFor(() => expect(unregisterStepSpy).toHaveBeenCalledWith('Step 1'));
  });
  test('unregisters the step after name change and re-registers with the new name', async () => {
    const stepText = 'Hello! This is step 1!';
    const {
      rerender
    } = renderWithProvider(/*#__PURE__*/_jsx(TourStep, {
      name: "Step 1",
      order: 0,
      text: stepText,
      children: /*#__PURE__*/_jsx(WrappedComponent, {})
    }));
    rerender(/*#__PURE__*/_jsx(TourProvider, {
      children: /*#__PURE__*/_jsx(TourStep, {
        name: "Step 1 Updated Name",
        order: 0,
        text: stepText,
        children: /*#__PURE__*/_jsx(WrappedComponent, {})
      })
    }));
    await waitFor(() => {
      expect(unregisterStepSpy).toHaveBeenCalledWith('Step 1');
      expect(registerStepSpy).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Step 1 Updated Name',
        text: stepText
      }));
    });

    // Ensure it didn’t try to unregister the new name
    expect(unregisterStepSpy).not.toHaveBeenCalledWith('Step 1 Updated Name');
  });
});
//# sourceMappingURL=TourStep.test.js.map