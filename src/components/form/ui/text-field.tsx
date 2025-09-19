import { Label } from "@/components/ui/label";
import { useFieldContext } from "../useAppForm";
import { Input } from "@/components/ui/input";

export function TextField({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  // The `Field` infers that it should have a `value` type of `string`
  const field = useFieldContext<string>();
  return (
    <Label htmlFor={name} className="flex flex-col gap-2 items-start">
      <span>{label}</span>
      <Input
        id={name}
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </Label>
  );
}
