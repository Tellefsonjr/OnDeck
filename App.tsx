import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, Portal } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createFirestoreInstance, getFirestore, reduxFirestore} from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import {firebase, firebaseConfig} from './firebaseConfig.js';

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
const initialState = {};

const store = createStore(rootReducer, 
  compose(
    reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore})),
    )
  );
const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

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
           <ReactReduxFirebaseProvider {...rrfProps}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
            </ReactReduxFirebaseProvider>

            </ReduxProvider>
          </Portal>
        </Provider>

    );
  }
}

registerRootComponent(App);