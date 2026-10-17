'use client';

import { Command } from 'lucide-react';
import type { FormEvent } from 'react';

import { DsBox } from '../Box';
import { DsInput, DsInputGroup } from '../Input/DsInput';
import { DsInputIconSlot } from '../Input/DsInputIconSlot';
import { DsTypography } from '../Typography';

type DsAppLayoutSearchBarProps = {
  onSubmit?: (query: string) => void;
  placeholder?: string;
  shortcutLabel?: string;
};

function DefaultSearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-[var(--color-text-muted)]"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export const DsAppLayoutSearchBar = ({
  onSubmit,
  placeholder = 'Search...',
  shortcutLabel = 'K',
}: DsAppLayoutSearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit?.(String(formData.get('search') ?? ''));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <DsBox className="w-full">
        <DsInputGroup className="has-[[data-slot=icon]:first-child]:[&_input]:!pl-14">
          <DsInputIconSlot>
            <DefaultSearchIcon />
          </DsInputIconSlot>

          <DsInput
            name="search"
            type="search"
            size="sm"
            placeholder={placeholder}
            aria-label="Search"
          />

          <DsInputIconSlot className="mr-2">
            <DsBox className="flex items-center">
              <Command size={16} />
              <DsTypography variant="h5" color="textMuted" className="font-medium">
                {shortcutLabel}
              </DsTypography>
            </DsBox>
          </DsInputIconSlot>
        </DsInputGroup>
      </DsBox>
    </form>
  );
};
