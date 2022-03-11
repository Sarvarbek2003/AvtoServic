import pg from 'pg'

const pool = new pg.Pool({
    host: 'localhost',
    port:5432,
    user: 'postgres',
    password: '2003',
    database: 'avtoservis'
})

const data =  async(req, res, query, ...params) => {
        const client = await pool.connect()
        try {
            const { rows } = await client.query(query, params.length ? params : null)
            return rows
        } catch(error){
            res.status(400).json({database_error:error})
        } finally {
            client.release()
        }
}

export default data