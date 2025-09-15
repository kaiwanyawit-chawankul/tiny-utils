// src/pages/[shortCode].js

import { getByShortCode } from '@lib/db';

export async function getServerSideProps(context) {
  const { shortCode } = context.params;

  const record = await getByShortCode(shortCode);

  if (!record) {
    return {
      notFound: true
    };
  }

  return {
    redirect: {
      destination: record.originalUrl,
      permanent: false
    }
  };
}

export default function RedirectPage() {
  return null; // Never rendered because of redirect
}
