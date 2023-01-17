
interface HabitsProps {
    completed: number;
}

export function Habit({ completed }: HabitsProps) {
    return (
        <div 
        className="bg-zinc-800 w-10 h-10 text-white rounded m-2 text-center flex items-center justify-center">
                {completed}
        </div>
    )
}