import { PersonaModel } from '../persona.model'

export class ProfesorModel extends PersonaModel {
  idProfesor: number
  especialidad: string
  isActive: boolean

  constructor(
    nombre: string,
    apellido: string,
    email: string,
    idProfesor: number,
    especialidad: string,
    isActive: boolean = true
  ) {
    super(nombre, apellido, email)
    this.idProfesor = idProfesor
    this.especialidad = especialidad
    this.isActive = isActive
  }

  public getIdProfesor(): number {
    return this.idProfesor
  }

  public getEspecialidad(): string {
    return this.especialidad
  }

  public setEspecialidad(especialidad: string): void {
    this.especialidad = especialidad
  }

  public setIsActive(isActive: boolean): void {
    this.isActive = isActive
  }

  public override getAllAttributes(): {
    idProfesor: number
    nombre: string
    apellido: string
    email: string
    especialidad: string
    isActive: boolean
  } {
    return {
      idProfesor: this.idProfesor,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      especialidad: this.especialidad,
      isActive: this.isActive
    }
  }
}
