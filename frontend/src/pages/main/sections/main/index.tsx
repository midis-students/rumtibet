import Style from './style.module.scss';

export default function SectionMain() {
  return (
    <section className={Style.section} id={'main'}>
      <div className={Style.container}>
        <h1>ТЕМ КТО ИЩЕТ И ГОТОВ ПОМОЧЬ</h1>
        <div className={Style.search_container}>
          <label>
            Локация
            <input placeholder={'Выбирете из списка'} />
          </label>
          <label>
            Дата
            <input placeholder={'Укажите диапазон'} />
          </label>
          <label>
            Формат мероприятия
            <input placeholder={'Выбирете формат'} />
          </label>

          <button>Поиск</button>
        </div>
      </div>
    </section>
  );
}
