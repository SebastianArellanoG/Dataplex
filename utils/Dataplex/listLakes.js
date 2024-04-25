const keys = require('../boot-jav-62f4a48f13a5.json');

const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

// eslint-disable-next-line node/no-missing-require
const { DataplexServiceClient } = require('@google-cloud/dataplex');

// TODO(developer): replace with your prefered project ID.
const projectId = 'boot-jav';
const location = 'us-central1';

// Creates a client1046198160504
// eslint-disable-next-line no-unused-vars
const client = new DataplexServiceClient({ credentials });

async function listLakes() {
  const [lakes] = await client.listLakes({
    parent: `projects/${projectId}/locations/${location}`,
  });
  console.info(lakes);
}
listLakes();
