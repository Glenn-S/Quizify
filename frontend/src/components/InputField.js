
const InputField = ({ labelText, placeholder, value, onChange, ...rest }) => {
  return (
    <div {...rest}>
      <label htmlFor="field">{labelText}</label>
      <input 
        type="text" 
        className="form-control" 
        id="inputField" 
        aria-describedby="field" 
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        value={value} 
      />
    </div>
  );
};

export default InputField;