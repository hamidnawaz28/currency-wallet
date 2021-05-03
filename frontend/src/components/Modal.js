import React from "react";
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { AddBox } from "@material-ui/icons";
function PopUpForm({
  title,
  handleSave,
  formState,
  setFormState,
  field,
  ...props
}) {
  return (
    <>
      <Dialog
        open={formState}
        onClose={setFormState}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container>
            <Grid xs={9}>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
            </Grid>
            <Grid xl={3}>
              <IconButton
                color="primary"
                variant="contained"
                onClick={setFormState}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>{field}</DialogContent>
        <Grid container justify="center">
          <DialogActions position="centre">
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </>
  );
}
export default PopUpForm;
