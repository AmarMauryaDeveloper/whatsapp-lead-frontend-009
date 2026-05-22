import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
      <div className="card-bg w-full max-w-md rounded-3xl p-8 shadow-glow">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
