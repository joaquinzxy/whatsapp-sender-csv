import React from 'react';
import Papa from 'papaparse';

const headersCsv = ['name', 'company', 'time', 'cost', 'phone'];

export const Setup = ({setMessageDataList}) => {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const processedData = results.data.map((item) => {
            return {
              name: item.name,
              company: item.company,
              time: item.time,
              cost: item.cost,
              phone: item.phone,
            };
          });
          setMessageDataList(processedData);
        },
      });
    }
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="csv">Upload CSV</label>
          <input type="file" className="form-control-file" id="csv" onChange={handleFileUpload} />
        </div>
      </form>
    </div>
  );
};