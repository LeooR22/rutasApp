import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {PermissionsContext} from '../context/PermissionsContext';
import {BlackButton} from '../components/BlackButton';

export const PermissionScreen = () => {
  const {permissions, askLocationPermissions} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario el uso del GPS para usar esta aplicacion
      </Text>
      <BlackButton title="Permiso" onPress={askLocationPermissions} />
      <Text style={{marginTop: 20}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 200,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
});
