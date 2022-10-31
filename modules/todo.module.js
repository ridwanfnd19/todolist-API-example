
const prisma = require('../helpers/database')
const joi = require('joi')

class _todo {
    listTodo = async (req) => {
        try {
            const list = await prisma.todo.findMany({
                where: {
                    userId: req.id
                }
            })

            return {
                status: 'true',
                code: 200,
                data: list
            }
        } catch (error) {
            console.log("ListTodo todo module Error:", error)

            return {
                status: false,
                error
            }
        }
    }

    createTodo = async (req) => {
        try {
            // console.log(req.id, req.body.description)
            const schema = joi.string().required()

            const validation = schema.validate(req.body.description)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            
            const add = await prisma.todo.create({
                data: {
                    description: req.body.description,
                    userId: req.id
                }
            })
            
            return {
                status: 'true',
                code: 201,
                data: add
            }

        } catch (error) {
            console.log("CreateTodo todo module Error:", error)

            return {
                status: false,
                code: 422,
                error
            }
        }
    }

    updateTodo = async (req) => {
        try {
            const schema = joi.object({
                id: joi.number().required(),
                description: joi.string()
            }).options({ abortEarly: false })

            const validation = schema.validate(req.body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const update = await prisma.todo.updateMany({
                where: {
                    id : req.body.id,
                    userId : req.id,
                },
                data: {
                    description: req.body.description,
                }
            })

            console.log(update)

            if (update.count == 0) {
                return {
                    status: 'false',
                    code: 423,
                    error: 'Data tidak tersedia'
                }
            }

            return {
                status: 'true',
                ket: 'Data Berhasil Terupdate', 
                data: update
            }
        } catch (error) {
            console.log("UpdateTodo todo module Error:", error)

            return {
                status: false,
                error
            }
        }
    }

    deleteTodo = async (req) => {
        try {
            const schema = joi.number().required()

            const validation = schema.validate(Number(req.params.id))

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await prisma.todo.deleteMany({
                where: {
                    id : Number(req.params.id),
                    userId : req.id
                },
            })

            if (del.count == 0) {
                return {
                    status: 'false',
                    code: 423,
                    error: 'Data ini bukan milik ada'
                }
            }

            return {
                status: 'true',
                ket: 'Data Berhasil Dihapus', 
                data: del
            }
        } catch (error) {
            console.log("DeleteTodo todo module Error:", error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _todo()
