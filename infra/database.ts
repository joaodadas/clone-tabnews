import { Client } from "pg";

class Database {
  constructor() {}

  async query(queryObject) {
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      ssl: this.getSSLValues(),
    });

    try {
      await client.connect();
      const result = await client.query(queryObject);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await client.end();
    }
  }

  getSSLValues() {
    if (process.env.POSTGRES_CA) {
      return {
        ca: process.env.POSTGRES_CA,
      };
    }

    return process.env.NODE_ENV === "production" ? true : false;
  }
}

export default { Database };
