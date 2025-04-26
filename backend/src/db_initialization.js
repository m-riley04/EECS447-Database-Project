import { readFileSync } from 'fs';

const SQL_DIRECTORY_PATH = '../sql';

function normalizeBigInt(obj) {
    if (Array.isArray(obj)) return obj.map(normalizeBigInt);

    for (const k in obj) {
        if (typeof obj[k] === 'bigint') {
        // choose the representation you prefer
        obj[k] = obj[k].toString();   // keeps full precision
        // obj[k] = Number(obj[k]);   // loses precision > 2^53-1
        }
    }
    return obj;
}

/**
 * Reads a SQL file and returns its content. Returns an empty string if the file does not exist (and logs an error).
 * @param {*} filePath 
 */
function readSQLFile(filePath) {
    let data = "";
    try {
        data = readFileSync(`${SQL_DIRECTORY_PATH}/${filePath}`, 'utf8');
    } catch (err) {
        console.error("An error occurred when reading SQL file:", err);
    }

    return data;
}

/**
 * Queries the database
 * @param {*} sql 
 * @param {*} res 
 * @param {*} req 
 * @param {import('mariadb').Pool} pool
 */
export async function query(sql, res, req, pool) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql);
        res.json(normalizeBigInt(rows));
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    } finally {
        if (conn) conn.release();
    }
}

/**
 * Updates a row in the database
 * @param {*} sql 
 * @param {*} res 
 * @param {*} req 
 * @param {import('mariadb').Pool} pool
 * @param {*} params
 */
export async function update(sql, res, req, pool, params) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql, params);
        res.json(normalizeBigInt(rows));
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    } finally {
        if (conn) conn.release();
    }
}


/**
 * Initializes basic GET request endpoints for the server.
 */
export function initBasicGETRequests(params) {
    const { app, pool } = params;

    /**
     * Gets all genres
     */
    app.get('/api/genre', async (req, res) => {
        await query('SELECT * FROM genre', res, req, pool);
    });
    
    /**
     * Gets all users
     */
    app.get('/api/user', async (req, res) => {
        await query('SELECT * FROM user', res, req, pool);
    });
    
    /**
     * Gets all media items
     */
    app.get('/api/media_item', async (req, res) => {
        await query('SELECT * FROM media_item', res, req, pool);
    });
    
    /**
     * Gets all authors
     */
    app.get('/api/author', async (req, res) => {
        await query('SELECT * FROM author', res, req, pool);
    });
    
    /**
     * Gets all transactions
     */
    app.get('/api/transaction', async (req, res) => {
        await query('SELECT * FROM transaction', res, req, pool);
    });
    
    /**
     * Gets all fee statuses
     */
    app.get('/api/fee_status', async (req, res) => {
        await query('SELECT * FROM fee_status', res, req, pool);
    });
    
    /**
     * Gets all media types
     */
    app.get('/api/media_type', async (req, res) => {
        await query('SELECT * FROM media_type', res, req, pool);
    });
    
    /**
     * Gets all account statuses
     */
    app.get('/api/account_status', async (req, res) => {
        await query('SELECT * FROM account_status', res, req, pool);
    });
    
    /**
     * Gets all membership types
     */
    app.get('/api/membership_type', async (req, res) => {
        await query('SELECT * FROM membership_type', res, req, pool);
    });

    // Get user by ID
    app.get('/api/user/:id', async (req, res) => {
        const userId = req.params.id;
        await query(`SELECT * FROM user WHERE user_id=${userId}`, res, req, pool);
    });
}

/**
 * Initializes basic PUT request endpoints for the server.
 */
export function initBasicPUTRequests(params) {
    const { app, pool } = params;
    /// TODO: Implement this function
}

/**
 * Initializes basic POST request endpoints for the server.
 */
export function initBasicPOSTRequests(params) {
    const { app, pool } = params;
    /// TODO: Implement this function
}

/**
 * Initializes basic DELETE request endpoints for the server.
 */
export function initBasicDELETERequests(params) {
    const { app, pool } = params;
    /// TODO: Implement this function
}

