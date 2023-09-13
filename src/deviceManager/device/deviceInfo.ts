export const getDeviceAttributes = async (client: any, serial: string) => {
  let outputProperties = {}
  await client.getProperties(serial)
    .then(properties => {
      outputProperties = properties
    })
    .catch(err => {
      console.error("Error1:", err.stack);
    });
  return outputProperties
}
