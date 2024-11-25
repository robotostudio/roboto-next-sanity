'use client';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { formBuilderResponseHandler } from '~/actions/formspark';
import type { Form, FormField as IFormField } from '~/sanity.types';
import { Input } from '../global/input';
import { Button, type ButtonProps } from '../ui/button';

// Constants
const INITIAL_FORM_STATE = {
  message: '',
  hasError: false,
  isComplete: false,
} as const;

// Types
// type FormState = typeof INITIAL_FORM_STATE;
type FormFieldProps = { field: IFormField };
type FormWrapperProps = { field: NonNullable<Form['fields']>[number] };
type FormBuilderProps = Form & { buttonText?: string };
type PlainFormBuilderProps = FormBuilderProps & { onSubmit?: () => void };

// Components
function FormSubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={pending || props.disabled}>
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" />
          Submitting
        </span>
      ) : (
        children
      )}
    </Button>
  );
}

function FormField({ field }: FormFieldProps) {
  return <Input field={field} />;
}

function FormFieldWrapper({ field }: FormWrapperProps) {
  return <FormField field={field as IFormField} />;
}

function FormSuccessMessage() {
  return (
    <div className="flex w-full max-w-7xl" id="form">
      <div className="my-10 flex w-full items-center justify-center gap-4 rounded-lg bg-gray-200 p-4 text-black">
        <CheckCircle />
        Form Submitted
      </div>
    </div>
  );
}

function PolicyCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="mt-4 flex gap-x-3">
      <div className="flex h-6 items-center">
        <input
          id="policy"
          name="policy"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="text-hotpink-500 focus:ring-hotpink-500 h-4 w-4 rounded border-gray-300"
        />
      </div>
      <label className="flex text-sm leading-6" htmlFor="policy">
        <div className="inline-block text-sm">
          <span className="block font-bold">
            I agree to receive other communications.
            <span className="ml-1 inline-block text-red-600">*</span>
          </span>
          <span>
            You can unsubscribe from these communications at any time. For more
            information on how to unsubscribe, our privacy practices, and how we
            are committed to protecting and respecting your privacy
          </span>
        </div>
      </label>
    </div>
  );
}

function FormFields({ fields }: { fields: Form['fields'] }) {
  if (!Array.isArray(fields)) return null;

  return (
    <>
      {fields.map((field) => (
        <FormFieldWrapper field={field} key={field?._key} />
      ))}
    </>
  );
}

export function FormBuilderBlock({
  fields,
  title,
  formId,
  buttonText = 'Submit',
}: FormBuilderProps) {
  const [tcCheck, setTcCheck] = useState(false);
  const _action = formBuilderResponseHandler.bind(null, formId ?? '');
  const [state, action] = useActionState(_action, INITIAL_FORM_STATE);

  if (!state.hasError && state.isComplete) {
    return <FormSuccessMessage />;
  }

  return (
    <div
      className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32"
      id="form"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
      </div>

      <form
        action={action}
        className="mx-auto flex w-full max-w-xl flex-col gap-4"
      >
        <FormFields fields={fields} />
        <PolicyCheckbox
          checked={tcCheck}
          onChange={() => setTcCheck(!tcCheck)}
        />
        <FormSubmitButton disabled={!tcCheck}>{buttonText}</FormSubmitButton>
      </form>
    </div>
  );
}

export function PlainFormBuilder({
  fields,
  formId,
  onSubmit,
  buttonText = 'Submit',
}: PlainFormBuilderProps) {
  const [tcCheck, setTcCheck] = useState(false);
  const _action = formBuilderResponseHandler.bind(null, formId ?? '');
  const [state, action] = useFormState(_action, INITIAL_FORM_STATE);

  useEffect(() => {
    if (!state.isComplete) return;

    const timer = setTimeout(() => {
      onSubmit?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.isComplete, onSubmit]);

  if (!state.hasError && state.isComplete) {
    return <FormSuccessMessage />;
  }

  return (
    <form
      action={action}
      className="mx-auto flex w-full max-w-xl flex-col gap-4"
    >
      <FormFields fields={fields} />
      <PolicyCheckbox checked={tcCheck} onChange={() => setTcCheck(!tcCheck)} />
      <FormSubmitButton disabled={!tcCheck}>{buttonText}</FormSubmitButton>
    </form>
  );
}
