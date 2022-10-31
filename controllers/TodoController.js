const { Router } = require('express')
const respose = require('../helpers/respose')
const m$todo = require('../modules/todo.module')
const verifyToken = require('../middleware/authJwt')

const TodoController = Router()

TodoController.get('/', verifyToken , async (req, res) => {
    const list = await m$todo.listTodo(req) 

    respose.sendResponse(res, list)
})

TodoController.post('/', verifyToken, async (req, res) => {
    const list = await m$todo.createTodo(req)

    respose.sendResponse(res, list)
})

TodoController.put('/', verifyToken, async (req, res) => {
    const list = await m$todo.updateTodo(req)

    respose.sendResponse(res, list)
})

TodoController.delete('/:id', verifyToken, async (req, res) => {
    const list = await m$todo.deleteTodo(req)

    respose.sendResponse(res, list)
})

module.exports = TodoController