import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';
import { submitedby } from '@/data/participant/submitedby';
import { quarter } from '@/data/participant/quarter';
import { event } from '@/data/participant/event';
import { formatedDate } from '@/lib/utils';
const partner = [
    {
        name: "ADPP - Ajuda de Desenvolvimento de Povo Para Povo (ADPP)",
        id: 2
    },
    {
        name: "Bedari - Bedari",
        id: "10"
    },
    {
        name: "CERADI - Centre for Research and Development Initiative (CERADI)",
        id: "11"
    },
    {
        name: "CMES - Centre for Mass Education in Science (CMES)",
        id: "12"
    },
    {
        name: "CYO - Concerned Youth Organisation (CYO)",
        id: "13"
    },
    {
        name: "SPARC - Society for the Protection and Rights of Children (SPARC)",
        id: "14"
    },
    {
        name: "SSS - Shidhulai Swanirvar Sangstha (SSS)",
        id: "15"
    },
    {
        name: "WDC - Women’s Development Centre (WDC)",
        id: "16"
    }
]




export const POST = async (Request) => {
    try {
        const requestData = await Request.json();
        const data = requestData.participants;
        const formData = requestData.formData;

        console.log({ data, formData });
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet("Sheet1").name("Worksheet");
        //-----------------------------------------
        /*
        const WorksheetOptions0 = workbook.addSheet("WorksheetOptions4");
        anyData.forEach((item, index) => {
            WorksheetOptions0.cell("A1").value("Md Jamal Uddin");
            WorksheetOptions0.cell("B1").value(item.num);
        });

        // Hide the sheet with the dropdown values
        WorksheetOptions0.hidden(true);

        sheet.range("B4:B50").dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions4!$A$1:$A$12491',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range("A1:C1").merged(true);
        sheet.range("A3:C3").style({ fill: 'bfdbf5' });
        sheet.column("A").width(10);
        sheet.column("B").width(30);
        sheet.column("C").width(18);

        //Style
        sheet.cell("C1").formula("SUM(C1:C3)").style({numberFormat: '@', fill: 'bfdbf5', fontSize: 10, border: true, bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });
        // or
        sheet.cell('D1').value("Attendance sheet").style({numberFormat: '@', fill: '5b92e5', horizontalAlignment: 'center', verticalAlignment: 'center' });
*/


        const WorksheetOptions0 = workbook.addSheet("WorksheetOptions0");
        partner.forEach((item, index) => {
            WorksheetOptions0.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions0.cell(`B${index + 1}`).value(`${item.id}`);
        });
        WorksheetOptions0.hidden(true);

        const Submitedby = workbook.addSheet("Submitedby");
        submitedby.forEach((item, index) => {
            Submitedby.cell(`A${index + 1}`).value(`${item.name}`);
            Submitedby.cell(`B${index + 1}`).value(`${item.sl}`);
        });
        Submitedby.hidden(true);


        const Quarter = workbook.addSheet("Quarter");
        quarter.forEach((item, index) => {
            Quarter.cell(`A${index + 1}`).value(`${item.name}`);
            Quarter.cell(`B${index + 1}`).value(`${item.sl}`);
        });
        Quarter.hidden(true);

        const Event = workbook.addSheet("Event");
        event.forEach((item, index) => {
            Event.cell(`A${index + 1}`).value(`${item.name}`);
            Event.cell(`B${index + 1}`).value(`${item.sl}`);
        });

        Event.cell(`A${event.length + 1}`).value(`Labour market relevant lifelihood skills training for women/girls and men/boys ${formatedDate(formData.dt)}`).style({ horizontalAlignment: 'left', verticalAlignment: 'center' });
        Event.cell(`B${event.length + 1}`).value(`${Date.now()}`);
        Event.hidden(true);



        // sheet.range("A1:E1").merged(true);
        sheet.range("A1:E3").style({ fill: 'bfdbf5' });
        sheet.column("A").width(52);
        sheet.column("B").width(20);
        sheet.column("C").width(10);
        sheet.column("D").width(90);
        sheet.column("E").width(42);

        sheet.range(`A4:A${data.length + 4 - 1}`).dataValidation({
            type: 'list',
            formula1: `WorksheetOptions0!$A$1:$A$${partner.length}`,
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`B4:B${data.length + 4 - 1}`).dataValidation({
            type: 'list',
            formula1: `Submitedby!$A$1:$A$${submitedby.length}`,
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });


        sheet.range(`C4:C${data.length + 4 - 1}`).dataValidation({
            type: 'list',
            formula1: `Quarter!$A$1:$A$${quarter.length}`,
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`D4:D${data.length + 4 - 1}`).dataValidation({
            type: 'list',
            formula1: `Event!$A$1:$A$${event.length + 1}`,
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });



        data.forEach((item, i) => {
            sheet.cell(`A${i + 4}`).value("CMES - Centre for Mass Education in Science (CMES)").style({ horizontalAlignment: 'center', verticalAlignment: 'center' });
            sheet.cell(`B${i + 4}`).value(`${formData.staff}`).style({ horizontalAlignment: 'center', verticalAlignment: 'center' });
            sheet.cell(`C${i + 4}`).value(`${formData.quarter}`).style({ horizontalAlignment: 'center', verticalAlignment: 'center' });
            sheet.cell(`D${i + 4}`).value(`Labour market relevant lifelihood skills training for women/girls and men/boys ${formatedDate(formData.dt)}`).style({ horizontalAlignment: 'left', verticalAlignment: 'center' });
            sheet.cell(`E${i + 4}`).value(`${item.name}`).style({ horizontalAlignment: 'left', verticalAlignment: 'center' });
        })

        // Generate the Excel file as a buffer
        const buffer = await workbook.outputAsync();

        // Set headers for file download
        const filename = "output.xlsx"; // Set your desired filename here
        const headers = new Headers();
        headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.set('Content-Disposition', `attachment; filename=${filename}`);

        // Return the buffer directly for download
        return new NextResponse(buffer, {
            status: 200,
            headers: headers
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error generating Excel file", err }, { status: 500 });
    }
};
