import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AppContainer from '../../src/Layout/AppContainer/AppContainer';
// import DividedList from '../../src/Components/DividedList/DividedList';
// import { Cards } from '../../src/data/Components/Card/Cards';
// import Card from '../../src/Components/Card/Card';

// import styles from '../../src/styles/Pages/Dashboard.module.scss';

interface Props {}

/**
 * Solicitudes module
 * @return {JSX.Element} Solicitudes module JSX
 */
function Solicitudes({}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Plan Ocaso | Solicitudes</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Gestión de Solicitudes</h3>
      {/* <div className="dashboard wrapper">
        <h1 className="header-title">Panel</h1>
        <div className={styles.cards}>
          <div className="row">
            {Cards.map((card) => (
              <div key={card.id} className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <Card {...card} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.workloads}>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
              <h3 className={styles.workloadTitle}>
                Citas para hoy{' '}
                <span style={{ textTransform: 'capitalize' }}>
                  {new Date().toLocaleDateString('es-Do', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              </h3>
              <div className={styles.workload}>
                <DividedList
                  list={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((a) => ({
                    name: 'Jhon Doe',
                    plan: 'Silver',
                    hour: '14:00',
                    month: 'November',
                    day: '10',
                  }))}
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
              <h3 className={styles.workloadTitle}>Próximas citas</h3>
              <div className={styles.workload}>
                <DividedList
                  type="next"
                  list={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((a) => ({
                    name: 'Jane Doe',
                    plan: 'Silver',
                    hour: '14:00',
                    month: 'November',
                    day: '10',
                  }))}
                />
              </div>
            </div>
          </div>
        </div> 
      </div> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

Solicitudes.layout = AppContainer;

export default Solicitudes;
