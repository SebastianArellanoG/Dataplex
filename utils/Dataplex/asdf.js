const keys = require('../../../boot-jav-62f4a48f13a5.json');
const { DataplexServiceClient } = require('@google-cloud/dataplex');
const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

var XLSX = require('xlsx');

const projectId = 'boot-jav';
const location = 'us-central1';
const dataLakeZone = [
  {
    lake_id: 'customer',
    lakezone: ['raw customer', 'raw loyalty'],
  },
];

function main(zone, parent) {
  let zoneId = zone;
  console.log(zone);
  console.log(zoneId);
  const dataplexClient = new DataplexServiceClient({ credentials });
  console.log('en main');
  async function callCreateZone(zoneId) {
    console.log(zoneId);

    const zone = {
      displayName: zoneId,
      type: 1,
      resourceSpec: {
        locationType: 1,
      },
    };
    // Construct request
    console.log(parent);
    const request = {
      parent,
      zoneId,
      zone,
    };

    // Run request

    const [operation] = await dataplexClient.createZone(request);
    const [response] = await operation.promise();
    console.log(response);
    console.log('asdf');
  }
  callCreateZone();
}

dataLakeZone.forEach((e) => {
  const { lake_id, lakezone } = e;
  const parent = `projects/${projectId}/locations/${location}/lakes/${lake_id}`;

  lakezone.forEach((zone) => {
    console.log(zone);
    main(zone, parent); // Pasa parent como argumento adicional
  });
});
