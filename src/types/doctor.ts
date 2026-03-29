export type DoctorTier = 'quick' | 'full' | 'elite'

export interface DoctorReport {
  verdict: 'CELTA-safe' | 'Needs Revision' | 'High Risk'
  scores: {
    aims: number
    staging: number
    clarification: number
    progression: number
    overall: number
  }
  strengths: { text: string }[]
  risks: { severity: 'warn' | 'danger'; text: string }[]
  priorities?: { title: string; detail: string }[]
  rewrite?: {
    show: boolean
    label: string
    before: string
    after: string
  }
  memory_note?: string
  next_step?: string
}
