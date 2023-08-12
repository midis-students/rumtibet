import AppIcon from '../../../assets/icon.svg';
import cn from 'classnames';
import Style from './Style.module.scss';
import { Link, useLocation } from 'react-router-dom';

import { usePopout } from '../../../stores/usePopout.tsx';
import RegisterPopout from '../../../popout/register.tsx';
import LoginPopout from '../../../popout/login.tsx';

const sections = [
  {
    label: 'Главная',
    id: '',
  },
  {
    label: 'Для тебя',
    id: 'for-you',
  },
  { label: 'Популярное', id: 'popular' },
  {
    label: 'О проекте',
    id: 'about',
  },
  {
    label: 'Контакты',
    id: 'contacts',
  },
];

export default function Header() {
  const { hash } = useLocation();
  const popout = usePopout((select) => select.set);

  const onRegister = () => {
    popout(<RegisterPopout />);
  };
  const onLogin = () => {
    popout(<LoginPopout />);
  };

  return (
    <header className={Style.header}>
      <img src={AppIcon} alt={'румтибет'} />
      <nav>
        {sections.map(({ label, id }) => (
          <Link
            key={id}
            to={`#${id}`}
            className={cn(Style.link, {
              [Style.link__active]: hash.replace('#', '') === `${id}`,
            })}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className={Style.buttons}>
        <button
          className={cn(Style.button, Style.button__stroke)}
          onClick={onLogin}
        >
          Вход
        </button>
        <button className={cn(Style.button)} onClick={onRegister}>
          Регистрация
        </button>
      </div>
    </header>
  );
}
