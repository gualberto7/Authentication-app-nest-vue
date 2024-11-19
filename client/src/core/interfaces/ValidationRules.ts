export type ValidationRuleName = 'required' | 'string' | 'email' | 'min' | 'max'

export interface ValidationResult {
  isValid: boolean
  errorMessage: string | null
}
