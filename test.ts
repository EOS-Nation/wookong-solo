import { getPublicKey } from ".";

(async () => {
  const publicKey = await getPublicKey()
  console.log(publicKey);
})()
