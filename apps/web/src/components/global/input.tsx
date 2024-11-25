import type { FormField } from '~/sanity.types';

interface InputProps {
  field: FormField;
}

// Common styles extracted as constants
const LABEL_CLASSES = 'block text-sm font-semibold leading-6 text-slate-900';
const INPUT_CLASSES =
  'focus:ring-primary-600 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6';

// Reusable label component
function InputLabel({
  fieldId,
  fieldName,
  required,
}: {
  fieldId: string;
  fieldName: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={fieldId} className={LABEL_CLASSES}>
      {fieldName}
      {required && <span className="text-red-600">*</span>}
    </label>
  );
}

// Input wrapper component
function InputWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col">{children}</div>;
}

export function Input({ field }: InputProps) {
  const {
    fieldId,
    fieldName,
    inputType,
    placeholder,
    required,
    checkboxFields,
  } = field ?? {};

  if (!fieldId) return null;

  // Common input props
  const commonInputProps = {
    name: fieldId,
    id: fieldId,
    placeholder,
    required: !!required,
    className: INPUT_CLASSES,
  };

  const renderTextInput = (type: 'text' | 'email' | 'tel') => (
    <InputWrapper>
      <InputLabel
        fieldId={fieldId}
        fieldName={fieldName ?? ''}
        required={required}
      />
      <div className="mt-2.5">
        <input
          {...commonInputProps}
          type={type}
          autoComplete={
            type === 'text' ? 'given-name' : type === 'email' ? 'email' : 'tel'
          }
        />
      </div>
    </InputWrapper>
  );

  switch (inputType) {
    case 'text':
      return renderTextInput('text');

    case 'email':
      return renderTextInput('email');

    case 'phone':
      return renderTextInput('tel');

    case 'textArea':
      return (
        <InputWrapper>
          <InputLabel
            fieldId={fieldId}
            fieldName={fieldName ?? ''}
            required={required}
          />
          <div className="mt-2.5">
            <textarea {...commonInputProps} rows={4} defaultValue="" />
          </div>
        </InputWrapper>
      );

    case 'checkbox': {
      const { checkboxTitle, items } = checkboxFields ?? {};

      if (!Array.isArray(items)) return null;

      return (
        <fieldset>
          {checkboxTitle && (
            <legend className={LABEL_CLASSES}>{checkboxTitle}</legend>
          )}
          <div className="space-y-3">
            {items.map(
              ({
                _key,
                description,
                label,
                value,
                required: checkboxRequired,
              }) => (
                <div className="relative flex gap-x-3" key={_key}>
                  <div className="flex h-6 items-center">
                    <input
                      id={value}
                      name={value}
                      type="checkbox"
                      required={!!checkboxRequired}
                      className="text-primary-600 h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor={value}
                      className="font-medium text-slate-900"
                    >
                      {label}
                      {required && <span className="text-red-600">*</span>}
                    </label>
                    {description && (
                      <p className="text-slate-500">{description}</p>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </fieldset>
      );
    }

    case 'file':
      return null;

    default:
      return null;
  }
}
