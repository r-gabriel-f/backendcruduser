const client = require('./db');

const createUser = async (req, res) => {
  const { name, apellidos, correoelectronico, telefono } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO "user" (name, apellidos, correoelectronico, telefono) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, apellidos, correoelectronico, telefono]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const getUsers = async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM "user"');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  };


const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM "user" WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, apellidos, correoelectronico, telefono } = req.body;
  try {
    const result = await client.query(
      'UPDATE "user" SET name = $1, apellidos = $2, correoelectronico = $3, telefono = $4 WHERE id = $5 RETURNING *',
      [name, apellidos, correoelectronico, telefono, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM "user" WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
