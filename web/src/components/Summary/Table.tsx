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


export function Table() {
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
                        return (
                            (
                                <HabitDay
                                    key={date.toString()} // o KEY precisa ser uma string
                                    amount={5}
                                    completed={Math.round(Math.random() * 5)}
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