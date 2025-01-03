import './Label.css';

interface LabelProps {
  text: string;
  color?: string;
  backgroundColor?: string;
}

export function Label({ text, color, backgroundColor }: LabelProps) {
  if (backgroundColor == null) {
    backgroundColor = '#b509ac';
  }

  if (color == null) {
    color = '#fff';
  }

  return (
    <span className="label-item" style={{ color, backgroundColor }}>
      {text}
    </span>
  );
}
