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


    // Completar / não completar um hábito
    app.patch('/habits/:id/toggle', async (request) => {
        const toggleHabitParams = z.object({
            id: z.string().uuid() // Validando que é um UUID com o ZOD
        })

        const { id } = toggleHabitParams.parse(request.params)

        // Completando apenas o hábito do dia vigente(atual)
        const today = dayjs().startOf('day').toDate()


        // Procurando o dia onde a data seja igual a data de hoje
        let day = await prisma.day.findUnique({
            where: {
                date: today,
            }
        })

        // Caso não exista, iremos criar o dado 
        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today,
                }
            })
        }

        // Buscando o registro na tabeça dayHabit para verificar se o hábito já estava marcado como completo
        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id,
                }
            }
        })

        if (dayHabit) {
            // Remover a marcação de completo
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })
        } else {
            // Caso ele não tenha marcado como completo, iremos marcar agora
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id
                }
            })
        }



    })

    // Rota de resumo de dias
    app.get('/summary', async () => {
        const summary = await prisma.$queryRaw`
          SELECT 
            D.id, 
            D.date,
            (
              SELECT 
                cast(count(*) as float)
              FROM day_habits DH
              WHERE DH.day_id = D.id
            ) as completed,
            (
              SELECT
                cast(count(*) as float)
              FROM habit_week_days HDW
              JOIN habits H
                ON H.id = HDW.habit_id
              WHERE
                HDW.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                AND H.created_at <= D.date
            ) as amount
          FROM days D
        `

        return summary
    })
}