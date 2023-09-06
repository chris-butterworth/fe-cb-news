export const Button = (props) => {
  return (
    <button onClick={props.onClick} role={props.role}>
      {props.children}
    </button>
  );
};
