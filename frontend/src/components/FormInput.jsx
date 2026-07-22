import { forwardRef } from 'react';

const FormInput = forwardRef(function FormInput(
  { label, error, type = 'text', className = '', ...rest },
  ref
) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-stone-700 mb-1">{label}</span>
      <input ref={ref} type={type} className={`input ${className}`} {...rest} />
      {error && <span className="text-xs text-red-600 mt-1 block">{error}</span>}
    </label>
  );
});

export default FormInput;
