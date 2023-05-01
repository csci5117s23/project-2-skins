import React, { useState, useEffect } from "react";
// MUI Component imports
import {
  Box,
  Dialog
} from "@mui/material";
// Custom component imports
import WardrobeTabs from './WardrobeTabs.js';
import ClothesForm from "@/components/ClothesForm.js";

export default function WardrobeDialog() {
  // --- Dialog --------------------------------------------------
  // State of whether or not dialog is open
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(true);
  const [selectedClothing, setSelectedClothing] = useState(null);

  const handleClickOpen = (Clothing) => {
    setSelectedClothing(Clothing);
    setOpen(true);
  };
  const handleUpdate = (update) => {
    setUpdated(update);
    handleCloseDialog();
  };
  // Function to close dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
    <Box>
        <WardrobeTabs clickFunction={handleClickOpen} />
        <Dialog open={open} onClose={handleCloseDialog}>
            <ClothesForm
            clothingToEdit={selectedClothing}
            setUpdated={handleUpdate}
            />
        </Dialog>
    </Box>
    </>
  );
}
