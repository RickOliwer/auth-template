import { useFormContext } from "@/components/form/useAppForm";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <Button
      type="submit"
      disabled={form.state.isSubmitting || !form.state.canSubmit}
      className={props.className}
    >
      {props.children}
    </Button>
  );
}
