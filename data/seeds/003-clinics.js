const faker = require('faker');

const createFakeClinic = () => ({
  name: faker.company.companyName(),
  phone: faker.phone.phoneNumber(),
  address: faker.address.streetAddress()
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clinics').truncate()
  .then(function () {
    // Inserts seed entries
    const fakeClinics = []
    
    for (let i = 0; i < 10; i++) {
      fakeClinics.push(createFakeClinic());
    }
    return knex('clinics').insert(fakeClinics)
  });
};
