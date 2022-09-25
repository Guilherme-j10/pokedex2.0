import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import Constants from 'expo-constants';

export const PokeDetail = StyleSheet.create({
  ContainerGlobal: {
    paddingTop: Constants.statusBarHeight,
  },
  Header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(30),
    paddingHorizontal: normalize(30)
  },
  AnimatedImagePokemon: {
    width: normalize(190),
    height: normalize(190)
  },
  LineName: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(25),
    paddingHorizontal: normalize(30)
  },
  TextNamePokemon: {
    fontFamily: 'Ubuntu_500Medium',
    color: '#fff',
    fontSize: 30
  },
  id: {
    fontFamily: 'Ubuntu_500Medium',
    color: '#fff',
    fontSize: 15
  },
  types: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: normalize(30)
  },
  ContainerType: {
    width: normalize(70),
    backgroundColor: '#ffffff52',
    borderRadius: normalize(50),
    paddingVertical: normalize(6),
    alignItems: 'center',
    marginTop: normalize(10),
    marginRight: normalize(15)
  },
  Typename: {
    fontFamily: 'Ubuntu_400Regular',
    color: '#fff'
  },
  ContainerImage: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(70)
  }
});