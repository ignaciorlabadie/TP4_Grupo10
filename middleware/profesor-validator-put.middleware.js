const validateProfesorPut = (req, res, next) => {
  const { nombre, apellido, email, especialidad, isActive } = req.body
  const errors = []

  if (nombre && typeof nombre !== 'string') {
    errors.push('El nombre debe ser un texto válido.')
  }

  if (apellido && typeof apellido !== 'string') {
    errors.push('El apellido debe ser un texto válido.')
  }

  if (email && typeof email !== 'string') {
    errors.push('El email debe ser un formato de texto válido.')
  }

  if (email && !email.includes('@')) {
    errors.push('Formato de email inválido')
  }

  if (isActive !== undefined && typeof isActive !== 'boolean') {
    errors.push('El campo isActive debe ser un booleano (true/false).')
  }

  if (especialidad && typeof especialidad !== 'string') {
    errors.push('La especialidad debe ser texto')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

module.exports = { validateProfesorPut }
