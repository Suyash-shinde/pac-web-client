export default function Container({ children, className = '', ...props }) {
  return (
    <div className={`container ${className}`} {...props}>
      {children}
    </div>
  )
}
