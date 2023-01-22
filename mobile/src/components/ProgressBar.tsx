import { useEffect } from 'react';
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated';

interface ProgressBarProps {
    progress?: number;
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {

    const sharedProgress = useSharedValue(progress)

    const style = useAnimatedStyle(() => {
        return {
            // propriedades de estilização que queremos animar
            width: `${sharedProgress.value}%`
        }
    })

    useEffect(() => {
        sharedProgress.value = withDelay(100, withTiming(progress))
    }, [progress])

    return (
        <View className='w-full h-3 rounded-xl bg-zinc-700 mt-4'>
            <Animated.View
                className='h-3 rounded-xl bg-violet-600'
                // Aplicando o react-native-reanimated na transição de progresso
                style={style}
            />
        </View>
    )
}