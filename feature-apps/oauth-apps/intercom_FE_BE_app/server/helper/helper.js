const getPredefinedCustomFields = async () => {
    try {
        //   const response = await $Fetch.get(args, {
        //     headers: {
        //       "Authorization": "Bearer pv_v653JC5brIGYBF2kihs8HZKR93Q8LM_HXzggVJp1DSShWu6rSoRrvtzV3yTlr_SU"
        //     }
        //   });


        // This is the format of contact that sparrow desk has, no api call is used for this...
        const response = {
            "data": [
                {
                    "name": "first_name",
                    "type": "string",
                    "required": true
                },
                {
                    "name": "last_name",
                    "type": "string",
                    "required": true
                },
                {
                    "name": "email",
                    "type": "string",
                    "required": true
                },
                {
                    "name": "email_validated_at",
                    "type": "date",
                    "required": false
                },
                {
                    "name": "properties",
                    "type": "object",
                    "required": false
                },
                {
                    "name": "ip",
                    "type": "string",
                    "required": false
                },
                {
                    "name": "mobile",
                    "type": "string",
                    "required": false
                },
                {
                    "name": "is_active",
                    "type": "boolean",
                    "required": true
                },
                {
                    "name": "unsubscribed",
                    "type": "boolean",
                    "required": true
                },
                {
                    "name": "bounced",
                    "type": "boolean",
                    "required": true
                },
                {
                    "name": "spam_victim",
                    "type": "boolean",
                    "required": true
                },
                {
                    "name": "disposable",
                    "type": "boolean",
                    "required": true
                },
                {
                    "name": "avatar",
                    "type": "text",
                    "required": false
                },
                {
                    "name": "city",
                    "type": "string",
                    "required": false
                },
                {
                    "name": "attributes",
                    "type": "object",
                    "required": true
                },
                {
                    "name": "last_active",
                    "type": "date",
                    "required": false
                },
                {
                    "name": "is_hidden",
                    "type": "boolean",
                    "required": true
                },
                {
                    "name": "language",
                    "type": "string",
                    "required": false
                },
                {
                    "name": "unsubscribed_at",
                    "type": "date",
                    "required": false
                },
                {
                    "name": "blocked",
                    "type": "boolean",
                    "required": true
                },
                {
                    "name": "time_zone",
                    "type": "string",
                    "required": false
                },
                {
                    "name": "country",
                    "type": "string",
                    "required": false
                },
                {
                    "name": "region",
                    "type": "string",
                    "required": false
                },
                {
                    "name": "last_heard_from",
                    "type": "date",
                    "required": false
                },
                {
                    "name": "created_at",
                    "type": "date",
                    "required": true
                },
                {
                    "name": "updated_at",
                    "type": "date",
                    "required": true
                },
                {
                    "name": "deleted_at",
                    "type": "date",
                    "required": false
                },
                {
                    "name": "account_id",
                    "type": "integer",
                    "required": true
                },
                {
                    "name": "company_id",
                    "type": "integer",
                    "required": false
                }
            ]
        }
        
        const fieldsWithDataTypes = response?.data?.map(field => {
            const fieldType = field.type || 'text';
            return {
                ...field,
                displayName: field.name,
                displayType: fieldType,
                originalName: field.name || "",
                originalValue: field.value || "",
                originalId: field.id || field.name,
                value: field.value || field.name
            };
        });

        return fieldsWithDataTypes || [];
    } catch (error) {
        console.error("Error fetching custom fields:", error);
        return [];
    }
}

const getIntercomFields = async (args) => {
    try {
        const response = await $Fetch.get(args, {
            headers: {
                "Authorization": "Bearer dG9rOjM4NmM4NDhhXzI4OTJfNDhiZF84NzQxXzkyYmI5MjExYjUzNDoxOjA="
            }
        });

        if (response?.data?.data) {
            response.data.data = response.data.data.map(field => {
                const fieldType = field.data_type || field.type || 'text';
                return {
                    ...field,
                    displayName: field.name,
                    displayType: fieldType,
                    originalName: field.name || "",
                    originalValue: field.value || "",
                    originalId: field.id || field.name,
                    value: field.value || field.name
                };
            });
        }

        return response;
    } catch (error) {
        console.error("Error fetching intercom fields:", error);
        return [];
    }
}

module.exports = {
    getRequestforFields: async function (args) {
        return await getPredefinedCustomFields(args)
    },
    getRequestforIntercomFields: async function (args) {
        return await getIntercomFields(args)
    }
}