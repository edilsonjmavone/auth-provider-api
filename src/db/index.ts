import 'dotenv/config';

import { drizzle } from "drizzle-orm/mysql2";

export default drizzle(process.env.DB_URL!,);
