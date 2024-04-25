const keys = require('../../../boot-jav-62f4a48f13a5.json');
const { DataplexServiceClient } = require('@google-cloud/dataplex');
const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

var XLSX = require('xlsx');

const projectId = 'boot-jav';
const location = 'us-central1';

// Leer el archivo
var workbook = XLSX.readFile('./datamesh_examples.xlsx');

// Obtener la primera hoja del archivos
var sheet_name_list = workbook.SheetNames;
var worksheet = workbook.Sheets[sheet_name_list[0]];

// Convertir la hoja a JSON
var data = XLSX.utils.sheet_to_json(worksheet);

const parent = `projects/${projectId}/locations/${location}/lakes/${lake_id}`;

// const zoneId = 'abc123';

// const zone = {
//   diaplayName: 'creando zona',
//   type: 1,
//   resourceSpec: {
//     locationType: 1,
//   },
// };

// Imports the Dataplex library

// Instantiates a client
const dataplexClient = new DataplexServiceClient({ credentials });

async function callCreateZone() {
  // Construct request
  const request = {
    parent,
    zoneId,
    zone,
  };

  // Run request
  try {
    // Run request
    const [operation] = await dataplexClient.createZone(request);
    const [response] = await operation.promise();
    console.log(response);
  } catch (error) {
    console.error('Error creating zone:', error);
  }
}
