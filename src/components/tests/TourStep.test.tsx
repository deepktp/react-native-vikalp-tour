import { render, screen, waitFor } from '@testing-library/react-native';
import { TourProvider } from '../../contexts/TourProvider';
import { useTour } from '../../hooks/useTour';
import { TourStep } from '../TourStep';

jest.mock('../../hooks/useTour', () => ({
  useTour: jest.fn(),
}));

const mockuseTour = jest.requireMock('../../hooks/useTour')
  .useTour as jest.Mock<ReturnType<typeof useTour>>;

// 🔹 Helpers
const WrappedComponent = ({ tour }: any) => {
  if (tour?.ref && typeof tour.ref === 'object') {
    tour.ref.current = { measure: jest.fn() } as any;
  }
  return null;
};

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<TourProvider>{ui}</TourProvider>);
};

describe('TourStep', () => {
  let registerStepSpy: jest.Mock;
  let unregisterStepSpy: jest.Mock;
  let stopSpy: jest.Mock;

  beforeEach(() => {
    mockuseTour.mockClear();

    registerStepSpy = jest.fn();
    unregisterStepSpy = jest.fn();
    stopSpy = jest.fn();

    mockuseTour.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: unregisterStepSpy,
      stop: stopSpy,
    } as any);
  });

  test('passes the copilot prop to the child component', () => {
    renderWithProvider(
      <TourStep name="Test" order={0} text="Hello">
        <WrappedComponent />
      </TourStep>
    );

    const wrappedComponentElement = screen.UNSAFE_getByType(WrappedComponent);

    expect(wrappedComponentElement.props).toMatchObject({
      tour: {
        onLayout: expect.any(Function),
        ref: expect.any(Object),
      },
    });
  });

  test('registers multiple steps', async () => {
    renderWithProvider(
      <>
        <TourStep name="Step 1" order={0} text="Hello! This is step 1!">
          <WrappedComponent />
        </TourStep>
        <TourStep name="Step 2" order={1} text="And this is step 2">
          <WrappedComponent />
        </TourStep>
      </>
    );

    await waitFor(() => {
      expect(registerStepSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Step 1',
          text: 'Hello! This is step 1!',
          order: 0,
        })
      );
      expect(registerStepSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Step 2',
          text: 'And this is step 2',
          order: 1,
        })
      );
    });
  });

  test('re-registers the step after text update', async () => {
    const { rerender } = renderWithProvider(
      <TourStep name="Step 1" order={0} text="Hello! This is step 1!">
        <WrappedComponent />
      </TourStep>
    );

    rerender(
      <TourProvider>
        <TourStep
          name="Step 1"
          order={0}
          version={2} // force update
          text="Hello! This is the same step with updated text!"
        >
          <WrappedComponent />
        </TourStep>
      </TourProvider>
    );

    await waitFor(() =>
      expect(registerStepSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Step 1',
          text: 'Hello! This is the same step with updated text!',
        })
      )
    );
  });

  test('unregisters the step after unmount', async () => {
    const { rerender } = renderWithProvider(
      <TourStep name="Step 1" order={0} text="Hello! This is step 1!">
        <WrappedComponent />
      </TourStep>
    );

    // Remove the step from the tree
    rerender(<TourProvider />);

    await waitFor(() =>
      expect(unregisterStepSpy).toHaveBeenCalledWith('Step 1')
    );
  });

  test('unregisters the step after name change and re-registers with the new name', async () => {
    const stepText = 'Hello! This is step 1!';

    const { rerender } = renderWithProvider(
      <TourStep name="Step 1" order={0} text={stepText}>
        <WrappedComponent />
      </TourStep>
    );

    rerender(
      <TourProvider>
        <TourStep name="Step 1 Updated Name" order={0} text={stepText}>
          <WrappedComponent />
        </TourStep>
      </TourProvider>
    );

    await waitFor(() => {
      expect(unregisterStepSpy).toHaveBeenCalledWith('Step 1');
      expect(registerStepSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Step 1 Updated Name',
          text: stepText,
        })
      );
    });

    // Ensure it didn’t try to unregister the new name
    expect(unregisterStepSpy).not.toHaveBeenCalledWith('Step 1 Updated Name');
  });
});
