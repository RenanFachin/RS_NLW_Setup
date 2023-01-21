import { FormEvent, useState } from 'react'
import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-fera',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export function NewHabitForm() {

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleCreateNewHabit(event: FormEvent) {
        event.preventDefault()

        console.log(title, weekDays)
    }

    function handleToggleWeekday(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            // se o weekDay, dado passado para a função, já estiver dentro do array do state weekdays: vamos remover ele do array
            // o filter edita o array e cria um novo
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)

            setWeekDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]

            setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form className="w-full flex flex-col mt-6" onSubmit={handleCreateNewHabit}>
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                autoFocus
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                onChange={e => setTitle(e.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">

                {
                    availableWeekDays.map((weekday, index) => {
                        return (
                            <Checkbox.Root
                                key={weekday}
                                className='flex items-center gap-3 group'
                                onCheckedChange={() => {
                                    handleToggleWeekday(index)
                                }}
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

                                <span className='text-white leading-tight'>
                                    {weekday}
                                </span>
                            </Checkbox.Root>
                        )
                    })
                }

            </div>

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}