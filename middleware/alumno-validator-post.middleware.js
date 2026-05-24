const validateAlumnoPost = (req, res, next) => {
  const { nombre, apellido, email, isActive } = req.body
  const errors = []

  if (!nombre) errors.push('El nombre es obligatorio')
  if (!apellido) errors.push('El apellido es obligatorio')
  if (!email) errors.push('El email es obligatorio')

  if (nombre && typeof nombre !== 'string') {
    errors.push('El nombre debe ser texto')
  }

  if (apellido && typeof apellido !== 'string') {
    errors.push('El apellido debe ser texto')
  }

  if (email && typeof email !== 'string') {
    errors.push('El email debe ser texto')
  }

  if (email && !email.includes('@')) {
    errors.push('Formato de email inválido')
  }

  if (isActive !== undefined && typeof isActive !== 'boolean') {
    errors.push('isActive debe ser true o false')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

module.exports = { validateAlumnoPost }
