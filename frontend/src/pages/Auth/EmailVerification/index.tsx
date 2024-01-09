import { Link, useSearchParams } from 'react-router-dom';
import css from './index.module.css';
import { useEffect } from 'react';
import { useActivateEmailMutation } from '../../../redux/apis/authApi';
import { ModalTemplate } from '../ModalTemplate';
import { SpinnerScreen } from '../../../components/SpinnerScreen';
import { AuthNestedPaths, NavPaths } from '../../../navigation';

export function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [activateEmail, { isLoading, isSuccess }] = useActivateEmailMutation();

  const uidb64 = searchParams.get('uidb64');
  const token = searchParams.get('token');

  useEffect(() => {
    if (uidb64 && token) {
      activateEmail({ uidb64, token });
    }
  }, [uidb64, token]);

  return (
    <ModalTemplate
      heading='Активация электронной почты'
      width={700}
    >
      {
        isLoading
        ? <SpinnerScreen height={300} />
        : isSuccess
        ? <Success />
        : <Error />
      }
    </ModalTemplate>
  );
}

const Success = () => (
  <p>
    <span className={css.success}>Электронная почта активирована! </span>
    Теперь Вы можете <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`} className='link'>войти</Link> в аккаунт.
  </p>
);

const Error = () => (
  <div className={css.container}>
    <p><span className={css.error}>Произошла ошибка!</span> Возможные причины:</p>

    <ul className={css.list}>
      <li><p>Истёк срок действия ссылки-активации. <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.EMAIL_RESEND}`} className='link'>Выслать еще раз</Link>?</p></li>
      <li><p>Ссылка-активация уже была исользована. Попробуйте <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`} className='link'>войти</Link> в аккаунт.</p></li>
    </ul>
  </div>
);
