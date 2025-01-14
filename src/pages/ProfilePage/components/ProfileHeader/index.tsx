import React from 'react';
import { BackButton } from './BackButton';
import { PageTitle } from './PageTitle';

export function ProfileHeader() {
  return (
    <div className="space-y-4">
      <BackButton />
      <PageTitle />
    </div>
  );
}