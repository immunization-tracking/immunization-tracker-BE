'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _patients = require('../controllers/patients');

var _patients2 = _interopRequireDefault(_patients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyAddingPatients = require('../middlewares/errorHandlers/patients/verifyAddingPatients');
const verifyUpdatingPatients = require('../middlewares/errorHandlers/patients/verifyUpdatingPatients');

const serverErrorHandler = require('../middlewares/errorHandlers/serverErrorHandler');

function setupPatientRoutes(router) {
	router.get("/", serverErrorHandler(_patients2.default.getMany));
	router.get("/:id", serverErrorHandler(_patients2.default.getFamiliesByEmail));
	router.post('/', verifyAddingPatients, serverErrorHandler(_patients2.default.createOne));
	router.put('/:id', verifyUpdatingPatients, serverErrorHandler(_patients2.default.updateOne));
	router.delete('/:id', serverErrorHandler(_patients2.default.removeOne));
}

exports.default = setupPatientRoutes;