import Style from './style.module.scss';

import Background2 from '../../../../assets/background_2.png';
import Background3 from '../../../../assets/background_3.png';

export default function SectionAbout() {
  return (
    <section className={Style.section}>
      <div className={Style.container}>
        <div className={Style.images}>
          <img src={Background2} alt={''} />
          <img src={Background3} alt={''} />
        </div>
        <div className={Style.info}>
          <h4>О проекте</h4>
          <h3>ЭКОлин - остров экологических возможностей!</h3>
          <p>
            Сервис подразумевает работу на территории. Сахалинской области. Он
            объединяет различные всероссийские и региональные экологические
            акции, позволяет отслеживать добровольческую активность волонтеров
            субъекта, в также мониторить экологическую ситуацию как на
            территории области, так и всей России. Почему ЭКОлин?
          </p>
          <button>Подробнее</button>
        </div>
      </div>
    </section>
  );
}
