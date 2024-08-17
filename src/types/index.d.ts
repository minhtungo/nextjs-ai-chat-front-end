export type IconProps = {
  color?: string;
  size?: string | number;
} & React.SVGAttributes<SVGElement>;

declare module "convex-hull";

interface MultiStepFormProps<T extends z.ZodType> {
  schema: T;
  form: UseFormReturn<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  useStepTransition?: boolean;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

type StepProps = React.PropsWithChildren<
  {
    name: string;
    asChild?: boolean;
  } & React.HTMLProps<HTMLDivElement>
>;
