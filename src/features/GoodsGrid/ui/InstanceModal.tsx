import { Box, Button, IconButton, Modal, TextField } from "@mui/material";

import { GridCloseIcon } from "@mui/x-data-grid";

interface InstanceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function InstanceModal(props: InstanceModalProps) {
  const handleSaveItem = () => {
    props.onSave();
    props.onClose();
  };

  const fields = [
    { name: "name", label: "Наименование" },
    { name: "price", label: "Цена" },
    { name: "vendor", label: "Вендор" },
    { name: "sku", label: "Артикул" },
  ];

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 16,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={props.onClose} size="small">
            <GridCloseIcon />
          </IconButton>
        </Box>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {fields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              name={field.name}
              variant="outlined"
              size="small"
            />
          ))}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button onClick={handleSaveItem} variant="contained">
              Сохранить
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
