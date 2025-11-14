interface IHeader1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string; // required prop
}

export function Heading1({ title, className, ...props }: IHeader1Props) {
  return (
    <h1
      className={`font-bold text-2xl md:text-[30px] text-[#0D224A] ${
        className ?? ""
      }`}
      {...props}
    >
      {title}
    </h1>
  );
}
