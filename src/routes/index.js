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
		res.status(200).end("Hello World")
	})
	
}

export default setupRoutes
