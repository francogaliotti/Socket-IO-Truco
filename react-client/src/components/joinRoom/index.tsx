import React, { useContext, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import authContext from "../../context/authContext";
import gameContext from "../../context/gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import { ReturnButton } from "../game";

interface IJoinRoomProps { }

export const JoinRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  color: #ddd;
`;

export const RoomIdInput = styled.input`
  height: 30px;
  width: 20em;
  font-size: 17px;
  outline: none;
  border: 1px solid #8e44ad;
  border-radius: 3px;
  padding: 0 10px;
`;

export const JoinButton = styled.button`
  outline: none;
  background-color: #8e44ad;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid #8e44ad;
    color: #8e44ad;
  }
`;

export function JoinRoom(props: IJoinRoomProps) {

  const [isJoining, setJoining] = useState(false);

  const { setInRoom, isInRoom, roomName, setRoomName } = useContext(gameContext);

  const {username, setLogged} = useContext(authContext)

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        Swal.fire(err)
      });

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <form onSubmit={joinRoom}>
      <JoinRoomContainer>
      <h4>Hola {username}!</h4>
        <h4>Ingrese el ID de la sala</h4>
        <RoomIdInput
          placeholder="Room ID"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <JoinButton type="submit" disabled={isJoining}>
          {isJoining ? "Ingresando..." : "Ingresar"}
        </JoinButton>
        <ReturnButton onClick={()=>setLogged(false)}>Cerrar sesión</ReturnButton>
      </JoinRoomContainer>
    </form>
  );
}