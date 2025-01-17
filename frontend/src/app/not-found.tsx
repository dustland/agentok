import Link from 'next/link';
import { Button } from '@/components/ui/button';
const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full n w-full">
      <div className="flex flex-col text-center p-6 max-w-3xl gap-4 mx-auto ">
        <div className="mb-4">
          <img src="/404.png" alt="404" className="w-64 h-64 mx-auto my-8" />
          <p className="text-4xl text-error font-bold">Page Not Found</p>
        </div>
        <p className="mb-6 text-base-content">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div>
          <Link href="/" className="link link-primary link-hover">
            <Button variant="outline">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
