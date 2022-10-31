// berisi fungsi2 berkaitan query ke database

const prisma = require('../helpers/database')
const bcrypt= require('bcrypt')
const joi = require('joi')

class _user {
    listUser = async () => {
        try {
            const list = await prisma.user.findMany()

            return {
                status: 'true',
                code: 200,
                data: list
            }
        } catch (error) {
            console.log("ListUser user module Error:", error)

            return {
                status: false,
                error
            }
        }
    }

    createUser = async (body) => {
        try {
            const schema = joi.object({
                name: joi.string().required(),
                email: joi.string().required(),
                password: joi.string().required()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const password = bcrypt.hashSync(body.password, 10)
            
            const add = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password,
                }
            })
            
            return {
                status: 'true',
                code: 201,
                data: add
            }

        } catch (error) {
            console.log("CreateUser user module Error:", error)

            return {
                status: false,
                code: 422,
                error
            }
        }
    }

    updateUser = async (body) => {
        try {
            const schema = joi.object({
                id: joi.number().required(),
                name: joi.string(),
                email: joi.string(),
                password: joi.string(),
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            if (body.password) {
                body.password = bcrypt.hashSync(body.password, 10)
            }

            const update = await prisma.user.update({
                where: {
                    id : body.id
                },
                data: {
                    name: body.name,
                    email: body.email,
                    password : body.password,
                }
            })

            return {
                status: 'true',
                data: update
            }
        } catch (error) {
            console.log("UpdateUser user module Error:", error)

            return {
                status: false,
                error
            }
        }
    }

    deleteUser = async (id) => {
        try {
            const schema = joi.number().required()

            const validation = schema.validate(id)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await prisma.user.delete({
                where: {
                    id: id
                }
            })

            return {
                status: 'true',
                data: del
            }
        } catch (error) {
            console.log("DeleteUser user module Error:", error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user()