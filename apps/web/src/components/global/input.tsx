import { FC } from 'react';
import { FormField } from '~/sanity.types';

export const Input: FC<{ field: FormField }> = ({ field }) => {
  const { _type, fieldId, fieldName, inputType, placeholder, required } =
    field ?? {};

  if (!fieldId) return <></>;

  if (inputType === 'text') {
    return (
      <div className="flex w-full flex-col">
        <label
          htmlFor={fieldId}
          className="block text-sm font-semibold leading-6 text-slate-900"
        >
          {fieldName}
          {required && <span className="text-red-600">*</span>}
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            autoComplete="given-name"
            name={fieldId}
            id={fieldId}
            placeholder={placeholder}
            required={!!required}
            className="focus:ring-primary-600 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
  }

  if (inputType === 'email') {
    return (
      <div className="">
        <label
          htmlFor={fieldId}
          className="block text-sm font-semibold leading-6 text-slate-900"
        >
          {fieldName}
          {required && <span className="text-red-600">*</span>}
        </label>
        <div className="mt-2.5">
          <input
            type="email"
            autoComplete="email"
            name={fieldId}
            id={fieldId}
            placeholder={placeholder}
            required={!!required}
            className="focus:ring-primary-600 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
  }

  if (inputType === 'file') {
    return <></>;
  }

  if (inputType === 'phone') {
    return (
      <div className="">
        <label
          htmlFor={fieldId}
          className="block text-sm font-semibold leading-6 text-slate-900"
        >
          {fieldName}
          {required && <span className="text-red-600">*</span>}
        </label>
        <div className="relative mt-2.5">
          <input
            type="tel"
            name={fieldId}
            id={fieldId}
            placeholder={placeholder}
            required={!!required}
            autoComplete="tel"
            className="focus:ring-primary-600 block w-full rounded-md border-0 px-3.5  py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
  }

  if (inputType === 'textArea') {
    return (
      <div className="">
        <label
          htmlFor={fieldId}
          className="block text-sm font-semibold leading-6 text-slate-900"
        >
          {fieldName}
          {required && <span className="text-red-600">*</span>}
        </label>
        <div className="mt-2.5">
          <textarea
            name={fieldId}
            id={fieldId}
            required={!!required}
            placeholder={placeholder}
            rows={4}
            className="focus:ring-primary-600 block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            defaultValue={''}
          />
        </div>
      </div>
    );
  }

  if (inputType === 'checkbox') {
    const { checkboxFields } = field ?? {};

    const { checkboxTitle, items } = checkboxFields ?? {};
    return (
      <fieldset>
        {checkboxTitle && (
          <legend className="text-sm font-semibold leading-6 text-slate-900">
            {checkboxTitle}
          </legend>
        )}
        <div className="">
          {Array.isArray(items) &&
            items.map((checkbox) => {
              const {
                description,
                label,
                value,
                required: checkboxRequired,
              } = checkbox ?? {};
              return (
                <div className="relative flex gap-x-3" key={checkbox._key}>
                  <div className="flex h-6 items-center">
                    <input
                      id={value}
                      name={value}
                      type="checkbox"
                      required={!!checkboxRequired}
                      className="text-primary-600 h-4 w-4 rounded border-gray-300 "
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
              );
            })}
        </div>
      </fieldset>
    );
  }

  return <></>;
};
