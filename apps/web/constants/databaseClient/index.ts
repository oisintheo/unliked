import { config } from '@constants/config';
import { createClient } from '@supabase/supabase-js';

const databaseUrl = config.dbApiUrl;
const databaseKey = config.dbAnonKey;

export const databaseClient = createClient(databaseUrl, databaseKey);
