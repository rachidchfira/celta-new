export type DoctorTier = 'quick' | 'full' | 'elite'

export type DoctorVerdict = 'CELTA-safe' | 'Needs Revision' | 'High Risk'

export interface DoctorScores {
  aims: number
  staging: number
  clarification: number
  progression: number
  overall: number
}

export interface DoctorStrength {
  text: string
}

export interface DoctorRisk {
  severity: 'warn' | 'danger'
  text: string
}

export interface DoctorPriority {
  title: string
  detail: string
}

export interface DoctorRewrite {
  show: boolean
  label: string
  before: string
  after: string
}

export interface DoctorReport {
  verdict: DoctorVerdict
  scores: DoctorScores
  strengths: DoctorStrength[]
  risks: DoctorRisk[]
  priorities: DoctorPriority[]
  rewrite?: DoctorRewrite
  memory_note?: string
  next_step?: string
}

export interface DoctorSubmission {
  id: string
  lessonPlanText: string
  tier: DoctorTier
  level: string
  skill: string
  tp: string
  report: DoctorReport
  verdict: DoctorVerdict
  overallScore: number
  createdAt: string
}

export interface DoctorAnalyseRequest {
  lessonPlanText: string
  level: string
  skill: string
  tp: string
  worry?: string
  mode: DoctorTier
  history?: Array<{ risks: string[] }>
}

export interface DoctorAnalyseResponse {
  success: boolean
  report?: DoctorReport
  tier?: DoctorTier
  remainingQuota?: number | null
  savedId?: string | null
  error?: string
}
