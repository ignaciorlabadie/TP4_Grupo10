const fs = require('fs').promises
const path = require('path')
const { NotaModel } = require('../models/extras/nota.model')
const filePath = path.join(__dirname, '../data/extras/sys-notas.json')

const getNotasAll = async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    const notas = JSON.parse(data)

    return res.status(200).json(notas)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron obtener las notas'
    })
  }
}

const getNotaById = async (req, res) => {
  const { id } = req.params
  try {
    const data = await fs.readFile(filePath, 'utf8')
    const notas = JSON.parse(data)

    const notaEncontrada = notas.find((nota) => Number(nota.id) === Number(id))

    if (!notaEncontrada) {
      return res.status(404).json({
        msg: `No existe la nota con id ${id}`
      })
    }

    return res.status(200).json(notaEncontrada)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener la nota del alumno con id ${id}`
    })
  }
}

const postNota = async (req, res) => {
  try {
    const { legajo, idMateria, nota } = req.body

    const data = await fs.readFile(filePath, 'utf8')
    const notas = JSON.parse(data)

    const ids = notas.map((nota) => nota.id)

    const nuevoId = Math.max(...ids) + 1
    console.log(`Nuevo id generado: ${nuevoId}`)

    const nuevaNota = new NotaModel(nuevoId, legajo, idMateria, nota)

    const notaNueva = nuevaNota.getAllAttributes()

    notas.push(notaNueva)

    await fs.writeFile(filePath, JSON.stringify(notas, null, 2), 'utf8')

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
  const { id } = req.params
  try {
    const { legajo, idMateria, nota } = req.body

    const data = await fs.readFile(filePath, 'utf8')
    const notas = JSON.parse(data)

    const index = notas.findIndex((nota) => Number(nota.id) === Number(id))

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

    if (legajo !== undefined) {
      notaModificada.setLegajo(legajo)
    }

    if (idMateria !== undefined) {
      notaModificada.setIdMateria(idMateria)
    }

    if (nota !== undefined) {
      notaModificada.setNota(nota)
    }

    notas[index] = notaModificada.getAllAttributes()

    await fs.writeFile(filePath, JSON.stringify(notas, null, 2), 'utf8')

    return res.status(200).json({
      msg: `Se modificó la nota con id ${id}`,
      nota: notaModificada.getAllAttributes()
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo modificar la nota'
    })
  }
}

const deleteNotaById = async (req, res) => {
  const { id } = req.params
  try {
    const data = await fs.readFile(filePath, 'utf8')
    const notas = JSON.parse(data)

    const index = notas.findIndex((nota) => Number(nota.id) === Number(id))

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la nota con id ${id}`
      })
    }

    const notaEliminada = notas[index]

    notas.splice(index, 1)

    await fs.writeFile(filePath, JSON.stringify(notas, null, 2), 'utf8')

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
