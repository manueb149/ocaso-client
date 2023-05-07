import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { CssVarsProvider } from '@mui/joy/styles';
import { IDividedList } from '../../models/interfaces.model';
import styles from '../../styles/Components/DividedList.module.scss';

const DividedList: React.FC<IDividedList> = ({ list, type = 'today' }) => {
  if (list.length < 1) {
    return (
      <ListItemDecorator
        sx={{
          width: '100%',
          minHeight: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FontAwesomeIcon icon={faInbox} style={{ height: '20px' }} />
        <span className={styles.noAppoint}>No hay citas para hoy</span>
      </ListItemDecorator>
    );
  }
  return (
    <CssVarsProvider>
      <List
        variant="plain"
        sx={{
          width: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        {list.map((appoint: any, index: any) => (
          <div key={appoint.name + index} className="todayAppoints">
            {list.length > 1 && index !== 0 ? <ListDivider inset="gutter" /> : null}
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemDecorator sx={{ alignSelf: 'flex-start', gap: 1 }}>
                <div className={styles.name}>
                  {appoint.name}
                  <div className={styles.plan}>{appoint.plan}</div>
                </div>
              </ListItemDecorator>
              {type === 'today' ? (
                <div className={styles.date}>{appoint.hour}</div>
              ) : (
                <div className={styles.date}>{`${appoint.month} ${appoint.day} at ${appoint.hour}`}</div>
              )}
            </ListItem>
          </div>
        ))}
      </List>
    </CssVarsProvider>
  );
};

export default DividedList;
