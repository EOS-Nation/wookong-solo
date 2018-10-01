const { EOSGetAddress } = require("./dllimport/EOSGetAddress.js");
const { EOSTXSign } = require("./dllimport/EOSTXSign");

/**
 * Get Public Key
 *
 * @returns {Promise<string>} EOS Public Key
 * @example
 *
 * const publicKey = await getPublicKey();
 * //=> EOS5HEWUdoeR3VLyYjBJ7M1pj6TP3DjZm9zn3SzNFtU52onwBMZr6
 */
export async function getPublicKey(): Promise<string> {
  const response = await EOSGetAddress([0, 2147483692, 2147483842, 2147483648, 0, 0]);
  return response.payload;
}

/**
 * Sign Transaction
 *
 * @param {Buffer} rawTxHex Raw Transaction Hex
 * @returns {Promise<string>} EOS Public Key
 * @example
 *
 * const response = await signTransaction(rawTxHex);
 * //=> response
 */
export async function signTransaction(rawTxHex: any): Promise<string> {
  const response = await EOSTXSign(null, null, null, [0, 2147483692, 2147483842, 2147483648, 0, 0], rawTxHex.buf);
  return response.payload;
}

/**
 * Get App Configuration
 *
 * @returns {Object} Configuration
 * @example
 *
 * await getAppConfiguration();
 */
export async function getAppConfiguration() {
  throw new Error("not implemented");
}