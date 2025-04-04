import React, { useState, useEffect } from "react";

const FieldMapper = ({ client }) => {
  const [intercomFields, setIntercomFields] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);

  // Add new state for validation errors
  const [validationErrors, setValidationErrors] = useState([]);
  const [predefinedCustomFields, setPredefinedCustomFields] = useState([]);

  useEffect(() => {
    const fieldcaller = async () => {
      try {
        const response = await client.request.invoke('getFields', "http://app.sparrowdesk.test/v1/contacts/fields");
        console.log("response for sparrow desk fields is: ", response);
        const data = JSON.parse(response);
        setPredefinedCustomFields(data.body);
        console.log("predefinedCustomFields is: ", data.body);
      } catch (err) {
        console.error("Error fetching fields:", err);
      }
    };

    fieldcaller();
  }, []);

  // Fetch Intercom fields using SSDK Request Methods
  const fetchIntercomFields = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching Intercom fields");
      const reponse = await client.request.invoke('getIntercomFields', "https://api.intercom.io/data_attributes");
      console.log("response for intercom fields is: ", reponse);
      const data = JSON.parse(reponse);
      const intercomFields = data.body.data;
      console.log("intercomFields is: ", intercomFields);


      const transformedFields = intercomFields.data.map(field => ({
        full_name: field.full_name,
        data_type: field.data_type
      }));

      // Filter out any duplicate fields (some fields like 'name' appear multiple times)
      const uniqueFields = transformedFields.filter((field, index, self) =>
        index === self.findIndex((f) => f.full_name === field.full_name)
      );

      setIntercomFields(uniqueFields);
      console.log("Fetched Intercom fields:", uniqueFields);
    } catch (err) {
      console.log("Failed to fetch fields");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load stored mappings from localStorage
  const loadMappings = () => {
    try {
      const storedMappings = localStorage.getItem("fieldMappings");
      setMappings(JSON.parse(storedMappings) || []);
    } catch (err) {
      console.error("Error loading mappings:", err);
      setMappings([]);
    }
  };

  // Save mappings to localStorage
  const saveMappings = (newMappings) => {
    try {
      localStorage.setItem("fieldMappings", JSON.stringify(newMappings));
      setMappings(newMappings);
    } catch (err) {
      console.error("Error saving mappings:", err);
    }
  };

  useEffect(() => {
    fetchIntercomFields();
    loadMappings();
  }, []);

  // Handle field mapping
  const handleFieldMapping = (customField, intercomField) => {
    const updatedMappings = [...mappings];
    const existingMappingIndex = updatedMappings.findIndex(m => m.customField === customField);

    if (existingMappingIndex >= 0) {
      // Update existing mapping
      updatedMappings[existingMappingIndex].intercomField = intercomField;
    } else {
      // Add new mapping
      updatedMappings.push({ customField, intercomField });
    }
    console.log("updatedMappings is: ", updatedMappings);
    saveMappings(updatedMappings);
  };

  const isFieldMapped = (intercomFieldName) => {
    return mappings.some(mapping => mapping.intercomField === intercomFieldName);
  };

  // Function to check if data types are compatible
  const areDataTypesCompatible = (sourceType, targetType) => {
    // Define type compatibility rules
    const typeMap = {
      'email': ['string'],
      'string': ['string'],
      'phone': ['string'],
      'date': ['date', 'datetime'],
      'array': ['array', 'string'],
      'boolean': ['boolean', 'string'],
      'integer': ['integer', 'number', 'string'],
      'float': ['float', 'number', 'string'],
      'text': ['text', 'string']
    };

    if (['integer', 'float', 'number'].includes(targetType)) {
      return ['integer', 'float', 'number'].includes(sourceType);
    }

    return typeMap[sourceType]?.includes(targetType) || false;
  };

  const handleStartImport = async () => {
    const isValid = validateMappings();

    if (isValid) {
      // First create the detailed mapping for internal use
      const detailedMappings = predefinedCustomFields.map(customField => {
        const mapping = mappings.find(m => m.customField === customField.name);

        if (mapping) {
          const intercomField = intercomFields.find(f => f.full_name === mapping.intercomField);
          return {
            sourceField: {
              name: customField.name,
              type: customField.type
            },
            targetField: {
              name: intercomField.full_name,
              type: intercomField.data_type
            },
            value: mapping.intercomField
          };
        } else {
          // For unmapped fields, provide default mapping
          return {
            sourceField: {
              name: customField.name,
              type: customField.type
            },
            targetField: {
              name: "default",
              type: "string",
            },
            value: "default"
          };
        }
      });

      // Transform to simple object with sourceField.name as key and targetField.name as value
      const mappingResult = detailedMappings.reduce((acc, mapping) => {
        acc[mapping.targetField.name] = mapping.sourceField.name;
        return acc;
      }, {});


      console.log('Validation passed! Final mappings (including defaults):', mappingResult);
      // Here you can proceed with the import
      await client.request.invoke('AddContacts', [{
        name: "Intercom",
        apiUrl: "https://api.intercom.io/contacts",
        offset: 0,
        limit: 100
      },
      {
        name: "Sparrow Desk",
        apiUrl: "https://63d0-183-82-247-142.ngrok-free.app/v1/contacts",
        batchSize: 100
      },
        mappingResult
      ]);
    } else {
      console.error('Validation failed! Errors:', validationErrors);
    }
  };

  // Validate mappings (only validate mapped fields)
  const validateMappings = () => {
    const errors = [];
    const requiredFields = ['email', 'first_name']; // Required fields that require mappings

    // Check required fields
    requiredFields.forEach(fieldName => {
      if (!mappings.find(m => m.customField === fieldName)) {
        errors.push(`${fieldName} is required but not mapped`);
      }
    });

    // Check data type compatibility only for mapped fields
    mappings.forEach(mapping => {
      const customField = predefinedCustomFields.find(f => f.name === mapping.customField);
      const intercomField = intercomFields.find(f => f.full_name === mapping.intercomField);

      if (customField && intercomField) {
        if (!areDataTypesCompatible(customField.type, intercomField.data_type)) {
          errors.push(
            `Data type mismatch for ${customField.name}: ` +
            `${customField.type} cannot be mapped to ${intercomField.data_type}`
          );
        }
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        paddingLeft: '20%',
        paddingRight: '20%'
      }}>
        <h2 style={{
          marginLeft: '-100px',
          fontSize: '24px',
          fontWeight: '500'
        }}>
          Sparrow Desk Field
        </h2>
        <h2 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: '500'
        }}>
          Intercom Attribute
        </h2>
      </div>

      {isLoading && <p>Loading fields...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: '40px' }}>
        {predefinedCustomFields.map((field, index) => {
          const currentMapping = mappings.find(m => m.customField === field.name);

          return (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '40% 60%',
                alignItems: 'center',
                marginBottom: '20px',
                fontSize: '16px'
              }}
            >
              <div style={{
                textAlign: 'center',
                fontWeight: currentMapping ? 'bold' : 'normal',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <span>{field.displayName || field.name}</span>
                <span style={{ 
                  fontSize: '12px', 
                  color: '#888', 
                  marginTop: '4px' 
                }}>
                  {field.displayType || field.type}
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  margin: '0',
                  paddingRight: '30px',
                  color: '#666'
                }}>→</span>
                <div style={{
                  position: 'relative',
                  flex: 1
                }}>
                  <select
                    value={currentMapping?.intercomField || ""}
                    onChange={(e) => handleFieldMapping(field.name, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">-- Select an Intercom Field --</option>
                    {intercomFields.map((intercomField, idx) => (
                      <option
                        key={idx}
                        value={intercomField.full_name}
                        disabled={isFieldMapped(intercomField.full_name) && 
                                (!currentMapping || currentMapping.intercomField !== intercomField.full_name)}
                      >
                        {intercomField.full_name}
                      </option>
                    ))}
                  </select>
                  {currentMapping && (
                    <button
                      onClick={() => {
                        const newMappings = mappings.filter(m => m.customField !== field.name);
                        saveMappings(newMappings);
                      }}
                      style={{
                        position: 'absolute',
                        right: '30px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        fontSize: '18px',
                        color: '#666'
                      }}
                    >
                      ×
                    </button>
                  )}
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#666'
                  }}>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {validationErrors.length > 0 && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#fff3f3',
          border: '1px solid #ffcdd2',
          borderRadius: '4px'
        }}>
          <h3 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>Validation Errors:</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {validationErrors.map((error, index) => (
              <li key={index} style={{ color: '#d32f2f' }}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginTop: '40px'
      }}>
        <button
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            cursor: 'pointer'
          }}
        >
          Back
        </button>
        <button
          onClick={handleStartImport}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#2A9D8F',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Start Import <span style={{ marginLeft: '4px' }}>→</span>
        </button>
      </div>
    </div>
  );
};

export default FieldMapper;