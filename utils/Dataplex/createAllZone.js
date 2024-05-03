const keys = require('../../../boot-jav-62f4a48f13a5.json');
const { DataplexServiceClient } = require('@google-cloud/dataplex');
const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

var XLSX = require('xlsx');

const projectId = 'boot-jav';
const location = 'us-central1';

//Leer el archivo
var workbook = XLSX.readFile('./datamesh_examples.xlsx');

// Obtener la primera hoja del archivos
var sheet_name_list = workbook.SheetNames;
var worksheet = workbook.Sheets[sheet_name_list[0]];

// Convertir la hoja a JSON
var data = XLSX.utils.sheet_to_json(worksheet);
const lakeZoneMap = {};

data.forEach((entry) => {
  const lake = entry.Lake.toLowerCase().replace(' ', '');
  const zone = entry.Zone.toLowerCase().replace(' ', '');

  if (!lakeZoneMap[lake]) {
    lakeZoneMap[lake] = [];
  }
  if (!lakeZoneMap[lake].includes(zone)) {
    lakeZoneMap[lake].push(zone);
  }
});

const dataLakeAndZone = Object.keys(lakeZoneMap).map((lake) => ({
  lake_id: lake,
  lakezone: lakeZoneMap[lake],
}));

async function createAllZones() {
  try {
    dataLakeAndZone.map(async (lake) => {
      const { lake_id, lakezone } = lake;
      const parent = `projects/${projectId}/locations/${location}/lakes/${lake_id}`;
      lakezone.forEach(async (e) => await callCreateZone(e, parent));
    });
  } catch {
    console.error('Error creating Zones', error);
  }
}

async function callCreateZone(zoneId, parent) {
  const dataplexClient = new DataplexServiceClient({ credentials });

  const zone = {
    diaplayName: zoneId,
    type: 1,
    resourceSpec: {
      locationType: 1,
    },
  };
  // Construct request

  const request = {
    parent,
    zoneId,
    zone,
  };

  // Run request

  const [operation] = await dataplexClient.createZone(request);
  const [response] = await operation.promise();
  console.log(response);
}

createAllZones();
