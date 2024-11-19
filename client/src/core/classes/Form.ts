// Form.ts

import { reactive, ref, watch } from 'vue'
import ValidationRules from '@/core/helpers/ValidationRules'
import type { ValidationRuleName } from '@/core/interfaces/ValidationRules'

export default class Form<T extends Record<string, any>> {
  public model: T
  public rules: { [key: string]: string } = {}
  public isLoading: boolean = false
  public errors: Record<string, string> = reactive({})
  public isValid = ref(false)

  constructor(model: T) {
    this.model = reactive(model) as T

    watch(
      this.model,
      () => {
        this.validate()
      },
      { deep: true }
    )
  }

  public setLoading(loading: boolean): void {
    this.isLoading = loading
  }

  public setErrors(errors: string[]): void {
    for (const error of errors) {
      const key = error.split(' ')[0]
      this.errors[key] = error
    }

    console.log(this.errors)
  }

  public clearErrors(): void {
    this.errors = {}
  }

  public validate() {
    const keys = Object.keys(this.rules)
    for (const key of keys) {
      const rules = this.rules[key].split('|')
      for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(':')
        const value = this.model[key]
        const validationRule = ValidationRules[ruleName as ValidationRuleName]
        if (!validationRule) {
          throw new Error(`Validation rule ${ruleName} is not defined`)
        }
        const { isValid, errorMessage } = validationRule(value, ruleValue)
        if (!isValid) {
          this.errors[key] = errorMessage ?? ''
          break
        }
        delete this.errors[key]
      }
    }
    if (Object.keys(this.errors).length === 0) this.isValid.value = true
    else this.isValid.value = false
  }
}
