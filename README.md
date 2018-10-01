# Wookong Solo

## Install

```bash
$ npm install --save wookong-solo
```

## How to use

```js
import { GetAddress, EOSTXSign } from "wookong-solo"


(async () => {
  const public_key = await GetAddress();
  //=> EOS5HEWUdoeR3VLyYjBJ7M1pj6TP3DjZm9zn3SzNFtU52onwBMZr6

  const response = await EOSTXSign(rawTxHex.buf);
})()
```