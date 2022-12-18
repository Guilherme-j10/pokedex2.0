import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { PokemonList } from './src/screens/pokemonList';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Ubuntu_400Regular, Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import { PokemonDetail } from './src/screens/PokemonDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider, QueryClient } from 'react-query';

const query_client = new QueryClient();

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_300Light,
    Ubuntu_500Medium
  });

  const spash = useCallback(async () => {

    if (fontsLoaded) await SplashScreen.hideAsync();

  }, [fontsLoaded])

  spash();

  if (!fontsLoaded) return null;

  const forFade = ({ current }: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <QueryClientProvider client={query_client}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              presentation: 'card'
            }}
          >
            <Stack.Screen name='PokeList' component={PokemonList} />
            <Stack.Screen name='PekomonDetail' component={PokemonDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>

    </>
  );
}