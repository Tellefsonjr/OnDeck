import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, Portal } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

//Redux Reducers and Store
import jobsReducer from './store/reducers/jobs';
import companiesReducer from './store/reducers/companies';

const rootReducer = combineReducers({
  jobs: jobsReducer,
  companies: companiesReducer
});

const store = createStore(rootReducer);

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <Provider>
          <Portal>
          <ReduxProvider store={store}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
            </ReduxProvider>

          </Portal>
        </Provider>

    );
  }
}

registerRootComponent(App);