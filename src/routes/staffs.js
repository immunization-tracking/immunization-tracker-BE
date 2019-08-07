
import staffController from '../controllers/staffs'

const verifyAddingStaffs = require('../middlewares/errorHandlers/staffs/verifyAddingStaffs');
const verifyUpdatingStaffs = require('../middlewares/errorHandlers/staffs/verifyUpdatingStaffs');
const serverErrorHandler = require('../middlewares/errorHandlers/serverErrorHandler');

function setupStaffRoutes(router){
	console.log('staffController', serverErrorHandler(staffController))
	router.get("/", serverErrorHandler(staffController.getMany))
	router.post('/', verifyAddingStaffs, serverErrorHandler(staffController.createOne))
	router.get('/:id', serverErrorHandler(staffController.getOne))
	router.put('/:id', verifyUpdatingStaffs, serverErrorHandler(staffController.updateOne))
	router.delete('/:id', serverErrorHandler(staffController.removeOne))
	
	router.get("/:id/immunization_edit_requests", serverErrorHandler(staffController.getImmunizationEditRequestsByClinic))
	router.get("/:id/immunization_edit_requests/:patient_id", serverErrorHandler(staffController.getImmunizationRecordRequestsByPatient))
	router.get("/:id/immunization_edit_requests/:patient_id/:edit_request_id", serverErrorHandler(staffController.getImmunizationRecordRequestDetail))
	
	// router.post("/:staff_id/immunization_edit_requests/:patient_id/:edit_request_id", serverErrorHandler(staffController.postImmunizationRecord))
}

export default setupStaffRoutes
