
interface DaysColumnProps {
    weekday: string
}

export function DaysColumn({ weekday }: DaysColumnProps) {
    return (
        <div className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
            {weekday}
        </div>
    )
}