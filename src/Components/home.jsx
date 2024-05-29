import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled/macro";
import { FiPlusCircle } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  fetchSongsStart,
  createSongStart,
  updateSongStart,
  deleteSongStart,
} from "../features/songs/songsSlice";
import CreateSongModal from "./createSongModal";
import Update from "./update";
import SongMenu from "./SongMenu"; 

const Container = styled.div`
  background-image: url("/assets/bg-img.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh; 
  padding-bottom: 20px; 
  width: 100%;
  overflow-y: auto; 
`;


const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 20px;
`;

const Title = styled.h1`
  margin: 0;
`;

const PlusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const SongList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 70%;
  justify-content: center;
`;

const SongItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImgContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50px;
  }
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const SongText = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  p {
    margin: 2px 0;
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center;
  }

  .album-year {
    margin-left: 10px;
  }
`;

function Home() {
  const dispatch = useDispatch();
  const { list: songs, loading, error } = useSelector((state) => state.songs);
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleCreate = () => {
    setCreateFormVisible(true);
  };

  const handleCreateSong = (song) => {
    dispatch(createSongStart(song));
    setCreateFormVisible(false);
  };

  const handleEdit = (song) => {
    setCurrentSong(song);
    setUpdateFormVisible(true);
    setMenuVisible(false); // Hide menu after editing
  };

  const handleUpdateSong = (song) => {
    dispatch(updateSongStart(song));
    setUpdateFormVisible(false);
  };

  const handleDelete = (songId) => {
    dispatch(deleteSongStart(songId));
    setMenuVisible(false); // Hide menu after deleting
  };

  const handleMenu = (e, song) => {
    e.preventDefault();
    setCurrentSong(song);
    setMenuPosition({ top: e.clientY, left: e.clientX });
    setMenuVisible(true);
  };

  return (
    <Container>
      <Header>
        <Title>Songs List</Title>
        <PlusIcon onClick={handleCreate}>
          <FiPlusCircle size={30} color="white" />
        </PlusIcon>
      </Header>
      <SongList>
        {songs.map((song) => (
          <SongItem key={song.id}>
            <SongDetails>
              <ImgContainer>
                <img src={song.img} alt={song.title} />
              </ImgContainer>
              <SongText>
                <h3>{song.title}</h3>
                <p>
                  {song.artist}
                  <span className="album-year">
                    {song.album}, {song.year}
                  </span>
                </p>
              </SongText>
            </SongDetails>
            <BsThreeDotsVertical
              size={24}
              onClick={(e) => handleMenu(e, song)}
            />
          </SongItem>
        ))}
      </SongList>
      {menuVisible && (
        <SongMenu
          style={{
            position: "absolute",
            top: menuPosition.top,
            left: menuPosition.left,
          }}
          onEdit={() => handleEdit(currentSong)}
          onDelete={() => handleDelete(currentSong.id)}
        />
      )}
      {isCreateFormVisible && (
        <CreateSongModal
          isOpen={isCreateFormVisible}
          onClose={() => setCreateFormVisible(false)}
          onCreate={handleCreateSong}
        />
      )}
      {isUpdateFormVisible && (
        <Update song={currentSong} onUpdate={handleUpdateSong} />
      )}
    </Container>
  );
}

export default Home;
