const validateMateriaPost = (req, res, next) => {
  const { idMateria, nombre, cuatrimestre } = req.body
  const errors = []

  if (!idMateria) errors.push('El idMateria es obligatorio')
  if (!nombre) errors.push('El nombre es obligatorio')
  if (cuatrimestre === undefined) errors.push('El cuatrimestre es obligatorio')

  if (idMateria && typeof idMateria !== 'string') {
    errors.push('El idMateria debe ser texto')
  }

  if (nombre && typeof nombre !== 'string') {
    errors.push('El nombre debe ser texto')
  }

  if (cuatrimestre !== undefined && typeof cuatrimestre !== 'number') {
    errors.push('El cuatrimestre debe ser un número')
  }

  if (cuatrimestre !== undefined && (cuatrimestre < 1 || cuatrimestre > 2)) {
    errors.push('El cuatrimestre debe ser 1 o 2')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

module.exports = { validateMateriaPost }
