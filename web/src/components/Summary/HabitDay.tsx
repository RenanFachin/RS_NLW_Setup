import * as Popover from '@radix-ui/react-popover';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { ProgressBar } from './ProgressBar';
import { HabitsList } from './HabitsList';

interface HabitDayProps {
    date: Date;
    completed?: number;
    amount?: number;
}

export function HabitDay({ amount = 0, completed = 0, date }: HabitDayProps) {
    // gerar um % com base no completed e amount
    const completedPercetage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    return (
        <Popover.Root>
            <Popover.Trigger className={
                clsx('w-10 h-10 border-2 rounded-lg', {
                    'bg-zinc-900 border-zinc-800': completedPercetage === 0,
                    'bg-violet-900 border-violet-700': completedPercetage > 0 && completedPercetage < 20,
                    'bg-violet-800 border-violet-600': completedPercetage >= 20 && completedPercetage < 40,
                    'bg-violet-700 border-violet-500': completedPercetage >= 40 && completedPercetage < 60,
                    'bg-violet-600 border-violet-500': completedPercetage >= 60 && completedPercetage < 80,
                    'bg-violet-500 border-violet-400': completedPercetage >= 80,
                })
            } />



            <Popover.Portal>

                <Popover.Content
                    className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'
                    sideOffset={5}
                >
                    <span className='font-semibold text-zinc-400'>
                        {dayOfWeek}
                    </span>

                    <span className='mt-1 font-extrabold leading-tight text-3xl'>
                        {dayAndMonth}
                    </span>

                    <ProgressBar progress={completedPercetage} />

                    <HabitsList 
                        date={date}
                    />


                    {/* Este PopOver.arrow é a seta do content até o quadrado */}
                    <Popover.Arrow
                        height={10}
                        width={20}
                        className='fill-zinc-900'
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>

    )
}