import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'

export function Routes() {
    return (
        // Esta view é para evitar glitch na navegação entre as telas
        <View className='flex-1 bg-background'>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>
    )
}