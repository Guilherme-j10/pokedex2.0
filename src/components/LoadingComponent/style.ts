import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

export const Style = StyleSheet.create({
  container_global: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  textStyle: {
    color: '#fff',
    fontSize: normalize(20),
    marginTop: normalize(20),
    fontFamily: 'Ubuntu_500Medium'
  }
});