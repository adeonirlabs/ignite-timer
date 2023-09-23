export interface Cycle {
  id: string
  name: string
  duration: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}
