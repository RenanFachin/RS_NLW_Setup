import { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";


// Components
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-Feira', 'Sexta-feira', 'Sábado']


export function New() {
    const [title, setTitle] = useState('')

    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDays(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            // Esta condição significa que a pessoa está querendo desmarcar
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))

        } else {
            // Armazenando tudo que já estava no array e mais o que foi marcado
            setWeekDays(prevState => [
                ...prevState,
                weekDayIndex
            ])
        }
    }

    async function handleCreateNewHabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                Alert.alert('Novo hábito', 'Informa o nome do hábito e escolha a periodiciodade.')
            }

            await api.post('/habits', {title, weekDays})
            setTitle('')
            setWeekDays([])

            Alert.alert('Novo hábito', 'Hábito adicionado com sucesso a sua rotina!')

        } catch (error) {
            Alert.alert("Ops", 'Não foi possível cadastrar um novo hábito')
            console.log(error)
        }
    }


    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual o seu comprometimento?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border-zinc-800 text-white border-2 focus:border-green-400 "
                    placeholder="Ex: Exercícios, dormim bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    // Manipulação dos states
                    onChangeText={text => setTitle(text)}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>

                {
                    availableWeekDays.map((weekDay, index) => (
                        <CheckBox
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleToggleWeekDays(index)}
                        />
                    ))
                }

                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}