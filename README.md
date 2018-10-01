# Wookong Solo

## Install

```bash
$ npm install --save wookong-solo
```

## How to use

```js
import { getPublicKey, signTransaction } from "wookong-solo"


(async () => {
  const publicKey = await getPublicKey();
  //=> EOS5HEWUdoeR3VLyYjBJ7M1pj6TP3DjZm9zn3SzNFtU52onwBMZr6

  const response = await signTransaction(rawTxHex);
  //=> OK
})()
```