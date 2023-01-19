import { View, Text, ScrollView } from "react-native";

// Utils
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

// Components
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()

// Gerando os placeholders dos quadrados
const minimumSummaryDatesSizes = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

export function Home() {
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />


            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, index) => (
                        <Text
                            // Definindo o tamanho da letra do dia da semana igual ao do quadrado
                            style={{ width: DAY_SIZE }}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            key={`${weekDay} + ${index}`}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Dias que já se passaram */}
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => (
                            <HabitDay
                                key={date.toISOString()}
                            />
                        ))
                    }


                    {/* Placeholders dos dias a seguir */}


                    {
                        amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                            <View
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </View >
    )
}