import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning"
import { DaysColumn } from "./DaysColumn"
import { HabitDay } from "./HabitDay"

// Array auxiliar
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

// Minimo de quadrado que queremos me tela
const minimiumSummaryDatesSize = 18 * 7

// Quantos quadrados faltam para completar este mínimo de 18 semanas
const amountOfDaysToFill = minimiumSummaryDatesSize - summaryDates.length

// Tipando o que vem da API
type Summary = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number
}>

export function Table() {
    const [summary, setSummary] = useState<Summary>([])

    // chamada HTTP para a summary
    useEffect(() => {
        api.get('summary').then(response => {
            setSummary(response.data)
        })
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">

                {
                    // A segunda posição do map é o indice dele. Neste caso utilizamos para interpolar uma key única para cada item
                    weekDays.map((weekday, i) => {
                        return (
                            <DaysColumn
                                key={`${weekday}-${i}`}
                                weekday={weekday}
                            />
                        )
                    })
                }

            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    summaryDates.map(date => {
                        // Verificar se o dia que está sendo percorrido está dentro do summary da API
                        const dayInSummary = summary.find(day => {
                            // Validando se as datas são iguais com a função isSame
                            return dayjs(date).isSame(day.date, 'day')
                        })

                        return (
                            (
                                <HabitDay
                                    key={date.toString()} // o KEY precisa ser uma string
                                    date={date}
                                    amount={dayInSummary?.amount}
                                    completed={dayInSummary?.completed}
                                />
                            )
                        )
                    })
                }

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                    return (
                        <div
                            key={i}
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                        />
                    )
                })}
            </div>
        </div>
    )
}