import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

// Tipando o que vem de propriedade
interface HabitsListProps {
    date: Date;
    onCompletedChanged: (completed: number) => void
}

// Tipando o que vem da API
interface HabitsInfo {
    possibleHabits: Array<{
        id: string;
        title: string;
        create_at: string;
    }>,
    completedHabits: string[]
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {
        api.get('/day', {
            // Params quer dizer que será convertido para QUERY PARAMS
            params: {
                date: date.toISOString()
            }
        }).then(response => {
            setHabitsInfo(response.data)
        })
    }, [])

    // Desabilitando a alteração de uma data anterior a atual
    // endOf vai levar a data para o final do dia
    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

    // Sincronizando hábitos completados
    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`)

        // verificando se o hábito já estava marcado como completo
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        let completedHabits: string[] = []

        if (isHabitAlreadyCompleted) {
            //remover da lista
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            //adicionar na lista
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })

        onCompletedChanged(completedHabits.length)
    }

    return (
        <div className='mt-6 flex flex-col gap-3'>

            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                        className='flex items-center gap-3 group'
                    >

                        {/* Div é o quadrado */}
                        <div
                            // Esta propriedade group serve para utilziar uma alteração de propriedade do checkbox.root
                            className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                            <Checkbox.Indicator>

                                <Check
                                    size={20}
                                    className="text-white"
                                />

                            </Checkbox.Indicator>
                        </div>

                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                )
            })}



        </div>
    )
}