
const Order = require('../model/order');

const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order === null) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order === null) {
            return res.status(404).json({ message: 'Order not found' });
        }
        Object.assign(order, req.body);
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order === null) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.remove();
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
