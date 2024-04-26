const keys = require('../../../boot-jav-62f4a48f13a5.json');
const projectId = 'boot-jav';
const location = 'us-central1';
const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};

const fields = {
  fieldSource: {
    displayName: 'Source of data asset',
    type: {
      primitiveType: 'STRING',
    },
  },
  fieldNumRows: {
    displayName: 'Number of rows in data asset',
    isRequired: true,
    type: {
      primitiveType: 'DOUBLE',
    },
  },
  fieldHasPII: {
    displayName: 'Has PII',
    type: {
      primitiveType: 'BOOL',
    },
  },
  fieldPIIType: {
    displayName: 'PII type',
    type: {
      enumType: {
        allowedValues: [
          {
            displayName: 'EMAIL',
          },
          {
            displayName: 'SOCIAL SECURITY NUMBER',
          },
          {
            displayName: 'NONE',
          },
        ],
      },
    },
  },
};

const parent = `projects/${projectId}/locations/${location}`;

const tagTemplate = {
  displayName: 'Demo d templates', // Nombre que se mostrará de la plantilla de etiqueta
  isPubliclyReadable: true,
  fields: fields,
  // Puedes agregar más campos según sea necesario

  // Puedes agregar más configuraciones de la plantilla de etiqueta si es necesario
};

const tagTemplateId = 'abc123sssss';

// Imports the Datacatalog library
const { DataCatalogClient } =
  require('@google-cloud/datacatalog').v1beta1;

// Instantiates a client
const datacatalogClient = new DataCatalogClient({ credentials });

async function callCreateTagTemplate() {
  try {
    // Construct request
    const request = {
      parent,
      tagTemplateId,
      tagTemplate,
    };

    // Run request
    const response = await datacatalogClient.createTagTemplate(
      request
    );
    console.log(response);
  } catch (error) {
    console.error('Error al crear la plantilla de etiqueta:', error);
  }
}

callCreateTagTemplate();
