import useInView from '../hooks/useInView.js';

export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 700ms ease-out ' + delay + 'ms, transform 700ms ease-out ' + delay + 'ms',
      }}
    >
      {children}
    </Tag>
  );
}