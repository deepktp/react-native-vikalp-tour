import { render, screen } from '@testing-library/react-native';
import { TourProvider, type useTour } from '../../contexts/TourProvider';
import { TourStep } from '../TourStep';

jest.mock('../../contexts/TourProvider', () => ({
  ...jest.requireActual('../../contexts/TourProvider'),
  useTour: jest
    .fn()
    .mockImplementation(
      () => jest.requireActual('../../contexts/TourProvider').useTour
    ),
}));

const actualuseTour = jest.requireActual('../../contexts/TourProvider')
  .useTour as typeof useTour;

const mockuseTour = jest.requireMock('../../contexts/TourProvider')
  .useTour as jest.Mock<ReturnType<typeof useTour>>;

describe('TourStep', () => {
  beforeEach(() => {
    mockuseTour.mockClear().mockImplementation(actualuseTour);
  });

  test('passes the copilot prop to the child component', async () => {
    const WrappedComponent = () => null;

    render(
      <TourProvider>
        <TourStep name="Test" order={0} text="Hello">
          <WrappedComponent />
        </TourStep>
      </TourProvider>
    );
    const wrappedComponentElement = screen.UNSAFE_getByType(WrappedComponent);

    expect(wrappedComponentElement.props).toMatchObject({
      copilot: {
        onLayout: expect.any(Function),
        ref: expect.any(Object),
      },
    });
  });

  test('registers the step', async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();

    mockuseTour.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: jest.fn(),
      stop: jest.fn(),
    } as any);

    render(
      <TourProvider>
        <>
          <TourStep name="Step 1" order={0} text="Hello! This is step 1!">
            <WrappedComponent />
          </TourStep>
          <TourStep name="Step 2" order={1} text="And this is step 2">
            <WrappedComponent />
          </TourStep>
        </>
      </TourProvider>
    );

    expect(registerStepSpy).toHaveBeenCalledWith({
      measure: expect.any(Function),
      name: 'Step 1',
      text: 'Hello! This is step 1!',
      order: 0,
      visible: expect.any(Boolean),
      wrapperRef: expect.any(Object),
    });

    expect(registerStepSpy).toHaveBeenCalledWith({
      measure: expect.any(Function),
      name: 'Step 2',
      text: 'And this is step 2',
      order: 1,
      visible: expect.any(Boolean),
      wrapperRef: expect.any(Object),
    });
  });

  test('re-registers the step after text update', async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();

    mockuseTour.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: jest.fn(),
      stop: jest.fn(),
    } as any);

    render(
      <TourProvider>
        <TourStep name="Step 1" order={0} text="Hello! This is step 1!">
          <WrappedComponent />
        </TourStep>
      </TourProvider>
    );

    screen.rerender(
      <TourProvider>
        <TourStep
          name="Step 1"
          order={0}
          version={2} //this is to force update the step
          text="Hello! This is the same step with updated text!"
        >
          <WrappedComponent />
        </TourStep>
      </TourProvider>
    );

    expect(registerStepSpy).toHaveBeenCalledWith({
      measure: expect.any(Function),
      name: 'Step 1',
      text: 'Hello! This is the same step with updated text!',
      order: 0,
      visible: expect.any(Boolean),
      wrapperRef: expect.any(Object),
    });
  });

  test('unregisters the step after unmount', async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();
    const unregisterStepSpy = jest.fn();

    mockuseTour.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: unregisterStepSpy,
      stop: jest.fn(),
    } as any);

    render(
      <TourProvider>
        <TourStep name="Step 1" order={0} text="Hello! This is step 1!">
          <WrappedComponent />
        </TourStep>
      </TourProvider>
    );

    // Remove the step from the tree
    screen.rerender(<TourProvider />);

    expect(unregisterStepSpy).toHaveBeenCalledWith('Step 1');
  });

  test('unregisters the step after name change and re-registers with the new name', async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();
    const unregisterStepSpy = jest.fn();

    mockuseTour.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: unregisterStepSpy,
      stop: jest.fn(),
    } as any);

    const stepText = 'Hello! This is step 1!';

    render(
      <TourProvider>
        <TourStep name="Step 1" order={0} text={stepText}>
          <WrappedComponent />
        </TourStep>
      </TourProvider>
    );

    screen.rerender(
      <TourProvider>
        <TourStep name="Step 1 Updated Name" order={0} text={stepText}>
          <WrappedComponent />
        </TourStep>
      </TourProvider>
    );

    expect(unregisterStepSpy).toHaveBeenCalledWith('Step 1');

    expect(registerStepSpy).toHaveBeenCalledWith({
      measure: expect.any(Function),
      name: 'Step 1 Updated Name',
      text: stepText,
      order: 0,
      visible: expect.any(Boolean),
      wrapperRef: expect.any(Object),
    });
  });
});
