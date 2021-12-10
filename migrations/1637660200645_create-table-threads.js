/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(250)',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('threads', 'fk_threads_users', {
    foreignKeys: {
      columns: 'owner',
      references: 'users(id)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint('threads', 'fk_threads_users');
  pgm.dropTable('threads');
};
