import React, { useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import { IPokemonData } from '../BoxPokemon/Dtos/interface';
import Animated, { cancelAnimation, Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Style } from './style';
import PokeBall from '../../assets/pokeball.png';

interface IProps {
  pokemon_id: number,
  index: number,
  pokemon_data: IPokemonData,
  scroll_position: Animated.SharedValue<number>
}

const { width } = Dimensions.get('window');

export const Pokemon: React.FC<IProps> = (props) => {

  const animated_content = useAnimatedStyle(() => {
    const translateX = interpolate(
      props.scroll_position.value,
      [(props.index - 1) * width, width * props.index, (props.index + 1) * width],
      [-width / 2, 0, width / 2]
    )

    const scale = interpolate(
      props.scroll_position.value,
      [(props.index - 1) * width, width * props.index, (props.index + 1) * width],
      [0.45, 1, 0.45]
    )

    return {
      transform: [{ translateX }, { scale }]
    }
  });

  const spinning_value = useSharedValue(0);

  const animation_spinning = useAnimatedStyle(() => {

    const opacity = interpolate(
      props.scroll_position.value,
      [(props.index - 1) * width, width * props.index, (props.index + 1) * width],
      [0, 0.5, 0]
    )

    return {
      opacity: opacity,
      transform: [
        {
          rotateZ: `${spinning_value.value}deg`,
        }
      ]
    }
  });

  useEffect(() => {

    spinning_value.value = withRepeat(
      withTiming(360, {
        duration: 4000,
        easing: Easing.linear
      }),
      -1
    );

    return () => cancelAnimation(spinning_value)

  }, [])

  return (
    <Animated.View style={[
      Style.ContainerImagePokemonMain,
      { width: width },
      animated_content
    ]}>
      <Animated.Image
        style={[Style.ImageContent, animation_spinning]}
        source={PokeBall}
      />
      <Image
        style={[Style.AnimatedImagePokemon]}
        source={{ uri: props.pokemon_data?.sprites?.other?.home?.front_default }}
      />
    </Animated.View>
  );
}