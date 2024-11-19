export interface User {
  id: string
  name: string
  last_name?: string
  email: string
  roles: string[]
  active: boolean
  token: string
}
