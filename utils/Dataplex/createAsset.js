const keys = require('../../../boot-jav-62f4a48f13a5.json');
// Imports the Dataplex library
const { DataplexServiceClient } =
  require('@google-cloud/dataplex').v1;

const project_Id = 'boot-jav';
const location = 'us-central1';
const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};
var XLSX = require('xlsx');
//Leer el archivo
var workbook = XLSX.readFile('./datamesh_examples.xlsx');

// Obtener la primera hoja del archivos
var sheet_name_list = workbook.SheetNames;
var worksheet = workbook.Sheets[sheet_name_list[0]];

// Convertir la hoja a JSON
var data = XLSX.utils.sheet_to_json(worksheet);

let uniqueData = Array.from(
  new Set(data.map((item) => item.Tabla))
).map((tabla) => {
  return data.find((item) => item.Tabla === tabla);
});
let assets = uniqueData.map((item) => {
  return {
    lake: item.Lake,
    zone: item.Zone,
    assetId: item.Tabla,
    asset: {
      resourceSpec: {
        type: 2,
        locationType: 1,
        name: `projects/${project_Id}/datasets/${item.Dataset}`,
      },
    },
  };
});

// Instantiates a client

async function callCreateAsset(parent, assetId, asset) {
  const dataplexClient = new DataplexServiceClient({ credentials });
  console.log(assetId);
  const request = {
    parent,
    assetId,
    asset,
  };

  const [operation] = await dataplexClient.createAsset(request);
  const [response] = await operation.promise();
  console.log(response);
}

async function createAllAsset() {
  try {
    await Promise.allSettled(
      assets.map(async (e) => {
        let { lake, zone, assetId, asset } = e;
        let assetID = assetId.replace('_', '');
        assetId = assetID;
        let lake_id = lake.toLowerCase();
        let zoneId = zone.toLowerCase().replace(' ', '');

        const parent = `projects/${project_Id}/locations/${location}/lakes/${lake_id}/zones/${zoneId}`;

        await callCreateAsset(parent, assetId, asset);
      })
    );

    console.log('All assets created successfully');
  } catch (error) {
    console.error('Error creating assets:', error);
  }
}

createAllAsset();
