const { PrismaClient } = require('@prisma/client');
const bcrypt= require('bcrypt')

const prisma = new PrismaClient();

async function main() {
    // await prisma.user.create({
    //     data: {
    //         name: 'Rangga',
    //         email: 'rangga@gmail.com',
    //         password: bcrypt.hashSync('Rangga12345', 10),
    //     },
    // }),

    // await prisma.user.create({
    //     data: {
    //         name: 'Rini',
    //         email: 'Rini@gmail.com',
    //         password: bcrypt.hashSync('Rini12345', 10),
    //         todo: {
    //             create : [
    //                 { description: 'Belajar WEB' },
    //             ]
    //         }
    //     },
    // })

    // await prisma.user.create({
    //     data: {
    //         name: 'Rani',
    //         email: 'Rani@gmail.com',
    //         password: bcrypt.hashSync('Rani12345', 10),
    //         todo: {
    //             create : [
    //                 { description: 'Belajar Backend' },
    //                 { description: 'Belajar Frontend' },
    //                 { description: 'Belajar WEB' },
    //             ]
    //         }
    //     },
    // })

    // await prisma.user.create({
    //     data: {
    //         name: 'Surya',
    //         email: 'Surya@gmail.com',
    //         password: bcrypt.hashSync('Surya12345', 10),
    //         todo: {
    //             create : [
    //                 { description: 'Belajar Android Developer' },
    //             ]
    //         }
    //     },
    // })

    // await prisma.todo.delete({
    //     where: { 
    //         id : 5
    //     },
    //     select: {
    //         id : true,
    //         description : true,
    //         created_at : true,
    //         updated_at : true,
    //         userId : true
    //     }
    // })

    await prisma.user.update({
        where : {
            id : 1
        },
        data : {
            todo : {
                create : [
                    {
                        description: "Belajar C#"
                    }
                ]
            }
        }
    })

    // await prisma.todo.update({
    //     where : { 
    //         id : 6
    //     },
    //     data : {
    //         description : 'Belajar WEB Progamming'
    //     }
    // })
    
    const allUsers = await prisma.user.findMany({
        where : { id : 5 },
        select: {
            name : true,
            email : true,
            todo : {
                select : {
                    description : true,
                    created_at : true,
                    updated_at : true
                }
            }
        },
    })

    console.dir(allUsers, { depth: null })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })