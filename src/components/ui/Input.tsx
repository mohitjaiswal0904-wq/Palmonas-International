import { cn } from "@/lib/cn";

export function Input({
  label,
  id,
  className,
  ...props
}: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="eyebrow">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full border-0 border-b border-line-strong bg-transparent py-2.5 font-sans text-[0.95rem] text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
