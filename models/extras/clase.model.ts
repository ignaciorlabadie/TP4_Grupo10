export class ClaseModel {
  id: number
  nombre: string
  profesorId: number
  aula: string
  isActive: boolean

  constructor(
    id: number,
    nombre: string,
    profesorId: number,
    aula: string,
    isActive: boolean = true
  ) {
    this.id = id
    this.nombre = nombre
    this.profesorId = profesorId
    this.aula = aula
    this.isActive = isActive
  }

  setNombre(nombre: string): void {
    this.nombre = nombre
  }

  setProfesorId(profesorId: number): void {
    this.profesorId = profesorId
  }

  setAula(aula: string): void {
    this.aula = aula
  }

  setIsActive(isActive: boolean): void {
    this.isActive = isActive
  }

  getAllAttributes() {
    return {
      id: this.id,
      nombre: this.nombre,
      profesorId: this.profesorId,
      aula: this.aula,
      isActive: this.isActive
    }
  }
}