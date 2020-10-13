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
import ReduxThunk from 'redux-thunk';

//Redux Reducers and Store
import jobsReducer from './store/reducers/jobs';
import companiesReducer from './store/reducers/companies';
import authReducer from './store/reducers/auth';
import usersReducer from './store/reducers/users';



const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  jobs: jobsReducer,
  companies: companiesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App(navigation) {

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