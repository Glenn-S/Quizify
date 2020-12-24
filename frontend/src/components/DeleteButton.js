import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({className, ...rest}) => {
  return (
    <div {...rest} className={`${className} btn deleteButton`}>
      <DeleteIcon />
    </div>
  );
};

export default DeleteButton;