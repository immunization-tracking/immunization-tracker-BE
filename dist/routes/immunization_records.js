'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immunization_records = require('../controllers/immunization_records');

var _immunization_records2 = _interopRequireDefault(_immunization_records);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyAddingImmunizationRecords = require('../middlewares/errorHandlers/immunization_records/verifyAddingImmunizationRecords');
const verifyUpdatingImmunizationRecords = require('../middlewares/errorHandlers/immunization_records/verifyUpdatingImmunizationRecords');
const serverErrorHandler = require('../middlewares/errorHandlers/serverErrorHandler');

function setupImmunizationRecordRoutes(router) {
	router.get("/", serverErrorHandler(_immunization_records2.default.getMany));
	router.post('/', verifyAddingImmunizationRecords, serverErrorHandler(_immunization_records2.default.createOne));
	router.get('/:id', serverErrorHandler(_immunization_records2.default.getRecordsByPatientId));
	router.put('/:id', verifyUpdatingImmunizationRecords, serverErrorHandler(_immunization_records2.default.updateOne));
	router.delete('/:id', serverErrorHandler(_immunization_records2.default.removeOne));
}

exports.default = setupImmunizationRecordRoutes;