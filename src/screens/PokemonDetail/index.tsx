import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { Feather } from '@expo/vector-icons';
import { IPokemonData } from '../../components/BoxPokemon/Dtos/interface';
import { ITypesColor, TypesColor } from '../../constants';
import { PokeDetail } from './style';
import axios from 'axios';
import { ConditionalRender } from '../../components/ConditionalReder';
import normalize from 'react-native-normalize';

interface IProps {
  navigation: StackNavigationProp<any, any>,
  route: any
}

export const PokemonDetail: React.FC <IProps> = ({ route, navigation }) => {

  const { Pokemon_information } = route.params;
  const pokemon = Pokemon_information as IPokemonData;

  const ScrollX = useRef(new Animated.Value(0)).current;
  
  const [ pokemon_informations_others, set_pokemon_informations_others ] = useState([] as IPokemonData[]);

  const { width } = Dimensions.get('window');

  const CONTAINER_POKEMON_IMAGE_WIDTH = normalize(190);
  const SPACE = (width - CONTAINER_POKEMON_IMAGE_WIDTH) / 2;

  const getMoreTeenPokemons = async (): Promise<void> => {

    const initial_index = pokemon.id;
    const final_index = pokemon.id + 10;

    let local_data_sotrage = [] as IPokemonData[];

    for(let x = initial_index; x <= final_index; x++) {

      const pokemon_data = await axios.get<IPokemonData>(`https://pokeapi.co/api/v2/pokemon/${x}`);

      local_data_sotrage = [ ...local_data_sotrage, pokemon_data.data ];

    }

    set_pokemon_informations_others([ { name: 'space' } as any, ...local_data_sotrage, { name: 'space' } as any ]);

  }

  useEffect(() => {

    setTimeout(() => getMoreTeenPokemons(), 300);

  }, []);

  return (
    <View 
      style={
        [
          StyleSheet.absoluteFillObject, 
          PokeDetail.ContainerGlobal,
          { backgroundColor: TypesColor[pokemon.types[0].type.name as keyof ITypesColor] }
        ]
      }
    >
      <View style={PokeDetail.Header}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="heart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={PokeDetail.LineName}>
        <Text style={PokeDetail.TextNamePokemon} adjustsFontSizeToFit>{pokemon.name[0].toUpperCase()+pokemon.name.substring(1)}</Text>
        <Text style={PokeDetail.id}>#{pokemon.id}</Text>
      </View>
      <View style={PokeDetail.types}>
        {pokemon.types.map((dados, index) => (
          <View style={PokeDetail.ContainerType} key={index}>
            <Text style={PokeDetail.Typename}>{dados.type.name}</Text>
          </View>
        ))}
      </View>
      <ConditionalRender conditional={pokemon_informations_others.length}>
        <View style={PokeDetail.ContainerImage}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            scrollEventThrottle={16}
            overScrollMode='never'
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: ScrollX } } }],
              { useNativeDriver: false }
            )}
            contentContainerStyle={{ alignItems: 'center' }}
            snapToInterval={width - CONTAINER_POKEMON_IMAGE_WIDTH * 2}
            bounces={false}
            decelerationRate={0}
            snapToAlignment='center'
          >
            {pokemon_informations_others.map((data, index) => {

              const inputRange = [
                (index - 2) * CONTAINER_POKEMON_IMAGE_WIDTH,
                (index - 1) * CONTAINER_POKEMON_IMAGE_WIDTH,
                index * CONTAINER_POKEMON_IMAGE_WIDTH
              ];

              const transform = ScrollX.interpolate({
                inputRange,
                outputRange: [.3, 1, .3]
              });

              if(data.name == 'space') {

                return <View key={index} style={{ width: SPACE }} />

              }
              
              return (

                <SharedElement 
                  id={`${data.id}`} 
                  style={[PokeDetail.AnimatedImagePokemon]} 
                  key={index} 
                >
                  <Animated.Image 
                    style={[PokeDetail.AnimatedImagePokemon, { transform: [{ scale: transform }] }]} 
                    source={{uri: data.sprites.other.home.front_default}}
                  />
                </SharedElement>

              );

            })}
          </ScrollView>
        </View>
      </ConditionalRender>
      <ConditionalRender conditional={!pokemon_informations_others.length}>
        <View style={PokeDetail.ContainerImage}>
          <SharedElement id={`${pokemon.id}`} style={PokeDetail.AnimatedImagePokemon} >
            <Image style={PokeDetail.AnimatedImagePokemon} source={{uri: pokemon.sprites.other.home.front_default}} />
          </SharedElement>
        </View>
      </ConditionalRender>
    </View>
  );

}