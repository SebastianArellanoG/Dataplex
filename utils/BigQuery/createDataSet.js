const keys = require('../../../boot-jav-62f4a48f13a5.json');

const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

const projectId = 'boot-jav';
const location = 'us-central1';
var XLSX = require('xlsx');
//Leer el archivo
const workbook = XLSX.readFile('./datamesh_examples.xlsx');

// Obtener la primera hoja del archivos
var sheet_name_list = workbook.SheetNames;
var worksheet = workbook.Sheets[sheet_name_list[0]];

// Convertir la hoja a JSON
var data = XLSX.utils.sheet_to_json(worksheet);

let uniqueDatasets = [...new Set(data.map((item) => item.Dataset))];
console.log(uniqueDatasets);
// Imports the Dataplex library
const { BigQuery } = require('@google-cloud/bigquery');

// Instantiates a client

async function createDataset(datasetId) {
  const bigquery = new BigQuery({ projectId, credentials });

  const options = {
    location: 'US',
  };

  // Create a new dataset
  const [dataset] = await bigquery.createDataset(datasetId, options);
  console.log(`Dataset ${dataset.id} created.`);
}

async function createAllDataset() {
  try {
    uniqueDatasets.forEach(async (dataset) => {
      await createDataset(dataset);
    });
  } catch (error) {
    console.error('Error al crear la dataset', error);
  }
}

createAllDataset();
