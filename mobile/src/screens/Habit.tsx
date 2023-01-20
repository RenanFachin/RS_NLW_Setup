import { View, ScrollView, Text } from "react-native";
import dayjs from "dayjs";

// Componentes
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";

import { useRoute } from '@react-navigation/native' // hook utilizado para obter os parâmetros da rota
import { CheckBox } from "../components/CheckBox";

// Tipando o que será enviado por parâmetro
interface ParamsProps {
    date: string;
}


export function Habit() {
    const route = useRoute()

    const { date } = route.params as ParamsProps

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>

                <ProgressBar />

                <View className="mt-6">
                    <CheckBox title="Beber 2L de água" checked/>
                    <CheckBox title="Dormir bem"/>
                </View>

            </ScrollView>

        </View>
    )
}