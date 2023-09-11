import { RedisClientType, createClient } from "redis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

class RedisClient {
  static instance: RedisClient;
  client: RedisClientType;

  private constructor() {
    this.client = createClient({
      url: redisUrl,
    });
    this.client.on("error", (err) => console.log("Redis Client Error", err));
  }

  public static getClient(): RedisClientType {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }

    return RedisClient.instance.client;
  }
}

export default RedisClient;

// export default redisConfig;
