import React from "react";

export interface IAuthContextProps {
  logged: boolean;
  setLogged: (inRoom: boolean) => void;
  username: string;
  setUsername: (name: string) => void;
  hasAccount: boolean
  setHasAccount: (hasAccount: boolean) => void
}

const defaultState: IAuthContextProps = {
  logged: false,
  setLogged: () => {},
  username: "",
  setUsername: () => {},
  hasAccount: true,
  setHasAccount: ()=> {}
};

export default React.createContext(defaultState);