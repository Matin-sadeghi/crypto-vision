"use client"
import { useFormContext } from 'react-hook-form';
import { DsCheckbox } from './DsCheckbox';

type DsFormCheckboxProps = Omit<React.ComponentProps<typeof DsCheckbox>, 'checked' | 'onChange'> & {
  name: string;
  label?: string;
  value?: string;
  showError?: boolean;
};

export function DsFormCheckbox({
  name,
  label,
  value,
  showError = true,
  ...checkboxProps
}: DsFormCheckboxProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const fieldValue = watch(name);
  const hasError = errors[name];

  const checked =
    value !== undefined
      ? Array.isArray(fieldValue) && fieldValue.includes(value)
      : Boolean(fieldValue);

  const handleChange = (isChecked: boolean) => {
    if (value !== undefined) {
      const currentValues = Array.isArray(fieldValue) ? fieldValue : [];
      const newValues = isChecked
        ? [...currentValues, value]
        : currentValues.filter((item) => item !== value);
      setValue(name, newValues, { shouldValidate: true, shouldDirty: true });
      return;
    }

    setValue(name, isChecked, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-1">
      <DsCheckbox
        id={value !== undefined ? `${name}-${value}` : name}
        checked={checked}
        onChange={handleChange}
        {...(hasError ? { 'data-invalid': true } : {})}
        {...checkboxProps}
      />

      {showError && hasError && (
        <p className="text-sm text-red-500">{hasError?.message as string}</p>
      )}
    </div>
  );
}
