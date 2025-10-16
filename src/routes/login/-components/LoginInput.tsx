import { useState, type FormEventHandler } from "react";
import eyeClose from "@images/login/eye-close.png";
import eyeOpen from "@images/login/eye-open.png";

type LoginFieldProps = {
  placeholder?: string;
  type?: string;
  name?: string;
  label: string;
  error?: string;
  value: string;
  onInput?: FormEventHandler<HTMLInputElement>;
  onChange?: FormEventHandler<HTMLInputElement>;
};
export default function LoginField({
  placeholder,
  type = "text",
  name,
  label,
  error,
  value,
  onChange,
  onInput,
}: LoginFieldProps) {
  const [isPlain, setIsPlain] = useState(type !== "password");
  const [inputType, setInputType] = useState(type);
  const eyeIcon = isPlain ? eyeClose : eyeOpen;

  function togglePlain() {
    setIsPlain(!isPlain);
    setInputType(!isPlain ? "password" : "text");
  }
  return (
    <div className='border-b border-b-[#E8E8E8]'>
      <label className='font-bold text-[36px] leading-[50px] m-0 w-full mb-[8px]'>{label}</label>
      <div className='flex items-center gap-[16px]'>
        <input
          placeholder={placeholder}
          className='mt-[16px] text-[32px] !leading-[104px] focus:outline-0 grow-1'
          name={name}
          type={inputType}
          value={value}
          onInput={onInput}
          onChange={onChange}
        />
        {type === "password" && <img className='size-[40px]' src={eyeIcon} alt='' onClick={togglePlain} />}
        {error && <div></div>}
      </div>
    </div>
  );
}
