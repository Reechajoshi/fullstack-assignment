import {useEffect, useState} from "react";

const Report = () => {
    const [location, setLocation] = useState("");
    const [year, setYear] = useState("");
    const [allLocations, setAllLocations] = useState([]);

    const [reportResults, setReportResults] = useState([]);
    useEffect(() => {
        requestLocations()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestLocations() {
        const res = await fetch(
            `http://localhost:3001/location`
        );
        const json = await res.json();
        setAllLocations(json);
    }

    async function fetchReport() {
        const res = await fetch(
            `http://localhost:3001/consumption/${location}/${year}`
        );
        const json = await res.json();
        setReportResults(json)
    }

    return (
        <div style={{width: "50%"}}>
            <h4> Check which fruit was most eaten in a particular year in a particular location:</h4>
            <div className="reports">
                <form onSubmit={(e) => {e.preventDefault();fetchReport()}}>
                    <label htmlFor="location">
                        Location
                        <select
                            id="animal"
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                            onBlur={(e) => {
                                setLocation(e.target.value);
                            }}
                        >
                            <option/>
                            {allLocations.map((location: {id: string, name: string, headcount: string}) => (
                                <option key={location.id} value={location.name}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <input
                        id="year"
                        value={year}
                        placeholder="Year"
                        onChange={(e) => setYear(e.target.value)} />

                    <button>Submit</button>
                </form>

                <div>
                    <h4>Results:</h4>
                    {reportResults.length === 0 && (<h4> No reports to show...</h4>)}
                    {reportResults.length > 0 && reportResults.map((result: {name: string, year: string, amount: number}) => {
                        return (<>
                            <h5>Name: {result.name} , Year: {result.year},Amount consumed: {Math.abs(result.amount)} </h5>
                        </>)
                    })}
                </div>
            </div>
        </div>
    );
};

export default Report;