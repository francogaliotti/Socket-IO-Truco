import React, { useEffect } from 'react';
import './App.css';
import socketService from './services/socketService';

function App() {

  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div className="App">

    </div>
  );
}

export default App;
