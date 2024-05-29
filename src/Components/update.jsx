// src/Components/Update.jsx
import React, { useState } from "react";
import styled from "@emotion/styled/macro";

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Update = ({ song, onUpdate }) => {
  const [updatedSong, setUpdatedSong] = useState({ ...song });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSong((prevSong) => ({ ...prevSong, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedSong);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          value={updatedSong.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <Input
          name="artist"
          value={updatedSong.artist}
          onChange={handleChange}
          placeholder="Artist"
        />
        <Input
          name="album"
          value={updatedSong.album}
          onChange={handleChange}
          placeholder="Album"
        />
        <Input
          name="year"
          value={updatedSong.year}
          onChange={handleChange}
          placeholder="Year"
        />
        <Button type="submit">Update</Button>
      </form>
    </FormContainer>
  );
};

export default Update;
