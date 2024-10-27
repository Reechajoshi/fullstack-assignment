import {useEffect, useState} from "react";

const Report = () => {
    const [location, setLocation] = useState("");
    const [year, setYear] = useState("");
    const [allLocations, setAllLocations] = useState([]);

    const [reportResults, setReportResults] = useState<{body: [{name: string, year: string, amount: number}] | null, message: string}>({body: null, message: ""});
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
        setReportResults({body: json.body, message: json.message})
    }

    return (
        <div style={{width: "50%"}}>
            <h4> Check which fruit was most eaten in a particular year in a particular location:</h4>
            <div className="reports">
                <form onSubmit={(e) => {e.preventDefault();fetchReport()}}>
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
                    <h4> {reportResults.message}</h4>
                    {reportResults.body && reportResults.body.length > 0 && reportResults.body.map((result: {name: string, year: string, amount: number}) => {
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