import { cn } from '@/lib/utils';
import { OptionProps } from './option';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type CheckOptionProps = {
  defaultValue?: boolean;
} & OptionProps;

export const CheckOption = ({
  data,
  label,
  name,
  onValueChange,
}: CheckOptionProps) => {
  const [value, setValue] = useState(data?.[name] ?? false);
  return (
    <div className={cn('flex justify-start items-center gap-2 text-sm')}>
      <Checkbox
        id={name}
        checked={value}
        onCheckedChange={(checked) => setValue(checked)}
        onBlur={() => onValueChange && onValueChange(name, value)}
        className="bg-transparent rounded"
      />
      <Label className="whitespace-nowrap" htmlFor={name}>
        {label}
      </Label>
    </div>
  );
};
