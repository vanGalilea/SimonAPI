const errors = require('feathers-errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    if (hook.data.pad === undefined) return Promise.resolve(hook);
    console.log(`*********push pad ${hook.data.pad}`);

    const { user } = hook.params;


    // see if user is a player
    return hook.app.service('games').get(hook.id).then((game) => {
      const { players, turn, pads, round } = game;
      const playerIds = players.map((p) => (p.userId.toString()));
      const joined = playerIds.includes(user._id.toString());
      const hasTurn = playerIds.indexOf(user._id.toString()) === turn;
      const currentPlayer = players.filter((p) => (p.userId.toString() == user._id.toString()))[0];

      if (!joined) {
        throw new errors.Unprocessable('You are not a player in this game, so you can not play!');
      }

      if (!hasTurn) {
        throw new errors.Unprocessable('It is not your turn yet!');
      }

      let newRound = round + 1;
      let newTurn = turn + 1;

      if (newTurn + 1 > players.length) newTurn = 0;

      hook.data.round = newRound;
      hook.data.turn = newTurn;


      console.log(`ROUND: ${round}, TURN: ${turn}`);

      if (pads[round].color === hook.data.pad) {
        let newPlayers= players;
        newPlayers[turn].score++;
        hook.data.players = newPlayers;

        return hook;
      } else {
        let newPlayers= players;
        newPlayers[turn].lives--;
        hook.data.players = newPlayers;

        return hook;
      }

      return Promise.resolve(hook);
    });
  };

};
