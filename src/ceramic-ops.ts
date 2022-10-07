import { CeramicClient } from "@ceramicnetwork/http-client";
import { TileLoader } from "@glazed/tile-loader";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";

import * as KeyDidResolver from "key-did-resolver";
import * as ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { Resolver } from "did-resolver";

class CeramicOperations {
  constructor(netUrl: string = "https://ceramic-clay.3boxlabs.com") {
    this.ceramicClient = new CeramicClient(netUrl);

    this.did = new DID({
      provider: new Ed25519Provider(this.seed),
      resolver: new Resolver({
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(this.ceramicClient as any),
      }) as any,
    });

    this.loader = new TileLoader({ ceramic: this.ceramicClient });
  }

  loader: TileLoader;
  ceramicClient: CeramicClient;
  did: DID;

  seed = new Uint8Array([
    6, 190, 125, 152, 83, 9, 111, 202, 6, 214, 218, 146, 104, 168, 166, 110,
    202, 171, 42, 114, 73, 204, 214, 60, 112, 254, 173, 151, 170, 254, 250, 2,
  ]);

  async authenticate() {
    await this.ceramicClient.setDID(this.did);
    await this.ceramicClient.did?.authenticate();
  }

  loadDocument(streamId: string) {
    return this.loader.load(streamId);
  }
}

export default CeramicOperations;
