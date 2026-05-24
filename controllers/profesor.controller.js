const fs = require('fs').promises
const { ProfesorModel } = require('../models/extras/profesor.model')

const getProfesoresAll = async (req, res) => {
  try {
    const data = await fs.readFile('../data/extras/sys-profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    return res.status(200).json(profesores)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudieron obtener los profesores'
    })
  }
}

const getProfesorById = async (req, res) => {
  try {
    const data = await fs.readFile('../data/extras/sys-profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    const { idProfesor } = req.params

    const idProfesorNum = profesores.find(
      (p) => Number(p.idProfesor) === Number(idProfesor)
    )

    if (!idProfesorNum) {
      return res.status(404).json({
        msg: `No existe el profesor con id ${idProfesor}`
      })
    }

    return res.status(200).json(idProfesorNum)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener el profesor con id ${idProfesor}`
    })
  }
}

const postProfesor = async (req, res) => {
  try {
    const { nombre, apellido, especialidad, email } = req.body
    // Dejé aca
    const profesores = await obtenerProfesores()

    const ids = profesores.map((profesor) => profesor.idProfesor)

    const nuevoId = ids.length > 0 ? Math.max(...ids) + 1 : 1

    const nuevoProfesor = new ProfesorModel(
      nuevoId,
      nombre,
      especialidad,
      email,
      isActive ?? true
    )

    const profesorNuevo = nuevoProfesor.getAllAttributes()

    profesores.push(profesorNuevo)

    await guardarProfesores(profesores)

    return res.status(201).json({
      msg: 'Profesor creado correctamente',
      profesor: profesorNuevo
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo crear el profesor'
    })
  }
}

const putProfesorById = async (req, res) => {
  try {
    const { idProfesor } = req.params

    const { nombre, especialidad, email, isActive } = req.body

    const profesores = await obtenerProfesores()

    const index = profesores.findIndex(
      (p) => p.idProfesor === Number(idProfesor)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el profesor con id ${idProfesor}`
      })
    }

    const profesorEncontrado = profesores[index]

    const profesorModificado = new ProfesorModel(
      profesorEncontrado.idProfesor,
      profesorEncontrado.nombre,
      profesorEncontrado.especialidad,
      profesorEncontrado.email,
      profesorEncontrado.isActive
    )

    if (nombre) {
      profesorModificado.setNombre(nombre)
    }

    if (especialidad) {
      profesorModificado.setEspecialidad(especialidad)
    }

    if (email) {
      profesorModificado.setEmail(email)
    }

    if (isActive !== undefined) {
      profesorModificado.setIsActive(isActive)
    }

    profesores[index] = profesorModificado.getAllAttributes()

    await guardarProfesores(profesores)

    return res.status(200).json({
      msg: 'Profesor modificado correctamente',
      profesor: profesorModificado.getAllAttributes()
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo modificar el profesor'
    })
  }
}

const deleteProfesorById = async (req, res) => {
  try {
    const { idProfesor } = req.params

    const profesores = await obtenerProfesores()

    const index = profesores.findIndex(
      (p) => p.idProfesor === Number(idProfesor)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el profesor con id ${idProfesor}`
      })
    }

    const profesorEliminado = profesores[index]

    profesores.splice(index, 1)

    await guardarProfesores(profesores)

    return res.status(200).json({
      msg: 'Profesor eliminado correctamente',
      profesor: profesorEliminado
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo eliminar el profesor'
    })
  }
}

module.exports = {
  getProfesoresAll,
  getProfesorById,
  postProfesor,
  putProfesorById,
  deleteProfesorById
}
