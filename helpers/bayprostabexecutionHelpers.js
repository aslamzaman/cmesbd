import { evaluate } from 'mathjs';
import { getDataFromIndexedDB } from '@/lib/DatabaseIndexedDB';
import { formatedDateDot, inwordBangla, numberWithComma, sortArray } from "@/lib/utils";
import { localStorageAddItem, localStorageGetItem } from '@/lib/DatabaseLocalStorage';


export const getIndexedDbData = async () => {
    try {
        const [staffs, projects] = await Promise.all([
            getDataFromIndexedDB('staff'),
            getDataFromIndexedDB('project')
        ]);
        const staffData = staffs.sort((a, b) => sortArray(a.nameEn.toUpperCase(), b.nameEn.toUpperCase()));
        //-----------------------------------------------------------
        const withoutGO = projects.filter(project => project.name !== "GO")
        const projectWithGO = [{ id: 1733394915043, name: "GO" }, ...withoutGO];

        return { staffData, projectWithGO };
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}



export const getLocalData = () => {
    try {
        const locaData = localStorageGetItem('bayprostabexecution');
        const data = locaData.map(bayprostabExec => {
            const subtotal = parseFloat(bayprostabExec.nos) * evaluate(`0+${bayprostabExec.taka}`);
            return {
                ...bayprostabExec, subtotal,
                evalTaka: evaluate(`0+${bayprostabExec.taka}`)
            }
        })
        const gt = data.reduce((t, c) => t + parseFloat(c.subtotal), 0);
        return { data, gt };
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}




export const addVatTax = (data = [], serial = [], vt = 0) => {
    try {
        const filtersData = data.filter((item, i) => serial.some((index) => parseInt(index) === i));
        const tk = filtersData.reduce((t, c) => t + parseFloat(c.subtotal), 0);
        const vatTaxPercent = Math.round(tk * (vt / 100));

        const newObject = {
            id: Date.now(),
            item: `f¨vU Ges U¨v· (${vt}%)`,
            nos: 1,
            taka: vatTaxPercent
        }

        const msg = localStorageAddItem('bayprostabexecution', newObject);
        return msg;
    } catch (error) {
        console.error(error);
    }
}



export const addBkash = (data = [], serial = [], bk = 0, sendCharge = 0) => {
    try {
        const filtersData = data.filter((item, i) => serial.some((index) => parseInt(index) === i));
        const tk = filtersData.reduce((t, c) => t + parseFloat(c.subtotal), 0);
        const bkashCharge = Math.round(tk * (bk / 1000));
        const totalSendCharge = filtersData.length * sendCharge;

        const slStr = serial.map(item => (parseInt(item) + 1)).join(",");
        const newObject = {
            id: Date.now(),
            item: `PvR©: (weKvk= ${bk}, †mÛ= ${sendCharge})`,
            nos: 1,
            taka: (bkashCharge + totalSendCharge)
        }

        const msg = localStorageAddItem('bayprostabexecution', newObject);
        return msg;
    } catch (error) {
        console.error(error);
    }
}





export const printHeaderFooter = ({ doc }, data) => {
    doc.addImage("/images/formats/bayprostab2.png", "PNG", 0, 0, 210, 297);
    doc.setFontSize(14);
    doc.setFont("times", "normal");
    doc.text(`${data.project}`, 168.438, 26, null, null, "left");
    doc.setFont("SutonnyMJ", "normal");
    doc.text(`${data.staff} `, 38, 37, null, null, "left");
    doc.text(`${data.dt1 ? formatedDateDot(data.dt1, true) : ""}`, 150, 45, null, null, "left");
    doc.text(`${numberWithComma(data.advance, false)}/-`, 65, 45, null, null, "right");
    doc.text(`${numberWithComma(data.total, false)}/-`, 65, 53, null, null, "right");
    doc.text(`${numberWithComma((data.advance - parseInt(data.total)), false)}/-`, 65, 61, null, null, "right");

    //---------------------------------------------------
    doc.text(`${data.note ? data.note : ""}`, 174.347, 100, { maxWidth: 45, align: 'center' });
    doc.text(`${numberWithComma(data.total, false)}/-`, 132, 235, null, null, "right");
    doc.text(`${inwordBangla(parseFloat(data.total))} UvKv gvÎ`, 45, 241.5, null, null, "left");
    doc.text(`${formatedDateDot(data.dt2, true)}`, 60, 247.5, null, null, "left");
};


export const table = ({ doc }, db) => {
    let y = 100;
    for (let i = 0; i < db.length; i++) {

        const no = parseFloat(db[i].nos);
        const tk = parseFloat(db[i].evalTaka);
        const line = doc.splitTextToSize(`${db[i].item}`, 50);

        doc.text("-", 15, y, null, null, 'right');
        doc.text(line, 17, y, { maxWidth: 50, align: 'left' });
        if (no > 1) {
            doc.text(`${tk.toFixed(2)}`, 90, y, null, null, "right");
            doc.text(`${no.toFixed(2)}`, 101.408, y, null, null, "center");
        } else {
            doc.text("-", 81, y, null, null, "center");
            doc.text("-", 101.408, y, null, null, "center");
        }
        doc.text(`${numberWithComma(db[i].subtotal)}/-`, 132, y, null, null, "right");
        const lineNumber = line.length;
        y += lineNumber * 6;

    }
};




