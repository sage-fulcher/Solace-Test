interface IButtonProps {
  children: React.ReactNode;
  disabled: boolean;
  onClick?: () => void;
}
export const StyledButton = ({ children, disabled, onClick }: IButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick ? () => onClick() : undefined}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded-full disabled:bg-gray-300"
    >
      {children}
    </button>
  );
};
