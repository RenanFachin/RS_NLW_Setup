import { TouchableOpacity, TouchableOpacityProps, Dimensions } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

import clsx from "clsx";
import dayjs from "dayjs";

// Quantidade de quadrados por linha
const WEEK_DAYS = 7

// Espaçamento dos lados da tela (32 é o espaço de cada lado, 2 lados e 5 são os espaços entre os 7 quadrados)
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

// Espaçamento entre os quadrados
export const DAY_MARGIN_BETWEEN = 8

// Tamanho do quadrado
const USER_SCREEN_WIDTH = Dimensions.get('screen').width
export const DAY_SIZE = ((USER_SCREEN_WIDTH) / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)


interface Props extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
}


export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) {

    // Fazendo o cálculo da % de hábitos concluídos me cada dia e aplicando estilos condicionais com base neste valor
    const amountAccomplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0

    const today = dayjs().startOf('day').toDate()
    const isCurrentDay = dayjs(date).isSame(today)

    return (
        <TouchableOpacity
            className={
                //Estilizações padrões para todos
                clsx("rounded-lg border-2 m-1", {
                    // condicionais
                    ["bg-zinc-900 border-zinc-800"]: amountAccomplishedPercentage === 0,
                    ["bg-violet-900 border-violet-700"]: amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
                    ["bg-violet-800 border-violet-600"]: amountAccomplishedPercentage > 20 && amountAccomplishedPercentage < 40,
                    ["bg-violet-700 border-violet-500"]: amountAccomplishedPercentage > 40 && amountAccomplishedPercentage < 60,
                    ["bg-violet-600 border-violet-500"]: amountAccomplishedPercentage > 60 && amountAccomplishedPercentage < 80,
                    ["bg-violet-500 border-violet-400"]: amountAccomplishedPercentage > 80, 
                    ["border-slate-200 border-[3px]"]: isCurrentDay
                })
            }
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        />


    )
}