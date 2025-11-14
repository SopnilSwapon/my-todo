type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function Button({ loading, children, ...props }: TButtonProps) {
  return (
    <button
      {...props}
      disabled={loading}
      className="w-full rounded-md bg-[#5272FF] cursor-pointer py-2 text-white font-medium text-[16px] 
      hover:bg-blue-700"
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
