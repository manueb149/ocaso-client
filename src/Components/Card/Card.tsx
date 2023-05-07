import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICard, Card as Cards } from '../../data/Components/Card/Cards';
import styles from '../../styles/Components/Card.module.scss';
/**
 * This is a card component
 */
const Card: React.FC<ICard> = ({ id, name, count, icon, color }) => {
  return (
    <div className={[styles.card].join(' ')}>
      <div className={styles.cardInner}>
        <div className={styles.cardLeft}>
          <FontAwesomeIcon icon={icon!} style={{ color }} />
        </div>
        <div className={styles.cardRight}>
          <div className={styles.cardName}>{name}</div>
          <div className={styles.cardCount}>{`${id === Cards.Income ? '$' : ''}${count}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
