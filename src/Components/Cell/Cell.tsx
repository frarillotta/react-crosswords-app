import React, {FC, ReactElement} from 'react';

const cellStyle = {
    background: "#fff",
    border: "1px solid #999",
    height: "50px",
    margin: "-1px",
    padding: "0px",
    width: "50px"
}

const focusedCellStyle = {
    background: "yellow",
    border: "1px solid #999",
    height: "50px",
    margin: "-1px",
    padding: "0px",
    width: "50px",
    outline: "0px"
}

const disabledCellStyle = {
    background: "black",
    border: "1px solid black",
    height: "50px",
    margin: "-1px",
    padding: "0px",
    width: "50px",
    pointerEvents: "none" as "none"
}

const numberStyle = {
    width: "10px",
    height: "10px",
    padding: "2px",
    position: "absolute" as "absolute"
}

const letterStyle = {
    textAlign: "center" as "center",
    lineHeight: "55px",
    marginLeft: "7px",
    fontSize: "45px"
}

type CellProps = {
    number: number,
    letter: string,
    rowIndex: number,
    colIndex: number,
    verifyActive: boolean,
    solution: string,
    handleInput: (event, row, column) => void,
    showSolution: boolean,
    ref: any
}

let Cell: FC<CellProps> = React.forwardRef((props, ref): ReactElement => {
    //make something to show solutions
    const {number, letter, rowIndex, colIndex, handleInput, verifyActive, solution, showSolution} = props
    const [focused, setFocused] = React.useState(false);

    return (
        <div
            // @ts-ignore
            ref={ref}
            onFocus={() => {
                setFocused(true);
            }}
            onBlur={() => setFocused(false)}
            tabIndex={letter === "." ? -1  : 0}
            style={letter === "." ? disabledCellStyle : (focused === true ? focusedCellStyle : verifyActive && letter.length > 0 ? (
                letter.toLowerCase() === solution.toLowerCase() ? {
                    ...cellStyle, background: "#0080009e"
                } : {
                    ...cellStyle, background: "#ff0000a1"
                }) : cellStyle)}
            onKeyDown={(event)=> handleInput(event, rowIndex, colIndex)}
        >
            <div style={numberStyle}>
                {number > 0 && number}
            </div>
            <div style={letterStyle }>
                {showSolution ? solution.toLowerCase() : letter.toLowerCase()}
            </div>
        </div>
    )
});
Cell = React.memo(Cell);

export default Cell
