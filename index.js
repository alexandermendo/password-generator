const express = require('express');
const app = express();
const port = 3000;

// Función para generar una contraseña aleatoria
function generatePassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Ruta para generar una contraseña
app.get('/generate-password', (req, res) => {
  try {
    const length = parseInt(req.query.length) || 12; // Longitud por defecto de 12 si no se especifica
    if (isNaN(length) || length <= 0) {
      throw new Error('Invalid length parameter');
    }
    const password = generatePassword(length);
    console.log(`Generated password: ${password}`);
    res.json({ password });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Password generator app listening at http://localhost:${port}/generate-password?length=16`);
});
