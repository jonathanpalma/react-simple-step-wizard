import CustomStepTracker from './CustomStepTracker';
import DefaultStepTracker from './DefaultStepTracker';
import { CompoundStepTrackerProps } from '../common/types';

function StepTracker({ children }: CompoundStepTrackerProps): JSX.Element {
  return children ? CustomStepTracker({ children }) : DefaultStepTracker();
}

export default StepTracker;
