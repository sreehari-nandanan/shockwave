import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'cyan' | 'gold' | 'danger' | 'panel' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  chamfer?: boolean;
}

export const TechnicalButton: React.FC<ButtonProps> = ({
  children,
  icon,
  variant = 'cyan',
  size = 'md',
  fullWidth = false,
  chamfer = true,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = "relative font-mono font-bold tracking-wider uppercase inline-flex items-center justify-center transition-all select-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-[11px] space-x-1.5",
    md: "px-5 py-2.5 text-xs space-x-2",
    lg: "px-6 py-3.5 text-sm space-x-2.5"
  }[size];

  const variantClasses = {
    cyan: "bg-[#00F0FF] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:translate-y-0.5",
    gold: "bg-[#FFE600] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,230,0,0.4)] active:translate-y-0.5",
    danger: "bg-[#FF3344] text-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,51,68,0.4)] active:translate-y-0.5",
    panel: "bg-[#0B1118] text-slate-200 border border-[#162232] hover:border-[#00F0FF] hover:text-[#00F0FF] active:translate-y-0.5",
    outline: "bg-transparent text-[#00F0FF] border border-[#00F0FF] hover:bg-[#00F0FF]/15 active:translate-y-0.5"
  }[variant];

  const chamferClass = chamfer ? "clip-chamfer" : "rounded";

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${chamferClass} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <TechnicalButton variant="cyan" {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <TechnicalButton variant="panel" {...props} />
);
