import React from 'react';

import Thead from './Thead';
import Cell from "./Cell";
import {formatters} from "../../Validator/formatters";


const Table = ({ info }) => {
  if (info.length === 0) {
    return <p>No file</p>;
  }

  const memory = {
    phones: {},
    emails: {},
  };
  const tableData = info.map((item, index) => {
    const id = index + 1;
    const duplicateIds = [];

    const phoneProps = formatters.phone(item);
    const emailProps = formatters.email(item);

    if (memory.emails[emailProps.match]) {
      duplicateIds.push(memory.emails[emailProps.match]);
    } else {
      memory.emails[emailProps.match] = id;
    }

    if (memory.phones[phoneProps.value]) {
      duplicateIds.push(memory.phones[phoneProps.value]);
    } else {
      memory.phones[phoneProps.value] = id;
    }


    return (
      <tr key={id}>
        <Cell value={id} />
        <Cell {...formatters.fullname(item)} />
        <Cell {...phoneProps} />
        <Cell {...emailProps} />
        <Cell {...formatters.age(item)} />
        <Cell {...formatters.experience(item)} />
        <Cell {...formatters.yearlyincome(item)} />
        <Cell {...formatters.haschildren(item)} />
        <Cell {...formatters.licensestates(item)} />
        <Cell {...formatters.expirationdate(item)} />
        <Cell {...formatters.licencenumber(item)} />
        <Cell value={duplicateIds.join(', ')} />
      </tr>
    );
  });

  return (
    <>
      <table>
        <Thead />
        <tbody>
        {tableData}
        </tbody>
      </table>
    </>
  );
};



export default Table;
