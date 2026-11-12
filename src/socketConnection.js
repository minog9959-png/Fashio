// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_API_URL, {
//   transports: ["websocket"],
// });

// export default socket;


// import { io } from "socket.io-client";

// let socket = null;

// if (import.meta.env.MODE !== "production") {
//   socket = io("http://localhost:8000", {
//     transports: ["websocket"],
//   });
// }

// export default socket;

import { io } from "socket.io-client";

const socket = io(
  import.meta.env.DEV
    ? "http://localhost:8000"
    : import.meta.env.VITE_API_URL.replace("/api", ""),
  {
    transports: ["websocket"],
  }
);

export default socket;