const fs = require('fs').promises
const { AlumnoModel } = require('../models/alumno.model')

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  const { legajo } = req.params
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const legajoId = alumnos.find((a) => Number(a.legajo) === Number(legajo))

    if (!legajoId) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(legajoId)
  } catch (error) {
    return res.status(500).json({
      error: `No se pudo obtener el detalle del alumno con legajo n° ${legajo}`
    })
  }
}

const postNewAlumno = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const existeEmail = alumnos.some((alumno) => alumno.email === email)
    if (existeEmail) {
      return res.status(409).json({
        msg: `Ya existe un alumno con el email ${email}`
      })
    }

    console.log('Se parseó la información a "alumnos"')

    const legajos = alumnos.map((alumno) => alumno.legajo)

    const nuevoLegajo = Math.max(...legajos) + 1
    console.log(`Nuevo legajo generado: ${nuevoLegajo}`)

    const nuevoAlumno = new AlumnoModel(nombre, apellido, email, nuevoLegajo)

    console.log(nuevoAlumno)
    const alumnoNuevo = nuevoAlumno.getAllAttributes()
    alumnos.push(alumnoNuevo)
    console.log(nuevoAlumno.getAllAttributes())

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(201).json({
      msg: `Se agregó al sistema el alumno nuevo con el legajo n° ${nuevoLegajo}`,
      alumnoNuevo
    })
  } catch (error) {
    return res.status(500).json({
      error: 'No se pudo dar de alta el alumno'
    })
  }
}

const putAlumnoBylegajo = async (req, res) => {
  const { legajo } = req.params
  try {
    const { nombre, apellido, email, isActive } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex(
      (alumno) => Number(alumno.legajo) === Number(legajo)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No se encontró el alumno con el legajo n° ${legajo}`
      })
    }

    if (email) {
      const existe = alumnos.some((a, i) => a.email === email && i !== index)

      if (existe) {
        return res.status(409).json({
          msg: `Ya existe otro alumno con el email ${email}`
        })
      }
    }

    const alumnoEncontrado = alumnos[index]

    const alumnoModificado = new AlumnoModel(
      alumnoEncontrado.nombre,
      alumnoEncontrado.apellido,
      alumnoEncontrado.email,
      alumnoEncontrado.legajo,
      alumnoEncontrado.fechaAlta,
      alumnoEncontrado.isActive
    )

    if (nombre) alumnoModificado.setNombre(nombre)
    if (apellido) alumnoModificado.setApellido(apellido)
    if (email) alumnoModificado.setEmail(email)
    if (isActive !== undefined) alumnoModificado.setIsActive(isActive)

    alumnos[index] = alumnoModificado.getAllAttributes()

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Alumno actualizado con legajo ${legajo}`,
      alumno: alumnos[index]
    })
  } catch (error) {
    return res.status(500).json({
      error: `No se pudo actualizar el alumno con legajo ${legajo}`
    })
  }
}

const deleteAlumnoByLegajo = async (req, res) => {
  const { legajo } = req.params
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex(
      (alumno) => Number(alumno.legajo) === Number(legajo)
    )

    if (index === -1) {
      return res.status(404).json({
        msg: `No se encontró el alumno con el legajo n° ${legajo}`
      })
    }

    const alumnoEncontrado = alumnos[index]

    alumnos.splice(index, 1)

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnos, null, 2),
      'utf8'
    )

    return res.status(200).json({
      msg: `Se eliminó correctamente el alumno con el legajo n° ${alumnoEncontrado.legajo}`,
      alumno: alumnoEncontrado
    })
  } catch (error) {
    return res.status(500).json({
      error: 'No se puedo eliminar el alumno del sistema'
    })
  }
}

module.exports = {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno,
  putAlumnoBylegajo,
  deleteAlumnoByLegajo
}
