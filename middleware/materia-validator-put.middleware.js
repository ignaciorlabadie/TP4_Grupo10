const validateMateriaPut = (req, res, next) => {
  const { nombre, cuatrimestre } = req.body
  const errors = []

  if (nombre && typeof nombre !== 'string') {
    errors.push('El nombre debe ser texto')
  }

  if (cuatrimestre !== undefined && typeof cuatrimestre !== 'number') {
    errors.push('El cuatrimestre debe ser un número')
  }

  if (cuatrimestre !== undefined && (cuatrimestre < 1 || cuatrimestre > 2)) {
    errors.push('El cuatrimestre debe ser 1 o 2')
  }

  if (nombre === undefined && cuatrimestre === undefined) {
    errors.push('Debe enviar al menos un campo para modificar')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

module.exports = { validateMateriaPut }
