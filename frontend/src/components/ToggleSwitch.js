
const ToggleSwitch = ({ labelText, checked, onChange, className, ...rest }) => {

  return (
    <div {...rest} className={`${className} custom-control custom-switch`}>
      <input 
        type='checkbox'
        className='custom-control-input'
        name='toggleSwitch'
        id='toggleSwitch'
        checked={checked}
        onChange={(event) => onChange(event)}
      />
      <label className='custom-control-label' htmlFor='toggleSwitch'>{labelText}</label>
    </div>
  );
};

export default ToggleSwitch;