const { Router } = require('express')
const {
  validateProfesorPut
} = require('../../middleware/profesor-validator-put.middleware')
const {
  validateProfesorPost
} = require('../../middleware/profesor-validator-post.middleware')

const {
  getProfesoresAll,
  getProfesorById,
  postNewProfesor,
  putProfesorById,
  deleteProfesorById
} = require('../../controllers/profesor.controller')

const rutas = Router()

rutas.get('/', getProfesoresAll)
rutas.get('/:idProfesor', getProfesorById)
rutas.post('/', validateProfesorPost, postNewProfesor)
rutas.put('/:idProfesor', validateProfesorPut, putProfesorById)
rutas.delete('/:idProfesor', deleteProfesorById)

module.exports = rutas
