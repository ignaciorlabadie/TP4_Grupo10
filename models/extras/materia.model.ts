export class MateriaModel {
  private idMateria: string
  private nombre: string
  private cuatrimestre: number

  constructor(idMateria: string, nombre: string, cuatrimestre: number) {
    this.idMateria = idMateria
    this.nombre = nombre
    this.cuatrimestre = cuatrimestre
  }

  // id
  public setIdMateria(idMateria: string): void {
    this.idMateria = idMateria
  }
  public getIdMateria(): string {
    return this.idMateria
  }

  // nombre
  public setNombre(nombre: string): void {
    this.nombre = nombre
  }
  public getNombre(): string {
    return this.nombre
  }

  // cuatrimestre
  public setCuatrimestre(cuatrimestre: number): void {
    this.cuatrimestre = cuatrimestre
  }
  public getCuatrimestre(): number {
    return this.cuatrimestre
  }

  public getAllAttributes() {
    return {
      idMateria: this.idMateria,
      nombre: this.nombre,
      cuatrimestre: this.cuatrimestre
    }
  }
}
