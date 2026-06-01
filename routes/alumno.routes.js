const { Router } = require('express')
const {
  validateAlumnoPut
} = require('../middleware/alumno-validator-put.middleware')
const {
  validateAlumnoPost
} = require('../middleware/alumno-validator-post.middleware')
const {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno,
  putAlumnoBylegajo,
  deleteAlumnoByLegajo
} = require('../controllers/alumno.controller')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', validateAlumnoPost, postNewAlumno)
rutas.put('/:legajo', validateAlumnoPut, putAlumnoBylegajo)
rutas.delete('/:legajo', deleteAlumnoByLegajo)

module.exports = rutas
