import { describe, it, expect } from 'vitest'
import ValidationRules from '../ValidationRules'

describe('Required rule tests', () => {
  it('should return true if the value is not empty', () => {
    expect(ValidationRules.required('')).toEqual({
      isValid: false,
      errorMessage: 'This field is required'
    })
    expect(ValidationRules.required('test')).toEqual({ isValid: true, errorMessage: null })
  })

  it('should return a error if the value is a white space', () => {
    expect(ValidationRules.required(' ')).toEqual({
      isValid: false,
      errorMessage: 'This field is required'
    })
  })
})

it('should return true if the value is a string', () => {
  expect(ValidationRules.string(123)).toEqual({
    isValid: false,
    errorMessage: 'This field must be a string'
  })
  expect(ValidationRules.string('test')).toEqual({ isValid: true, errorMessage: null })
})

it('should return true if the value is a valid email', () => {
  expect(ValidationRules.email('test')).toEqual({
    isValid: false,
    errorMessage: 'This field must be a valid email'
  })
  expect(ValidationRules.email('test@test.com')).toEqual({ isValid: true, errorMessage: null })
})
