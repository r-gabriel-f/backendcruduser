const express = require('express');
const cors = require('cors');
const userController = require('./userController');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.post('/users', userController.createUser);      // Crear usuario
app.get('/users', userController.getUsers);         // Obtener todos los usuarios
app.get('/users/:id', userController.getUserById);  // Obtener un usuario por ID
app.put('/users/:id', userController.updateUser);   // Actualizar un usuario
app.delete('/users/:id', userController.deleteUser); // Eliminar un usuario

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
