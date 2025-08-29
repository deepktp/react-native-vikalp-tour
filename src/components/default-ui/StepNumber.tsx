import { type FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { useTour } from '../../contexts/TourProvider';

import { styles } from '../style';

export const StepNumber: FunctionComponent<unknown> = () => {
  const { currentStepNumber } = useTour();

  return (
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{currentStepNumber}</Text>
    </View>
  );
};
