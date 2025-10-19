import { Link, useSearchParams } from 'react-router-dom';
import css from './index.module.css';
import { useEffect } from 'react';
import { useActivateEmailMutation } from '../../../redux/api';
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
  }, [uidb64, token, activateEmail]);

  return (
    <ModalTemplate
      heading='Email Activation'
      width={700}
    >
      {
        isLoading
        ? <SpinnerScreen />
        : isSuccess
        ? <Success />
        : <Error />
      }
    </ModalTemplate>
  );
}

const Success = () => (
  <p>
    <span className={css.success}>Email successfully activated!</span>
    You can now <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`} className='link'>log in</Link> to your account.
  </p>
);

const Error = () => (
  <div className={css.container}>
    <p><span className={css.error}>An errror occured!</span> Possible reasons:</p>

    <ul className={css.list}>
      <li><p>The activation link has expired. <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.EMAIL_RESEND}`} className='link'>Resend it</Link>?</p></li>
      <li><p>Activation link has already been used. Try to <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`} className='link'>log in</Link> to your account.</p></li>
    </ul>
  </div>
);
