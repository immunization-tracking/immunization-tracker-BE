
import patientController from '../controllers/patients'
import {getManyByProps} from "../utils/crud";

const verifyAddingPatients = require('../middlewares/errorHandlers/patients/verifyAddingPatients');
const verifyUpdatingPatients = require('../middlewares/errorHandlers/patients/verifyUpdatingPatients');
const serverErrorHandler = require('../middlewares/errorHandlers/serverErrorHandler');

function setupPatientRoutes(router){
	router.get("/", serverErrorHandler(patientController.getMany))
	router.get("/:id", serverErrorHandler(patientController.getFamiliesByEmail))
	router.post('/', verifyAddingPatients, serverErrorHandler(patientController.createOne))
	// router.get('/:id', serverErrorHandler(patientController.getOne))
	router.put('/:id', verifyUpdatingPatients, serverErrorHandler(patientController.updateOne))
	router.delete('/:id', serverErrorHandler(patientController.removeOne))
}

export default setupPatientRoutes
