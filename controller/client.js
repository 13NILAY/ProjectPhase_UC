const Client = require('../model/client');

const createclient = async (req, res) => {
    try {
        const client = new Client(req.body);
        const savedclient = await client.save();
        res.json(savedclient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllClients = async (req, res) => {
    try {
        const client = await Client.find();
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (client === null) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (client === null) {
            return res.status(404).json({ message: 'Client not found' });
        }
        Object.assign(client, req.body);
        const updatedclient = await client.save();
        res.json(updatedclient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (client === null) {
            return res.status(404).json({ message: 'Client not found' });
        }
        await client.remove();
        res.json({ message: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createclient,getAllClients,getClientById,deleteClient,updateClient
};
