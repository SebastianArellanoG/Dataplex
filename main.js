const keys = require('../boot-jav-62f4a48f13a5.json');

const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

const projectId = 'boot-jav';
const location = 'us-central1';

// Imports the Dataplex library
const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery({ projectId, credentials });

async function createDataset(datasetId) {
  const options = {
    location: 'US',
  };

  // Create a new dataset
  const [dataset] = await bigquery.createDataset(datasetId, options);
  console.log(`Dataset ${dataset.id} created.`);
}
createDataset();
