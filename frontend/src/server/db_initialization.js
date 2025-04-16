/**
 * Queries the database
 * @param {*} sql 
 * @param {*} res 
 * @param {*} req 
 * @param {*} pool 
 */
export async function query(sql, res, req, pool) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql);
        res.json(rows);
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
}

/**
 * Initializes basic PUT request endpoints for the server.
 */
export function initBasicPUTRequests(params) {
    const { app, pool } = params;
    /// TODO: Implement this function
    throw new Error('Function not implemented.');
}

/**
 * Initializes basic POST request endpoints for the server.
 */
export function initBasicPOSTRequests(params) {
    const { app, pool } = params;
    /// TODO: Implement this function
    throw new Error('Function not implemented.');
}

/**
 * Initializes basic DELETE request endpoints for the server.
 */
export function initBasicDELETERequests(params) {
    const { app, pool } = params;
    /// TODO: Implement this function
    throw new Error('Function not implemented.');
}