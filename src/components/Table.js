import React from "react";

export function Table({title, tableRow, tableContent}) {
    return (
        <>
            <div className="container">
                    <h1>{title}</h1>
                    <div className={'table'}>
                        {tableRow}
                        {tableContent}
                    </div>
            </div>
        </>
    )
}