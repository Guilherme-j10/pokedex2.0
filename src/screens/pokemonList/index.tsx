import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native'; 
import { PokemonListStyle } from './style';
import { Feather } from '@expo/vector-icons';
import { BasicInfo, IPokemonList } from './Dtos/interface';
import axios from 'axios';
import normalize from 'react-native-normalize';
import BoxPokemon from '../../components/BoxPokemon';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';

interface IProps {
  navigation: StackNavigationProp<any, any>
}

export const PokemonList: React.FC <IProps> = ({ navigation }) => {

  const [ Next_Request, setNext_Request ] = useState('');
  const [ data, setdata ] = useState<BasicInfo[]>([]);

  const scrollHeightClient = useSharedValue(0);

  const getPokemonData = async () => {

    const pokemon_list_request = await axios.get(Next_Request.length ? Next_Request : 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')

    const pokemon_list = pokemon_list_request.data as IPokemonList;

    setNext_Request(pokemon_list.next);

    setdata(data.concat(pokemon_list.results));

  };

  const RenderItem = useCallback((data: any) => <BoxPokemon data={data.item} navigation={navigation} second={false} />, []);
  const keyExtractor = useCallback((data: BasicInfo) => data.name, []);
  const getItemLayout = useCallback((_: any, index: any) => ({
    length: normalize(140) + normalize(20), 
    offset: (normalize(140) + normalize(20)) * index,
    index: index
  }), []);

  const onScrollEvent = useAnimatedScrollHandler((event: any) => {
    scrollHeightClient.value = event.contentOffset.y;
  });

  const min_height = normalize(60);
  const max_height = normalize(110);

  const AnimatedHeightbar = useAnimatedStyle(() => {

    const interpolated_value = interpolate(
      scrollHeightClient.value,
      [0, 100],
      [max_height, min_height],
      Extrapolate.CLAMP
    );

    return {
      height: interpolated_value
    }

  });

  const AnimatedArrowBack = useAnimatedStyle(() => {

    const interpolated_opacity = interpolate(
      scrollHeightClient.value,
      [0, 80],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity: interpolated_opacity
    }

  });

  const normal_padding = normalize(120);
  const custom_padding = normalize(155);

  const animatedPaddingTopList = useAnimatedStyle(() => {

    const interpolated_opacity = interpolate(
      scrollHeightClient.value,
      [0, 100],
      [normal_padding, custom_padding],
      Extrapolate.CLAMP
    );

    return {
      paddingTop: interpolated_opacity
    }

  })

  useEffect(() => {

    getPokemonData();

  }, [])

  return(
    <View style={PokemonListStyle.Container}>
      <Animated.FlatList
        data={data}
        onScroll={onScrollEvent}
        keyExtractor={keyExtractor}  
        overScrollMode='never'
        decelerationRate={0.96}
        windowSize={124}
        scrollEventThrottle={16}
        onEndReachedThreshold={1}
        onEndReached={() => getPokemonData()}
        numColumns={2}
        style={animatedPaddingTopList}
        columnWrapperStyle={{ alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: normalize(20) }}
        renderItem={RenderItem}
        getItemLayout={getItemLayout}
      />
      <Animated.View style={[AnimatedHeightbar, PokemonListStyle.ContainerHeaderGlobal]}>
        <View style={PokemonListStyle.ContainerHeader}>
          <Animated.View style={AnimatedArrowBack}>
            <TouchableOpacity>
              <Feather name="arrow-left" size={24} color="#444" />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={PokemonListStyle.fixedButton}>
            <Feather name="menu" size={24} color="#444" />
          </TouchableOpacity>
        </View>
        <Text style={PokemonListStyle.TextContent}>Pokedex</Text>
      </Animated.View>
    </View>
  );
}