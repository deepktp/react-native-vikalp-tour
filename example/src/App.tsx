import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TourProvider, TourStep, walkthroughable, useTour } from '@rn-vui/tour';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);

function App() {
  const { start, tourEvents } = useTour();
  const [secondStepActive, setSecondStepActive] = useState(true);
  const [lastEvent, setLastEvent] = useState<string | null>(null);

  useEffect(() => {
    const onStepChange = (step: any) => {
      setLastEvent(step?.name ? `stepChange: ${step.name}` : 'stepChange');
    };
    const onStart = () => setLastEvent('start');
    const onStop = () => setLastEvent('stop');

    tourEvents.on('stepChange', onStepChange);
    tourEvents.on('start', onStart);
    tourEvents.on('stop', onStop);

    return () => {
      // cleanup listeners when component unmounts or tourEvents changes
      tourEvents.off('stepChange', onStepChange);
      tourEvents.off('start', onStart);
      tourEvents.off('stop', onStop);
    };
  }, [tourEvents]);

  return (
    <SafeAreaView style={styles.container}>
      <TourStep
        text="Hey! This is the first step of the tour!"
        order={1}
        name="openApp"
      >
        <WalkthroughableText style={styles.title}>
          {'Welcome to the demo of\n"React Native Tour"'}
        </WalkthroughableText>
      </TourStep>
      <View style={styles.middleView}>
        <TourStep
          active={secondStepActive}
          text={
            <View style={{ backgroundColor: 'red' }}>
              <Text>
                Here goes your profile picture and you can pass a component
                also.
              </Text>
            </View>
          }
          order={2}
          name="secondText"
          version={5}
        >
          <WalkthroughableImage
            source={{
              uri: 'https://pbs.twimg.com/profile_images/527584017189982208/l3wwN-l-_400x400.jpeg',
            }}
            style={styles.profilePhoto}
          />
        </TourStep>
        <View style={styles.activeSwitchContainer}>
          <Text>Profile photo step activated?</Text>
          <View style={styles.switchSpacer} />
          <Switch
            onValueChange={(value) => setSecondStepActive(value)}
            value={secondStepActive}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => start()}
          accessibilityLabel="Start tutorial"
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start the tutorial</Text>
        </TouchableOpacity>
        <View style={styles.eventContainer}>
          <Text>{lastEvent && `Last event: ${lastEvent}`}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TourStep
          text="Here is an item in the corner of the screen."
          order={3}
          name="thirdText"
        >
          <WalkthroughableText style={styles.tabItem}>🏠</WalkthroughableText>
        </TourStep>

        <Text style={styles.tabItem}>🔍</Text>
      </View>
    </SafeAreaView>
  );
}

const AppWithProvider = () => (
  <TourProvider stopOnOutsideClick androidStatusBarVisible>
    <App />
  </TourProvider>
);

export default AppWithProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 25,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    textAlign: 'center',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  switchSpacer: {
    flexGrow: 1,
  },
  eventContainer: {
    marginTop: 20,
  },
});
