import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'; 
import { Style } from './style';

export const LoadingComponent: React.FC = () => {
  return (
    <View style={Style.container_global} >
      <ActivityIndicator color={'#fff'} size='large' />
      <Text style={Style.textStyle} >Carregando dados...</Text>
    </View>
  );
}