const { DataplexServiceClient } = require('@google-cloud/dataplex');
const keys = require('../../../boot-jav-62f4a48f13a5.json');

async function mainLake() {
  // Crea una instancia del cliente de Dataplex usando las credenciales del archivo JSON
  const credentials = {
    client_email: keys.client_email,
    private_key: keys.private_key,
  };

  const client = new DataplexServiceClient({ credentials });

  const projectId = 'boot-jav';
  const location = 'us-central1';
  const parent = `projects/${projectId}/locations/${location}`;
  const lakeId = 'lake';
  const lake = {};

  async function callCreateLake() {
    // Construct request
    const request = {
      parent,
      lakeId,
      lake,
    };

    // Run request
    const [operation] = await client.createLake(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  // [END dataplex_v1_generated_DataplexService_CreateLake_async]
}
