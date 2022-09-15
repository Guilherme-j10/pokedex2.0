import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import normalize from 'react-native-normalize';

export const PokemonListStyle = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight
  },
  ContainerHeaderGlobal: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(20),
    marginBottom: normalize(20)
  },
  ContainerHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(10)
  },
  TextContent: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 30,
    color: '#',
    marginTop: normalize(20)
  }
});