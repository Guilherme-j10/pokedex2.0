import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { IPokemonData } from '../../components/BoxPokemon/Dtos/interface';
import { ITypesColor, TypesColor } from '../../constants';
import { PokeDetail } from './style';
import axios from 'axios';
import { ConditionalRender } from '../../components/ConditionalReder';
import Animated, { cancelAnimation, Easing, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Pokemon } from '../../components/Pokemon';
import { useQuery } from 'react-query';
import { v4 } from 'uuid';
import { LoadingComponent } from '../../components/LoadingComponent';


interface IProps {
  navigation: StackNavigationProp<any, any>,
  route: any
}

const { width } = Dimensions.get('window');

export const PokemonDetail: React.FC<IProps> = ({ route, navigation }) => {

  const { Pokemon_information } = route.params as { Pokemon_information: IPokemonData };

  const getMoreTeenPokemons = async (): Promise<IPokemonData[]> => {

    const initial_index = Pokemon_information.id;
    const final_index = Pokemon_information.id + 10;

    let local_data_sotrage = [] as IPokemonData[];

    for (let x = initial_index; x <= final_index; x++) {

      const pokemon_data = await axios.get<IPokemonData>(`https://pokeapi.co/api/v2/pokemon/${x}`);

      local_data_sotrage = [...local_data_sotrage, pokemon_data.data];

    }

    return local_data_sotrage;

  }

  const { data, isLoading } = useQuery(`pokemon:${Pokemon_information.id}`, () => getMoreTeenPokemons()) as { data: IPokemonData[], isLoading: boolean }

  const position_x = useSharedValue(0);

  const scroll_events = useAnimatedScrollHandler({
    onScroll: (event) => {
      position_x.value = event.contentOffset.x
    }
  });

  const colors_interpolated = useAnimatedStyle(() => {

    const interpolated_color = interpolateColor(
      position_x.value,
      (data || []).length ? (data || []).map((_, index) => width * index) : [width, width * 2],
      (data || []).length ? (data || []).map((pokemon) => TypesColor[pokemon.types[0].type.name as keyof ITypesColor]) :
        [
          TypesColor[Pokemon_information.types[0].type.name as keyof ITypesColor],
          TypesColor[Pokemon_information.types[0].type.name as keyof ITypesColor]
        ]
    )

    return {
      backgroundColor: interpolated_color
    }
  }, [(data || [])]);

  return (
    <Animated.View
      style={
        [
          StyleSheet.absoluteFillObject,
          PokeDetail.ContainerGlobal,
          { backgroundColor: TypesColor[Pokemon_information.types[0].type.name as keyof ITypesColor] },
          colors_interpolated
        ]
      }
    >
      <ConditionalRender conditional={isLoading}>
        <LoadingComponent />
      </ConditionalRender>
      <ConditionalRender conditional={!isLoading}>
        <View style={PokeDetail.Header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="heart" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={PokeDetail.LineName}>
          <Text style={PokeDetail.TextNamePokemon} adjustsFontSizeToFit>{Pokemon_information.name[0].toUpperCase() + Pokemon_information.name.substring(1)}</Text>
          <Text style={PokeDetail.id}>#{Pokemon_information.id}</Text>
        </View>
        <View style={PokeDetail.types}>
          {Pokemon_information.types.map((dados, index) => (
            <View style={PokeDetail.ContainerType} key={index}>
              <Text style={PokeDetail.Typename}>{dados.type.name}</Text>
            </View>
          ))}
        </View>
        <ConditionalRender conditional={(data || []).length}>
          <View style={PokeDetail.ContainerImage}>
            <Animated.ScrollView
              horizontal={true}
              onScroll={scroll_events}
              overScrollMode='never'
              showsHorizontalScrollIndicator={false}
              snapToInterval={width}
              decelerationRate='fast'
              scrollEventThrottle={16}
            >
              {(data || []).map((pokemon, index) => (
                <Pokemon
                  key={index}
                  pokemon_data={pokemon}
                  index={index}
                  pokemon_id={pokemon.id}
                  scroll_position={position_x}
                />
              ))}
            </Animated.ScrollView>
          </View>
        </ConditionalRender>
      </ConditionalRender>
    </Animated.View>
  );

}