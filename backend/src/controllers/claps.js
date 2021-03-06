import Sequelize from 'sequelize'
import Base from '../repository/base/repository-base'
import Validators from '../helpers/validators'
import { errorResponse, successResponse } from '../helpers/response-message'

export default class ClapsController {
  constructor (Model, Posts, Users) {
    this.Model = Model
    this.Users = Users
    this.Claps = new Base(Model)
    this.Posts = new Base(Posts)
  }

  async create (data) {
    const { postId, userId } = data
    const _validators = new Validators({
      'postId.required': postId
    })

    if (_validators.hasError()) {
      return errorResponse(_validators.errors)
    }

    const created = await this.Claps.create(data)
    const query = {
      where: { id: created.data.postId },
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Claps.post_id')), 'claps']]
      },
      include: [
        {
          model: this.Model, attributes: []
        },
        {
          model: this.Users,
          attributes: {
            exclude: ['password']
          }
        }
      ],
      group: ['Claps.post_id']
    }
    const post = await this.Posts.getOne(query)
    return successResponse(post.data, 201)
  }
}