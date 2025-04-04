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

module.exports = {
    MAX_DB_RETRIES,
    dbAttributes,
    NO_VALUES,
    SUCCESS,
    FAILED,
    ERROR,
    PLACEHOLDER,
    DEFAULT_MOBILE,
    BATCH_SIZE
};