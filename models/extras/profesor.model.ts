export class ProfesorModel {
  id: number
  nombre: string
  especialidad: string
  email: string
  isActive: boolean

  constructor(
    id: number,
    nombre: string,
    especialidad: string,
    email: string,
    isActive: boolean = true
  ) {
    this.id = id
    this.nombre = nombre
    this.especialidad = especialidad
    this.email = email
    this.isActive = isActive
  }

  setNombre(nombre: string): void {
    this.nombre = nombre
  }

  setEspecialidad(especialidad: string): void {
    this.especialidad = especialidad
  }

  setEmail(email: string): void {
    this.email = email
  }

  setIsActive(isActive: boolean): void {
    this.isActive = isActive
  }

  getAllAttributes() {
    return {
      id: this.id,
      nombre: this.nombre,
      especialidad: this.especialidad,
      email: this.email,
      isActive: this.isActive
    }
  }
}