/**
 * Initializes the miscellaneous stored procedure requests for the server.
 * @param {{ app: import('express').Express, pool: import('mariadb').Pool }} params
 */
export function initMiscProceduresRequests(params) {
    const { app, pool } = params;

    // Check for user by an email
    app.get('/api/user/email/:email', async (req, res) => {
        const email = req.params.email;
        await query(`CALL spCheckUserByEmail('${email}', @a); SELECT @a AS user_id;`, res, req, pool); // NOTE: This is probably not safe, but this isn't a real production app
    });
}

/**
 * Initializes the report requests for the server.
 * @param {{ app: import('express').Express, pool: import('mariadb').Pool }} params
 */
export function initReportRequests(params) {
    const { app, pool } = params;

    // Get all media items that are available
    app.get('/api/media_item/unavailable', async (req, res) => {
        await query('SELECT * FROM media_item WHERE availability=False', res, req, pool);
    });

    // Get all media items checked out by a user
    app.get('/api/media_item/:user_id', async (req, res) => {
        const userId = req.params.user_id;
        await query(`SELECT * FROM media_item WHERE user_id=${userId};`, res, req, pool);
    });

    // Get all overdue fees
    app.get('/api/overdue_fees', async (req, res) => {
        await query("SELECT * FROM fee WHERE fee_status=2", res, req, pool);
    });

    // Get all fees for a user
    app.get('/api/overdue_fees/:user_id', async (req, res) => {
        const userId = req.params.user_id;
        await query(`SELECT * FROM fee WHERE user_id=${userId} `, res, req, pool);
    });

    // Get books by a specific author
    app.get('/api/media_item/author/:author_id', async (req, res) => {
        const authorId = req.params.author_id;
        await query(readSQLFile("reports/report_books_by_author.sql"), res, req, pool);
    });

    // Get all media items by a specific genre
    app.get('/api/media_item/genre/:genre_id', async (req, res) => {
        const genreId = req.params.genre_id;
        await query(readSQLFile("reports/report_books_by_genre.sql"), res, req, pool);
    });

    // Get all client fines
    app.get('/api/client_fines', async (req, res) => {
        await query(readSQLFile("reports/report_client_fines.sql"), res, req, pool);
    });

    // Get all fees by fee status
    app.get('/api/fees/fee_status', async (req, res) => {
        await query(readSQLFile("reports/report_fees_by_status.sql"), res, req, pool);
    });

    // Users with overdue fees
    app.get('/api/users/overdue_fees', async (req, res) => {
        await query(readSQLFile("reports/report_users_with_overdue_fees.sql"), res, req, pool);
    });

}

/**
 * Initializes the request endpoints for "actions" that modify the database 
 * @param {{ app: import('express').Express, pool: import('mariadb').Pool }} params
 */
export function initActionRequests(params) {
    const { app, pool } = params;

    /**
     * Action: Check out a media item
     */
    app.post('/api/media_item/checkout/:id', async (req, res) => {
        const mediaItemId = req.params.id;
        const { user_id } = req.body;
        const sql = `CALL spCheckoutMediaItem(?, ?);`;
        const params = [mediaItemId, user_id];
        await update(sql, res, req, pool, params);
    });

    /**
     * Action: Return a media item
     */
    app.post('/api/media_item/return/:id', async (req, res) => {
        const mediaItemId = req.params.id;
        const { user_id } = req.body;
        const sql = `CALL spReturnMediaItem(?, ?);`;
        const params = [mediaItemId, user_id];
        await update(sql, res, req, pool, params);
    });

    /**
     * Action: Pay a fee
     */
    app.post('/api/fee/pay/:id', async (req, res) => {
        const feeId = req.params.id;
        const sql = `CALL spPayFee(?);`;
        const params = [feeId];
        await update(sql, res, req, pool, params);
    });

    /**
     * Action: Reset the database back to its initial state
     */
    app.post('/api/reset', async (req, res) => {
        const sql = `CALL `;
        await update(sql, res, req, pool);
    });


}