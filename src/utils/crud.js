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
   	const lastId = await db(model).insert(req.body, 'id')
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

export const getImmunizationRecords = model => async (req, res) => {
    const vaccineTemplate = await db('vaccine_doses_schedules as v')
    .leftJoin('immunization_records as i', 'i.vaccine_dose_id', 'v.id')
    .leftJoin('clinics as c', 'i.clinic_id', 'c.id')
    .leftJoin('vaccines as n', 'v.vaccine_id', 'n.id')
    .select(
        'v.id as vaccine_dose_id',
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
    
    console.log('req.params.patient_id}', req.params.patient_id)
    // console.log("vaccineTemplate",vaccineTemplate)
    
    if (vaccineTemplate.length > 0){
        res.status(201).json(vaccineTemplate)
    }else{
        res.status(404).json({ message: 'this record does not exist' });
    }
};


export const saveImmunizationRecord = model => async (req, res) => {
    const {request_id} = req.body
    const lastId = await db('immunization_records').insert(req.body, 'id')
    
    await db('immunization_record_update_requests')
                .where({id:request_id})
                .del(req.body)
    
    // res.status(200).json(list)
    // res.status(200).json({message: `${count} ${count > 1 ? 'records' : 'record'} deleted`})
    res.status(201).json({message: 'Immunization Record Updated', lastId: lastId[0]})
}

//
// http://localhost:3000/api/staffs/1/immunization_edit_requests/1/1
export const getImmunizationRecordRequestDetail = model => async (req, res) => {
    const {staff_id, patient_id, edit_request_id} = req.params
    const vaccineTemplate = await db('immunization_record_update_requests as r')
    .whereRaw('r.id = ?', edit_request_id)
    .where({patient_id: patient_id})
    .leftJoin('vaccine_doses_schedules as d', 'd.id', 'r.vaccine_dose_id')
    .leftJoin('vaccines as v', 'v.id', 'd.vaccine_id')
    .leftJoin('patients as p', 'p.id', 'r.patient_id')
    .select(
        'r.id as record_edit_request_id',
        'd.id as vaccine_dose_id',
        'v.fullname as vaccine_name',
        'd.dose_number as vaccine_dose_number',
        'd.due_month as vaccine_dose_month',
        'p.id as patient_id',
        'p.avatar as patient_avatar',
        'p.username as patient_username',
        'p.first_name as patient_first_name',
        'p.last_name as patient_last_name',
        'p.email as patient_email',
        'r.note as record_edit_request_note',
    )

    if (vaccineTemplate.length > 0){
        res.status(201).json(vaccineTemplate)
    }else{
        res.status(404).json({ message: 'this record does not exist' });
    }
};

// http://localhost:3000/api/staffs/1/immunization_edit_requests/1
export const getImmunizationRecordRequestsByPatient = model => async (req, res) => {
    const patientRequests = await db('immunization_record_update_requests as r')
    .where({patient_id: req.params.patient_id})
    .leftJoin('vaccine_doses_schedules as d', 'd.id', 'r.vaccine_dose_id')
    .leftJoin('vaccines as v', 'v.id', 'd.vaccine_id')
    .leftJoin('patients as p', 'p.id', 'r.patient_id')
    .select(
        'p.id as patient_id',
        'r.id as record_edit_request_id',
        'd.id as vaccine_dose_id',
        'v.fullname as vaccine_name',
        'd.dose_number as vaccine_dose_number',
        'd.due_month as vaccine_dose_month',
        'p.avatar as patient_avatar',
        'p.username as patient_username',
        'p.first_name as patient_first_name',
        'p.last_name as patient_last_name',
        'p.email as patient_email',
        'r.note as record_edit_request_note',
    )
  
    if (patientRequests.length > 0){
        res.status(201).json(patientRequests)
    }else{
        res.status(404).json({ message: 'this record does not exist' });
    }
};

// http://localhost:3000/api/staffs/1/immunization_edit_requests
export const getImmunizationEditRequestsByClinic = model => async (req, res) => {
    const staff = await db('staffs')
    .where({id:req.params.staff_id})
    .first()
    
    const editRequests = await db('immunization_record_update_requests as i')
    .where({clinic_id: staff.clinic_id})
    .join('clinics as c', 'i.clinic_id', 'c.id')
    .join('patients as p', 'p.id', 'i.patient_id')
    .join('vaccine_doses_schedules as v', 'v.id', 'i.vaccine_dose_id')
    .join('vaccines as n', 'n.id', 'v.vaccine_id')
    .select(
        'i.id as record_edit_request_id',
        'i.patient_id',
        'p.avatar as patient_avatar',
        'p.username as patient_username',
        'p.first_name as patient_first_name',
        'p.last_name as patient_last_name',
        'p.email as patient_email',
        'v.id as vaccine_dose_id',
        'n.fullname as vaccine_name',
        'v.dose_number as vaccine_dose_number',
        'v.due_month as vaccine_dose_month',
        'c.id as appointed_clinic_id',
        'c.name as appointed_clinic',
        'i.note as record_edit_request_note',
    )
  
    if (editRequests.length > 0){
        res.status(200).json(editRequests)
    }else{
        res.status(200).json({ message: 'There is no record edit request at this moment' });
    }
};

export const saveImmunizationRecordRequest = model => async (req, res) => {
    const {clinic_id, vaccine_dose_id, note} = req.body
    const lastId = await db('immunization_record_update_requests')
                                    .insert({
                                        clinic_id,
                                        note,
                                        patient_id: req.params.patient_id,
                                        vaccine_dose_id,
                                    }, 'id')
    res.status(201).json({message: 'Immunization Record Request Saved', lastId: lastId[0]})
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
    getImmunizationEditRequestsByClinic:getImmunizationEditRequestsByClinic(model),
  getImmunizationRecordRequestsByPatient:getImmunizationRecordRequestsByPatient(model),
  getImmunizationRecordRequestDetail:getImmunizationRecordRequestDetail(model),
  saveImmunizationRecordRequest:saveImmunizationRecordRequest(model),
    saveImmunizationRecord:saveImmunizationRecord(model)
})
