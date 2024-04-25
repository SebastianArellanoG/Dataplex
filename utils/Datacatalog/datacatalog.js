'use strict';

function main() {
  const { DataCatalogClient } =
    require('@google-cloud/datacatalog').v1beta1;

  const keys = require('../../../boot-jav-62f4a48f13a5.json');
  const projectId = 'boot-jav';
  const location = 'us-central1';
  const tag_template_id = 'confidentiality_data';
  const name = `projects/${projectId}/locations/${location}/tagTemplates/${tag_template_id}`;

  // Instantiates a client
  const datacatalogClient = new DataCatalogClient({
    credentials: {
      client_email: keys.client_email,
      private_key: keys.private_key,
    },
  });

  async function callGetTagTemplate() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await datacatalogClient.getTagTemplate(request);
    console.log(response);
  }

  callGetTagTemplate();
  // [END datacatalog_v1beta1_generated_DataCatalog_GetTagTemplate_async]
}

process.on('unhandledRejection', (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
