function main(parent, tagTemplateId, tagTemplate) {
  // [START datacatalog_v1_generated_DataCatalog_CreateTagTemplate_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */

  // const parent = 'abc123'
  /**
   *  Required. The ID of the tag template to create.
   *  The ID must contain only lowercase letters (a-z), numbers (0-9),
   *  or underscores (_), and must start with a letter or underscore.
   *  The maximum size is 64 bytes when encoded in UTF-8.
   */
  // const tagTemplateId = 'abc123'
  /**
   *  Required. The tag template to create.
   */
  // const tagTemplate = {}

  // Imports the Datacatalog library
  const { DataCatalogClient } = require("@google-cloud/datacatalog").v1;

  // Instantiates a client
  const datacatalogClient = new DataCatalogClient();

  async function callCreateTagTemplate() {
    // Construct request
    const request = {
      parent,
      tagTemplateId,
      tagTemplate,
    };

    // Run request
    const response = await datacatalogClient.createTagTemplate(request);
    console.log(response);
  }

  callCreateTagTemplate();
  // [END datacatalog_v1_generated_DataCatalog_CreateTagTemplate_async]
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
