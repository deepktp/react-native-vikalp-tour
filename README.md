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

## 📦 Installation

**NOTE**: This library provides a modern hooks-based API for creating interactive tours in React Native applications.

```javascript
import { TourProvider, TourStep, walkthroughable, useTour } from '@rn-vui/tour';
```

**Optional**: If you want to have the smooth SVG animation, you should install and link [`react-native-svg`](https://github.com/software-mansion/react-native-svg).

## 🏁 Basic Usage

### Setting up the Tour Provider

Wrap your app or the component tree where you want to use tours with `TourProvider`:

```jsx
import { TourProvider } from '@rn-vui/tour';

export default function App() {
  return (
    <TourProvider>
      <YourAppContent />
    </TourProvider>
  );
}
```

### Making Components Walkthroughable

Before you can highlight components, you need to make them "walkthroughable" using the `walkthroughable` HOC:

```jsx
import { walkthroughable } from '@rn-vui/tour';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
const WalkthroughableView = walkthroughable(View);
```

### Creating Tour Steps

Use `TourStep` to define each step in your tour:

```jsx
import { TourStep, useTour } from '@rn-vui/tour';

function HomeScreen() {
  const { start } = useTour();

  return (
    <View>
      <TourStep
        text="This is the welcome message!"
        order={1}
        name="welcome"
      >
        <WalkthroughableText style={styles.welcome}>
          Welcome to My App!
        </WalkthroughableText>
      </TourStep>

      <TourStep
        text="Click here to start your journey"
        order={2}
        name="startButton"
      >
        <WalkthroughableTouchableOpacity onPress={() => start()}>
          <Text>Get Started</Text>
        </WalkthroughableTouchableOpacity>
      </TourStep>
    </View>
  );
}
```

### Starting the Tour

Use the `start` function from `useTour` hook to begin the tour:

```jsx
function App() {
  const { start } = useTour();

  return (
    <View>
      <Button
        title="Start Tutorial"
        onPress={() => start()}
      />
    </View>
  );
}
```

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

## 🎨 Advanced Features

### Overlays and Animation

The overlay in react-native-vikalp-tour draws a dark transparent overlay around the screen. Choose between two overlay options:

**SVG Overlay** (Recommended):
- Smooth animations
- Requires `react-native-svg`
- Better performance on most devices

**View Overlay**:
- Simple rectangles
- No additional dependencies
- Better for low-end Android devices

```jsx
// SVG overlay (default if react-native-svg is installed)
<TourProvider overlay="svg">
  <App />
</TourProvider>

// View overlay
<TourProvider overlay="view">
  <App />
</TourProvider>
```

### Custom Tooltip Styling

Customize the appearance of your tooltips:

```jsx
const customTooltipStyle = {
  backgroundColor: '#9FA8DA',
  borderRadius: 10,
  padding: 10,
};

<TourProvider tooltipStyle={customTooltipStyle}>
  <App />
</TourProvider>
```

### Custom Components

Create your own tooltip and step number components:

```jsx
const CustomTooltip = ({ isFirstStep, isLastStep, goToNext, goToPrev, stop, currentStep }) => (
  <View style={styles.tooltip}>
    <Text>{currentStep?.text}</Text>
    <View style={styles.buttons}>
      {!isFirstStep && <Button title="Previous" onPress={goToPrev} />}
      {!isLastStep && <Button title="Next" onPress={goToNext} />}
      <Button title="Skip" onPress={stop} />
    </View>
  </View>
);

<TourProvider tooltipComponent={CustomTooltip}>
  <App />
</TourProvider>
```

### Event Handling

Listen to tour events for analytics or custom behavior:

```jsx
import { useTour } from '@rn-vui/tour';
import { useEffect } from 'react';

function App() {
  const { tourEvents } = useTour();

  useEffect(() => {
    const handleStart = () => console.log('Tour started');
    const handleStop = () => console.log('Tour completed');
    const handleStepChange = (step) => console.log('Step changed:', step?.name);

    tourEvents.on('start', handleStart);
    tourEvents.on('stop', handleStop);
    tourEvents.on('stepChange', handleStepChange);

    return () => {
      tourEvents.off('start', handleStart);
      tourEvents.off('stop', handleStop);
      tourEvents.off('stepChange', handleStepChange);
    };
  }, [tourEvents]);

  return <YourApp />;
}
```

### ScrollView Support

For tours within ScrollViews, pass the ScrollView reference:

```jsx
import { ScrollView } from 'react-native';

function ScrollableScreen() {
  const { start } = useTour();
  const scrollViewRef = useRef(null);

  return (
    <ScrollView ref={scrollViewRef}>
      <TourStep text="This step is in a ScrollView" order={1} name="scrollStep">
        <WalkthroughableText>Scrollable Content</WalkthroughableText>
      </TourStep>
      <Button
        title="Start Tour"
        onPress={() => start(undefined, scrollViewRef.current)}
      />
    </ScrollView>
  );
}
```

### Internationalization (i18n)

Customize button labels for different languages:

```jsx
<TourProvider
  labels={{
    previous: "Anterior",
    next: "Siguiente",
    skip: "Omitir",
    finish: "Finalizar"
  }}
>
  <App />
</TourProvider>
```

## 🤝 Contributing

Issues and Pull Requests are always welcome.

If you are interested in becoming a maintainer, get in touch with us by sending an email or opening an issue. You should already have code merged into the project. Active contributors are encouraged to get in touch.

This project is maintained by the community. Feel free to contribute!
