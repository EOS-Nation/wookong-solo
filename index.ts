import { EOSGetAddress } from "./dllimport/EOSGetAddress";
import { EOSTXSign } from "./dllimport/EOSTXSign";

/**
 * Get Address
 *
 * @param {}
 * @returns {string} EOS Public Key
 * @example
 *
 * (async () => {
 *   const public_key = await GetAddress()
 *   //=> EOS5HEWUdoeR3VLyYjBJ7M1pj6TP3DjZm9zn3SzNFtU52onwBMZr6
 * })()
 */
export async function GetAddress() {
  const response = await EOSGetAddress([0, 2147483692, 2147483842, 2147483648, 0, 0]);
  return response.payload;
}
