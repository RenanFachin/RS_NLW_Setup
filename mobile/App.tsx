// Transform dayjs to pt-BR format
import './src/lib/dayjs'

// External Fonts
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'

// Components
import { StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';

// Navegação
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }


  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}
