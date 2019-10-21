import CustomNavigator from './CustomNavigator';
import DefaultNavigator from './DefaultNavigator';

function Navigator({ children }: { children?: () => JSX.Element }) {
  return children ? CustomNavigator({ children }) : DefaultNavigator();
}

export default Navigator;
