'use server';

import { extractFormData } from '~/lib/helper';

export async function formBuilderResponseHandler<T>(
  formId: string,
  state: T,
  form: FormData,
) {
  if (!formId) {
    return {
      message: 'Form field missing',
      hasError: true,
      isComplete: false,
    };
  }

  const extractData = extractFormData(form);
  try {
    await fetch(`https://submit-form.com/${formId}`, {
      method: 'POST',
      body: JSON.stringify({
        ...extractData,
        type: 'formBuilderResponse',
      }),
    });
  } catch (err) {
    return {
      message: err instanceof Error ? err.message : 'Something Went Wrong',
      hasError: true,
      isComplete: false,
    };
  }

  return { message: 'done', hasError: false, isComplete: true };
}
