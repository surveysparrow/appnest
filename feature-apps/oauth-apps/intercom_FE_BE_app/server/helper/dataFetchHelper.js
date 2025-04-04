const BATCH_SIZE = 100;
const SUCCESS = { success_sync: 'Successfully synced' }
const FAILED = { failed_sync: 'Failed to sync' }
const ERROR = { error_sync: 'Error syncing' }

const auxillaryFunction = async (contacts, destinationConfig) => {
    console.log(`Sending ${contacts.length} contacts to Sparrow Desk`);
    // If we have fewer contacts than the batch size, send them directly
    if (contacts.length <= BATCH_SIZE) {
        try {
            const response = await $Fetch.post(
                destinationConfig.apiUrl,
                contacts,
                {
                    headers: {
                        Authorization: "Bearer pv_v653JC5brIGYBF2kihs8HZKR93Q8LM_HXzggVJp1DSShWu6rSoRrvtzV3yTlr_SU", // get from iparams
                        "Content-Type": "application/json",
                    }
                }
            );
            const success = response.status === 200 || response.status === 201 || response.status === 202;

            if (success) {
                console.log(`${SUCCESS.success_sync} ${contacts.length} contacts to ${destinationConfig.name}.`);
                return { totalContacts: contacts.length, successfulContacts: contacts.length, failedBatches: 0, allSuccess: true };
            } else {
                console.error(`${FAILED.failed_sync} contacts to ${destinationConfig.name}:`, response.data?.errors);
                return { totalContacts: contacts.length, successfulContacts: 0, failedBatches: 1, allSuccess: false };
            }
        } catch (error) {
            console.error(`${ERROR.error_sync} contacts to ${destinationConfig.name}:`, error);
            return { totalContacts: contacts.length, successfulContacts: 0, failedBatches: 1, allSuccess: false };
        }
    }

    // For larger arrays, create batches
    const batchCount = Math.ceil(contacts.length / BATCH_SIZE);

    // Create array of batch promises
    const batchPromises = Array.from({ length: batchCount }, (_, i) => {
        const start = i * BATCH_SIZE;
        const end = Math.min(start + BATCH_SIZE, contacts.length);
        const batch = contacts.slice(start, end);

        return $Fetch.post(
            destinationConfig.apiUrl,
            batch,
            {
                headers: {
                    Authorization: "Bearer pv_v653JC5brIGYBF2kihs8HZKR93Q8LM_HXzggVJp1DSShWu6rSoRrvtzV3yTlr_SU", // get from iparams
                    "Content-Type": "application/json",
                }
            }
        ).then(response => ({
            success: response.status === 200 || response.status === 201 || response.status === 202,
            status: response.status,
            data: response.data,
            batchSize: batch.length
        })).catch(error => ({
            success: false,
            error,
            batchSize: batch.length
        }));
    });

    // Get all the batch results
    const batchResults = await Promise.allSettled(batchPromises);

    // Process results
    let successfulContacts = 0;
    let failedBatches = 0;

    batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            const batchResult = result.value;
            if (batchResult.success) {
                successfulContacts += batchResult.batchSize;
            } else {
                failedBatches++;
                console.log(`Batch ${index + 1} failed:`, batchResult.error || batchResult.data?.errors);
            }
        } else {
            failedBatches++;
            console.log(`Batch ${index + 1} failed with error:`, result.reason);
        }
    });

    // Log summary
    if (failedBatches > 0) {
        console.log(`${FAILED.failed_sync} ${failedBatches} of ${batchCount} batches to ${destinationConfig.name}`);
    }

    console.log(`${SUCCESS.success_sync} ${successfulContacts} of ${contacts.length} contacts to ${destinationConfig.name}`);
}

module.exports = {
    auxillaryFunction
}