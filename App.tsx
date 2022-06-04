import React, {FC, ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';

import {Navigator} from './src/navigator/Navigator';
import {PermissionsProvider} from './src/context/PermissionsContext';

interface Props {
  children: ReactNode;
}

const AppState: FC<Props> = ({children}) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};
