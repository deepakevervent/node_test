import express from 'express';
import { basicAuth, brokkerAuth } from '../../middleware/auth';
import { contacts } from '../../controller/broker';

const broker = express.Router();

broker.post('/contacts', basicAuth, brokkerAuth, contacts.postAction);
// broker.get('/contacts', brokkerAuth)
// broker.patch('/contacts', brokkerAuth)
// broker.delete('/contacts', brokkerAuth)

export {broker}