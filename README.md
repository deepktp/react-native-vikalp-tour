<h1 align="center">RN Vikalp Tour</h1>
<p align="center">
  Step-by-step walkthrough for your react native app!
</p>
<p align="center">
  <img src="https://media.giphy.com/media/65VKIzGWZmHiEgEBi7/giphy.gif" alt="React Native Copilot" />
</p>

<p align="center">
  <a href="https://github.com/deepktp/react-native-vikalp-tour/issues">
    <img src="https://img.shields.io/github/issues/deepktp/react-native-vikalp-tour" alt="GitHub Issues" />
  </a>
  <a href="https://github.com/deepktp/react-native-vikalp-tour/pulls">
    <img src="https://img.shields.io/github/issues-pr/deepktp/react-native-vikalp-tour" alt="GitHub Pull Requests" />
  </a>
  <a href="https://www.npmjs.com/package/@rn-vui/tour">
    <img src="https://img.shields.io/npm/dm/@rn-vui/tour" alt="npm Downloads" />
  </a>
  <a href="https://github.com/deepktp/react-native-vikalp-tour/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/deepktp/react-native-vikalp-tour/ci.yml" alt="GitHub Actions" />
  </a>
  <a href="https://github.com/deepktp/react-native-vikalp-tour/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/deepktp/react-native-vikalp-tour" alt="License" />
  </a>
  <a href="https://www.npmjs.com/package/@rn-vui/tour">
    <img src="https://img.shields.io/npm/v/@rn-vui/tour" alt="npm Version" />
  </a>
  <a href="https://github.com/deepktp/react-native-vikalp-tour/stargazers">
    <img src="https://img.shields.io/github/stars/deepktp/react-native-vikalp-tour" alt="GitHub Stars" />
  </a>
</p>

```bash
yarn add @rn-vui/tour
```

```bash
npm install --save @rn-vui/tour
```

## 📊 Project Stats

<p align="center">
  <img src="https://img.shields.io/github/contributors/deepktp/react-native-vikalp-tour" alt="Contributors" />
  <img src="https://img.shields.io/github/last-commit/deepktp/react-native-vikalp-tour" alt="Last Commit" />
  <img src="https://img.shields.io/github/repo-size/deepktp/react-native-vikalp-tour" alt="Repo Size" />
  <img src="https://img.shields.io/github/languages/count/deepktp/react-native-vikalp-tour" alt="Languages" />
  <img src="https://img.shields.io/github/languages/top/deepktp/react-native-vikalp-tour" alt="Top Language" />
  <img src="https://img.shields.io/bundlephobia/min/@rn-vui/tour" alt="Bundle Size" />
  <img src="https://img.shields.io/npm/types/@rn-vui/tour" alt="TypeScript" />
</p>

## 🚀 Quick Start

```jsx
import { TourProvider, TourStep, walkthroughable, useTour } from '@rn-vui/tour';

const WalkthroughableText = walkthroughable(Text);

function App() {
  const { start } = useTour();

  return (
    <TourProvider>
      <View>
        <TourStep text="Welcome to the app!" order={1} name="welcome">
          <WalkthroughableText>Welcome!</WalkthroughableText>
        </TourStep>
        <Button title="Start Tour" onPress={() => start()} />
      </View>
    </TourProvider>
  );
}
```

## 📚 API Reference

## Installation

**NOTE**: This library provides a modern hooks-based API for creating interactive tours in React Native applications.

```javascript
import { TourProvider, TourStep, walkthroughable, useTour } from '@rn-vui/tour';
```

