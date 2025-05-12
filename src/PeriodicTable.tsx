import React, {useState, useEffect} from "react";
import ElementDetail from "./ElementDetail";

interface Element {
    symbol: string;
    name: string;
    number: number;
    xpos: number;
    ypos: number;
    atomic_mass: number;
    summary: string;
    category: string;
    phase: string;
    source: string;
}

const PeriodicTable: React.FC = () => {
    const [elements, setElements] = useState<Element[]>([]);
    const [selectedElement, setSelectedElement] = useState<Element | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("/elements.json")
            .then((res) => res.json())
            .then((data) => setElements(data.elements));
    }, []);

    return (
        <div className="container">
            <h1 className="title">Periodic Table Explorer</h1>
            <input
                type="text"
                placeholder="Find element"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <div className="table-grid">
                {Array.from({ length: 10 * 18 }, (_, index) => {
                    const x = (index % 18) + 1;
                    const y = Math.floor(index / 18) + 1;
                    const element = elements.find(el => el.xpos === x && el.ypos === y);
                    const isMatch =
                        searchQuery.length > 0 &&
                        element &&
                        (element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            element.symbol.toLowerCase().includes(searchQuery.toLowerCase()))

                    return (
                        <button
                            key={index}
                            className={`cell ${element ? 'filled' : 'empty'} ${isMatch ? 'highlight' : ''}`}
                            style={{ gridColumn: x, gridRow: y }}
                            onClick={() => element && setSelectedElement(element)}>
                            {element ? element.symbol : ""}
                        </button>

                    );
                })}

            </div>

            {selectedElement && (
                <ElementDetail element={selectedElement} onClose={() => setSelectedElement(null)} />
            )}
        </div>
    );
};


export default PeriodicTable;
