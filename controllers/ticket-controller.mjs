import { v4 as uuidv4 } from 'uuid';
import tickets from '../data/tickets.json' with { type: 'json' };
import fileHandler from '../utilities/fileHandler.mjs'
import ResponseModel from '../utilities/ResponseModel.mjs';

const listTickets = (req, res, next) => {
  res.status(200).json(new ResponseModel({ statusCode: 200, data: tickets }));
};

const findTicket = (req, res, next) => {
  const ticket = getTicket(req, res, next);

  if (ticket) {
    res.status(200).json(new ResponseModel({ statusCode: 200, data: ticket }));
  }
};

const addTicket = (req, res, next) => {
  const id = uuidv4().replaceAll('-', '');
  req.body.id = id;
  tickets.push(req.body);

  fileHandler('data', 'tickets.json', tickets);

  res.status(201).json(new ResponseModel({ statusCode: 201, data: req.body }));
};

const updatTicket = (req, res, next) => {
  const ticket = getTicket(req, res, next);

  if (ticket) {
    ticket.holdername = req.body.holdername ?? ticket.holdername;
    ticket.event = req.body.event ?? ticket.event;
    ticket.price = req.body.price ?? product.price;

    fileHandler('data', 'tickets.json', tickets);

    res.status(204).end();
  }
};

const updateHoldername = (req, res, next) => {
  const ticket = getTicket(req, res, next);

  if (ticket) {
    ticket.holdername = req.body.holdername ?? ticket.holdername;

    fileHandler('data', 'tickets.json', tickets);

    res.status(204).end();
  }
};

const deleteTicket = (req, res, next) => {
  const ticket = getTicket(req, res, next);

  if (ticket) {
    tickets.splice(tickets.indexOf(ticket), 1);

    fileHandler('data', 'tickets.json', tickets);
    res.status(204).end();
  }
};

const getTicket = (req, res, next) => {
  const ticket = tickets.find((c) => c.id === req.params.id);

  if (!ticket) {
    return next(new ErrorResponse(`No tickets with this id: ${req.params.id}`));
  }

  return ticket;
};

export {
  listTickets,
  findTicket,
  addTicket,
  updatTicket,
  updateHoldername,
  deleteTicket,
};
