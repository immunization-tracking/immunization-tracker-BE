
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vaccine_doses_schedules').truncate()
  .then(function () {
    // Inserts seed entries
    return knex('vaccine_doses_schedules').insert([
      // HepB / 'Hepatitis B'
      {
        vaccine_id: 1,
        dose_number: 1,
        due_month: 0
      },
      {
        vaccine_id: 1,
        dose_number: 2,
        due_month: 1
      },
      {
        vaccine_id: 1,
        dose_number: 3,
        due_month: 6
      },
      {
        vaccine_id: 1,
        dose_number: 4,
        due_month: 12
      },
      // RV / Rotavirus
      {
        vaccine_id: 2,
        dose_number: 1,
        due_month: 2
      },
      {
        vaccine_id: 2,
        dose_number: 2,
        due_month: 4
      },
      {
        vaccine_id: 2,
        dose_number: 3,
        due_month: 6
      },
  
      // DTaP
      {
        vaccine_id: 3,
        dose_number: 1,
        due_month: 2
      },
      {
        vaccine_id: 3,
        dose_number: 2,
        due_month: 4
      },
      {
        vaccine_id: 3,
        dose_number: 3,
        due_month: 6
      },
      {
        vaccine_id: 3,
        dose_number:4,
        due_month: 15
      },
      {
        vaccine_id: 3,
        dose_number:5,
        due_month: 48
      },
  
  
      // Hib
      {
        vaccine_id: 4,
        dose_number: 1,
        due_month: 2
      },
      {
        vaccine_id: 4,
        dose_number: 2,
        due_month: 4
      },
      {
        vaccine_id: 4,
        dose_number: 3,
        due_month: 6
      },
      {
        vaccine_id: 4,
        dose_number:4,
        due_month: 12
      },
  
  
      // PCV
      {
        vaccine_id: 5,
        dose_number: 1,
        due_month: 2
      },
      {
        vaccine_id: 5,
        dose_number: 2,
        due_month: 4
      },
      {
        vaccine_id: 5,
        dose_number: 3,
        due_month: 6
      },
      {
        vaccine_id: 5,
        dose_number:4,
        due_month: 12
      },
  
  
      // IPV
      {
        vaccine_id: 6,
        dose_number: 1,
        due_month: 2
      },
      {
        vaccine_id: 6,
        dose_number: 2,
        due_month: 4
      },
      {
        vaccine_id: 6,
        dose_number: 3,
        due_month: 6
      },
      {
        vaccine_id: 6,
        dose_number:4,
        due_month: 12
      },
      {
        vaccine_id: 6,
        dose_number:5,
        due_month: 48
      },
      // Infuenza
      {
        vaccine_id: 7,
        dose_number: 1,
        due_month: 6
      },
      {
        vaccine_id: 7,
        dose_number: 2,
        due_month: 12
      },
      {
        vaccine_id: 7,
        dose_number: 3,
        due_month: 24
      },
      {
        vaccine_id: 7,
        dose_number: 4,
        due_month: 48
      },
      // MMR
      {
        vaccine_id: 8,
        dose_number: 1,
        due_month: 12
      },
      {
        vaccine_id: 8,
        dose_number: 2,
        due_month: 48
      },
      // Varicella
      {
        vaccine_id: 9,
        dose_number: 1,
        due_month: 12
      },
      {
        vaccine_id: 9,
        dose_number: 2,
        due_month: 48
      },
      // Hep A
      {
        vaccine_id: 10,
        dose_number: 1,
        due_month: 12
      }])
  });
};
