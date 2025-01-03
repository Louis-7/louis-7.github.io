import './Card.css';

interface CardProps {
  title: string;
  text: string;
  iconName?: string;
}

export function Card({ title, text }: CardProps) {
  return (
    <div className="card-container">
      <div className="card-body">
        <div className="title">{title}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
}
