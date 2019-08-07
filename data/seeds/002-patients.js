const faker = require('faker');
const bcrypt = require('bcryptjs');

const hashedPassword = bcrypt.hashSync('123', 4);

const createFakerUsers = (idx) => ({
  username: faker.name.firstName() + idx,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  password: hashedPassword,
  phone: faker.phone.phoneNumber(),
  birthday: faker.date.past(),
  ss_id: Math.floor(Math.random(9))
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patients').truncate()
  .then(function () {
    // Inserts seed entries
    const fakePatients = []
  
    for (let i = 0; i < 20; i++) {
      fakePatients.push(createFakerUsers(i+1));
    }
    return knex('patients').insert(fakePatients)
  });
};
