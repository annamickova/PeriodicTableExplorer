import React from "react";

interface Element {
    symbol: string;
    name: string;
    number: number;
    atomic_mass: number;
    summary: string;
    category: string;
    phase: string;
    source: string;
}

interface Props {
    element: Element;
    onClose: () => void;
}

const ElementDetail: React.FC<Props> = ({ element, onClose }) => {
    return (
        <div className="detail-overlay">
            <div className="detail-card">
                <button className="close-button" onClick={onClose}>✕</button>
                <h2 className="element-title">{element.name} ({element.symbol})</h2>
                <p><strong>Atomic Number:</strong> {element.number}</p>
                <p><strong>Atomic Mass:</strong> {element.atomic_mass}</p>
                <p><strong>Category:</strong> {element.category}</p>
                <p><strong>Phase:</strong> {element.phase}</p>
                <p><strong>Summary:</strong> {element.summary}</p>
                <p><a href={element.source} target="_blank" rel="noopener noreferrer">More Info</a></p>
            </div>
        </div>
    );
};

export default ElementDetail;
