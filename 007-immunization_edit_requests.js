const faker = require('faker');

const createFakerRecords = () => ({
  note: faker.lorem.sentences(),
  vaccine_dose_id: Math.floor(Math.random(10)) + 1,
  patient_id: Math.floor(Math.random(15)) + 1,
  clinic_id: Math.floor(Math.random(15)) + 1,
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('immunization_record_update_requests').truncate()
  .then(function () {
    // Inserts seed entries
    const fakerRecords = []
    
    for (let i = 0; i < 20; i++) {
      fakerRecords.push(createFakerRecords());
    }
    return knex('immunization_record_update_requests').insert(fakerRecords)
  });
};
