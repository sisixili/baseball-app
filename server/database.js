// All SQL queries go here
// REMEMBER: must import each function below in index.js (or wherever it's being used)

import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()

// Establish connection to database: pool is "cursor" in python
const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,  
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    //pool: {min: 0, max: 100} // set max/min on size of connection pool
});

//------------Queries-------------//

export const getAllPlayers = async (limit) => {
    // math here if want, or call helpers (that you'd have to import)
    return await db('players')
        .select('*')
        .limit(limit);
}

export const getPlayerByID = async (playerID) => {
    return await db('players')
        .select('*')
        .where('playerID', playerID);
}

export const getLeaders = async (column, orderDirection) => {
    return await db('players')
        .select('playerID', 'nameFirst', 'nameLast', column)
        .orderBy(column, orderDirection);
}

export const getBatting = async (year, minGames) => {
    return await db('batting_test')
        .select('playerID', 'HR', 'G')
        .where('yearID', year)
        .andWhere('G', '>=', minGames);
}



