const { NotaModel } = require('../models/extras/alumno.model')

const {
  obtenerNotas,
  guardarNotas
} = require('../persistence/notas.persistence')

const getNotasAll = async (req, res) => {
  try {
    const notas = await obtenerNotas()

    return res.status(200).json(notas)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudieron obtener las notas'
    })
  }
}

const getNotaById = async (req, res) => {
  try {
    const { id } = req.params

    const notas = await obtenerNotas()

    const notaEncontrada = notas.find(
      (nota) => nota.id === Number(id)
    )

    if (!notaEncontrada) {
      return res.status(404).json({
        msg: `No existe la nota con id ${id}`
      })
    }

    return res.status(200).json(notaEncontrada)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo obtener la nota'
    })
  }
}

const postNota = async (req, res) => {
  try {
    const {
      legajo,
      idMateria,
      nota,
      fecha
    } = req.body

    const notas = await obtenerNotas()

    const ids = notas.map(
      (nota) => nota.id
    )

    const nuevoId =
      ids.length > 0
        ? Math.max(...ids) + 1
        : 1

    const nuevaNota = new NotaModel(
      nuevoId,
      legajo,
      idMateria,
      nota,
      fecha
    )

    const notaNueva =
      nuevaNota.getAllAttributes()

    notas.push(notaNueva)

    await guardarNotas(notas)

    return res.status(201).json({
      msg: `Se creó la nota con id ${nuevoId}`,
      nota: notaNueva
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo crear la nota'
    })
  }
}

const putNotaById = async (req, res) => {
  try {
    const { id } = req.params

    const {
      legajo,
      idMateria,
      nota,
      fecha
    } = req.body

    const notas = await obtenerNotas()

    const index = notas.findIndex(
      (nota) => nota.id === Number(id)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la nota con id ${id}`
      })
    }

    const notaEncontrada = notas[index]

    const notaModificada = new NotaModel(
      notaEncontrada.id,
      notaEncontrada.legajo,
      notaEncontrada.idMateria,
      notaEncontrada.nota,
      notaEncontrada.fecha
    )

    if (legajo) {
      notaModificada.setLegajo(legajo)
    }

    if (idMateria) {
      notaModificada.setIdMateria(idMateria)
    }

    if (nota !== undefined) {
      notaModificada.setNota(nota)
    }

    if (fecha) {
      notaModificada.setFecha(fecha)
    }

    notas[index] =
      notaModificada.getAllAttributes()

    await guardarNotas(notas)

    return res.status(200).json({
      msg: `Se modificó la nota con id ${id}`,
      nota:
        notaModificada.getAllAttributes()
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo modificar la nota'
    })
  }
}

const deleteNotaById = async (req, res) => {
  try {
    const { id } = req.params

    const notas = await obtenerNotas()

    const index = notas.findIndex(
      (nota) => nota.id === Number(id)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la nota con id ${id}`
      })
    }

    const notaEliminada = notas[index]

    notas.splice(index, 1)

    await guardarNotas(notas)

    return res.status(200).json({
      msg: `Se eliminó la nota con id ${id}`,
      nota: notaEliminada
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo eliminar la nota'
    })
  }
}

module.exports = {
  getNotasAll,
  getNotaById,
  postNota,
  putNotaById,
  deleteNotaById
}