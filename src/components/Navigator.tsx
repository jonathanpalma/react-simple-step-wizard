import CustomNavigator from './CustomNavigator';
import DefaultNavigator from './DefaultNavigator';
import { CompoundNavigatorProps } from '../common/types';

function Navigator({ children }: CompoundNavigatorProps) {
  return children ? CustomNavigator({ children }) : DefaultNavigator();
}

export default Navigator;
