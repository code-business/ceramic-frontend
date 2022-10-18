import CeramicClient from "@ceramicnetwork/http-client";
import ReactJson from "react-json-view";
import {
  TextField,
  Container,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Grid,
} from "@mui/material";

import React from "react";
import { getAutheClient, getCeramicData } from "./client";
import Item from "./components/Item";
import { getCeramicIds } from "./helpers/getCeramicIds";

const ceramicGateways = {
  mainNet: "https://gateway.ceramic.network",
  devNet: "https://ceramic-clay.3boxlabs.com",
};

export default function App() {
  // const app = useApp()
  const [response, setResponse] = React.useState<object>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [did, setDid] = React.useState<string>("");
  const [ceramicClientState, setCeramicClientState] =
    React.useState<CeramicClient>();
  const [ceramicGateway, setCeramicGateway] = React.useState<string>(
    ceramicGateways.devNet
  );
  const [ceranicId, setCeranicId] = React.useState<string>("");
  const [data, setData] = React.useState<any>();
  const [viewType, setViewType] = React.useState<string>("search-id");
  const [ceramicIds, setCeramicIds] = React.useState<any>();
  const [selectedId, setSelectId] = React.useState<any>();

  /* loaders */
  const [authLoader, setAuthLoader] = React.useState<boolean>(false);
  const [fetchLoader, setFetchLoader] = React.useState<boolean>(false);
  const [ceramicIdsLoader, setCeramicIdsLoader] =
    React.useState<boolean>(false);

  const handleAuthenticate = async (_e: any) => {
    try {
      setAuthLoader(true);
      if (did.length) {
        setCeramicClientState(await getAutheClient(did, ceramicGateway));
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setAuthLoader(false);
    }
  };

  const handleFetch = async (_e: any) => {
    try {
      setFetchLoader(true);
      const resp = await getCeramicData(
        ceramicClientState as CeramicClient,
        ceranicId
      );
      setData(resp.content);
    } catch (error) {
      console.log("error", error);
    } finally {
      setFetchLoader(false);
    }
  };

  // const ceramicIds = [
  //   "kjzl6cwe1jw14ab6gtrttse82cosn3rb3euqtr10pclv6e4utoedzg9wrnwfz08",
  //   "kjzl6cwe1jw146bl0p9i2b17482vx9gwuq6r4infgiqt6wrmsd24o9tevy86d03",
  //   "kjzl6cwe1jw14bhc9evg97skqoraf3sguqyfqaqj21ylaybp4t0cxo7s5qvvg6a",
  //   "kjzl6cwe1jw145dw62w1w0bje2nfw7syl5m6tvys6d88bw56lkh0at89mi9a2tq",
  //   "kjzl6cwe1jw147xlz7jcfnavuwtqh5r95qitwtce24zfl6iapjzyl5uo3dsgc4c",
  //   "kjzl6cwe1jw14apwg80tfh7lro7hd7al5t9d9u02wnp0dpadi4kgzexishhjhib",
  //   "kjzl6cwe1jw14b91zl4ltu4cgysex00cax71yr4gxlroaj3lbwahcq25m6bwgd0",
  //   "kjzl6cwe1jw147sr5wc03hj3edy3vnvrqpthn1ahx7lavkmerhqsf2hvkdhk22x",
  //   "kjzl6cwe1jw145uemvqdipynjbr9k5hjs4qnimo0v5ou54ux8t5x4yqf7bf57y2",
  //   "kjzl6cwe1jw146w22z86v3dzsbyiiaz2xwq1nyqe9wqfgpgsvoxmrm4ft17gb0r",
  //   "kjzl6cwe1jw146wricc62d3k9zaz73lsbbj1tcgburwe0gf2slap5ta37dn917n",
  //   "kjzl6cwe1jw145v0j3u1dgdi0uvyolj9ciewboquww2jk251ds12bgqphnfwzi0",
  //   "kjzl6cwe1jw1498jtjxp5go4ys6vz3ku6ft3wqlqlig2rdfbe7ge2pfmgua9wdq",
  //   "kjzl6cwe1jw14be1r05czo7wqu41fp6ht9z7xkq1tg7i8gg5kigkzkwokjq4du0",
  //   "kjzl6cwe1jw148q60333656tt2682k9ey3fy096ays1m6r2p8vl1b1fqwb0a00u",
  //   "kjzl6cwe1jw1492f6inwqd0alfvca5wfypftqmomoxyfs2smdancctwe8unlcc1",
  //   "kjzl6cwe1jw1460f5c0lnnmnepr77swjzl7bjkx4s7m10ykf923qoe5oa00ey0z",
  //   "kjzl6cwe1jw148ezv0zqmyx464rqzkhe11e5kefiw0zsjnk2ttyxyjmqbf4is3f",
  //   "kjzl6cwe1jw14agmgzlv04ba2sz23kv2zzg54eo3r1ergayq881qnkq4ma408qi",
  //   "kjzl6cwe1jw148ao2zl47p8swyliylaxsyzkp09ashisw0n189yay9f46tjfdog",
  //   "kjzl6cwe1jw147hdwjc57ze0z6rzxa43b5hl9132om956glc0bgxt4utlgr7atr",
  //   "kjzl6cwe1jw14agw9pybe7qlo8zdx6wm6u0wzvf8jftahppa9lsyhkzjy8pnl5i",
  // ];

  const initCeramicIds = async () => {
    if (ceramicClientState && ceramicClientState.did?.authenticated) {
      try {
        setCeramicIdsLoader(true);
        const idsData = await getCeramicIds();
        console.log(idsData);
        setCeramicIds(idsData);
      } catch (error) {
        console.log(error);
        setCeramicIds({});
      } finally {
        setCeramicIdsLoader(false);
      }
    }
  };

  React.useEffect(() => {
    if (viewType === "list-ids") initCeramicIds();
  }, [viewType]);

  return (
    <>
      <Container maxWidth="md">
        <Box mt={4}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Select Gateway
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={ceramicGateway}
              name="ceramic-gateway"
              row
              onChange={(e) => setCeramicGateway(e.target.value)}
            >
              <FormControlLabel
                value={ceramicGateways.devNet}
                control={<Radio />}
                label="Dev net"
              />
              <FormControlLabel
                value={ceramicGateways.mainNet}
                control={<Radio />}
                label="Main net"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box mt={5} display="flex" gap={4}>
          <TextField
            id="did"
            label="Enter Did"
            variant="outlined"
            fullWidth
            onChange={(e) => setDid(e.target.value)}
            disabled={authLoader}
          />
          <Button
            variant="outlined"
            onClick={handleAuthenticate}
            disabled={authLoader}
          >
            {authLoader ? <CircularProgress /> : "Authenticate"}
          </Button>
        </Box>
        {ceramicClientState && ceramicClientState.did?.authenticated && (
          <>
            <Box mt={4}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Select view type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={viewType}
                  name="ceramic-gateway"
                  row
                  onChange={(e) => setViewType(e.target.value)}
                >
                  <FormControlLabel
                    value="search-id"
                    control={<Radio />}
                    label="Search Id"
                  />
                  <FormControlLabel
                    value="list-ids"
                    control={<Radio />}
                    label="List Ids"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {viewType === "search-id" ? (
              <>
                <Box display="flex" flexDirection="row" gap={4} mt={5}>
                  <TextField
                    id="ceramic-id"
                    label="Ceramic Id"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCeranicId(e.target.value)}
                    disabled={fetchLoader}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleFetch}
                    disabled={fetchLoader}
                  >
                    {fetchLoader ? <CircularProgress /> : "Fetch"}
                  </Button>
                </Box>
                {data && (
                  <Box sx={{ marginTop: "2rem", overflowX: "auto" }}>
                    <ReactJson src={data} />
                  </Box>
                )}
              </>
            ) : (
              <Box mt={5} className="d-flex">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <List style={{ overflowX: "auto" }}>
                      {!ceramicIdsLoader ? (
                        ceramicIds?.data?.map((id: string) => (
                          <ListItem>
                            <ListItemButton
                              onClick={async () => {
                                setLoading(true);
                                let resp: any = await getCeramicData(
                                  ceramicClientState,
                                  id
                                );
                                console.log(resp.content);

                                setResponse(resp.content);
                                setLoading(false);
                              }}
                            >
                              <Item
                                ceramicClient={ceramicClientState}
                                ceramicId={id}
                                setResponse={setResponse}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))
                      ) : (
                        <CircularProgress />
                      )}
                    </List>
                  </Grid>
                  <Grid item xs={8} style={{ wordWrap: "break-word" }}>
                    <Box sx={{ marginTop: "2rem", overflowX: "auto" }}>
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <ReactJson src={response as object} />
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  onClick={async () => {
                    if (ceramicIds?.nextToken) {
                      try {
                        setCeramicIdsLoader(true);
                        /* handle next */
                        const resp = await getCeramicIds(ceramicIds.nextToken);
                        setCeramicIds(resp);
                      } catch (error) {
                        console.log(error);
                      } finally {
                        setCeramicIdsLoader(false);
                      }
                    }
                  }}
                >
                  next
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
}
