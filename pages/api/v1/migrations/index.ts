import migrationRunner, { RunnerOption } from 'node-pg-migrate';
import { join } from 'node:path';
import database from 'infra/database';
import { Client } from 'pg';

export default async function migrations(requst: any, response: any) {
  const allowedMethods = ['GET', 'POST'];
  if (!allowedMethods.includes(requst.method)) {
    return response.status(405).json({
      error: `Method "${requst.method}"  not allowed!`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationsOptions: RunnerOption = {
      dbClient: dbClient,
      dryRun: true,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    };

    if (requst.method === 'GET') {
      const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (requst.method === 'POST') {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });
      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
