import React, {  useEffect, useState, memo } from 'react';
import { View, Text } from 'react-native';
import { BasicInfo } from '../../screens/pokemonList/Dtos/interface';
import { StyleBox } from './style';
import axios from 'axios';
import { IPokemonData } from './Dtos/interface';
import { TypesColor, ITypesColor } from '../../constants';
import { ConditionalRender } from '../ConditionalReder';

interface IProps {
  data: BasicInfo,
  second: boolean
}

const BoxPokemon: React.FC <IProps> = (props) => {

  const [ Pokemon_information, setPokemon_information ] = useState({} as IPokemonData);

  const getPokemonInformation = async (): Promise<void> => {

    const request = await axios.get(props.data.url);

    setPokemon_information(request.data);

  } 

  useEffect(() => { getPokemonInformation(); }, []);
  
  return(
    <View style={[
      StyleBox.BoxContainer,
      { backgroundColor: TypesColor[Pokemon_information.types ? Pokemon_information?.types[0]?.type?.name as keyof ITypesColor : 'standard'] }
    ]}>
      <ConditionalRender conditional={Object.keys(Pokemon_information).length}>
        <Text style={StyleBox.titleId}>#{Pokemon_information.id}</Text>
        <View style={StyleBox.BoxPokemonInformation}>
          <Text style={StyleBox.PokemonName}>
            {Pokemon_information.name ? Pokemon_information.name[0].toUpperCase()+Pokemon_information.name.substring(1) : ''}
          </Text>
          {Pokemon_information.types ? Pokemon_information.types.map((dados, index) => (
            <View key={index} style={StyleBox.ContainerType}>
              <Text style={StyleBox.TitleTypeName}>{dados.type.name}</Text>
            </View>
          )) : false}
        </View>
      </ConditionalRender>
    </View>
  );
}

export default memo(BoxPokemon);