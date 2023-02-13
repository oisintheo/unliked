import Link from 'next/link';
import { StyledHeaderContainer } from './Header.styles';
import SearchBar from '@ui/SearchBar';
import LogoWithName from '@icons/LogoWithName';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from 'utils/useUser';
import Modal from '@ui/Modal';
import { useEffect, useRef, useState } from 'react';
import { getURL } from 'utils/helpers';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

export default function Header() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  // const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_in');

  useEffect(() => {
    if (user) {
      setShowModal(false);
    }
  }, [user]);

  const setReturnPath = () => {
    localStorage.setItem('returnPath', window.location.pathname);
  };

  return (
    <StyledHeaderContainer>
      <Link href='/'>
        <LogoWithName alt='Unliked Logo' width={175} height={50} />
      </Link>
      <SearchBar />
      {user ? (
        <span
          onClick={async () => {
            await supabaseClient.auth.signOut();
            router.push('/');
          }}
        >
          Sign out
        </span>
      ) : (
        <button
          onClick={() => {
            // setAuthMode('sign_in');
            setShowModal(true);
            setReturnPath();
          }}
        >
          Sign in
        </button>
      )}
      <Modal
        open={showModal}
        dialogStateChange={(open) => setShowModal(open)}
        contents={
          <>
            {/* <button onClick={() => setShowModal(false)}>X</button> */}
            <h2>Log in to Unliked</h2>
            <Auth
              supabaseClient={supabaseClient}
              providers={['google', 'apple']}
              redirectTo={getURL()}
              magicLink={true}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#ffda03',
                      brandAccent: '#52525b',
                    },
                    fonts: {
                      bodyFontFamily: 'Outfit',
                      buttonFontFamily: 'Outfit',
                      inputFontFamily: 'Outfit',
                      labelFontFamily: 'Outfit',
                    },
                  },
                },
              }}
              localization={{
                variables: {
                  sign_up: {
                    email_label: 'Email address',
                    password_label: 'Create a Password',
                    email_input_placeholder: 'Your email address',
                    password_input_placeholder: 'Your password',
                    button_label: 'Sign up',
                    social_provider_text: 'Sign in with',
                    link_text: "Don't have an account? Sign up",
                  },
                  sign_in: {
                    email_label: 'Email address',
                    password_label: 'Password',
                    email_input_placeholder: 'Enter your email address',
                    password_input_placeholder: 'Enter your password',
                    button_label: 'Sign in',
                    social_provider_text: 'Sign in with',
                    link_text: 'Already have an account? Sign in',
                  },
                  magic_link: {
                    email_input_label: 'Email address',
                    email_input_placeholder: 'Your email address',
                    button_label: 'Send Magic Link',
                    link_text: 'Send a magic link email',
                  },
                  forgotten_password: {
                    email_label: 'Email address',
                    password_label: 'Your Password',
                    email_input_placeholder: 'Your email address',
                    button_label: 'Send reset password instructions',
                    link_text: 'Forgot your password?',
                  },
                  update_password: {
                    password_label: 'New password',
                    password_input_placeholder: 'Your new password',
                    button_label: 'Update password',
                  },
                },
              }}
              theme='dark'
            />
          </>
        }
      />
    </StyledHeaderContainer>
  );
}
