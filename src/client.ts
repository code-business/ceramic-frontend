import { CeramicClient } from "@ceramicnetwork/http-client";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { TileLoader } from "@glazed/tile-loader";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";

const run = async () => {
  try {
    // Create and authenticate the DID
    const did = new DID({
      provider: new Ed25519Provider(
        new Uint8Array([
          6, 190, 125, 152, 83, 9, 111, 202, 6, 214, 218, 146, 104, 168, 166,
          110, 202, 171, 42, 114, 73, 204, 214, 60, 112, 254, 173, 151, 170,
          254, 250, 2,
        ])
      ),
      resolver: getResolver(),
    });
    const authResp = await did.authenticate();

    console.log({ authResp });

    // Create the Ceramic instance and inject the DID
    const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");
    ceramic.did = did;

    console.log(ceramic.did.authenticated);
  } catch (error) {
    console.log(error);
  }
};

export default run;
