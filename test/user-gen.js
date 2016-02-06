import faker from 'faker';
import deepFreeze from 'deep-freeze';

export default function (minNum = 5) {
  const numRecords = (Math.random() * (minNum * 10)) + minNum;
  var state = [];

  for (var i = 0; i < numRecords; ++i) {
    state.push({
      id: i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      login: faker.internet.userName()
    })
  }

  return deepFreeze(state);
}
