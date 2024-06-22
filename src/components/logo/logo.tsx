import classNames from "classnames";

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function Logo({ children, className = "" }: Props) {
  return (
    <div className={classNames(`text-sky-300 ${className}`)}>{children}</div>
  );
}
