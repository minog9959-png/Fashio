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

// Socket sirf local dev me chalta hai.
// Vercel par backend serverless hai, is liye wahan Socket.io ka
// persistent connection nahi ban sakta — production me socket band hai,
// baqi app REST API se chalti hai, order status refresh par update hota hai.
import { io } from "socket.io-client";

let socket = null;

if (import.meta.env.DEV) {
  socket = io("http://localhost:8000", {
    transports: ["websocket"],
  });
}

export default socket;