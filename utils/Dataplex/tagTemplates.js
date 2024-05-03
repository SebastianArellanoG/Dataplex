const { DataCatalogClient } =
  require('@google-cloud/datacatalog').v1beta1;
const keys = require('../../../boot-jav-62f4a48f13a5.json');
const projectId = 'boot-jav';
const location = 'us-central1';
const credentials = {
  client_email: keys.client_email,
  private_key: keys.private_key,
};
var XLSX = require('xlsx');
//Leer el archivo
var workbook = XLSX.readFile('./tagTemplates.xlsx');

// Obtener la primera hoja del archivos
var sheet_name_list = workbook.SheetNames;
var worksheet = workbook.Sheets[sheet_name_list[0]];

// Convertir la hoja a JSON
var data = XLSX.utils.sheet_to_json(worksheet);

const result = data.reduce((acc, item) => {
  const existing = acc.find(
    (template) => template.tagTemplateID === item.tagTemplateID
  );

  const field = {
    displayName: item.displayName,
    isRequired: item.Required,
    type:
      item.type === 'ENUM'
        ? {
            enumType: {
              allowedValues: item.allowedValues
                .split(',')
                .map((value) => ({ displayName: value })),
            },
          }
        : {
            primitiveType: item.type,
          },
  };

  if (existing) {
    existing.fields[item.Fields] = field;
  } else {
    acc.push({
      tagTemplateID: item.tagTemplateID,
      tagTemplate: {
        displayName: item.tagTemplateName,
        isPubliclyReadable: true,
        fields: {
          [item.Fields]: field,
        },
      },
    });
  }

  return acc;
}, []);

const parent = `projects/${projectId}/locations/${location}`;

async function callCreateTagTemplate(tagTemplateId, tagTemplate) {
  const datacatalogClient = new DataCatalogClient({ credentials });
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

async function createAllTagTemplates() {
  try {
    result.forEach(async (tag) => {
      const { tagTemplateID, tagTemplate } = tag;
      console.log(tagTemplate, tagTemplateID);
      await callCreateTagTemplate(tagTemplateID, tagTemplate);
      // lakezone.forEach(async (e) => await callCreateZone(e, parent));
    });
  } catch {
    console.error('Error creating tagTemplate', error);
  }
}

createAllTagTemplates();
