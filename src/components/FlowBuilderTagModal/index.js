import React, { useState, useEffect, useRef } from "react";

import * as Yup from "yup";
import { Formik, FieldArray, Form, Field } from "formik";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CircularProgress from "@material-ui/core/CircularProgress";

import { i18n } from "../../translate/i18n";

import api from "../../services/api";
import toastError from "../../errors/toastError";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from "@mui/material";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginRight: theme.spacing(1),
    flex: 1
  },

  extraAttr: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  btnWrapper: {
    position: "relative"
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

const selectFieldStyles = {
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#909090"
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000000",
    borderWidth: "thin"
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0000FF",
    borderWidth: "thin"
  }
};

const FlowBuilderTagModal = ({ open, onSave, onUpdate, data, close }) => {
  const classes = useStyles();
  const isMounted = useRef(true);

  const [activeModal, setActiveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [action, setAction] = useState("add");

  const [labels, setLabels] = useState({
    title: "Adicionar etiqueta ao fluxo",
    btn: "Adicionar"
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const { data: tagsData } = await api.get("/tags");
        setTags(tagsData.tags || []);
      } catch (err) {
        toastError(err);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchTags();
    }
  }, [open]);

  useEffect(() => {
    if (open === "edit") {
      setLabels({
        title: "Editar etiqueta",
        btn: "Salvar"
      });
      setSelectedTag(data.data.tagId);
      setAction(data.data.action);
      setActiveModal(true);
    } else if (open === "create") {
      setLabels({
        title: "Adicionar etiqueta ao fluxo",
        btn: "Adicionar"
      });
      setSelectedTag("");
      setAction("add");
      setActiveModal(true);
    } else {
      setActiveModal(false);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleClose = () => {
    close(null);
    setActiveModal(false);
  };

  const handleSaveTag = async () => {
    if (!selectedTag) {
      toast.error("Selecione uma etiqueta");
      return;
    }

    const selectedTagData = tags.find(tag => tag.id === selectedTag);
    
    if (open === "edit") {
      handleClose();
      onUpdate({
        ...data,
        data: { 
          tagId: selectedTag,
          tagName: selectedTagData?.name,
          action: action
        }
      });
      return;
    } else if (open === "create") {
      handleClose();
      onSave({
        tagId: selectedTag,
        tagName: selectedTagData?.name,
        action: action
      });
    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={activeModal}
        onClose={handleClose}
        fullWidth="md"
        maxWidth="sm"
        scroll="paper"
        PaperProps={{
          style: {
            margin: "16px",
            width: "calc(100% - 32px)",
            maxHeight: "calc(100% - 32px)"
          }
        }}
      >
        <DialogTitle id="form-dialog-title">{labels.title}</DialogTitle>
        <Stack>
          <Stack
            dividers
            style={{ height: "300px", gap: "16px", padding: "16px" }}
          >
            <FormControl sx={{ width: "95%" }} size="medium">
              <InputLabel sx={selectFieldStyles} id="action-select-label">
                Ação
              </InputLabel>
              <Select
                labelId="action-select-label"
                id="action-select"
                value={action}
                label="Ação"
                onChange={e => setAction(e.target.value)}
                variant="outlined"
                color="primary"
                sx={selectFieldStyles}
              >
                <MenuItem value="add">Adicionar etiqueta</MenuItem>
                <MenuItem value="remove">Remover etiqueta</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: "95%" }} size="medium">
              <InputLabel sx={selectFieldStyles} id="tag-select-label">
                Etiqueta
              </InputLabel>
              <Select
                labelId="tag-select-label"
                id="tag-select"
                value={selectedTag}
                label="Etiqueta"
                onChange={e => setSelectedTag(e.target.value)}
                variant="outlined"
                color="primary"
                sx={selectFieldStyles}
                disabled={loading}
              >
                {tags.map(tag => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {loading && (
              <Stack justifyContent={"center"} alignItems={"center"}>
                <CircularProgress />
              </Stack>
            )}
          </Stack>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="outlined">
              {i18n.t("contactModal.buttons.cancel")}
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.btnWrapper}
              onClick={handleSaveTag}
              disabled={loading}
            >
              {`${labels.btn}`}
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
};

export default FlowBuilderTagModal;