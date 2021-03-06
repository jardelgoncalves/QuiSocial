import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse } from '../helpers/response-message';

export default class UsersController {
  constructor (model) {
    this.Users = new Base(model)
  }

  getOne (params) {
    return this.Users.getOne({ where: params })
  }

  getAll () {
    return this.Users.getAll({})
  }

  async create (data) {
    const { name, email, password } = data
    const _validator = new Validators({
      'name.required': name,
      'password.required': password,
      'email.required': email,
      'email.email': email
    })

    if(!_validator.hasError()) {
      const checkEmail = await this.Users.getOne({ where: { email } })
      if (Object.keys(checkEmail.data).length !== 0) {
        return errorResponse({ email: ['This email already has a registration'] })
      }

      return this.Users.create(data)
    }
    return errorResponse(_validator.errors)
  }

  update (params, data) {
    const result = this.Users.update({ where: params }, data)
    return result
  }

  delete (params) {
    const result = this.Users.delete({ where: params })
    return result
  }
}