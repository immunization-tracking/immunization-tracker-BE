import db from './db'

export const getOne = model => async (req, res) => {
    const items = await db(model)
          .where({id:req.params.id})
  
  console.log(items)
    if (items.length > 0){
      res.status(200).json(items[0])
    }else{
      res.status(404).json({ message: 'this record does not exist' });
    }
}

export const getMany = model => async (req, res) => {
     const list = await  db(model)
     res.status(200).json(list)
     console.log(list)
}

export const getManyByProps = model => async (req, res) => {
     const list = await  db(model).where(req.body)
     res.status(200).json(list)
     console.log(list)
}

export const createOne = model => async (req, res) => {
   	const lastId = await db(model).insert(req.body)
    res.status(201).json(lastId)
}

export const updateOne = model => async (req, res) => {
   	const count = await db(model)
   	                      .where({id:req.params.id})
                          .update(req.body)
                      
    if (count > 0){
      res.status(200).json({message: `${count} ${count > 1 ? 'records' : 'record'} updated`})
    }else{
      res.status(404).json({ message: 'this record does not exist' });
    }
}

export const removeOne = model => async (req, res) => {
    const count  = await db(model)
                          .where({id:req.params.id})
                          .del(req.body)
    if (count > 0){
      res.status(200).json({message: `${count} ${count > 1 ? 'records' : 'record'} deleted`})
    }else{
      res.status(404).json({ message: 'this record does not exist' });
    }
}



export const getFamiliesByEmail = model => async (req, res) => {
    const items = await db(model)
                    .where({id:req.params.id})
                    
    if (items.length > 0){
        const families = await db(model)
        .where({email:items[0].email})
        
        res.status(201).json(families)
    }else{
        res.status(404).json({ message: 'this record does not exist' });
    }
};

// export const getRecordsByPatientId = model => async (req, res) => {
//     const items = await db(model)
//                     .where({patient_id:req.params.id})
//
//     if (items.length > 0){
//         res.status(201).json(items)
//     }else{
//         res.status(404).json({ message: 'this record does not exist' });
//     }
// };


export const getImmunizationRecords = model => async (req, res) => {
    const vaccineTemplate = await db('vaccine_doses_schedules as v')
    .leftJoin('immunization_records as i', 'i.vaccine_dose_id', 'v.id')
    .leftJoin('clinics as c', 'i.clinic_id', 'c.id')
    .leftJoin('vaccines as n', 'v.vaccine_id', 'n.id')
    .select(
        'v.id as vaccine_does_id',
        'n.fullname as vaccine_name',
        'v.dose_number as vaccine_dose_number',
        'v.due_month as vaccine_dose_month',
        'i.received_date as vaccine_received_date',
        'c.name as vaccine_administer_clinic',
        'i.clinic_id',
        'i.patient_id',
        'i.id as immunization_record_id',
        'i.note',
       
    )
    .where({patient_id: req.params.patient_id})
    .orWhere({immunization_record_id:null})
    if (vaccineTemplate.length > 0){
        res.status(201).json(vaccineTemplate)
    }else{
        res.status(404).json({ message: 'this record does not exist' });
    }
};



export const getImmunizationEditRequests = model => async (req, res) => {
    const staff = await db('staffs')
    .where({id:req.params.staff_id})
    .first()
    
    console.log('req.params.staff_id', staff)
    
    const editRequests = await db('immunization_edit_requests as i')
    .join('clinics as c', 'i.clinic_id', 'c.id')
    .join('patients as p', 'p.id', 'i.patient_id')
    .join('vaccine_doses_schedules as v', 'v.id', 'i.vaccine_dose_id')
    .join('vaccines as n', 'n.id', 'v.vaccine_id')
    .select(
        'i.id as record_update_requests_id',
        'i.patient_id',
        'p.username as patient_username',
        'p.first_name as patient_first_name',
        'p.last_name as patient_last_name',
        'v.id as vaccine_dose_id',
        'n.fullname as vaccine_name',
        'v.dose_number as vaccine_dose_number',
        'v.due_month as vaccine_dose_month',
        'c.id as appointed_clinic_id',
        'c.name as appointed_clinic',
        'i.note as update_request_note',
        
    )
    .where({clinic_id: staff.clinic_id})
    
    if (editRequests.length > 0){
        res.status(201).json(editRequests)
    }else{
        res.status(404).json({ message: 'this record does not exist' });
    }
};



export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
  getManyByProps:getManyByProps(model),
  getFamiliesByEmail:getFamiliesByEmail(model),
  getImmunizationRecords:getImmunizationRecords(model),
  getImmunizationEditRequests:getImmunizationEditRequests(model)
})
