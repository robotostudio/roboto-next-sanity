import { handleErrors } from '~/lib/helper';
import { getFooterData } from './footer-api';

export default async function FooterComponent() {
  const [result, error] = await handleErrors(getFooterData());
  if (error || !result) return null;
  const { data } = result ?? {};
  return <div>{data?.title}</div>;
}
