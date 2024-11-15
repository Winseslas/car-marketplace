import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema/*.ts';
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

class DatabaseConnector {
  private connectionString: string;
  private sql: ReturnType<typeof neon>; // Type pour la propriété `sql`
  private db: ReturnType<typeof drizzle>; // Type pour la propriété `db`

  constructor() {
    this.connectionString = process.env.VITE_DATABASE_URL || ''; // Initialisation
    this._validateConnectionString();
    this.sql = neon(this.connectionString);
    this.db = drizzle(this.sql, { schema });
  }

  private _validateConnectionString() {
    if (!this.connectionString) {
      throw new Error("Database URL is not defined in .env.local");
    }
  }

  // Méthode pour obtenir l'instance de la base de données
  getDbInstance() {
    return this.db;
  }
}

export const databaseConnector = new DatabaseConnector();
export const db = databaseConnector.getDbInstance();
