import classes from './Card.module.css';

// A wrapper component, is reusable throught entire app, thus is a general UI component
const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
