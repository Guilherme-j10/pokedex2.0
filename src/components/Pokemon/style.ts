import { StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

export const Style = StyleSheet.create({
  ContainerImagePokemonMain: {
    height: normalize(190),
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  AnimatedImagePokemon: {
    width: normalize(190),
    height: normalize(190)
  },
  ImageContent:{
    width: normalize(190),
    position: 'absolute',
    height: normalize(190),
    bottom: 0,
    opacity: 0.5
  }
});