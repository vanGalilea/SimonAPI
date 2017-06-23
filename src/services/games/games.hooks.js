const joinGame = require('../../hooks/join');
const createGame = require('../../hooks/create-game');
const { authenticate } = require('feathers-authentication').hooks;
const { restrictToAuthenticated } = require('feathers-authentication-hooks');
const { populate } = require('feathers-hooks-common');
const padPush = require('../../hooks/pad-push');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
];

const ownerSchema = {
  include: {
    service: 'users',
    nameAs: 'owner',
    parentField: 'userId',
    childField: '_id',
  }
};


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createGame()],
    update: [joinGame(), padPush()],
    patch: [joinGame(), padPush()],
    remove: []
  },

  after: {
    all: [populate({ schema: ownerSchema})],
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
