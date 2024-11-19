import Form from '@/core/classes/Form'
import SignUpForm from './SignUpForm'
import { type SingUpModel } from '@/core/interfaces/auth'

export default class SignUpRequest extends Form<SingUpModel> {
  constructor() {
    super(new SignUpForm())

    this.rules = {
      name: 'required|string|min:3',
      email: 'required|email',
      password: 'required|string|min:6'
    }
  }
}
