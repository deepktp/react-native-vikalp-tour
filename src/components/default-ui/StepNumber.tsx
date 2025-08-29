import { type FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { useCoachMark } from '../../contexts/CoachMarkProvider';

import { styles } from '../style';

export const StepNumber: FunctionComponent<unknown> = () => {
  const { currentStepNumber } = useCoachMark();

  return (
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{currentStepNumber}</Text>
    </View>
  );
};
