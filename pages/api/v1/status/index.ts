import Database from "infra/database";

async function status(requst: any, response: any) {
  const updatedAt = new Date().toISOString();
  const database = new Database();

  const postgresVersion = await database.query("SHOW SERVER_VERSION;");
  const postgresVersionValue = postgresVersion.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = parseInt(maxConnections.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const activeConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const activeConnectionsValue = activeConnections.rows[0].count;

  response.status(200).json({
    updated_At: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersionValue,
        max_connections: maxConnectionsValue,
        active_connections: activeConnectionsValue,
      },
    },
  });
}

export default status;
