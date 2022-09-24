import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { Feather } from '@expo/vector-icons';
import { IPokemonData } from '../../components/BoxPokemon/Dtos/interface';
import { ITypesColor, TypesColor } from '../../constants';
import { PokeDetail } from './style';

interface IProps {
  navigation: StackNavigationProp<any, any>,
  route: any
}

export const PokemonDetail: React.FC <IProps> = ({ route, navigation }) => {

  const { Pokemon_information } = route.params;
  const pokemon = Pokemon_information as IPokemonData;

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
      <View style={PokeDetail.ContainerImage}>
        <SharedElement id={`${pokemon.id}`} style={PokeDetail.AnimatedImagePokemon} >
          <Image style={PokeDetail.AnimatedImagePokemon} source={{uri: pokemon.sprites.other.home.front_default}} />
        </SharedElement>
      </View>
    </View>
  );

}