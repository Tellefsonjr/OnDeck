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
              JobDetailScreen: {
                path: 'jobs/:id',
                parse: {
                  id: (id) => id,
                },
                stringify: {
                  id: (id) => id,
                }
              }
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
