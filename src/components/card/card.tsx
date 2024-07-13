import './card.css';

interface CardProps {
  children: React.ReactNode;
  onCallbackClick?: () => void;
}

export function Card({ onCallbackClick, children }: CardProps) {
  return (
    <div className='card' onClick={onCallbackClick}>
      {children}
    </div>
  );
}
