const express = require('express');
const cors = require('cors');
const userController = require('./userController');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});