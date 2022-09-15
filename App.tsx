import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokemonList } from './src/screens/pokemonList';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Ubuntu_400Regular, Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_300Light,
    Ubuntu_500Medium
  });

  const spash = useCallback(async () => {

    if(fontsLoaded) await SplashScreen.hideAsync();

  }, [fontsLoaded])

  spash();

  if(!fontsLoaded) return null;
 
  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='PokeList' component={PokemonList} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}