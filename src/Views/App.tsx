import React, {ReactElement} from 'react';
import {CrosswordsApi} from "../API/Crosswords/CrosswordsApi";
import Board from "../Components/Board/Board";

let App = (): ReactElement => {

    const [currentCrosswords, setCurrentCrosswords] = React.useState(null);
    const [currentDates, setCurrentDates] = React.useState({year: null, month: null, day: null});
    const [error, setError] = React.useState(false);
    const [pending, setPending] = React.useState(false);

    function getCrossWordsPromise() {
        setError(false);
        const {year, month, day} = currentDates
        return CrosswordsApi.getCrossWords(year, month, day);
    }

    React.useEffect(() => {

        setCurrentCrosswords(null);

        if (currentDates.year) {
            setPending(true);
            getCrossWordsPromise().then((response) => {
                setCurrentCrosswords(response);
                setPending(false);
            }).catch(() => {
                setError(true);
                setPending(false);
            });
        }

    }, [currentDates]);

    function getRandomDates() {
        const year: string | number = Math.floor(Math.random() * (2017 - 1976 + 1) + 1976);

        let month: string | number  = (Math.floor(Math.random() * (12) + 1)).toString();
        if (month.length === 1) {
            month = "0" + month;
        }
 
 
        let day: string | number = (Math.floor(Math.random() * (31) + 1)).toString();
        if (day.length === 1) {
            day = `0${day}`;
        }

        setCurrentDates({year, month, day})
    }

    return (
        <div style={{height: '100%', display: "grid", placeContent: "center"}} >
            {error && <div>There was an error :( Please try again</div>}
            {pending ? <div>...loading</div> : (currentCrosswords && <Board currentCrosswords={currentCrosswords}/>)}
            <button style={{margin: "20px"}} onClick={getRandomDates}>Get a random crosswords puzzle!</button>
        </div>
    );
}

export default App;
