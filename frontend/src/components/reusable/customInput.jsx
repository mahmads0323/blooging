const CustomInput = (props) => {
  return (
    <div>
      <input
        value={props.value}
        type={props.inputType}
        onChange={props.handleValueChange}
        placeholder={props.placeholder}
        required={props.required}
        className="text-textColor py-1 px-2 border border-solid border-black rounded-lg focus:border-2 focus:outline-none"
      />
      <p className={`text-xs`}>{props.message}</p>
    </div>
  );
};

export default CustomInput;
