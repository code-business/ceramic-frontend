import { CeramicClient } from "@ceramicnetwork/http-client";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { TileLoader } from "@glazed/tile-loader";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { Buffer } from "buffer";
import { TileDocument } from "@ceramicnetwork/stream-tile";

const key = "Br59mFMJb8oG1tqSaKimbsqrKnJJzNY8cP6tl6r++gI=";

const getAutheClient = (privateKey: string, url: string) => {
  return new Promise<CeramicClient>(async (resolve, reject) => {
    try {
      // Create and authenticate the DID
      const did = new DID({
        provider: new Ed25519Provider(
          new Uint8Array(Buffer.from(privateKey, "base64").toJSON().data)
        ),
        resolver: getResolver(),
      });
      const authResp = await did.authenticate();

      console.log({ authResp });

      // Create the Ceramic instance and inject the DID
      const ceramic = new CeramicClient(url);
      ceramic.did = did;

      console.log(ceramic.did.authenticated);
      resolve(ceramic);
    } catch (error) {
      reject(error);
    }
  });
};

const getCeramicData = (ceramicClient: CeramicClient, ceramicId: string) => {
  return TileDocument.load(ceramicClient, ceramicId);
};

// export default run;
export { getAutheClient, getCeramicData };
