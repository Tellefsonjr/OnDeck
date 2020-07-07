import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Browse: {
            screens: {
              BrowseScreen: 'browse',
            },
          },
          Events: {
            screens: {
              EventsScreen: 'events',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
