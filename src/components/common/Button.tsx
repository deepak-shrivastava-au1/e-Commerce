import clsx from "clsx"

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid'|'outlined',
  color?: 'primary'|'neutral'|'critical',
  children: React.ReactNode,
  size?:'large' | 'medium',
  iconOnly?:boolean
}

const Button = (props: IButtonProps) => {

  const { children, color="primary", variant="solid", size='medium',iconOnly=false, className, ...rest } = props;

  return (
    <button className={clsx(
      'btn',
      {
        [`btn-${color}`]: color,
        [`btn-${color}`]: variant==="solid",
        [`btn-lg`]: size==="large",
        [`icon-btn`]:iconOnly,
        [`btn-outline-${color}`]: variant==="outlined",
        [`${className}`]:className
      })} {...rest}>
      {children}
    </button>
  );
}

export default Button;
