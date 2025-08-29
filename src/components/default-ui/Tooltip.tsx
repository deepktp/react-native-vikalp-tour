import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from './Button';

import { styles } from '../style';

import type { TooltipProps } from '../../types';

export const Tooltip = ({
  labels,
  goToNext,
  goToPrev,
  stop,
  currentStep,
  isFirstStep,
  isLastStep,
}: TooltipProps) => {
  const handleStop = () => {
    stop!();
  };
  const handleNext = () => {
    goToNext!();
  };

  const handlePrev = () => {
    goToPrev!();
  };

  return (
    <View>
      <View style={styles.tooltipContainer}>
        {typeof currentStep?.text === 'string' ? (
          <Text style={styles.tooltipText}>{currentStep.text}</Text>
        ) : (
          currentStep?.text
        )}
      </View>
      <View style={[styles.bottomBar]}>
        {!isLastStep ? (
          <TouchableOpacity onPress={handleStop}>
            <Button>{labels.skip}</Button>
          </TouchableOpacity>
        ) : null}
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev}>
            <Button>{labels.previous}</Button>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity onPress={handleNext}>
            <Button>{labels.next}</Button>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop}>
            <Button>{labels.finish}</Button>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
