// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const gamesSchema = new Schema({
    pads: [padSchema],
    started: { type: Boolean, required: true, 'default': false },
    demo: { type: Boolean, required true, 'default': false},
    players: [playerSchema],
    turn: { type: Number, required: true, 'default': 0 },
    winner: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'user' }
  });

  const playerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    score: { type: Number, required: true, 'default': 0 },
    lives: { type: Number, required: true, 'default': 3 }
  });

  const padSchema = new Schema({
    color: { type: String, required: true },
    active: { type: boolean, required: true, 'default': false},

  })

  const gamesModel = mongoose.model('games', GamesSchema)

  module.exports = GamesModel;
