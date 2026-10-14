import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { DefaultValues, FieldValues, Resolver, UseFormReturn } from 'react-hook-form';
import type { $ZodType, output } from 'zod/v4/core';

export function useAppForm<TSchema extends $ZodType<FieldValues, FieldValues>>(
  schema: TSchema,
  defaultValues?: DefaultValues<output<TSchema>>,
): UseFormReturn<output<TSchema>> {
  type TFieldValues = output<TSchema>;

  return useForm<TFieldValues>({
    // Zod 4 schema types and @hookform/resolvers generics do not align without a bridge cast.
    resolver: zodResolver(schema as never) as Resolver<TFieldValues>,
    defaultValues,
    mode: 'onBlur',
  });
}
