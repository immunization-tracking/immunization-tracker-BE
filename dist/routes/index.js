'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _staffs = require('./staffs');

var _staffs2 = _interopRequireDefault(_staffs);

var _clinics = require('./clinics');

var _clinics2 = _interopRequireDefault(_clinics);

var _patients = require('./patients');

var _patients2 = _interopRequireDefault(_patients);

var _vaccines = require('./vaccines');

var _vaccines2 = _interopRequireDefault(_vaccines);

var _immunization_records = require('./immunization_records');

var _immunization_records2 = _interopRequireDefault(_immunization_records);

var _vaccine_doses_schedules = require('./vaccine_doses_schedules');

var _vaccine_doses_schedules2 = _interopRequireDefault(_vaccine_doses_schedules);

var _immunization_edit_requests = require('./immunization_edit_requests');

var _immunization_edit_requests2 = _interopRequireDefault(_immunization_edit_requests);

var _auth = require('../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serverErrorHandler = require('../middlewares/errorHandlers/serverErrorHandler');
const verifyRequestBodyOnRegister = require('../middlewares/errorHandlers/auth/verifyRequestBodyOnPatientRegister');
const verifyRequestBodyOnLogin = require('../middlewares/errorHandlers/auth/verifyRequestBodyOnPatientLogin');


function setupRoutes(app) {
	// protected route
	// app.use('/api', protect)

	// Staffs
	const staffRouter = _express2.default.Router();
	(0, _staffs2.default)(staffRouter);
	app.use('/api/staffs', staffRouter);

	// Clinics
	const clincRouter = _express2.default.Router();
	(0, _clinics2.default)(clincRouter);
	app.use('/api/clinics', clincRouter);

	// Patients
	const patientRouter = _express2.default.Router();
	(0, _patients2.default)(patientRouter);
	app.use('/api/patients', patientRouter);

	// Vaccines
	const vaccineRouter = _express2.default.Router();
	(0, _vaccines2.default)(vaccineRouter);
	app.use('/api/vaccines', vaccineRouter);

	// Immunization records
	const recordRouter = _express2.default.Router();
	(0, _immunization_records2.default)(recordRouter);
	app.use('/api/immunization_records', recordRouter);

	// Vaccine Doses schedules
	const scheduleRouter = _express2.default.Router();
	(0, _vaccine_doses_schedules2.default)(scheduleRouter);
	app.use('/api/vaccine_schedules', scheduleRouter);

	// Immunization edit request
	const editRequestRouter = _express2.default.Router();
	(0, _immunization_edit_requests2.default)(editRequestRouter);
	app.use('/api/immunization_edit_requests', editRequestRouter);

	app.post('/register', verifyRequestBodyOnRegister, serverErrorHandler(_auth.register));
	app.post('/login', verifyRequestBodyOnLogin, serverErrorHandler(_auth.login));

	app.get('/', async (req, res) => {
		console.log('root route called');
		res.status(200).end("Hello World");
	});
}

exports.default = setupRoutes;