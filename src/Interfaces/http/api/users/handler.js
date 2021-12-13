const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');
const SayHelloUseCase = require('../../../../Applications/use_case/SayHelloUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserHelloHandler = this.getUserHelloHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }

  async getUserHelloHandler(request) {
    const sayHelloUseCase = this._container.getInstance(SayHelloUseCase.name);
    const message = await sayHelloUseCase.execute({ ...request.params });

    return {
      status: 'success',
      data: {
        message,
      },
    };
  }
}

module.exports = UsersHandler;
