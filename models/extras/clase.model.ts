export class ClaseModel {
  idMateria: string
  nombre: string
  cuatrimestre: number

  constructor(
    idMateria: string,
    nombre: string,
    cuatrimestre: number
  ) {
    this.idMateria = idMateria
    this.nombre = nombre
    this.cuatrimestre = cuatrimestre
  }

  setNombre(nombre: string): void {
    this.nombre = nombre
  }

  setCuatrimestre(
    cuatrimestre: number
  ): void {
    this.cuatrimestre = cuatrimestre
  }

  getAllAttributes() {
    return {
      idMateria: this.idMateria,
      nombre: this.nombre,
      cuatrimestre: this.cuatrimestre
    }
  }
}