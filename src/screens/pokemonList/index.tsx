import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native'; 
import { PokemonListStyle } from './style';
import { Feather } from '@expo/vector-icons';
import { BasicInfo, IPokemonList } from './Dtos/interface';
import axios from 'axios';
import normalize from 'react-native-normalize';
import BoxPokemon from '../../components/BoxPokemon';

export const PokemonList: React.FC = () => {

  const [ Next_Request, setNext_Request ] = useState('');
  const [ data, setdata ] = useState<BasicInfo[]>([]);

  const getPokemonData = async () => {

    const pokemon_list_request = await axios.get(Next_Request.length ? Next_Request : 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')

    const pokemon_list = pokemon_list_request.data as IPokemonList;

    setNext_Request(pokemon_list.next);

    setdata(data.concat(pokemon_list.results));

  };

  const RenderItem = useCallback((data: any) => <BoxPokemon data={data.item} second={false} />, []);
  const keyExtractor = useCallback((data: BasicInfo) => data.name, []);
  const getItemLayout = useCallback((_: any, index: any) => ({
    length: normalize(140) + normalize(20), 
    offset: (normalize(140) + normalize(20)) * index,
    index: index
  }), []);

  useEffect(() => {

    getPokemonData();

  }, [])

  return(
    <View style={PokemonListStyle.Container}>
      <View style={PokemonListStyle.ContainerHeaderGlobal}>
        <View style={PokemonListStyle.ContainerHeader}>
          <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#444" />
          </TouchableOpacity>
        </View>
        <Text style={PokemonListStyle.TextContent}>Pokedex</Text>
      </View>
      <FlatList
        data={data} 
        keyExtractor={keyExtractor}  
        overScrollMode='never'
        decelerationRate={0.96}
        windowSize={62}
        scrollEventThrottle={16}
        onEndReachedThreshold={1}
        onEndReached={() => getPokemonData()}
        numColumns={2}
        columnWrapperStyle={{ alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: normalize(20) }}
        renderItem={RenderItem}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}