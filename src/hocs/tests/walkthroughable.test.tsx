// using only @testing-library/react-native
import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { walkthroughable } from '../walkthroughable';

const WalkthroughableView = walkthroughable(View);
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableScrollView = walkthroughable(ScrollView);
const WalkthroughableTextInput = walkthroughable(TextInput);

const walkthroughableComponents = [
  WalkthroughableView,
  WalkthroughableText,
  WalkthroughableScrollView,
  WalkthroughableTextInput,
];

const nativeComponents = [View, Text, ScrollView, TextInput];

it('spreads the tour prop object on the wrapped component', () => {
  const { getByTestId } = render(
    // @ts-ignore - allow passing test-only props
    <WalkthroughableView
      testID="wrapped"
      tour={{ keyForNum: 1, keyForStr: 'hello' }}
    />
  );

  const wrapped = getByTestId('wrapped');

  expect(wrapped.props.keyForNum).toBe(1);
  expect(wrapped.props.keyForStr).toBe('hello');
});

it('spreads the tour prop object on the wrapped component along with other flat props', () => {
  const { getByTestId } = render(
    // @ts-ignore - allow passing test-only props
    <WalkthroughableView
      testID="wrapped"
      tour={{ keyForNum: 1, keyForStr: 'hello' }}
      otherProp="the other prop"
    />
  );

  const wrapped = getByTestId('wrapped');

  expect(wrapped.props.keyForNum).toBe(1);
  expect(wrapped.props.keyForStr).toBe('hello');
  expect(wrapped.props.otherProp).toBe('the other prop');
});

it('spreads the tour prop object on the wrapped component not overriding the root props', () => {
  const { getByTestId } = render(
    // @ts-ignore - allow passing test-only props
    <WalkthroughableView
      testID="wrapped"
      tour={{ keyForNum: 1, keyForStr: 'hello' }}
      keyForNum={2}
    />
  );

  const wrapped = getByTestId('wrapped');

  expect(wrapped.props.keyForNum).toBe(2);
  expect(wrapped.props.keyForStr).toBe('hello');
});

it('works with all types of react native built-in components', () => {
  nativeComponents.forEach((_, key) => {
    const WalkthroughableComponent = walkthroughableComponents[key] as any;

    // use createElement to avoid JSX typing issues
    const { getByTestId } = render(
      // @ts-ignore - allow passing test-only props
      React.createElement(WalkthroughableComponent, {
        testID: `wrapped-${key}`,
        tour: { keyForNum: 1, keyForStr: 'hello' },
      })
    );

    const wrapped = getByTestId(`wrapped-${key}`);

    expect(wrapped.props.keyForNum).toBe(1);
    expect(wrapped.props.keyForStr).toBe('hello');
  });
});
