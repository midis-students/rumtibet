import { Outlet } from 'react-router-dom';
import { usePopout } from '../../stores/usePopout.tsx';

export default function MainLayout() {
  const Popout = usePopout((select) => select.current);

  return (
    <>
      <Outlet />
      {Popout}
    </>
  );
}
