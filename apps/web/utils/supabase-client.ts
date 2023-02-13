import {
  createBrowserSupabaseClient,
  User,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '@unliked/types';

export const supabase = createBrowserSupabaseClient<Database>();

export const updateUserName = async (user: User, name: string) => {
  await supabase
    .from('user_profiles')
    .update({
      full_name: name,
    })
    .eq('id', user.id);
};
