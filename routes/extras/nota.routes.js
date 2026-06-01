const { Router } = require('express')
const {
  validateNotaPut
} = require('../../middleware/nota-validator-put.middleware')
const {
  validateNotaPost
} = require('../../middleware/nota-validator-post.middleware')

const {
  getNotasAll,
  getNotaById,
  postNota,
  putNotaById,
  deleteNotaById
} = require('../../controllers/nota.controller')

const rutas = Router()

rutas.get('/', getNotasAll)
rutas.get('/:id', getNotaById)
rutas.post('/', validateNotaPost, postNota)
rutas.put('/:id', validateNotaPut, putNotaById)
rutas.delete('/:id', deleteNotaById)

module.exports = rutas
