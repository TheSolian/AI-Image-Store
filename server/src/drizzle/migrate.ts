import { NeonQueryFunction, neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql as NeonQueryFunction<boolean, boolean>)

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'drizzle/migrations',
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
main()
