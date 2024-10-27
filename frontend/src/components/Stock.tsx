import {useEffect, useState} from "react";

const Stock = () => {

    const [fruitsQuantities, setFruitsQuantities] = useState<null | {[k: string]: string}>(null); // { Apple: 7 }

    const [selectedFruits, setSelectedFruits] = useState<null | {[k: string]: string}>(null); // { Apple: 7 }
    const [allFruits, setAllFruits] = useState([]);


    const [location, setLocation] = useState("");
    const [allLocations, setAllLocations] = useState([]);

    useEffect(() => {
        requestFruits()
        requestLocations()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestFruits() {
        const res = await fetch(
            `http://localhost:3001/fruits`
        );
        const json = await res.json();
        setAllFruits(json);
    }

    async function requestLocations() {
        const res = await fetch(
            `http://localhost:3001/location`
        );
        const json = await res.json();
        setAllLocations(json);
    }

    async function updateStock() {
        console.log(location, selectedFruits)
        if(!location || !selectedFruits) {
            alert("Please fill all information")
        } else {
            const res = await fetch(
                `http://localhost:3001/purchase`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({location: location, fruits: selectedFruits})
                }
            );
            const json = await res.json();
            if(res.status !== 200) {
                alert(json.error)
            } else {
                alert("added successfully")
            }
        }

    }

    async function updateFruitsQuantity(quantity: string, fruitName: string) {
        setFruitsQuantities({...fruitsQuantities, [fruitName]: quantity})
    }

    async function updateFruits(checked: boolean, fruitName: string) {
        if(fruitsQuantities) {
            if(checked) {
                setSelectedFruits({...selectedFruits, [fruitName]: fruitsQuantities[fruitName]})
            } else {
                if(selectedFruits) {
                    let tempSelectedFruits = {...selectedFruits};
                    delete tempSelectedFruits[fruitName]
                    setSelectedFruits(tempSelectedFruits)
                }
            }
        }
    }

    return (
        <div style={{width: "50%"}}>
            <h4>Update the stock</h4>
            <div className="reports">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    updateStock()
                }}>
                    {allFruits.map((fruit: { id: string, name: string }) => (
                        <div>
                            <input type="checkbox" id={fruit.id} value={fruit.name} onChange={(e) => {
                                updateFruits(e.target.checked, fruit.name);
                            }}/>
                            <label htmlFor={fruit.id}>{fruit.name}</label>

                            <input type="text" id={"quantity" + fruit.id} onChange={(e) => {
                                updateFruitsQuantity(e.target.value, fruit.name);
                            }}/>
                        </div>
                    ))}
                    <label htmlFor="location">
                        Location
                        <select
                            id="location"
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                            onBlur={(e) => {
                                setLocation(e.target.value);
                            }}
                        >
                            <option/>
                            {allLocations.map((location: { id: string, name: string, headcount: string }) => (
                                <option key={location.id} value={location.name}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div style={{width: "150px", overflow: "auto"}}>{JSON.stringify(selectedFruits)}</div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Stock;