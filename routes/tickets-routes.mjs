import express from 'express';
import {
  listTickets,
  findTicket,
  addTicket,
  updatTicket,
  updateHoldername,
  deleteTicket,
} from '../controllers/ticket-controller.mjs';

const router = express.Router();

router.route('/').get(listTickets).post(addTicket);
router
  .route('/:id')
  .get(findTicket)
  .put(updatTicket)
  .patch(updateHoldername)
  .delete(deleteTicket);

export default router;
