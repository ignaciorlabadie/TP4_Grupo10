const { Router } = require('express')

const {
  validateMateriaPost
} = require('../../middleware/materia-validator-post.middleware')

const {
  validateMateriaPut
} = require('../../middleware/materia-validator-put.middleware')

const {
  getMateriasAll,
  getMateriaById,
  postMateria,
  putMateriaById,
  deleteMateriaById
} = require('../../controllers/materia.controller')

const rutas = Router()

rutas.get('/', getMateriasAll)
rutas.get('/:id', getMateriaById)
rutas.post('/', validateMateriaPost, postMateria)
rutas.put('/:id', validateMateriaPut, putMateriaById)
rutas.delete('/:id', deleteMateriaById)

module.exports = rutas
