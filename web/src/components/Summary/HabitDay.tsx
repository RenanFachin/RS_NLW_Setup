import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import { Check } from 'phosphor-react';

interface HabitDayProps {
    completed: number;
    amount: number;
}

export function HabitDay({ amount, completed }: HabitDayProps) {
    // gerar um % com base no completed e amount
    const completedPercetage = Math.round((completed / amount) * 100)


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
                    <span className='font-semibold text-zinc-400'>Quinta-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>19/01</span>

                    <ProgressBar progress={completedPercetage} />

                    <div className='mt-6 flex flex-col gap-3'>
                        <Checkbox.Root className='flex items-center gap-3 group'>

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
                                Beber 2L de água
                            </span>
                        </Checkbox.Root>
                    </div>

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