'use strict';
const { BigQuery } = require('@google-cloud/bigquery');
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
let result = [];
let uniqueTables = [...new Set(data.map((item) => item.Tabla))];

uniqueTables.forEach((table) => {
  let tableData = data.filter((item) => item.Tabla === table);
  let schema = tableData.map((item) => {
    let obj = {
      name: item.Columna,
      type: item['Tipo de dato en DB'].toUpperCase(),
    };
    if (item['Valor por defecto'] === 'Requerido') {
      obj.mode = 'REQUIRED';
    }
    return obj;
  });
  result.push({
    datasetId: tableData[0].Dataset,
    tableId: table,
    schema: schema,
  });
});

console.log(result[0]);

async function createTable(datasetId, tableId, schema) {
  const bigquery = new BigQuery({ projectId, credentials });
  const options = {
    schema: schema,
    location: 'US',
  };

  // Create a new table in the dataset
  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tableId, options);

  console.log(`Table ${table.id} created.`);
}
async function createAllTables() {
  try {
    await Promise.allSettled(
      result.forEach(async (element) => {
        let { datasetId, tableId, schema } = element;
        await createTable(datasetId, tableId, schema);
      })
    );

    console.log('Tablas creadas exitosamente');
  } catch (e) {
    console.error('Error creando Tabalas', e);
  }
}
createAllTables();
