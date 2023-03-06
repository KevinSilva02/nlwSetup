import './src/lib/dayjs';

import {  View, StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold ,Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

import { Loadiang } from './src/components/Loading';
import { Routes } from './src/routes';
import { SingIn } from './src/screens/SingIn';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold
  });

  if(!fontsLoaded){
    return <Loadiang />
  }


  return (
    <>
      <Routes />
      <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent />
    </>
  );
}
