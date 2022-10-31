// Mapping function dari module ke API

const m$user = require('../modules/user.module')
const { Router } = require('express')
const respose = require('../helpers/respose')

const UserController = Router()

UserController.get('/', async (req, res) => {
    const list = await m$user.listUser()

    respose.sendResponse(res, list)
})

UserController.post('/', async (req, res) => {
    const list = await m$user.createUser(req.body)

    respose.sendResponse(res, list)
})

UserController.put('/', async (req, res) => {
    const list = await m$user.updateUser(req.body)

    respose.sendResponse(res, list)
})

UserController.delete('/:id', async (req, res) => {
    const list = await m$user.deleteUser(Number(req.params.id))

    respose.sendResponse(res, list)
})

module.exports = UserController