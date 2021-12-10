/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    thread: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    isDelete: {
      type: 'BOOLEAN',
      default: false,
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('comments', 'fk_comments_users', {
    foreignKeys: {
      columns: 'owner',
      references: 'users(id)',
    },
  });

  pgm.addConstraint('comments', 'fk_comments_threads', {
    foreignKeys: {
      columns: 'thread',
      references: 'threads(id)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('comments', 'fk_comments_users');
  pgm.dropConstraint('comments', 'fk_comments_threads');
  pgm.dropTable('comments');
};
