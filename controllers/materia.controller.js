const fs = require('fs').promises
const path = require('path')
const { MateriaModel } = require('../models/extras/materia.model')

const filePath = path.join(__dirname, '../data/extras/sys-materias.json')

const getMateriasAll = async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    const materias = JSON.parse(data)

    return res.status(200).json(materias)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudieron obtener las materias'
    })
  }
}

const getMateriaById = async (req, res) => {
  const { id } = req.params

  try {
    const data = await fs.readFile(filePath, 'utf8')
    const materias = JSON.parse(data)

    const materia = materias.find((m) => m.idMateria === id)

    if (!materia) {
      return res.status(404).json({
        msg: `No existe la materia con id ${id}`
      })
    }

    return res.status(200).json(materia)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener la materia con id ${id}`
    })
  }
}

const postMateria = async (req, res) => {
  try {
    const { idMateria, nombre, cuatrimestre } = req.body

    const data = await fs.readFile(filePath, 'utf8')
    const materias = JSON.parse(data)

    const existe = materias.some((m) => m.idMateria === idMateria)

    if (existe) {
      return res.status(400).json({
        error: `Ya existe una materia con id ${idMateria}`
      })
    }

    const nuevaMateria = new MateriaModel(idMateria, nombre, cuatrimestre)

    const materiaNueva = nuevaMateria.getAllAttributes()

    materias.push(materiaNueva)

    await fs.writeFile(filePath, JSON.stringify(materias, null, 2), 'utf8')

    return res.status(201).json({
      msg: `Se creó la materia con id ${idMateria}`,
      materia: materiaNueva
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo crear la materia'
    })
  }
}

const putMateriaById = async (req, res) => {
  const { id } = req.params

  try {
    const { nombre, cuatrimestre } = req.body

    const data = await fs.readFile(filePath, 'utf8')
    const materias = JSON.parse(data)

    const index = materias.findIndex((m) => m.idMateria === id)

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la materia con id ${id}`
      })
    }

    const materiaEncontrada = materias[index]

    const materiaModificada = new MateriaModel(
      materiaEncontrada.idMateria,
      materiaEncontrada.nombre,
      materiaEncontrada.cuatrimestre
    )

    if (nombre !== undefined) {
      materiaModificada.setNombre(nombre)
    }

    if (cuatrimestre !== undefined) {
      materiaModificada.setCuatrimestre(cuatrimestre)
    }

    materias[index] = materiaModificada.getAllAttributes()

    await fs.writeFile(filePath, JSON.stringify(materias, null, 2), 'utf8')

    return res.status(200).json({
      msg: `Se modificó la materia con id ${id}`,
      materia: materiaModificada.getAllAttributes()
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo modificar la materia'
    })
  }
}

const deleteMateriaById = async (req, res) => {
  const { id } = req.params

  try {
    const data = await fs.readFile(filePath, 'utf8')
    const materias = JSON.parse(data)

    const index = materias.findIndex((m) => m.idMateria === id)

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la materia con id ${id}`
      })
    }

    const materiaEliminada = materias[index]

    materias.splice(index, 1)

    await fs.writeFile(filePath, JSON.stringify(materias, null, 2), 'utf8')

    return res.status(200).json({
      msg: `Se eliminó la materia con id ${id}`,
      materia: materiaEliminada
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo eliminar la materia'
    })
  }
}

module.exports = {
  getMateriasAll,
  getMateriaById,
  postMateria,
  putMateriaById,
  deleteMateriaById
}
