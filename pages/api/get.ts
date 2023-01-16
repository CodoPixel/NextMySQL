import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from "mysql";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  connection.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Connection was established successfully.");
    }
  });

  const p = new Promise<String>((resolve, reject) => {
    connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });

  const r = await p.then();

  connection.end();

  return res.status(200).json({ details: r });
}