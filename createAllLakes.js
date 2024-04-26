const keys = require('../boot-jav-62f4a48f13a5.json');
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

const lakes = new Set(data.map((row) => row['Lake']));
const arrLakes = Array.from(lakes).map((lake) => lake.toLowerCase());

async function createAllLakes() {
  try {
    await Promise.allSettled(
      arrLakes.map(async (e) => await createLake(e))
    );
    console.log('All lakes created successfully');
  } catch (error) {
    console.error('Error creating lakes:', error);
  }
}

createAllLakes();
async function createLake(lakeId) {
  const client = new DataplexServiceClient({ credentials });
  const parent = `projects/${projectId}/locations/${location}`;
  const lake = {};

  async function callCreateLake() {
    const request = {
      parent,
      lakeId,
      lake,
    };

    const [operation] = await client.createLake(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callCreateLake();
  // [END dataplex_v1_generated_DataplexService_CreateLake_async]
}
