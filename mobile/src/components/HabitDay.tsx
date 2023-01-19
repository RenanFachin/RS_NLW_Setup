import { TouchableOpacity, Dimensions } from "react-native";

// Quantidade de quadrados por linha
const WEEK_DAYS = 7

// Espaçamento dos lados da tela (32 é o espaço de cada lado, 2 lados e 5 são os espaços entre os 7 quadrados)
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

// Espaçamento entre os quadrados
export const DAY_MARGIN_BETWEEN = 8

// Tamanho do quadrado
const USER_SCREEN_WIDTH = Dimensions.get('screen').width
export const DAY_SIZE = ((USER_SCREEN_WIDTH) / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)


export function HabitDay() {
    return (
        <TouchableOpacity 
        activeOpacity={0.7}
        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800" 
        style={{width: DAY_SIZE, height: DAY_SIZE}}
        />


    )
}