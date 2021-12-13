class SayHelloUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(payload) {
    this._verifyPayload(payload);
    const { userId: id } = payload;
    const { fullname } = await this._userRepository.getById(id);
    return `Hello ${fullname}!`;
  }

  _verifyPayload(payload) {
    const { userId } = payload;
    if (!userId) {
      throw new Error('SAY_HELLO_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof userId !== 'string') {
      throw new Error('SAY_HELLO_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = SayHelloUseCase;
