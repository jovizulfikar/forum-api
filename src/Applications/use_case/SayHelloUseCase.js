class SayHelloUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(payload) {
    throw new Error('method not implemented');
  }

  async _verifyPayload() {
    throw new Error('method not implemented');
  }
}

module.exports = SayHelloUseCase;
