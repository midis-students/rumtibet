import Style from './style.module.scss';
import { useCallback, useState } from 'react';
import { sessionStore } from '../stores/session.store.ts';
import { usePopout } from '../stores/usePopout.tsx';
import RegisterPopout from './register.tsx';

export default function LoginPopout() {
  const session = sessionStore();
  const popout = usePopout((select) => select.set);

  const [form, setForm] = useState<Record<string, string>>({});

  const onUpdate = (
    event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const onRegister = () => {
    popout(<RegisterPopout />);
  };

  const onLogin = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((res) => {
          if ('access_token' in res) {
            session.setAccessToken(res.access_token);
            window.location.href = '/profile';
          } else {
            alert('Не правильные данные');
          }
        });
    },
    [form]
  );

  return (
    <div className={Style.popout}>
      <div className={Style.container}>
        <h2>Авторизация</h2>
        <h4>Обязательные поля</h4>
        <form target={'#'}>
          <label>
            E-mail
            <input name={'email'} type={'email'} onInput={onUpdate} />
          </label>
          <label>
            Пароль
            <input name={'password'} type={'password'} onInput={onUpdate} />
          </label>
          <button onClick={onLogin} className={Style.button_register}>
            Продолжить
          </button>
        </form>
        <button className={Style.button_login} onClick={onRegister}>
          Регистрация
        </button>
      </div>
    </div>
  );
}
