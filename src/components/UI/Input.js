import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>

      {/* ...props.input spreads all objects inside the input obj, so it makes the input highly comfigrable from outside the component */}
      {/* e.g. {type: 'text'} is going to be  (type='text') */}
      <input {...props.input} />
    </div>
  );
};

export default Input;