**Optional**: If you want to have the smooth SVG animation, you should install and link [`react-native-svg`](https://github.com/software-mansion/react-native-svg).

## 📚 API Reference

### 🚀 Quick Reference

**Most Common Props:**
- `overlay`: Choose between `'svg'` (smooth) or `'view'` (simple)
- `backdropColor`: Customize the overlay color
- `tooltipStyle`: Style the tooltip appearance
- `verticalOffset`: Adjust tooltip position
- `stopOnOutsideClick`: Allow users to exit by clicking outside

**Essential TourStep Props:**
- `name`: Unique identifier (required)
- `order`: Step sequence number (required)
- `text`: Tooltip content (required)
- `active`: Enable/disable step (optional)

---

### 🎯 TourProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `overlay` | `'svg' \| 'view'` | `'svg'` | 🎨 Type of overlay to use. SVG provides smooth animations but requires react-native-svg |
| `animationDuration` | `number` | `300` | ⏱️ Duration of animations in milliseconds |
| `tooltipComponent` | `React.ComponentType<TooltipProps>` | - | 🛠️ Custom tooltip component |
| `tooltipStyle` | `ViewStyle` | - | 🎨 Custom styles for the tooltip wrapper |
| `stepNumberComponent` | `React.ComponentType<any>` | - | 🔢 Custom step number component |
| `animated` | `boolean` | `true` | ✨ Whether to animate the tour transitions |
| `labels` | `Labels` | - | 🌐 Custom labels for navigation buttons |
| `androidStatusBarVisible` | `boolean` | `false` | 📱 Whether to show status bar on Android during tour |
| `svgMaskPath` | `SvgMaskPathFunction` | - | 🎭 Custom SVG mask path function |
| `verticalOffset` | `number` | `0` | 📍 Vertical offset for tooltip positioning |
| `arrowColor` | `string` | - | 🎨 Color of the tooltip arrow |
| `arrowSize` | `number` | - | 📏 Size of the tooltip arrow |
| `margin` | `number` | - | 📐 Margin around the highlighted element |
| `stopOnOutsideClick` | `boolean` | `false` | 🖱️ Whether clicking outside stops the tour |
| `backdropColor` | `string` | `'rgba(0, 0, 0, 0.4)'` | 🌑 Color of the backdrop overlay |
| `easing` | `EasingFunction` | - | 🎬 Custom easing function for animations |

---

### 🎯 TourStep Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | `string` | - | ✅ **Required** | 🏷️ Unique identifier for the step |
| `order` | `number` | - | ✅ **Required** | 🔢 Order of the step in the tour sequence |
| `text` | `React.ReactElement \| string` | - | ✅ **Required** | 💬 Text or React element to display in tooltip |
| `children` | `React.ReactElement` | - | ✅ **Required** | 👶 The component to be highlighted |
| `active` | `boolean` | `true` | ❌ Optional | 🔄 Whether this step is active/visible |
| `version` | `string \| number` | - | ❌ Optional | 🔄 Change this to force component re-registration |

---

### 🎣 useTour Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `start` | `(fromStep?: string, scrollView?: ScrollView) => Promise<void>` | 🚀 Start the tour from a specific step |
| `stop` | `() => Promise<void>` | 🛑 Stop the current tour |
| `goToNext` | `() => Promise<void>` | ⏭️ Navigate to the next step |
| `goToPrev` | `() => Promise<void>` | ⏮️ Navigate to the previous step |
| `goToNth` | `(n: number) => Promise<void>` | 🔢 Navigate to a specific step by index (1-based) |
| `currentStep` | `Step \| undefined` | 📍 Current active step |
| `visible` | `boolean` | 👁️ Whether the tour modal is visible |
| `tourEvents` | `Emitter<Events>` | 📡 Event emitter for tour lifecycle events |
| `isFirstStep` | `boolean` | 🎯 Whether current step is the first |
| `isLastStep` | `boolean` | 🏁 Whether current step is the last |
| `currentStepNumber` | `number` | 🔢 Current step number (1-based) |
| `totalStepsNumber` | `number` | 📊 Total number of steps |

---

### 🔧 walkthroughable HOC

The `walkthroughable` HOC doesn't accept any specific props. It simply wraps your component to make it compatible with the tour system.

```jsx
// Usage
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
```

---

### 📡 Event Types

| Event | Payload | Description |
|-------|---------|-------------|
| `start` | `undefined` | 🎬 Fired when the tour starts |
| `stop` | `undefined` | 🛑 Fired when the tour ends or is stopped |
| `stepChange` | `Step \| undefined` | 🔄 Fired when navigating between steps |

---

### 🌐 Labels Interface

```typescript
type Labels = Partial<{
  skip: string;      // Skip button text
  previous: string;  // Previous button text
  next: string;      // Next button text
  finish: string;    // Finish button text
}>;

// Example usage
<TourProvider
  labels={{
    previous: "Vorheriger",
    next: "Nächster",
    skip: "Überspringen",
    finish: "Beenden"
  }}
>
  <App />
</TourProvider>
```

## Usage

Wrap the portion of your app that you want to use the tour with inside `<TourProvider>`:

```jsx
import { TourProvider, TourStep, walkthroughable, useTour } from '@rn-vui/tour';

const AppWithTour = () => {
  return (
    <TourProvider>
      <HomeScreen />
    </TourProvider>
  );
};
```

Before defining walkthrough steps for your react elements, you must make them `walkthroughable`. The easiest way to do that for built-in react native components, is using the `walkthroughable` HOC. Then you must wrap the element with `TourStep`.

```jsx
import { TourProvider, TourStep, walkthroughable, useTour } from '@rn-vui/tour';

const WalkthroughableText = walkthroughable(Text);

const HomeScreen = () => {
  return (
    <View>
      <TourStep text="This is a hello world example!" order={1} name="hello">
        <WalkthroughableText>Hello world!</WalkthroughableText>
      </TourStep>
    </View>
  );
};
```

Every `TourStep` must have these props:

1. **name**: A unique name for the walkthrough step.
2. **order**: A positive number indicating the order of the step in the entire walkthrough.
3. **text**: The text shown as the description for the step.

Additionally, a step may set the **active** prop, a boolean that controls whether the step is used or skipped.

In order to start the tutorial, you can call the `start` function from the `useTour` hook:

```jsx
const HomeScreen = () => {
  const { start } = useTour();

  return (
    <View>
      <Button title="Start tutorial" onPress={() => start()} />
    </View>
  );
};
```

If you are looking for a working example, please check out [this link](https://github.com/deepktp/react-native-vikalp-tour/tree/master/example).

### Overlays and animation

The overlay in react-native-vikalp-tour is the component that draws the dark transparent over the screen. React-native-vikalp-tour comes with two overlay options: `view` and `svg`.

The `view` overlay uses 4 rectangles drawn around the target element using the `<View />` component. We don't recommend using animation with this overlay since it's sluggish on some devices specially on Android.

The `svg` overlay uses an SVG path component for drawing the overlay. It offers a nice and smooth animation but it depends on `react-native-svg`. If you are using expo, you can install it using:

```
expo install react-native-svg
```

Or if you are using react-native-cli:

```
yarn add react-native-svg

# or with npm

npm install --save react-native-svg

cd ios && pod install
```

You can specify the overlay by passing the `overlay` prop to the `<TourProvider />` component:

```jsx
<TourProvider overlay="svg" {/* or "view" */}>
  <App />
</TourProvider>
```

By default, if overlay is not explicitly specified, the `svg` overlay will be used if `react-native-svg` is installed, otherwise the `view` overlay will be used.

### Custom tooltip and step number UI components

You can customize the tooltip and the step number components by passing a component to the `TourProvider` component. If you are looking for an example tooltip component, take a look at [the default ui implementations](https://github.com/deepktp/react-native-vikalp-tour/blob/master/src/components/default-ui).

```jsx
const TooltipComponent = () => {
  const {
    isFirstStep,
    isLastStep,
    goToNext,
    goToNth,
    goToPrev,
    stop,
    currentStep,
  } = useTour();

  return (
    // ...
  )
};


<TourProvider tooltipComponent={TooltipComponent} stepNumberComponent={StepComponent}>
  <App />
</TourProvider>
```

### Navigating through the tour

The above code snippet shows the functions passed to the tooltip. These are your primary navigation functions. Some notes on navigation:

- `goToNext` and `goToPrev` will move the mask from the current wrapped component immediately to the next.

- You can use `stop` in conjunction with `goToNth` to effectively "pause" a tour, allowing for user input, animations or any other interaction that shouldn't have the mask applied. Once you want to pick the tour back up, call `goToNth` on the next tour step.

Note that `goToNth` is 1-indexed, which is in line with what your step orders should look like.

### Custom tooltip styling

You can customize tooltip's wrapper style:

```jsx
const style = {
  backgroundColor: '#9FA8DA',
  borderRadius: 10,
  paddingTop: 5,
};

<TourProvider tooltipStyle={style}>
  <App />
</TourProvider>;
```

#### Manage tooltip width

By default, the tooltip width is calculated dynamically. You can make it fixed-size by overriding both `width` and `maxWidth`, check the example bellow:

```jsx
const MARGIN = 8;
const WIDTH = Dimensions.get("window").width - 2 * MARGIN;

<TourProvider tooltipStyle={{ width: WIDTH, maxWidth: WIDTH, left: MARGIN }}>
  <App />
</TourProvider>;
```

### Custom tooltip arrow color

You can customize the tooltip's arrow color:

```jsx
<TourProvider arrowColor="#9FA8DA">
  <App />
</TourProvider>
```

### Custom overlay color

You can customize the mask color - default is `rgba(0, 0, 0, 0.4)`, by passing a color string to the `TourProvider` component.

```jsx
<TourProvider backdropColor="rgba(50, 50, 100, 0.9)">
  <App />
</TourProvider>
```

### Custom svg mask Path

You can customize the mask svg path by passing a function to the `TourProvider` component.

```ts
function SvgMaskPathFn(args: {
  size: Animated.ValueXY;
  position: Animated.ValueXY;
  canvasSize: {
    x: number;
    y: number;
  };
  step: Step;
}): string;
```

Example with circle:

```jsx
const circleSvgPath = ({ position, canvasSize }) =>
  `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;

<TourProvider svgMaskPath={circleSvgPath}>
  <App />
</TourProvider>;
```

Example with different overlay for specific step:

Give name prop for the step

```jsx
<TourStep text="This is a hello world example!" order={1} name="hello">
  <WalkthroughableText>Hello world!</WalkthroughableText>
</TourStep>
```

Now you can return different svg path depending on step name

```jsx
const customSvgPath = (args) => {
  if (args.step?.name === 'hello') {
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
  } else {
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${
      position.y._value
    }H${position.x._value + size.x._value}V${
      position.y._value + size.y._value
    }H${position.x._value}V${position.y._value}Z`;
  }
};

<TourProvider svgMaskPath={customSvgPath}>
  <App />
</TourProvider>;
```

### Custom components as steps

The components wrapped inside `TourStep`, will receive a `tour` prop with a mutable `ref` and `onLayout` which the outermost rendered element of the component or the element that you want the tooltip be shown around, must extend.

```jsx
import { TourStep } from '@rn-vui/tour';

const CustomComponent = ({ tour }) => (
  <View {...tour}>
    <Text>Hello world!</Text>
  </View>
);

const HomeScreen = () => {
  return (
    <View>
      <TourStep text="This is a hello world example!" order={1} name="hello">
        <CustomComponent />
      </TourStep>
    </View>
  );
};
```

### Custom labels (for i18n)

You can localize labels:

```jsx
<TourProvider
  labels={{
    previous: "Vorheriger",
    next: "Nächster",
    skip: "Überspringen",
    finish: "Beenden"
  }}
>
```

### Adjust vertical position

In order to adjust vertical position pass `verticalOffset` to the `TourProvider` component.

```jsx
<TourProvider verticalOffset={36}>
```

### Triggering the tutorial

Use `const {start} = useTour()` to trigger the tutorial. You can either invoke it with a touch event or in `useEffect` to start after the component mounts. Note that the component and all its descendants must be mounted before starting the tutorial since the `TourStep`s need to be registered first.

### Usage inside a ScrollView

Pass the ScrollView reference as the second argument to the `start()` function.
eg `start(undefined, scrollViewRef)`

```jsx
import { ScrollView } from 'react-native';

class HomeScreen {
  componentDidMount() {
    // Starting the tutorial and passing the scrollview reference.
    this.props.start(false, this.scrollView);
  }

  componentWillUnmount() {
    // Don't forget to disable event handlers to prevent errors
    this.props.tourEvents.off('stop');
  }

  render() {
    <ScrollView ref={(ref) => (this.scrollView = ref)}>// ...</ScrollView>;
  }
}
```

### Listening to the events

`useTour` provides a `tourEvents` function prop to allow you to track the progress of the tutorial. It utilizes [mitt](https://github.com/developit/mitt) under the hood.

List of available events is:

- `start` — Tour tutorial has started.
- `stop` — Tour tutorial has ended or skipped.
- `stepChange` — Next step is triggered. Passes `Step` instance as event handler argument.

**Example:**

```jsx
import { useTour } from "@rn-vui/tour";

const HomeScreen = () => {
  const { tourEvents } = useTour();

  useEffect(() => {
    const listener = () => {
      // Tour tutorial finished!
    };

    tourEvents.on("stop", listener);

    return () => {
      tourEvents.off("stop", listener)
    };
  }, []);

  return (
    // ...
  );
}
```

## Contributing

Issues and Pull Requests are always welcome.

If you are interested in becoming a maintainer, get in touch with us by sending an email or opening an issue. You should already have code merged into the project. Active contributors are encouraged to get in touch.

This project is maintained by the community. Feel free to contribute!
