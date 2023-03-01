import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalOpenAtom, refrashAtom } from "../atoms";

function Modal(){
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenAtom);
  const [newCate, setNewCate] = useState("");
  const setRefrash = useSetRecoilState(refrashAtom);

  const handleClose = () => {
    setModalOpen(false);
  }

  const addCate = () => {
    if(!newCate){
      return null
    
    } else {
      const localCate = localStorage.getItem("todoCate");
      if(localCate !== null){
        const parsedCate = JSON.parse(localCate);
        const newCateArr = [...parsedCate, newCate];
        localStorage.removeItem("todoCate");
        localStorage.setItem("todoCate", JSON.stringify(newCateArr));
        setModalOpen(false);
        setRefrash(Date.now());
      }
    }
  }

  return(
    <Dialog open={modalOpen} onClose={handleClose}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setNewCate(e.target.value)}
          autoFocus
          margin="dense"
          id="newCate"
          label="Write New Category"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={addCate}>Add</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal;