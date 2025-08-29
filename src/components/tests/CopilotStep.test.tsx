import { render, screen } from '@testing-library/react-native';
import {
  CoachMarkProvider,
  type useCoachMark,
} from '../../contexts/CoachMarkProvider';
import { CoachMarkStep } from '../CoachMarkStep';

jest.mock('../../contexts/CoachMarkProvider', () => ({
  ...jest.requireActual('../../contexts/CoachMarkProvider'),
  useCoachMark: jest
    .fn()
    .mockImplementation(
      () => jest.requireActual('../../contexts/CoachMarkProvider').useCoachMark
    ),
}));

const actualuseCoachMark = jest.requireActual(
  '../../contexts/CoachMarkProvider'
).useCoachMark as typeof useCoachMark;

const mockuseCoachMark = jest.requireMock('../../contexts/CoachMarkProvider')
  .useCoachMark as jest.Mock<ReturnType<typeof useCoachMark>>;

describe('CoachMarkStep', () => {
  beforeEach(() => {
    mockuseCoachMark.mockClear().mockImplementation(actualuseCoachMark);
  });

  test('passes the copilot prop to the child component', async () => {
    const WrappedComponent = () => null;

    render(
      <CoachMarkProvider>
        <CoachMarkStep name="Test" order={0} text="Hello">
          <WrappedComponent />
        </CoachMarkStep>
      </CoachMarkProvider>
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

    mockuseCoachMark.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: jest.fn(),
      stop: jest.fn(),
    } as any);

    render(
      <CoachMarkProvider>
        <>
          <CoachMarkStep name="Step 1" order={0} text="Hello! This is step 1!">
            <WrappedComponent />
          </CoachMarkStep>
          <CoachMarkStep name="Step 2" order={1} text="And this is step 2">
            <WrappedComponent />
          </CoachMarkStep>
        </>
      </CoachMarkProvider>
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

    mockuseCoachMark.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: jest.fn(),
      stop: jest.fn(),
    } as any);

    render(
      <CoachMarkProvider>
        <CoachMarkStep name="Step 1" order={0} text="Hello! This is step 1!">
          <WrappedComponent />
        </CoachMarkStep>
      </CoachMarkProvider>
    );

    screen.rerender(
      <CoachMarkProvider>
        <CoachMarkStep
          name="Step 1"
          order={0}
          version={2} //this is to force update the step
          text="Hello! This is the same step with updated text!"
        >
          <WrappedComponent />
        </CoachMarkStep>
      </CoachMarkProvider>
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

    mockuseCoachMark.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: unregisterStepSpy,
      stop: jest.fn(),
    } as any);

    render(
      <CoachMarkProvider>
        <CoachMarkStep name="Step 1" order={0} text="Hello! This is step 1!">
          <WrappedComponent />
        </CoachMarkStep>
      </CoachMarkProvider>
    );

    // Remove the step from the tree
    screen.rerender(<CoachMarkProvider />);

    expect(unregisterStepSpy).toHaveBeenCalledWith('Step 1');
  });

  test('unregisters the step after name change and re-registers with the new name', async () => {
    const WrappedComponent = () => null;
    const registerStepSpy = jest.fn();
    const unregisterStepSpy = jest.fn();

    mockuseCoachMark.mockReturnValue({
      registerStep: registerStepSpy,
      unregisterStep: unregisterStepSpy,
      stop: jest.fn(),
    } as any);

    const stepText = 'Hello! This is step 1!';

    render(
      <CoachMarkProvider>
        <CoachMarkStep name="Step 1" order={0} text={stepText}>
          <WrappedComponent />
        </CoachMarkStep>
      </CoachMarkProvider>
    );

    screen.rerender(
      <CoachMarkProvider>
        <CoachMarkStep name="Step 1 Updated Name" order={0} text={stepText}>
          <WrappedComponent />
        </CoachMarkStep>
      </CoachMarkProvider>
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
