const PostThread = require('../../Domains/threads/entities/PostThread');

class PostThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(payload) {
    const postThread = new PostThread({ ...payload });
    return this._threadRepository.addThread(postThread);
  }
}

module.exports = PostThreadUseCase;
