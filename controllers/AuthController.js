const m$auth = require('../modules/auth.module')
const { Router } = require('express')
const respose = require('../helpers/respose')

const AuthController = Router()

AuthController.post('/login', async (req, res) => {
    const login = await m$auth.login(req.body, res)

    respose.sendResponse(res, login)
})

module.exports = AuthController