const keys = require('../boot-jav-62f4a48f13a5.json');

const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

const project_Id = 'boot-jav';
const location = 'us-central1';
const lake_id = 'abc';
const zoneId = 'abc123';

const parent = `projects/${project_Id}/locations/${location}/lakes/${lake_id}/zones/${zoneId}`;

const assetId = 'abc123';
const asset = {
  resourceSpec: {
    type: 2,
    locationType: 1,
    //Create a dataset first
    name: `projects/${project_Id}/datasets/my_new_dataset`,
  },
};
// Imports the Dataplex library
const { DataplexServiceClient } =
  require('@google-cloud/dataplex').v1;

// Instantiates a client
const dataplexClient = new DataplexServiceClient({ credentials });

async function callCreateAsset() {
  // Construct request
  const request = {
    parent,
    assetId,
    asset,
  };

  // Run request
  const [operation] = await dataplexClient.createAsset(request);
  const [response] = await operation.promise();
  console.log(response);
}

callCreateAsset();
