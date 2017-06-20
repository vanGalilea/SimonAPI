

const createGame = require('../../hooks/create-game');
const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
  restrictToOwner({
    ownerField: 'userId'
  })
];

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      associateCurrentUser({ as: 'userId' }),
      createGame()
    ],
    update: [
      ...restrict
    ],
    patch: [
      ...restrict
    ],
    remove: [
      ...restrict
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
