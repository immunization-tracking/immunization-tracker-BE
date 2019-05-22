import express from 'express'
import setupStaffRoutes from './staffs'
import setupClinicRoutes from './clinics'
import setupPatientRoutes from './patients'
import setupVaccineRoutes from './vaccines'
import setupImmunizationRecordRoutes from './immunization_records'
import setupVaccineDosesSchedulesRoutes from './vaccine_doses_schedules'
import setupImmunizationEditRequestRoutes from './immunization_edit_requests'

const serverErrorHandler = require('../middlewares/errorHandlers/serverErrorHandler');
const verifyRequestBodyOnRegister = require('../middlewares/errorHandlers/auth/verifyRequestBodyOnPatientRegister');
const verifyRequestBodyOnLogin = require('../middlewares/errorHandlers/auth/verifyRequestBodyOnPatientLogin');
import { register, login, protect } from '../utils/auth'

function setupRoutes(app){
	// protected route
	// app.use('/api', protect)
	
	//  Check route,
	// app.use('/api', protect)
	
	// Staffs
	const staffRouter = express.Router()
	setupStaffRoutes(staffRouter)
	app.use('/api/staffs', staffRouter)
	
	// Clinics
	const clincRouter = express.Router()
	setupClinicRoutes(clincRouter)
	app.use('/api/clinics', clincRouter)
	
	// Patients
	const patientRouter = express.Router()
	setupPatientRoutes(patientRouter)
	app.use('/api/patients', patientRouter)
	
	// Vaccines
	const vaccineRouter = express.Router()
	setupVaccineRoutes(vaccineRouter)
	app.use('/api/vaccines', vaccineRouter)
	
	// Immunization records
	const recordRouter = express.Router()
	setupImmunizationRecordRoutes(recordRouter)
	app.use('/api/immunization_records', recordRouter)
	
	// Vaccine Doses schedules
	const scheduleRouter = express.Router()
	setupVaccineDosesSchedulesRoutes(scheduleRouter)
	app.use('/api/vaccine_schedules', scheduleRouter)
	
	// Immunization edit request
	const editRequestRouter = express.Router()
	setupImmunizationEditRequestRoutes(editRequestRouter)
	app.use('/api/immunization_edit_requests', editRequestRouter)
	
	app.post('/register', verifyRequestBodyOnRegister, serverErrorHandler(register))
	app.post('/login', verifyRequestBodyOnLogin, serverErrorHandler(login))
	
	app.get('/', async (req, res) => {
		console.log('root route called')
		res.status(200).end(`
		RESTful API Endpoints
Patient Endpoints
Register new patient - POST
https://immunization-tracker-backend.herokuapp.com/register?role=1

Query String

role: 0 (staff) | 1 ( patient )

Argument
  {
    "username": "string", // required, unique
    "password": "string", // required
    "email": "string", // required
    "is_child": "number", // 0 | 1 (child)
    "first_name": "string",
    "last_name": "string",
    "phone": "string",
    "avatar": "string",
    "ss_id": "string", // social security id
  }
Return
{
"message": "Registration successful",
"lastId": number,
}
 
 Database generates id and timestamp.

Login existing patient - POST
https://immunization-tracker-backend.herokuapp.com/login?role=1

Query String

role: 0 (staff) | 1 ( patient )

Arguments
  {
    "username": “string",
    "password": “string"
  }
Return
  {
    "message": "Login successful",
    "patient_id": number,
    "username": “string",
    "token": “abcd"
  }

  Database generates id and timestamp.
Staff Endpoints
Register new staff - POST
https://immunization-tracker-backend.herokuapp.com/register?role=0

Query String

role: 0 (staff) | 1 ( patient )

Argument
  {
    "username": "string", // required, unique
    "password": "string", // required
    "email": "string", // required
    "clinic_id": "number", // required
    "first_name": "string",
    "last_name": "string",
    "avatar": "string",
  }
Return
{
"message": "Registration successful",
"lastId": number,
}
 
 Database generates id and timestamp.

Login existing staff - POST
https://immunization-tracker-backend.herokuapp.com/login?role=0

Query String

role: 0 (staff) | 1 ( patient )

Arguments
  {
    "username": “string",
    "password": “string"
  }
Return
  {
    "message": "Login successful",
    "staff_id": number,
    "username": “string",
    "token": “abcd"
  }

  Database generates id and timestamp.
Get family members - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id

Parameter :

"patient_id": "number"

Return
  [
\t{
\t    "username": "string",
\t\t"password": "string",
\t\t"email": "string",
\t\t"is_child": "number",
\t\t"first_name": "string",
\t\t"last_name": "string",
\t\t"phone": "string",
\t\t"avatar": "string",
\t\t"ss_id": "string",
\t},
\t...
  ]
Update patient profile by id - UPDATE - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id

Parameter :

"patient_id": "number"

Return
  {
    "message": "Patient successfully updated"
  }
Delete patient by id - DELETE - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id

Parameter :

"patient_id": "number"

Return
  {
    "message": "Patient successfully deleted"
  }
Immunization Records Endpoints
Get patient immunization records - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id/immunization_records/

Parameter :

"patient_id": "number"

Return
  [
\t {
            "vaccine_does_id":  "number",
            "vaccine_name": "string",
            "vaccine_dose_number":  "number",
            "vaccine_dose_month":  "number",
            "vaccine_received_date": "date"
            "vaccine_administer_clinic": "string",
            "clinic_id":  "number",
            "patient_id":  "number",
            "immunization_record_id":  "number",
            "note": "string",
          },
\t...
  ]
Get patient immunization records - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id/immunization_records/

Parameter :

"patient_id": "number"

Return
  [
\t {
            "vaccine_does_id":  "number",
            "vaccine_name": "string",
            "vaccine_dose_number":  "number",
            "vaccine_dose_month":  "number",
            "vaccine_received_date": "date"
            "vaccine_administer_clinic": "string",
            "clinic_id":  "number",
            "patient_id":  "number",
            "immunization_record_id":  "number",
            "note": "string",
          },
\t...
  ]
Clinic / Staffs Endpoints
Get patient immunization records edit requests by Clinic - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/staffs/:staff_id/immunization_edit_requests

Parameter :

"staff_id": "number"

Return
  [
\t  {
        "record_edit_request_id": "number",
        "patient_id": "number",
        "patient_username": "string",
        "patient_first_name": "string",
        "patient_last_name": "string",
        "vaccine_dose_id": "number",
        "vaccine_name": "string",
        "vaccine_dose_number": "number",
        "vaccine_dose_month": "number",
        "appointed_clinic_id": "number",
        "appointed_clinic": "string",
        "record_edit_request_note": "string",
      },
\t...
  ]
Get patient immunization record edit requests by Patient - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/staffs/:staff_id/immunization_edit_requests/:patient_id

Parameter :

"staff_id": "number"
"patient_id": "number"

Return
  [
\t  {
        "patient_id": "number",
        "record_edit_request_id": "number",
        "vaccine_dose_id": "number",
        "vaccine_name": "string",
\t\t"vaccine_dose_number": "number",
\t\t"vaccine_dose_month": "number",
        "patient_first_name": "string",
        "patient_last_name": "string",
        "patient_username": "string",
        "record_edit_request_note": "string",
      },
\t...
  ]
Get patient immunization record edit request details by Patient - GET - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/staffs/:staff_id/immunization_edit_requests/:patient_id/:edit_request_id

Parameter :

"staff_id": "number"
"patient_id": "number"
"edit_request_id": "number"

Return
  [
\t  {
        "record_edit_request_id": "number",
        "vaccine_dose_id": "number",
        "vaccine_name": "string",
\t\t"vaccine_dose_number": "number",
\t\t"vaccine_dose_month": "number",
        "patient_id": "number",
        "patient_first_name": "string",
        "patient_last_name": "string",
        "patient_username": "string",
        "record_edit_request_note": "string",
      },
\t...
  ]
POST Vaccination Dose Edit Request - POST - RESTRICTED
https://immunization-tracker-backend.herokuapp.com/api/patients/:patient_id/immunization_records/

Arguments
  {
    "clinic_id": “number"
    "note": “string",
    "vaccine_dose_id": "number"
  }
Parameter :

"patient_id": "number"

Return
  [
\t{
\t\t"message": "string",
\t\t"lastId": “number",
    }
  ]
		
		`)
	})
	
}

export default setupRoutes
