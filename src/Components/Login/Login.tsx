import { signIn } from 'next-auth/react';

import styles from './Login.module.scss';

/**
 * Login section for the user to log in.
 * @return {JSX.Element} Login section JSX
 */
const Login = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.loginLayer}></div>
      <div className={styles.login}>
        <div className={styles.title}>Plan Ocaso</div>
        <button
          type="button"
          className={[styles.button, 'btn btn-primary'].join(' ')}
          style={{ fontWeight: 'bold' }}
          onClick={() => signIn()}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
