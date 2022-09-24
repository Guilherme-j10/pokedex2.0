import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

export const StyleBox = StyleSheet.create({
  BoxContainer: {
    height: normalize(140),
    marginBottom: normalize(20),
    width: normalize(160),
    borderRadius: 10,
    backgroundColor: 'red',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10)
  },
  titleId: {
    fontFamily: 'Ubuntu_500Medium',
    color: '#fff',
    opacity: .9,
    textAlign: 'right'
  },
  BoxPokemonInformation: {
    marginTop: normalize(0)
  }, 
  PokemonName: {
    fontFamily: 'Ubuntu_500Medium',
    color: '#fff',
    fontSize: 13,
    marginBottom: normalize(10)
  },
  TitleTypeName: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 11,
    color: '#fff'
  },
  ContainerType: {
    width: normalize(60),
    backgroundColor: '#ffffff52',
    borderRadius: normalize(50),
    paddingVertical: normalize(6),
    alignItems: 'center',
    marginBottom: normalize(5)
  },
  ImageContent: {
    width: normalize(80),
    height: normalize(80),
    position: 'absolute',
    bottom: normalize(5),
    right: normalize(5)
  },
  containerLoading: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextMessage: {
    fontFamily: 'Ubuntu_500Medium',
    marginTop: normalize(10),
    color: '#666'
  }
})