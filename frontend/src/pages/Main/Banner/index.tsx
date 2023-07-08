import { Button } from '../../../components/Button';
import { NavPaths } from '../../../navigation';
import { Colors } from '../../../types/common';
import spray from '../../../images/spray.png';
import css from './index.module.css';

export const Banner = () => (
  <section className={css.banner}>
    <div className={css.content}>
      <h1 className={`h1 ${css.h1}`}>Профессинальная химия для&nbsp;химчистки, клининга и дома</h1>
      <p className={css.paragraph}>Наша компания предоставляет широкий выбор средств профессиальной химии от известных мировых и российских производителей с доставкой по Новосибирску и всей России</p>
      <div className={css.buttons}>
        <Button
          path={NavPaths.CATALOG}
          state={{ default: { text: 'Перейти в каталог', icon: undefined } }}
        />
        <Button
          path={NavPaths.CONTACTS}
          state={{ default: { text: 'Задать вопрос', icon: undefined } }}
          color={Colors.WHITE}
          outlineColor={Colors.BLUE}
        />
      </div>
    </div>
    <img src={spray} className={css.spray} alt='spray' />
    <div className={css.polygon} />
  </section>
);
