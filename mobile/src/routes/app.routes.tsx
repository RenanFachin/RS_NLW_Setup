import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()
// Navigator cria o escopo
// Screen define para onde o usuário será direcionado e qual tela será renderizada

import { Home } from '../screens/Home'
import { Habit } from '../screens/Habit'
import { New } from '../screens/New'


export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen
                name='home'
                component={Home}
            />

            <Screen
                name='habit'
                component={Habit}
            />

            <Screen
                name='new'
                component={New}
            />
        </Navigator>
    )
}