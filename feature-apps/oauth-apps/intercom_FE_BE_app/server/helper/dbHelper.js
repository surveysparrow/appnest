const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const constants_helper = require('../constants/intercomConstants');

const getDb = async (key, count = 0) => {
    const constantsHelper = await constants_helper;
    try {
        if (count < constantsHelper.MAX_DB_RETRIES) {
            let db = {};
            try {
                db = key ? await $Storage.getV2(key) : await $Storage.getV2();
                if (db?.code === "ECONNABORTED") {
                    ;
                    console.log(`Error in storage get due to timeout: ${db?.code}`);
                    await sleep(500);
                    console.log('Retrying getting from Storage for key, ', key, ' with attempts: ', count + 1);
                    return await getDb(key, ++count);
                }
            } catch (error) {
                db = {};
            }
            if (!db || db?.error) {
                db = {};
            }
            return db || {};
        }

    } catch (error) {
        console.log(`Data doesn't exists or Error in getting DB: ${JSON.stringify(error)}`);
        await getDb(key, ++count);
    }

};


const saveDataToDb = async (key, data, count = 0) => {
    const constantsHelper = await constants_helper;
    try {
        if (data && count < constantsHelper.MAX_DB_RETRIES) {
            let resultOfDataStorage = await $Storage.setV2(key, data);
            if (resultOfDataStorage !== true && resultOfDataStorage !== 'true') {
                throw new Error('Got Exception while setting to storage: ', JSON.stringify(resultOfDataStorage));
            }
            return resultOfDataStorage;
        }
    } catch (error) {
        console.log('Error in saving data to storage: ', JSON.stringify(error));
        await saveDataToDb(key, data, ++count);
    }
};

module.exports = {
    getDb,
    saveDataToDb
};