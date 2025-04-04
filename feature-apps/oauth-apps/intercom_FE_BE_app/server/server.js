const getFiledsforMapping = require('./helper/helper');
const contactMapping = require('./helper/contactMapping');
const dataFetchHelper = require('./helper/dataFetchHelper');

const MAX_DB_RETRIES = 6;
const BATCH_SIZE = 100;
const PLACEHOLDER = 'Placeholder';
const DEFAULT_MOBILE = '+919876512345';
const dbAttributes = {
  contactMapping: 'contactMapping',
  importRun: 'importRun',
  mapping: 'Mapping'
};

const NO_VALUES = {
  no_contact_to_send_SD: 'No contacts to send to Sparrow Desk',
}

const SUCCESS = {
  success_sync: 'Successfully synced',
}

const FAILED = {
  failed_sync: 'Failed to sync',
}

const ERROR = {
  error_sync: 'Error syncing',
}


async function fetchContacts(sourceConfig) {
  let allContacts = [];
  let nextPage = sourceConfig.apiUrl;

  while (nextPage) {
    let response = await $Fetch.get(nextPage, {
      headers: {
        Authorization: "Bearer <%=access_token%>",
        "Content-Type": "application/json",
      }
    });
    if (response.status !== 200) {
      console.error(`Failed to fetch contacts from ${sourceConfig.name}:`, response.data.errors);
      return [];
    }

    let data = response.data;
    let extractContacts = (data) => data.data || [];
    let getNextPage = (data) => data.pages?.next || null

    allContacts = allContacts.concat(extractContacts(data));
    nextPage = getNextPage(data);
  }

  console.log(`Fetched ${allContacts.length} contacts from ${sourceConfig.name}.`);
  return allContacts;
}

async function sendContacts(destinationConfig, contacts, parentLayer) {
  // Return if contacts array is empty
  if (!contacts || contacts.length === 0) {
    console.log(NO_VALUES.no_contact_to_send_SD);

    return { totalContacts: 0, successfulContacts: 0, failedBatches: 0, allSuccess: true };
  }

  /*

  check if the contact is less than 10,0000 , if greater than 10,0000 then break the contact into batches of 10,0000 
  and spawn a new lambda by calling sendContacts next.call({destinationConfig, contactsObject: batchContacts}, "function2" , parentLayer)
  and return the response from the new lambda

  */

  if (contacts.length > 10000) {
    const batchSize = 10000;
    const batches = Math.ceil(contacts.length / batchSize);

    for (let i = 0; i < batches; i++) {
      const start = i * batchSize;
      const end = Math.min(start + batchSize, contacts.length);
      const batchContacts = contacts.slice(start, end);
      try {
        await dataFetchHelper.auxillaryFunction(batchContacts, destinationConfig);
      }
      catch (error) {
        console.log(`${ERROR.error_sync} contacts to ${destinationConfig.name}:`, error);
        return error;
      }
      $Next.call({destinationConfig, contactsObject: batchContacts, parentLayer}, "function2", parentLayer);
    }
  }
  else {
    console.log("contacts: ", contacts);
    const savedResponse = await dataFetchHelper.auxillaryFunction(contacts, destinationConfig);
    console.log("savedResponse===============================> ", savedResponse);
  }

}
async function syncContacts(sourceConfig, destinationConfig, mappings = {} , parentLayer) {
    // save the contact mappings
    const function1 = async () => {
      try {
        const mappings_contact = await contactMapping;
        const contactMappingResponse = await mappings_contact.saveContactMapping(mappings);
        console.log("contactMappingResponse: ", contactMappingResponse);

        const allContacts = await fetchContacts(sourceConfig);
        if (allContacts.length === 0) return;

        const contactsObject = mappings_contact.getContactsObject(allContacts, mappings);
        console.log("Contacts object: ", contactsObject);

        // Function 2: reference for batch processing
        $Next.call({destinationConfig, contactsObject, parentLayer}, "function2" , parentLayer);
        
        console.log("All done successfully...................==================");
      } catch (mappingError) {
        console.error(`${ERROR.error_sync} contact mapping:`, mappingError);
      }
    }
    const function2 = async (payload) => {
      console.log("payload: ", payload);
      $Next.call({
        destinationConfig: payload.destinationConfig, 
        contactsObject: payload.contactsObject, 
        parentLayer: payload.parentLayer
      }, "function3", payload.parentLayer);
    }

    const function3 = async (payload) => {
      console.log("payload: ", payload);
      sendContacts(payload.destinationConfig, payload.contactsObject, payload.parentLayer);
    }
    console.log(`${SUCCESS.success_sync} from ${sourceConfig.name} to ${destinationConfig.name}.`);
    return (await $Batch.initialize(function1, function2, function3, parentLayer));
}

async function getFields1(args) {
  const fields = await getFiledsforMapping
  return await fields.getRequestforFields(args.data);
}

async function getIntercomFields(args) {
  const fields = await getFiledsforMapping
  return await fields.getRequestforIntercomFields(args.data);
}



// Exported function to sync contacts
exports = {
  onSubmissionComplete: async function (event) {
    console.log("event is-------------------------: ", event);
  },
  AddContacts: async function (args, parentLayer) {
    console.log("inside getFields");
    return await syncContacts(args.data[0], args.data[1], args.data[2], parentLayer);
  },
  getFields: async function (args) {
    console.log("inside getFields");
    const fields = await getFields1(args);
    return fields;
  },
  getIntercomFields: async function (args) {
    console.log("inside getFields");
    const fields = await getIntercomFields(args);
    return fields;
  }
};
