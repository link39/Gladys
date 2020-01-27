/**
 * @description Parse the external id and return the zone ID.
 * @param {string} externalId - External id of the device.
 * @returns {Object} Return the zone ID and bridge mac.
 * @example
 * parseExternalId('mi-light:1');
 */
function parseExternalId(externalId) {
  const parsedExternalId = externalId.split(':');
  const bridgeMac = parsedExternalId[1];
  const zoneId = parsedExternalId[2];
  return {
    bridgeMac,
    zoneId,
  };
}

module.exports = {
  parseExternalId,
};