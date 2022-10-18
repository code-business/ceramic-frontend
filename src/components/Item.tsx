import CeramicClient from "@ceramicnetwork/http-client";
import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  CircularProgress,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";
import ReactJson from "react-json-view";
import { getCeramicData } from "../client";

interface ItemProps {
  ceramicId: string;
  ceramicClient: CeramicClient;
  setResponse: any;
}

function ModalBody({ ceramicId, ceramicClient }: any) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await getCeramicData(
          ceramicClient as CeramicClient,
          ceramicId as string
        );
        setData(resp.content);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {data && !loading ? (
        <Box sx={{ marginTop: "2rem", overflowX: "auto" }}>
          <ReactJson src={data} />
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

const Item: React.FC<ItemProps> = ({ ceramicId, ceramicClient, setResponse }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => setOpen(false);



  return (
    <>
      <div style={{ width: "100%" }} onClick={() => {
        //setResponse(ceramicClient.context.did)
        //console.log(ceramicClient.context.did);
        
        }}>
        {ceramicId}
      </div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Data from ceramic</DialogTitle>
        <DialogContent>
          <div>
            <ModalBody ceramicId={ceramicId} ceramicClient={ceramicClient} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Item;
