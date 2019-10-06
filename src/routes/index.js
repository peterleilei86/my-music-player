import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LandingScreen from '../screens/LandingScreen';
import PlaylistScreen from '../screens/PlaylistScreen';

const AppNavigator = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen,
    },
    Playlist: {
      screen: PlaylistScreen,
    },
  },
  {initialRouteName: 'Landing'},
);

export default createAppContainer(AppNavigator);
