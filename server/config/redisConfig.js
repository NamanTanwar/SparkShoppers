const { createClient } = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  legacyMode: false,
};

// Function to create Redis client instances
function createRedisClient(options) {
  const client = createClient(options);

  client.on("error", (err) => {
    console.error("Redis client error:", err);
  });

  return client; // Return the un-connected client instance
}

const client = createRedisClient(options);

// Function to connect to the Redis server (can be called asynchronously)
async function connectRedisClients() {
  try {
    //await subClient.connect()
    await client.connect();

    console.log("Redis clients connected successfully!");
  } catch (error) {
    console.error("Error connecting Redis clients:", error);
  }
}

// Optionally call the connect function here or elsewhere in your application
connectRedisClients();

module.exports = {
  //pubClient,
  // subClient,
  client,
};
