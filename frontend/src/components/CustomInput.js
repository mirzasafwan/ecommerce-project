import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, value, onChange, onBlur } = props;
  return (
    <div className="">
      <label htmlFor={label} className='text-white '>{label}</label>
      <input
        type={type}
        className={`form-control ${i_class} p-2 text-black`}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ color: "black" }}
      />
    </div>
  );
};

export default CustomInput;