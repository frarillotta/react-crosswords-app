import React, {ReactElement} from 'react';
import Cell from "../Cell/Cell";


function createMatrices(grid, gridnums, size) {
    const solutionsMatrix = [];
    const emptyArray = grid.map((val) => {
        return val === "." ? "." : ""
    });
    const currentValMatrix = [];
    const numbersMatrix = [];
    for (let i = 0; i < grid.length; i += size.cols) {
        solutionsMatrix.push(grid.slice(i, i + size.cols));
        numbersMatrix.push(gridnums.slice(i, i + size.cols));
        currentValMatrix.push(emptyArray.slice(i, i + size.cols));
    }
    return [numbersMatrix, solutionsMatrix, currentValMatrix];
}

let Board = ({currentCrosswords}): ReactElement => {
    const {grid, gridnums, size} = currentCrosswords;

    const [gridnumbersMatrix, gridsolutionMatrix, currentValMatrix] = React.useMemo(
        () => createMatrices(grid, gridnums, size)
        , [currentCrosswords]
    );
    const [currentValues, setCurrentValues] = React.useState(currentValMatrix);
    const [across, setAcross] = React.useState(true);
    const [steps, setSteps] = React.useState(0);
    const [showSolution, setShowSolution] = React.useState(false);
    const [verifyActive, setVerifyActive] = React.useState(false);
    const cellRefs = Array(size.rows).fill(null).map(() => new Array(size.cols).fill(null));

    function handleCellInput(event, row, column) {

        if (event.key === "Backspace") {
            const currentValCopy = currentValues;
            currentValues[row][column] = "";
            if(across) {
                moveLeft(row, column);
            } else {
                moveUp(row, column);
            }
            setCurrentValues(currentValCopy);
            setSteps(steps + 1);
        }

        if (event.keyCode >= 65 && event.keyCode <= 90) {
            const currentValCopy = currentValues;
            currentValues[row][column] = event.key.toLowerCase();
            setCurrentValues(currentValCopy);
            if(across) {
                moveRight(row, column);
            } else {
                moveDown(row, column);
            }
            setSteps(steps + 1);
        }

        if (event.keyCode === 38) {
            moveUp(row, column);
        }

        if (event.keyCode === 39) {
            moveRight(row, column);
        }

        if (event.keyCode === 37) {
            moveLeft(row, column);
        }

        if (event.keyCode === 40) {
            moveDown(row, column);
        }

    }

    function moveRight(row, col) {

        let newCol = col,
            newRow = row;
        if (col === cellRefs[row].length - 1) {
            newCol = 0;
            newRow = row === cellRefs.length - 1 ? 0 : row + 1
        } else {
            newCol = col + 1;
        }

        if (cellRefs[newRow][newCol].current.tabIndex < 0) {
            moveRight(newRow, newCol);
            return;
        }

        cellRefs[newRow][newCol].current.focus();

    }

    function moveLeft(row, col) {

        let newCol = col,
            newRow = row;
        if (col === 0) {
            newCol = cellRefs[row].length - 1;
            newRow = row === 0 ? cellRefs.length - 1 : row - 1;
        } else {
            newCol = col - 1;
        }

        if (cellRefs[newRow][newCol].current.tabIndex < 0) {
            moveLeft(newRow, newCol);
            return;
        }

        cellRefs[newRow][newCol].current.focus();

    }

    function moveUp(row, col) {

        let newRow = row,
            newCol = col;
        if (row === 0) {
            newRow = cellRefs.length - 1;
            newCol = col === 0 ? cellRefs[newRow].length - 1 : col-1;
        } else {
            newRow = row - 1;
        }

        if (cellRefs[newRow][newCol].current.tabIndex < 0) {
            moveUp(newRow, newCol);
            return;
        }

        cellRefs[newRow][newCol].current.focus();

    }


    function moveDown(row, col) {

        let newRow = row,
            newCol = col;
        if (row === cellRefs.length - 1) {
            newRow = 0;
            newCol = col === cellRefs[newRow].length - 1 ? 0 : col + 1;
        } else {
            newRow = row + 1;
        }
        if (cellRefs[newRow][newCol].current.tabIndex < 0) {
            moveDown(newRow, newCol);
            return;
        }

        cellRefs[newRow][newCol].current.focus();

    }

    function moveToNextCell(row, col) {
        //change this to move to the next definition
        let newRow = row,
            newCol = col;

        if (across) {
            if (col >= cellRefs[row].length - 1) {
                newRow++;
                newCol = 0
            } else {
                newCol = col + 1
            }
        } else {
            if (row >= cellRefs.length - 1) {
                newCol++;
                newRow = 0
            } else {
                newRow = row + 1
            }
        }

        if (row >= cellRefs.length - 1 && col >= cellRefs[row].length - 1) {
            newRow = 0;
            newCol = 0;
        }

        if (cellRefs[newRow][newCol].current.tabIndex < 0) {
            moveToNextCell(newRow, newCol);
            return;
        }

        cellRefs[newRow][newCol].current.focus();

    }

    function handleClueClick(clue) {
        const clueNumber = parseInt(clue.split('.')[0]);
        let gridRowPos;
        let gridColPos;

        for (let [index, column] of gridnumbersMatrix.entries()) {
            const num = column.findIndex((clueNum) => clueNum === clueNumber);
            if (num > -1) {
                gridColPos = num;
                gridRowPos = index;
                break;
            }
        }
        cellRefs[gridRowPos][gridColPos].current.focus();
    }
    //highlight clue when selecting row

    return (
        <div>
            <div style={{padding: "10px", display: "flex"}}>
                <div style={{padding: "10px"}}>
                    {gridnumbersMatrix.map((rows, rowIndex) => {
                        const row = currentValues[rowIndex];
                        return (<div style={{display: "flex"}} key={rowIndex}>
                            {rows.map((cols, colIndex) => {
                                return <Cell
                                    solution={gridsolutionMatrix[rowIndex][colIndex]}
                                    verifyActive={verifyActive}
                                    number={cols}
                                    letter={row[colIndex]}
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    ref={cellRefs[rowIndex][colIndex] = React.createRef()}
                                    key={`${rowIndex}/${colIndex}`}
                                    showSolution={showSolution}
                                    handleInput={handleCellInput}
                                />
                            })}
                        </div>)
                    })
                    }
                </div>
                <div>
                    <button style={{height: "35px", padding: "10px", margin: "10px"}} onClick={() => {
                        setAcross(!across)
                    }}>Change to {across ? "down" : "across" }</button>
                    <div style={{padding: "10px", overflow: "scroll", height: "700px"}}>
                        {across ? currentCrosswords.clues.across.map((clue) => {
                            return <div style={{marginTop: "10px"}} key={clue} onClick={()=>{handleClueClick(clue)}}>{clue}</div>
                        }) : currentCrosswords.clues.down.map((clue) => {
                            return <div style={{marginTop: "10px"}} key={clue} onClick={()=>{handleClueClick(clue)}}>{clue}</div>
                        })}
                    </div>
                </div>
            </div>
            <div style={{marginLeft: "20px"}}>
                <div>
                    Author: {currentCrosswords.author}
                </div>
                <div>
                    Published in {currentCrosswords.date} on {currentCrosswords.publisher}
                </div>
                <button style={{margin: "5px"}} onClick={()=>setVerifyActive(!verifyActive)}>
                    Toggle verify
                </button>
                <button style={{margin: "5px"}} onClick={()=>{setShowSolution(!showSolution); setVerifyActive(!verifyActive)}}>
                    Toggle solutions
                </button>
            </div>
        </div>
    )

}
Board = React.memo(Board);

export default Board
