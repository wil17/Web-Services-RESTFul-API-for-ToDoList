const { Todo } = require('../models');

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    const todo = await Todo.create({ title, description, userId });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.findAll({ where: { userId } }); 
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description } = req.body;
    const [updatedRows] = await Todo.update({ title, description }, { where: { id, userId } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json({ message: 'Todo berhasil diupdate. ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedRows = await Todo.destroy({ where: { id, userId } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json({ message: 'Todo berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    await Todo.destroy({ where: { userId } });
    res.status(200).json({ message: 'Semua todo berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo, deleteAllTodos };