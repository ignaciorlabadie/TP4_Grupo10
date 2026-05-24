const { ClaseModel } = require('../models/extras/clase.model')

const {
  obtenerClases,
  guardarClases
} = require('../persistence/clases.persistence')

const getClasesAll = async (req, res) => {
  try {
    const clases = await obtenerClases()

    return res.status(200).json(clases)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudieron obtener las clases'
    })
  }
}

const getClaseById = async (req, res) => {
  try {
    const { idMateria } = req.params

    const clases = await obtenerClases()

    const clase = clases.find(
      (c) => c.idMateria === idMateria
    )

    if (!clase) {
      return res.status(404).json({
        msg: `No existe la clase con id ${idMateria}`
      })
    }

    return res.status(200).json(clase)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo obtener la clase'
    })
  }
}

const postClase = async (req, res) => {
  try {
    const {
      idMateria,
      nombre,
      cuatrimestre
    } = req.body

    const clases = await obtenerClases()

    const claseExistente = clases.find(
      (c) => c.idMateria === idMateria
    )

    if (claseExistente) {
      return res.status(409).json({
        error: 'La clase ya existe'
      })
    }

    const nuevaClase = new ClaseModel(
      idMateria,
      nombre,
      cuatrimestre
    )

    const claseNueva =
      nuevaClase.getAllAttributes()

    clases.push(claseNueva)

    await guardarClases(clases)

    return res.status(201).json({
      msg: 'Clase creada correctamente',
      clase: claseNueva
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo crear la clase'
    })
  }
}

const putClaseById = async (req, res) => {
  try {
    const { idMateria } = req.params

    const {
      nombre,
      cuatrimestre
    } = req.body

    const clases = await obtenerClases()

    const index = clases.findIndex(
      (c) => c.idMateria === idMateria
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la clase con id ${idMateria}`
      })
    }

    const claseEncontrada = clases[index]

    const claseModificada =
      new ClaseModel(
        claseEncontrada.idMateria,
        claseEncontrada.nombre,
        claseEncontrada.cuatrimestre
      )

    if (nombre) {
      claseModificada.setNombre(nombre)
    }

    if (
      cuatrimestre !== undefined
    ) {
      claseModificada.setCuatrimestre(
        cuatrimestre
      )
    }

    clases[index] =
      claseModificada.getAllAttributes()

    await guardarClases(clases)

    return res.status(200).json({
      msg: 'Clase modificada correctamente',
      clase:
        claseModificada.getAllAttributes()
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo modificar la clase'
    })
  }
}

const deleteClaseById = async (
  req,
  res
) => {
  try {
    const { idMateria } = req.params

    const clases = await obtenerClases()

    const index = clases.findIndex(
      (c) => c.idMateria === idMateria
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la clase con id ${idMateria}`
      })
    }

    const claseEliminada = clases[index]

    clases.splice(index, 1)

    await guardarClases(clases)

    return res.status(200).json({
      msg: 'Clase eliminada correctamente',
      clase: claseEliminada
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo eliminar la clase'
    })
  }
}

module.exports = {
  getClasesAll,
  getClaseById,
  postClase,
  putClaseById,
  deleteClaseById
}