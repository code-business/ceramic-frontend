import React from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

import ReactJson from "react-json-view";

import "./App.css";
import CeramicOperations from "./ceramic-ops";

const devNetUrl = "https://ceramic-clay.3boxlabs.com";
const mainNetUrl = "https://gateway.ceramic.network";

function App() {
  // let ceramic: CeramicOperations = new CeramicOperations();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [ceramicId, setCeramicId] = React.useState<string>("");
  const [data, setData] = React.useState<any>();
  const [ceramicEnv, setCeramicEnv] = React.useState<string>(devNetUrl);
  const [ceramicClient, setCeramicClient] = React.useState<CeramicOperations>(
    new CeramicOperations()
  );

  const init = async () => {
    try {
      await ceramicClient.authenticate();
    } catch (error) {
      console.log("Authentication error", error);
    }
  };

  React.useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setCeramicClient(new CeramicOperations(ceramicEnv));
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ceramicEnv]);

  return (
    <div>
      <Container maxWidth="md">
        <Box sx={{ marginTop: "2rem" }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Select Gateway
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={ceramicEnv}
              name="radio-buttons-group"
              row
              onChange={(e) => {
                console.log(e.target.value);
                setCeramicEnv(e.target.value);
              }}
            >
              <FormControlLabel
                value={devNetUrl}
                control={<Radio />}
                label="Dev net"
              />
              <FormControlLabel
                value={mainNetUrl}
                control={<Radio />}
                label="Main net"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Ceramic Id"
            variant="outlined"
            fullWidth
            value={ceramicId}
            onChange={(e) => setCeramicId(e.target.value)}
            disabled={loading}
          />

          <Button
            variant="outlined"
            onClick={async () => {
              try {
                if (ceramicId) {
                  setLoading(true);
                  const data = await ceramicClient.loadDocument(
                    // "kjzl6cwe1jw14ab6gtrttse82cosn3rb3euqtr10pclv6e4utoedzg9wrnwfz08"
                    ceramicId
                  );
                  console.log("data", data.content);
                  setData(data.content);
                }
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading && <CircularProgress />}
            {!loading && "Fetch"}
          </Button>
        </Box>
        {data && (
          <Box sx={{ marginTop: "2rem", overflowX: "auto" }}>
            <ReactJson src={data} />
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;
