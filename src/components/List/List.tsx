import './List.css';

export function List({ items }: { items: string[] }) {
    return (
        <ul className="color-list">
            {items.map((item, index) => (
                <li key={index} className="list-item">
                    {item}
                </li>
            ))}
        </ul>
    );
}