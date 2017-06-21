
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-var
  return function (hook) {

    const { user } = hook.params;

    hook.data.userId = user._id;
    hook.data.players = [{
      userId: user._id,
      name: user.name,
    }];

    let colors = ('yellow, red, blue, green,').repeat(5).split(', ');
    colors.pop();


    //create pads sequence
    hook.data.pads = shuffle(colors)
      .map((color) =>({ color: color, active: false}));

    return Promise.resolve(hook);
  };
};
