import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema/';
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

class DatabaseConnector {
  private connectionString: string;
  private sql: ReturnType<typeof neon>; // Type pour la propriété `sql`
  private db: ReturnType<typeof drizzle>; // Type pour la propriété `db`

  /**
   * Constructs a new instance of the DatabaseConnector class.
   * Initializes the connection string from environment variables and validates it.
   * Sets up the SQL and database instances using the provided schema.
   * Logs the database URL to the console.
   */
  constructor() {
    console.log("Database URL:", process.env.VITE_DATABASE_URL);
    this.connectionString = process.env.VITE_DATABASE_URL || ''; 
    this._validateConnectionString();
    this.sql = neon(this.connectionString);
    this.db = drizzle(this.sql, { schema });
  }

  /**
   * Checks if the connection string is defined and not empty.
   * Throws an error if not.
   * @throws Error if the connection string is not defined or empty.
   */
  private _validateConnectionString() {
    if (!this.connectionString || this.connectionString === '') {
      throw new Error("Database URL is not defined in .env.local");
    }
  }

  /**
   * Returns the instance of the database.
   * @returns The instance of the database.
   */
  getDbInstance(): ReturnType<typeof drizzle> {
    return this.db;
  }
}

const databaseConnector = new DatabaseConnector();
export const db = databaseConnector.getDbInstance();
