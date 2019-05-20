const faker = require('faker');
const bcrypt = require('bcryptjs');

const hashedPassword = bcrypt.hashSync('123', 4);

const createFakerRecords = () => ({
  received_date: faker.date.past(),
  dose_num: Math.floor(Math.random(3)) + 1,
  note: faker.lorem.sentences(),
  vaccine_id: Math.floor(Math.random(10)) + 1,
  patient_id: Math.floor(Math.random(10)) + 1,
  clinic_id: Math.floor(Math.random(10)) + 1,
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('immunization_records').truncate()
  .then(function () {
    // Inserts seed entries
    const fakeRecords = []
    
    for (let i = 0; i < 20; i++) {
      fakeRecords.push(createFakerRecords());
    }
    return knex('immunization_records').insert(fakeRecords)
  });
};
