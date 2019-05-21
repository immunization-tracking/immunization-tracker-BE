
import recordRouterController from '../controllers/immunization_records'

const verifyAddingImmunizationRecords = require('../middlewares/errorHandlers/immunization_records/verifyAddingImmunizationRecords');
const verifyUpdatingImmunizationRecords = require('../middlewares/errorHandlers/immunization_records/verifyUpdatingImmunizationRecords');
const serverErrorHandler = require('../middlewares/errorHandlers/serverErrorHandler');


function setupImmunizationRecordRoutes(router){
	router.get("/", serverErrorHandler(recordRouterController.getMany))
	router.post('/', verifyAddingImmunizationRecords, serverErrorHandler(recordRouterController.createOne))
	router.get('/:id', serverErrorHandler(recordRouterController.getRecordsByPatientId))
	router.put('/:id', verifyUpdatingImmunizationRecords, serverErrorHandler(recordRouterController.updateOne))
	router.delete('/:id', serverErrorHandler(recordRouterController.removeOne))
}

export default setupImmunizationRecordRoutes
