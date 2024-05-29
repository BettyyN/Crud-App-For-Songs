import React from "react";
import styled from "@emotion/styled";

const Menu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const SongMenu = ({ style, onEdit, onDelete }) => {
  return (
    <Menu style={style}>
      <MenuItem onClick={onEdit}>Edit</MenuItem>
      <MenuItem onClick={onDelete}>Delete</MenuItem>
    </Menu>
  );
};

export default SongMenu;
