import { http, HttpResponse } from 'msw'

const baseUrl = 'http://localhost:3000/api'

export const handlers = [
  http.post(`${baseUrl}/auth/sign-in`, () => {
    return HttpResponse.json(
      {
        name: 'Gualberto',
        last_name: 'Cuiza',
        email: 'gualberto@test.com',
        id: '71aafd33-bceb-4048-ad57-bb801c07ac4d',
        roles: ['user'],
        active: true,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxYWFmZDMzLWJjZWItNDA0OC1hZDU3LWJiODAxYzA3YWM0ZCIsIm5hbWUiOiJKdWFuIiwiZW1haWwiOiJqdWFuMkB0ZXN0LmNvbSIsImlhdCI6MTcyMTkxNTkxMSwiZXhwIjoxNzIyMDAyMzExfQ.GMPAcHBL0UJ6BbCkFjO7kuUSWbqfLuNZCZy_koyIh2Q'
      },
      { status: 200 }
    )
  }),

  http.post(`${baseUrl}/auth/sign-up`, () => {
    return HttpResponse.json(
      {
        name: 'Gualberto',
        last_name: 'Cuiza',
        email: 'gualberto@test.com',
        id: '71aafd33-bceb-4048-ad57-bb801c07ac4d',
        roles: ['user'],
        active: true,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxYWFmZDMzLWJjZWItNDA0OC1hZDU3LWJiODAxYzA3YWM0ZCIsIm5hbWUiOiJKdWFuIiwiZW1haWwiOiJqdWFuMkB0ZXN0LmNvbSIsImlhdCI6MTcyMTkxNTkxMSwiZXhwIjoxNzIyMDAyMzExfQ.GMPAcHBL0UJ6BbCkFjO7kuUSWbqfLuNZCZy_koyIh2Q'
      },
      { status: 200 }
    )
  })
]
