// All SQL queries go here
// REMEMBER: must import each function below in index.js (or wherever it's being used)

import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

// Establish connection to database: pool is "cursor" in python
export const pool = mysql.createPool({ 
    host: process.env.MYSQL_HOST,  
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise() 

//------------Queries-------------//

export async function getAllPlayers(limit) {
    const [rows] = await pool.query("SELECT * FROM players LIMIT ?", [limit])
    // math here if want, or call helpers (that you'd have to import)
    return rows
}

export async function getBatting(year, minGames) {
    const [rows] = await pool.query("SELECT playerID, HR, G FROM batting_test WHERE year = ? AND G > ?", [year, minGames])
    return rows
}



