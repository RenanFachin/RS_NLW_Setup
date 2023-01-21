interface ProgressBarProps {
    progress: number
}


export function ProgressBar({ progress }: ProgressBarProps) {
    const progressStyles = {
        width: `${progress}%`
    }

    return (
        < div className='h-3 rounded-xl bg-zinc-700 w-full mt-4' >
            {/* Barra de progresso do jeito "convencional" */}
            <div
                role="progressbar"
                aria-label="Progresso de haábitos completados neste dia"
                aria-valuenow={progress}
                className='h-3 rounded-xl bg-violet-600 transition-all'
                style={progressStyles}
            />
        </div >
    )
}