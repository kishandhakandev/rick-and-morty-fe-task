import { Outlet, NavLink } from 'react-router-dom';

export default function App() {
  return (
    <div className="container-desktop">
      <header className="mb-6 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold">
          Rick & Morty Explorer
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
