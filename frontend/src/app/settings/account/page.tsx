'use client';
import { Loading } from '@/components/loader';
import { useUser } from '@/hooks';

const AccountPage = () => {
  const { user, loading } = useUser();

  if (loading || !user) return <Loading />;

  return (
    <div className="app-page max-w-4xl">
      <div className="app-page-header">
        <h1 className="app-page-title text-2xl md:text-3xl">Account</h1>
        <p className="app-page-description">
          Review your profile details and connected identity information.
        </p>
      </div>
      <div className="app-surface flex w-full flex-col gap-6 p-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user.user_metadata?.avatar_url ?? '/logo-spaced.png'}
              alt="User avatar"
            />
          </div>
        </div>
        <div className="flex-grow">
          <div className="mb-4">
            <span className="font-bold">Name:</span>{' '}
            {user.user_metadata?.full_name ??
              user.email?.match(/^([^@]+)/)?.[1] ??
              '(No Name)'}
          </div>
          <div className="mb-4">
            <span className="font-bold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-bold">Since:</span>{' '}
            {new Date(user.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
