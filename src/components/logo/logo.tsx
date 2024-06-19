import classNames from "classnames";

export default function Logo({ children, className = "" }) {
	return <div className={classNames(`text-sky-300 ${className}`)}>{children}</div>;
}

