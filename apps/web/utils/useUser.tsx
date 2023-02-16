import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from '@supabase/auth-helpers-react';
import { UserDetails } from 'types';
import { RealtimeChannel } from '@supabase/supabase-js';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  async function listenToUserProfileChanges(userId: string) {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .filter('user_id', 'eq', userId);

    setUserDetails(data?.[0]);
    setIsloadingData(false);
    return supabase
      .channel(`public:user_profiles`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setUserDetails(payload.new as UserDetails);
        },
      )
      .subscribe();
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event) => {
      setUserDetails(null);
    });

    if (session?.user && !userDetails) {
      setIsloadingData(true);

      listenToUserProfileChanges(session.user.id).then((newChannel) => {
        if (newChannel) {
          if (channel) {
            channel.unsubscribe();
          }
          setChannel(newChannel);
        }
      });
    } else if (!session?.user) {
      channel?.unsubscribe();
      setChannel(null);
    }
  }, [session]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
