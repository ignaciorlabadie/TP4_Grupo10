const { ProfesorModel } = require('../models/extras/porsesor.model')

const {
  obtenerProfesores,
  guardarProfesores
} = require('../repositories/profesores.repository')

const getProfesoresAll = async (req, res) => {
  try {
    const profesores = await obtenerProfesores()

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
    const { id } = req.params

    const profesores = await obtenerProfesores()

    const profesor = profesores.find(
      (p) => p.id === Number(id)
    )

    if (!profesor) {
      return res.status(404).json({
        msg: `No existe el profesor con id ${id}`
      })
    }

    return res.status(200).json(profesor)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo obtener el profesor'
    })
  }
}

const postProfesor = async (req, res) => {
  try {
    const {
      nombre,
      especialidad,
      email
    } = req.body

    const profesores = await obtenerProfesores()

    const ids = profesores.map((p) => p.id)

    const nuevoId =
      ids.length > 0
        ? Math.max(...ids) + 1
        : 1

    const nuevoProfesor = new ProfesorModel(
      nuevoId,
      nombre,
      especialidad,
      email,
      true
    )

    const profesorNuevo =
      nuevoProfesor.getAllAttributes()

    profesores.push(profesorNuevo)

    await guardarProfesores(profesores)

    return res.status(201).json({
      msg: `Se creó el profesor con id ${nuevoId}`,
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
    const { id } = req.params

    const {
      nombre,
      especialidad,
      email,
      isActive
    } = req.body

    const profesores = await obtenerProfesores()

    const index = profesores.findIndex(
      (p) => p.id === Number(id)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el profesor con id ${id}`
      })
    }

    const profesorEncontrado = profesores[index]

    const profesorModificado = new ProfesorModel(
      profesorEncontrado.id,
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

    profesores[index] =
      profesorModificado.getAllAttributes()

    await guardarProfesores(profesores)

    return res.status(200).json({
      msg: `Se modificó el profesor con id ${id}`,
      profesor:
        profesorModificado.getAllAttributes()
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
    const { id } = req.params

    const profesores = await obtenerProfesores()

    const index = profesores.findIndex(
      (p) => p.id === Number(id)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el profesor con id ${id}`
      })
    }

    const profesorEliminado = profesores[index]

    profesores.splice(index, 1)

    await guardarProfesores(profesores)

    return res.status(200).json({
      msg: `Se eliminó el profesor con id ${id}`,
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