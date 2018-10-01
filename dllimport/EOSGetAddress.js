const ref = require("ref");
const debug = require("debug")("wookong-solo:EOSGetAddress");
const {
    DLLAPI,
    callback,
    CallbackParam,
    TYPE,
    } = require('./dllfunction');
//const { DLLAPI } = require("./dllfunction");
const { DLLRET, DLLDEVINFO, DLLCONST, DLLCOINTYPE, DLLDEVTYPE } = require("./dllconst");
const { PAEW_DevInfo } = require("./dllstruct");
const { DLLUTIL } = require("./dllutility");

const { DLLTYPE } = require("./dllstruct");
//const { uint32Array } = DLLTYPE;
const { voidPP, uint32Array, ucharArray } = TYPE;

//const voidPP = ref.refType(ref.refType(ref.types.void));



/*let {
    PAEW_InitContext,
    PAEW_FreeContext,
    PAEW_DeriveTradeAddress,
    PAEW_GetTradeAddress
} = DLLAPI;*/

const EOSGetAddress = async (
    derivePath
) => {

    var ppPAEWContext = ref.alloc(voidPP);
    var pnDevCount = ref.alloc("int");
    var param = new CallbackParam();
    let pDevInfo = ref.alloc(PAEW_DevInfo);
    debug('derivePath', derivePath);
    let puiDerivePath = uint32Array(derivePath);
    debug('puiDerivePath', puiDerivePath.length);
    debug(puiDerivePath);
    let nDerivePathLen = derivePath.length;

    let pbTradeAddress = new Buffer(DLLCONST.PAEW_COIN_ADDRESS_MAX_LEN);
    let pnTradeAddressLen = ref.alloc("size_t", DLLCONST.PAEW_COIN_ADDRESS_MAX_LEN);

    let res = 0;

    try {
        //debug(ppPAEWContext);
        //debug(pnDevCount);
        //debug(callback);
        //debug(param);
        debug(DLLAPI.PAEW_InitContext);

        res = await DLLAPI.PAEW_InitContext(
				ppPAEWContext,
                pnDevCount,
                callback,
                param.ref());

        debug("PAEW_InitContext");
        debug(pnDevCount);
      /*  res = await new Promise((resolve, reject) => {
            PAEW_DeriveTradeAddress.async(
                ppPAEWContext.deref(),
                0,
                DLLCOINTYPE.PAEW_COIN_TYPE_EOS,
                puiDerivePath,
                nDerivePathLen,
                (err, res) => {
                    if (res == DLLRET.PAEW_RET_SUCCESS) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }
            );
        });*/
        debug(puiDerivePath);
        debug(nDerivePathLen);

        res = await DLLAPI.PAEW_DeriveTradeAddress(
            ppPAEWContext.deref(),
                0,
                DLLCOINTYPE.PAEW_COIN_TYPE_EOS,
                puiDerivePath,
                nDerivePathLen,
        );
        debug("PAEW_DeriveTradeAddress");
        debug(res);

       /* res = await new Promise((resolve, reject) => {
            PAEW_GetTradeAddress.async(
                ppPAEWContext.deref(),
                0,
                DLLCOINTYPE.PAEW_COIN_TYPE_EOS,
                pbTradeAddress,
                pnTradeAddressLen,
                (err, res) => {
                    if (res == DLLRET.PAEW_RET_SUCCESS) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }
            );
        });*/
        res = await DLLAPI.PAEW_GetTradeAddress(
            ppPAEWContext.deref(),
            0,
            DLLCOINTYPE.PAEW_COIN_TYPE_EOS,
            1,
            pbTradeAddress,
            pnTradeAddressLen,
        );
        debug("PAEW_GetTradeAddress");
        debug(pbTradeAddress);

       /* res = await new Promise((resolve, reject) => {
            PAEW_FreeContext.async(ppPAEWContext.deref(), (err, res) => {
                if (res == DLLRET.PAEW_RET_SUCCESS) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });*/
        res =await DLLAPI.PAEW_FreeContext(
            ppPAEWContext.deref()
        );
        debug("PAEW_FreeContext");

    } catch (err) {
        throw { result: err, payload: null };
        debug("result: err"+err);
    }

    return {
        result: res,
        payload: DLLUTIL.ewallet_chararray_to_string(
            pbTradeAddress,
            pnTradeAddressLen.deref() - 1
        )
    };
};

module.exports = { EOSGetAddress };
