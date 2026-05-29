const validateNotaPut = (req, res, next) => {
  const { legajo, idMateria, nota, fecha } = req.body
  const errors = []

  if (legajo !== undefined && typeof legajo !== 'number') {
    errors.push('El legajo debe ser numérico')
  }

  if (idMateria !== undefined && typeof idMateria !== 'string') {
    errors.push('idMateria debe ser texto')
  }

  if (nota !== undefined && typeof nota !== 'number') {
    errors.push('La nota debe ser numérica')
  }

  if (nota !== undefined && (nota < 0 || nota > 10)) {
    errors.push('La nota debe estar entre 0 y 10')
  }

  if (fecha !== undefined && typeof fecha !== 'string') {
    errors.push('La fecha debe ser texto (YYYY-MM-DD)')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

module.exports = { validateNotaPut }
