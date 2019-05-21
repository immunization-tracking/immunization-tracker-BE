
import staffController from '../controllers/staffs'

const verifyAddingStaffs = require('../middlewares/errorHandlers/staffs/verifyAddingStaffs');
const verifyUpdatingStaffs = require('../middlewares/errorHandlers/staffs/verifyUpdatingStaffs');
const serverErrorHandler = require('../middlewares/errorHandlers/serverErrorHandler');

function setupStaffRoutes(router){
	console.log('staffController', serverErrorHandler(staffController))
	router.get("/", serverErrorHandler(staffController.getMany))
	router.get("/:staff_id/immunization_edit_requests", serverErrorHandler(staffController.getImmunizationEditRequests))
	router.post('/', verifyAddingStaffs, serverErrorHandler(staffController.createOne))
	router.get('/:id', serverErrorHandler(staffController.getOne))
	router.put('/:id', verifyUpdatingStaffs, serverErrorHandler(staffController.updateOne))
	router.delete('/:id', serverErrorHandler(staffController.removeOne))
	
	
}

export default setupStaffRoutes
