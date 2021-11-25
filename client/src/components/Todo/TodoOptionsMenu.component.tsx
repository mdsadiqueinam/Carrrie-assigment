import { IconButton, MenuItem, ListItemIcon, IconButtonProps } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import withToggleMenu from "higherOrderComponents/withToggleMenu.hoc";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { forwardRef } from 'react';

const MenuButton = forwardRef((props: IconButtonProps, ref: any) => {
  return (
    <IconButton
      onClick={props.onClick}
      aria-label="settings"
      sx={{ marginTop: "15px" }}
      ref={ref}
      {...props}
    >
      <MoreVertIcon />
    </IconButton>
  );
});

interface MenuItemsProps {
  onDelete?: () => void;
  onUpdate?: () => void;
}

const MenuItems = (props: MenuItemsProps) => {
  return (
    <>
      <MenuItem onClick={props.onUpdate} >
        <ListItemIcon>
          <UpdateIcon />
        </ListItemIcon>
        Update todo
      </MenuItem>
      <MenuItem onClick={props.onDelete}>
        <ListItemIcon>
          <DeleteOutlineIcon />
        </ListItemIcon>
        Delete
      </MenuItem>
    </>
  );
};

export default withToggleMenu(MenuItems, MenuButton);
