import { Router } from 'express'

import ensureAuthentificated from '@modules/users/infra/http/middlewares/ensureAuthentificated'
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmantesController = new AppointmentsController()

appointmentsRouter.use(ensureAuthentificated)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find()
//   return response.json(appointments)
// })

appointmentsRouter.post('/', appointmantesController.create)

export default appointmentsRouter
