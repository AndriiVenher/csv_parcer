import React, { useState } from 'react';
import { parse } from 'papaparse';
import Table from './Table/Table';

const AddFile = () => {
  const [info, setInfo] = useState({ data: [], isValid: true });

  const handleChange = (e) => {
    Array.from(e.target.files).forEach(async (file) => {
      try {
        const data = await file.text();
        const result = parse(data, {
          header: true,
          skipEmptyLines: true,
          transform: (value) => value.trim(),
          transformHeader: (header) =>
            header
              .split(' ')
              .map((str) => str.trim().toLowerCase())
              .join(''),
        });

        setInfo({
          data: [...result.data],
          isValid: result.data.every(
            (item) => !!item.fullname && !!item.email && !!item.phone
          ),
        });
      } catch (error) {
        console.error('Error parsing csv data', { error });

        setInfo({
          data: [],
          isValid: false,
        });
      }
    });
  };

  console.log(info)

  return (
    <div>
      <label htmlFor="upload-file">
        UploadFile
        <input
          type="file"
          name="upload-file"
          accept=".csv"
          placeholder="Upload File"
          onChange={handleChange}
        />
      </label>
      {info.isValid ? <Table info={info.data} /> : <p>Invalid csv file uploaded</p>}
    </div>
  );
};

export default AddFile;
