import { useEffect, useState } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import dayjs from "dayjs";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

// Componentes
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";

import { useRoute } from '@react-navigation/native' // hook utilizado para obter os parâmetros da rota
import { CheckBox } from "../components/CheckBox";
import clsx from "clsx";

// Tipando o que será enviado por parâmetro
interface ParamsProps {
    date: string;
}

// Tipando o state que vai armazenar as infos que vem da API
interface DayInfoProps {
    completedHabits: string[];
    possibleHabits: {
        id: string;
        title: string;
    }[]
}


export function Habit() {
    const route = useRoute()

    const { date } = route.params as ParamsProps

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')


    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    // Verifica se existe habitos, caso exista, iremos calcular a % de conclusão deles para depois aplicar na barra de progresso
    const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    // Verificando se a data é antiga e desabilitando a sua alteração
    const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

    async function fetchHabits() {
        try {
            setLoading(true)

            const response = await api.get('/day', {
                params: {
                    date: date
                }
            })

            setDayInfo(response.data)
            setCompletedHabits(response.data.completedHabits)

        } catch (error) {
            console.log(error)
            Alert.alert("Ops", 'Não foi possível carregar as suas informações.')
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string) {
        try {

            // mandando para api 
            await api.patch(`/habits/${habitId}/toggle`)

            if (completedHabits.includes(habitId)) {
                // desabilitando algo que já está marcado como feito
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            } else {
                // Marcando um novo hábito como completo
                setCompletedHabits(prevState => [...prevState, habitId])
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Ops', 'Não foi possível atualizar o status do hábito')
        }


    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

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

                <ProgressBar
                    progress={habitsProgress}
                />

                <View className={clsx(
                    "mt-6", {
                    ["opacity-40"]: isDateInPast
                }
                )}>
                    {
                        dayInfo?.possibleHabits ?
                            dayInfo?.possibleHabits.map(habit => (

                                <CheckBox
                                    key={habit.id}
                                    title={habit.title}
                                    checked={completedHabits.includes(habit.id)}
                                    disabled={isDateInPast}
                                    onPress={() => handleToggleHabit(habit.id)}
                                />
                            ))
                            :
                            <HabitsEmpty />
                    }
                </View>

                {
                    isDateInPast && (
                        <Text className="text-red-400 mt-10 text-center border-2 border-red-400 p-3 rounded-lg">
                            Você não pode editar um hábito de um dia no passado!
                        </Text>
                    )
                }

            </ScrollView>

        </View>
    )
}