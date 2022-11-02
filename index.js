/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { NavigatorContainer } from './src/navigation/NavigatorContainer';

AppRegistry.registerComponent(appName, () => NavigatorContainer);
