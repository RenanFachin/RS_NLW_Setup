import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

// Tipando o que vem de propriedade
interface HabitsListProps {
    date: Date
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

export function HabitsList({ date }: HabitsListProps) {

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

    return (
        <div className='mt-6 flex flex-col gap-3'>

            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
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