import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// interface LoginData {
//   username: string
//   password: string
// }

const mock = new MockAdapter(axios)

mock.onPost('/api/login').reply((config) => {
  const { username, password } = JSON.parse(config.data)
  if (username === 'test' && password === 'test') {
    return [200, { message: '登录成功' }]
  } else {
    return [401, { message: '用户名或密码错误' }]
  }
})

export default axios
