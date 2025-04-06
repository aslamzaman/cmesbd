import * as XLSX from 'xlsx';


export const jsonDataFromExcelSheet = (file, headerArray) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: headerArray });
        resolve(jsonData.slice(1));
      }
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    })
  }


  export const excelSheetFromJsonData = (data)=>{
    let columnWidthArray = [21, 13.3, 13.9, 5.2, 14.2, 34.77, 13.9];
    let cols = columnWidthArray.map(item => ({ wch: item }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    worksheet["!cols"] = cols; // set column width
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Worksheet');
    XLSX.writeFile(workbook, `${"format"}.xlsx`);
    return `Excel file has been successfully created.`;
  }



  export const excelFormat = ()=>{
    const jsonData = [
        ["Name", "DateOfBirth", "Mobile"],
        ["Amena Khatun", "2/12/2023", "01720025151"],
        ["Momena Khatun", "12/12/2008", "017200251518"],
        ["Jomela Khatun", "2/2/2023", "1720025151"]
      ]

      let columnWidthArray = [40, 30, 25];
      let cols = columnWidthArray.map(item => ({ wch: item }));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(jsonData);

      worksheet["!cols"] = cols; // set column width
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Worksheet');
      XLSX.writeFile(workbook, `${"format"}.xlsx`);
  }



  //----------------------------------------------------------------
  export const excelDateToJSDate = (excelDate)=> {
    const epochDate = new Date(1900, 0, 1);
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    if (excelDate > 60) {
      excelDate--;
    }
    const milliseconds = (excelDate - 1) * oneDay;
    return new Date(epochDate.getTime() + milliseconds);
  }

  