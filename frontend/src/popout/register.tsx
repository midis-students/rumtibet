import Style from './style.module.scss';
import { useCallback, useState } from 'react';
import { sessionStore } from '../stores/session.store.ts';
import { usePopout } from '../stores/usePopout.tsx';
import LoginPopout from './login.tsx';

const regions = ['Коми'];
const cities = ['Усть-Ижма'];

export default function RegisterPopout() {
  const session = sessionStore();
  const popout = usePopout((select) => select.set);

  const [form, setForm] = useState<Record<string, string>>({});

  const onUpdate = (
    event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const onLogin = () => {
    popout(<LoginPopout />);
  };

  const onRegister = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const body = {
        ...form,
        birth_date: new Date(form.birth_date),
        gender: Boolean(form.gender),
        region: regions[0],
        city: cities[0],
      };

      fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
        <h2>Регистрация</h2>
        <h4>Обязательные поля</h4>
        <form target={'#'}>
          <div>
            <div>
              <label>
                Телефон
                <input name={'phone'} type={'tel'} onInput={onUpdate} />
              </label>
              <label>
                Фамилия <input name={'last_name'} onInput={onUpdate} />
              </label>
              <label>
                Имя <input name={'first_name'} onInput={onUpdate} />
              </label>
              <label>
                Пароль{' '}
                <input name={'password'} type={'password'} onInput={onUpdate} />
              </label>
              <label>
                Повторите пароль
                <input
                  name={'password_repeat'}
                  type={'password'}
                  onInput={onUpdate}
                />
              </label>
            </div>
            <div>
              <label>
                Дата рождения
                <input name={'birth_date'} type={'date'} onInput={onUpdate} />
              </label>
              <label>
                Регион
                <select name={'region'} onSelect={onUpdate}>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Населённый пункт
                <select name={'city'} onSelect={onUpdate}>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Пол
                <div>
                  <input
                    type={'radio'}
                    name={'gender'}
                    onInput={onUpdate}
                    value={'0'}
                  />
                  <input
                    type={'radio'}
                    name={'gender'}
                    onInput={onUpdate}
                    value={'1'}
                  />
                </div>
              </label>
              <label>
                E-mail
                <input name={'email'} type={'email'} onInput={onUpdate} />
              </label>
            </div>
          </div>
          <button onClick={onRegister} className={Style.button_register}>
            Продолжить
          </button>
        </form>
        <button className={Style.button_login} onClick={onLogin}>
          Войти
        </button>
      </div>
    </div>
  );
}
