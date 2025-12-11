import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  as?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', as: Component = 'button', ...props }) => {
  const baseStyle = "border-4 border-black px-6 py-2 font-bold transform transition-transform active:translate-y-1 active:translate-x-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 inline-block text-center";
  const variants = {
    primary: "bg-[#FF90E8] text-black",
    secondary: "bg-[#23A094] text-white"
  };

  return (
    <Component
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="w-full border-4 border-black p-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white"
      {...props}
    />
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
