const express = require('express');
const bodyParser = require('body-parser');
const { composeAPI, generateAddress } = require('@iota/core');

const app = express();
const port = process.env.PORT || 3000; // Utilizar el puerto proporcionado por Render o 52782 si se ejecuta localmente

app.use(bodyParser.json());

const iota = composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
});

// Función para generar una semilla aleatoria de longitud 81
function generateSeed() {
  const length = 81;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let seed = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    seed += charset[randomIndex];
  }
  return seed;
}

app.post('/sendFile', async (req, res) => {
  console.log('Recibida solicitud para enviar archivo');
  const { filePath } = req.body;

  // Genera una semilla aleatoria
  const seed = generateSeed();

  // Lógica para enviar el archivo a la red Tangle
  // Implementa la lógica según tu necesidad

  // Por ejemplo, puedes generar una dirección de IOTA para guardar el archivo
  const address = generateAddress(seed);

  res.json({ address });
});

app.get('/getFile/:fileId', async (req, res) => {
  const { fileId } = req.params;

  // Lógica para recuperar el archivo de la red Tangle
  // Implementa la lógica según tu necesidad

  // Por ejemplo, puedes buscar el archivo por su identificador y devolverlo como respuesta
  const fileData = {
    fileName: 'ejemplo.txt',
    fileContent: 'Contenido del archivo'
  };

  res.json(fileData);
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
