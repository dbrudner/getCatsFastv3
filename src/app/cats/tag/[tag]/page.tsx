import React from 'react';

export default function Page({ params }: { params: { tag: string } }) {
  return <div>Tag page {params.tag}</div>;
}


