import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { v4 as uuidv4 } from 'uuid';

const DATABASE_PATH = './propostas.db';

export async function getDb() {
  const db = await open({
    filename: DATABASE_PATH,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS propostas (
      id TEXT PRIMARY KEY,
      nomeCliente TEXT NOT NULL,
      projeto TEXT NOT NULL,
      valorTotal REAL NOT NULL,
      valorPix TEXT NOT NULL,
      valorCartao TEXT NOT NULL,
      dataProposta TEXT NOT NULL,
      validadeProposta TEXT NOT NULL,
      garantia TEXT NOT NULL,
      dataCriacao TEXT NOT NULL,
      expiraEm TEXT NOT NULL
    );
  `);
  return db;
}
