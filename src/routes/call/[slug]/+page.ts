import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    username: params.slug
  };
};
