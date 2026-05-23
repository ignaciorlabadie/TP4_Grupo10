export class NotaModel {
  id: number
  alumnoLegajo: number
  claseId: number
  nota: number

  constructor(
    id: number,
    alumnoLegajo: number,
    claseId: number,
    nota: number
  ) {
    this.id = id
    this.alumnoLegajo = alumnoLegajo
    this.claseId = claseId
    this.nota = nota
  }

  setAlumnoLegajo(alumnoLegajo: number): void {
    this.alumnoLegajo = alumnoLegajo
  }

  setClaseId(claseId: number): void {
    this.claseId = claseId
  }

  setNota(nota: number): void {
    this.nota = nota
  }

  getAllAttributes() {
    return {
      id: this.id,
      alumnoLegajo: this.alumnoLegajo,
      claseId: this.claseId,
      nota: this.nota
    }
  }
}