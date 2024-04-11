const express = require('express');
const router = express.Router();
const {createclient,getAllClients,getClientById,updateClient,deleteClient } = require('../controller/client');

router.post('/orders', createclient);
router.get('/orders', getAllClients);
router.get('/orders/:id', getClientById);
router.put('/orders/:id', updateClient);
router.delete('/orders/:id', deleteClient);

module.exports = router;
