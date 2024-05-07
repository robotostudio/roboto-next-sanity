'use server';

import axios, { AxiosError } from 'axios';
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
    await axios.post(`https://submit-form.com/${formId}`, {
      ...extractData,
      type: 'formBuilderResponse',
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log('🚀 ~ err:', err?.message);
      return {
        message: JSON.stringify(err.response?.data) ?? 'Something went wrong',
        hasError: true,
        isComplete: false,
      };
    }
    return {
      message: 'Something Went Wrong',
      hasError: true,
      isComplete: false,
    };
  }

  return { message: 'done', hasError: false, isComplete: true };
}
