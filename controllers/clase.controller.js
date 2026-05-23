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
    const { id } = req.params

    const clases = await obtenerClases()

    const clase = clases.find(
      (c) => c.id === Number(id)
    )

    if (!clase) {
      return res.status(404).json({
        msg: `No existe la clase con id ${id}`
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
      nombre,
      profesorId,
      aula
    } = req.body

    const clases = await obtenerClases()

    const ids = clases.map((c) => c.id)

    const nuevoId =
      ids.length > 0
        ? Math.max(...ids) + 1
        : 1

    const nuevaClase = new ClaseModel(
      nuevoId,
      nombre,
      profesorId,
      aula,
      true
    )

    const claseNueva =
      nuevaClase.getAllAttributes()

    clases.push(claseNueva)

    await guardarClases(clases)

    return res.status(201).json({
      msg: `Se creó la clase con id ${nuevoId}`,
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
    const { id } = req.params

    const {
      nombre,
      profesorId,
      aula,
      isActive
    } = req.body

    const clases = await obtenerClases()

    const index = clases.findIndex(
      (c) => c.id === Number(id)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la clase con id ${id}`
      })
    }

    const claseEncontrada = clases[index]

    const claseModificada = new ClaseModel(
      claseEncontrada.id,
      claseEncontrada.nombre,
      claseEncontrada.profesorId,
      claseEncontrada.aula,
      claseEncontrada.isActive
    )

    if (nombre) {
      claseModificada.setNombre(nombre)
    }

    if (profesorId) {
      claseModificada.setProfesorId(profesorId)
    }

    if (aula) {
      claseModificada.setAula(aula)
    }

    if (isActive !== undefined) {
      claseModificada.setIsActive(isActive)
    }

    clases[index] =
      claseModificada.getAllAttributes()

    await guardarClases(clases)

    return res.status(200).json({
      msg: `Se modificó la clase con id ${id}`,
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

const deleteClaseById = async (req, res) => {
  try {
    const { id } = req.params

    const clases = await obtenerClases()

    const index = clases.findIndex(
      (c) => c.id === Number(id)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la clase con id ${id}`
      })
    }

    const claseEliminada = clases[index]

    clases.splice(index, 1)

    await guardarClases(clases)

    return res.status(200).json({
      msg: `Se eliminó la clase con id ${id}`,
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