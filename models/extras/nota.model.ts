export class NotaModel {
  private id: number
  private legajo: number
  private idMateria: string
  private nota: number
  private fecha: string

  constructor(
    id: number,
    legajo: number,
    idMateria: string,
    nota: number,
    fecha: string = new Date().toISOString().split('T')[0]
  ) {
    this.id = id
    this.legajo = legajo
    this.idMateria = idMateria
    this.nota = nota
    this.fecha = fecha
  }

  // id
  public getId(): number {
    return this.id
  }

  public setId(id: number): void {
    this.id = id
  }
  // legajo
  public setLegajo(legajo: number): void {
    this.legajo = legajo
  }

  public getLegajo(): number {
    return this.legajo
  }

  // idMateria
  public setIdMateria(idMateria: string): void {
    this.idMateria = idMateria
  }

  public getIdMateria(): string {
    return this.idMateria
  }

  // nota
  public setNota(nota: number): void {
    this.nota = nota
  }

  public getNota(): number {
    return this.nota
  }

  // fecha
  public setFecha(fecha: string): void {
    this.fecha = fecha
  }

  public getFecha(): string {
    return this.fecha
  }

  public getAllAttributes() {
    return {
      id: this.id,
      legajo: this.legajo,
      idMateria: this.idMateria,
      nota: this.nota,
      fecha: this.fecha
    }
  }
}
