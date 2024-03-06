const Input = ({
  type,
  placeholder,
  className,
  labelClassName,
  labelPlaceholder,
  name,
}) => {
  return (
    <>
      <label className={labelClassName}>{labelPlaceholder}</label>
      <input
        placeholder={placeholder}
        type={type}
        className={className}
        name={name}
      />
    </>
  );
};

export default Input;
