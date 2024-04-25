const keys = require('../boot-jav-62f4a48f13a5.json');

const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

var XLSX = require('xlsx');
const mainLake = require('./utils/Dataplex/createLake');

const projectId = 'boot-jav';
const location = 'us-central1';

// Leer el archivo
try {
  var workbook = XLSX.readFile('./datamesh_examples.xlsx');
} catch (error) {
  console.error('Error reading Excel file:', error);
  return;
}

// Obtener la primera hoja del archivo
var sheet_name_list = workbook.SheetNames;
var worksheet = workbook.Sheets[sheet_name_list[0]];

// Convertir la hoja a JSON
var data;
try {
  data = XLSX.utils.sheet_to_json(worksheet);
} catch (error) {
  console.error('Error converting sheet to JSON:', error);
  return;
}

const lakes = new Set(data.map((row) => row['Lake']));
console.log(lakes);

async function createLakes(lakeId) {
  const parentLake = `projects/${projectId}/locations/${location}`;
  const lake = {};
  try {
    await mainLake(parentLake, lakeId, lake, credentials);
    console.log(`Lake ${lakeId} created successfully`);
  } catch (error) {
    console.error(`Error creating lake ${lakeId}:`, error);
  }
}

async function createAllLakes() {
  try {
    await Promise.allSettled(
      Array.from(lakes).map(async (e) => await createLakes(e))
    );
    console.log('All lakes created successfully');
  } catch (error) {
    console.error('Error creating lakes:', error);
  }
}

createAllLakes();
