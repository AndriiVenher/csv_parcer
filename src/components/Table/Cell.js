import React from 'react';

const Cell = ({isValid = true, value}) => {

        return (
            <td className={isValid ? 'table-row' : 'table-row error'}>{value}</td>
        );
}

export default Cell;