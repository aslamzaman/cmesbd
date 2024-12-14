import { evaluate } from "mathjs";
import { formatedDateDot, inwordBangla, numberWithComma } from "./utils";


export const BayprostabPreparation = {
  central: ({ doc, data }) => {
    doc.addImage("/images/formats/bayprostab1.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);
    doc.text(`${data.name}`, 50, 40.5, null, null, "left");

    doc.text(`${formatedDateDot(data.dt, true)}`, 146, 33.65, null, null, "left");
    doc.text(`${data.subject}`, 25, 53.5, null, null, "left");
    doc.text(data.note, 174.347, 100, { maxWidth: 45, align: 'center' });
    doc.text(`${numberWithComma(data.total)}/-`, 122.844, 218, null, null, "center");
    let inwordTak = inwordBangla(parseInt(data.total));
    doc.text(`${inwordTak} UvKv gvÎ`, 60, 226.144, null, null, "left");

    doc.setFont("times", "normal");
    doc.text(`${data.payType === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
    doc.text(` ${data.project}`, 168, 26, null, null, "left");
    doc.text(` ${data.budgetHead}`, 22, 47, null, null, "left");

  },
  completePlan: ({ doc, data }) => {
    doc.addImage("/images/formats/bayprostab3.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);

    doc.text(`${data.name}`, 42, 35.173, null, null, "left");
    doc.text(`${formatedDateDot(data.dt, true)}`, 175, 35.173, null, null, "left");
    doc.text(`${data.subject}`, 27, 53.246, null, null, "left");
    doc.text(`${formatedDateDot(data.dateStart, true)}`, 47, 59.2, null, null, "left");
    doc.text(`${formatedDateDot(data.dateEnd, true)}`, 145, 59.2, null, null, "center");
    doc.text(`${numberWithComma(data.total)}/-`, 122.844, 226.803, null, null, "center");
    let inwordTak = inwordBangla(parseInt(data.total));
    doc.text(`${inwordTak} UvKv gvÎ`, 38, 239.429, null, null, "left");
    doc.text(data.note, 167, 107, { maxWidth: 60, align: 'center' });


    doc.setFont("times", "normal");
    doc.text(`${data.payType === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
    doc.text(`${data.project}`, 168, 26, null, null, "left");
    doc.text(` ${data.budgetHead}`, 23, 47, null, null, "left");
  },
  go: ({ doc, data }) => {
    doc.addImage("/images/formats/goformat.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);

    doc.text(`${data.subject}`, 24, 56, null, null, 'left');
    doc.text(`${formatedDateDot(data.dt, true)}`, 101, 42.5, null, null, "left");
    doc.text(`${data.dpt}`, 181, 76, null, null, "center");
    doc.text(data.note, 180, 92, { maxWidth: 39, align: 'center' });


    let inwordTak = inwordBangla(parseInt(data.total));
    doc.text(`†gvU: ${inwordTak} UvKv gvÎ`, 13.5, 226, null, null, "left");
    doc.text(`${numberWithComma(data.total)}/-`, 128.5, 219, null, null, "right");

    doc.setFont("times", "normal");
    doc.text(`${data.payType === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
    doc.text(` ${data.budgetHead}`, 146, 76, { maxWidth: 26, align: "center" });

  },
  bearer: ({ doc, data }) => {
    doc.addImage("/images/formats/bearer.png", "PNG", 0, 0, 210, 297);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);

    doc.text(`(${data.subject})`, 20, 105.2, null, null, 'left');
    doc.text(`${formatedDateDot(data.dt, true)}`, 165, 49.5, null, null, "left");
    let inwordTak = inwordBangla(parseInt(data.total));
    doc.text(`${inwordTak} UvKv gvÎ`, 38, 255.2, null, null, "left");
    doc.text(`${numberWithComma(data.total)}/-`, 120, 247.5, null, null, "center");
    doc.text(data.note, 162, 140, { maxWidth: 54, align: 'center' });


    doc.setFont("times", "normal");
    doc.text(`${data.payType === 'ft' ? 'Fund Transfer' : ''}`, 165, 13, null, null, 'left');
    doc.text(`${data.project}`, 103, 41.5, null, null, "left");
    doc.text(` ${data.budgetHead}`, 162.4, 119, { maxWidth: 54, align: "center" });
  },
  tableOne: ({ doc }, db, y) => {
    // doc.addFont("fonts/TiroBangla-Regular.ttf", "Tiro Bangla", "normal");
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);
    for (let i = 0; i < db.length; i++) {
      const no = parseFloat(db[i].nos);
      const tk = parseFloat(db[i].evalTaka);
      const line = doc.splitTextToSize(`${db[i].item}`, 55);
      doc.text(line, 14.3, y, { maxWidth: 55, align: 'left' });
      doc.text(`${numberWithComma(db[i].subtotal, false)}/-`, 131.5, y, null, null, 'right');

      if (no > 1) {
        doc.text(`${numberWithComma(tk, false)}/-`, 90.5, y, null, null, 'right');
        doc.text(`${no}`, 102, y, null, null, 'center');
      } else {
        doc.text("-", 80.7, y, null, null, 'center');
        doc.text("-", 101.8, y, null, null, 'center');
      }

      const lineNumber = line.length;
      y += lineNumber * 6;
    }
  },
  tableTwo: ({ doc }, db, y) => {
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);
    for (let i = 0; i < db.length; i++) {
      doc.text(`${i + 1}.`, 19, y, null, null, 'center');
      const line = doc.splitTextToSize(`${db[i].item}`, 74);
      doc.text(line, 31, y, { maxWidth: 74, align: 'left' });
      doc.text(`${numberWithComma(db[i].subtotal, false)}/-`, 131, y, null, null, 'right');
      const lineNumber = line.length;
      y += lineNumber * 6;
    }
  },
  payment: ({ doc }, data, opt) => {
    let y = 172;
    if (opt === 'ace') {
      doc.setFont("times", "normal");
      doc.text(`"${data.cheque}"`, 174.7, y, { maxWidth: 49, align: 'center' });
    } else if (opt === 'acb') {
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`"${data.cheque}"`, 174.7, y, { maxWidth: 49, align: 'center' });
    } else if (opt === 'br') {
      doc.setFont("SutonnyMJ", "normal");
      doc.text(`"µq m¤úv\`‡Ki"`, 174.7, y, { maxWidth: 49, align: 'center' });
    } else {
      doc.text("", 174.7, y, { maxWidth: 49, align: 'center' });
    }

    const line = doc.splitTextToSize(`"${data.cheque}"`, 49);
    const lineNumber = line.length;
    y += (lineNumber * 6);

    doc.setFont("SutonnyMJ", "normal");
    if (opt === 'ace' || opt === 'acb') {
      doc.text("bv‡g GKvD›U †c' †PK n‡e", 174.7, y, null, null, 'center');
    } else if (opt === 'br') {
      doc.text("bv‡g †eqvivi †PK n‡e", 174.7, y, null, null, 'center');
    } else {
      doc.text("", 174.7, y, null, null, 'center');
    }
  }

}