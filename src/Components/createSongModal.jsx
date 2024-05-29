import React, { useState } from "react";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0px;
`;

const Input = styled.input`
  width: 100%;
  padding: 2px 0;
  border: none;
  border-bottom: 2px solid #ccc;
  &:focus {
    outline: none;
    border-bottom-color: #000000;
  }
`;

const Button = styled.button`
  background: #000000;
  color: #ffffff;
  height: 35px;
  width: 80px;
  align-items: center;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CreateSongModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, artist, album, year, img });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Create New Song</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title:</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Artist:</Label>
            <Input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Album:</Label>
            <Input
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Year:</Label>
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Image URL:</Label>
            <Input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </FormGroup>
          <ButtonContainer>
            <Button type="submit">Create</Button>
            <Button onClick={onClose}>Close</Button>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateSongModal;
