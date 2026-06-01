const fs = require('fs').promises
const { ProfesorModel } = require('../models/extras/profesor.model')
const path = require('path')
const filePath = path.join(__dirname, '../data/extras/sys-profesores.json')

const getProfesoresAll = async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8')
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
  const { idProfesor } = req.params
  try {
    const data = await fs.readFile(filePath, 'utf8')
    const profesores = JSON.parse(data)

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

const postNewProfesor = async (req, res) => {
  try {
    const { nombre, apellido, especialidad, email, isActive } = req.body

    const data = await fs.readFile(filePath, 'utf8')
    const profesores = JSON.parse(data)

    const existeEmail = profesores.some((profesor) => profesor.email === email)
    if (existeEmail) {
      return res.status(409).json({
        msg: `Ya existe un profesor con el email ${email}`
      })
    }

    console.log('Se parseó la información a "profesores"')

    const ids = profesores.map((profesor) => profesor.idProfesor)

    const nuevoId = Math.max(...ids) + 1
    console.log(`Nuevo id generado: ${nuevoId}`)

    const nuevoProfesor = new ProfesorModel(
      nombre,
      apellido,
      email,
      nuevoId,
      especialidad,
      isActive ?? true
    )

    console.log(nuevoProfesor)
    const profesorNuevo = nuevoProfesor.getAllAttributes()
    profesores.push(profesorNuevo)
    console.log(nuevoProfesor.getAllAttributes())

    await fs.writeFile(filePath, JSON.stringify(profesores, null, 2), 'utf8')

    return res.status(201).json({
      msg: 'Profesor creado correctamente',
      profesorNuevo
    })
  } catch (error) {
    return res.status(500).json({
      error: 'No se pudo crear el profesor'
    })
  }
}

const putProfesorById = async (req, res) => {
  const { idProfesor } = req.params
  try {
    const { nombre, apellido, especialidad, email, isActive } = req.body

    const data = await fs.readFile(filePath, 'utf8')
    const profesores = JSON.parse(data)

    const index = profesores.findIndex(
      (p) => Number(p.idProfesor) === Number(idProfesor)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el profesor con id ${idProfesor}`
      })
    }

    if (email) {
      const existe = profesores.some((p, i) => p.email === email && i !== index)

      if (existe) {
        return res.status(409).json({
          msg: `Ya existe otro profesor con el email ${email}`
        })
      }
    }

    const profesorEncontrado = profesores[index]

    const profesorModificado = new ProfesorModel(
      profesorEncontrado.nombre,
      profesorEncontrado.apellido,
      profesorEncontrado.email,
      profesorEncontrado.idProfesor,
      profesorEncontrado.especialidad,
      profesorEncontrado.isActive
    )

    if (nombre) profesorModificado.setNombre(nombre)
    if (apellido) profesorModificado.setApellido(apellido)
    if (especialidad) profesorModificado.setEspecialidad(especialidad)
    if (email) profesorModificado.setEmail(email)
    if (isActive !== undefined) profesorModificado.setIsActive(isActive)

    profesores[index] = profesorModificado.getAllAttributes()

    await fs.writeFile(filePath, JSON.stringify(profesores, null, 2), 'utf8')

    return res.status(200).json({
      msg: 'Profesor modificado correctamente',
      profesor: profesorModificado.getAllAttributes()
    })
  } catch (error) {
    return res.status(500).json({
      error: 'No se pudo modificar el profesor'
    })
  }
}

const deleteProfesorById = async (req, res) => {
  const { idProfesor } = req.params
  try {
    const data = await fs.readFile(filePath, 'utf8')
    const profesores = JSON.parse(data)

    const index = profesores.findIndex(
      (p) => Number(p.idProfesor) === Number(idProfesor)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe el profesor con id ${idProfesor}`
      })
    }

    const profesorEliminado = profesores[index]

    profesores.splice(index, 1)

    await fs.writeFile(filePath, JSON.stringify(profesores, null, 2), 'utf8')

    return res.status(200).json({
      msg: 'Profesor eliminado correctamente',
      profesor: profesorEliminado
    })
  } catch (error) {
    return res.status(500).json({
      error: 'No se pudo eliminar el profesor'
    })
  }
}

module.exports = {
  getProfesoresAll,
  getProfesorById,
  postNewProfesor,
  putProfesorById,
  deleteProfesorById
}
