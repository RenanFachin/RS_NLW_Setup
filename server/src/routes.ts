import dayjs from 'dayjs'
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
    app.post('/habits', async (request) => {
        // Validação de dados
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
            )
        })

        const { title, weekDays } = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate() //startof zera as horas do dia


        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async (request) => {
        const getDayParms = z.object({
            date: z.coerce.date()
            // convertendo uma string em um date. Pq o frontend não consegue enviar date
        })

        // localhost:3333/day?date=2023-01....
        const { date } = getDayParms.parse(request.query)

        const pasedDate = dayjs(date).startOf('day')

        const weekDay = pasedDate.get('day')

        // todos os hábitos possível
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay
                    }
                }
            }
        })

        // hábitos que já foram completados
        const day = await prisma.day.findUnique({
            where: {
                date: pasedDate.toDate()
            },
            include: {
                dayHabits: true
            }
        })
        const completedHabits = day?.dayHabits.map(dayHabit => {
            // retornando apenas os id do hábitos completados
            return dayHabit.habit_id
        })

        return {
            possibleHabits,
            completedHabits
        }
    })
}

