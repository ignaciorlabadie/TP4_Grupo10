export class NotaModel {
  id: number
  legajo: number
  idMateria: string
  nota: number
  fecha: string

  constructor(
    id: number,
    legajo: number,
    idMateria: string,
    nota: number,
    fecha: string
  ) {
    this.id = id
    this.legajo = legajo
    this.idMateria = idMateria
    this.nota = nota
    this.fecha = fecha
  }

  setLegajo(legajo: number): void {
    this.legajo = legajo
  }

  setIdMateria(idMateria: string): void {
    this.idMateria = idMateria
  }

  setNota(nota: number): void {
    this.nota = nota
  }

  setFecha(fecha: string): void {
    this.fecha = fecha
  }

  getAllAttributes() {
    return {
      id: this.id,
      legajo: this.legajo,
      idMateria: this.idMateria,
      nota: this.nota,
      fecha: this.fecha
    }
  }
}