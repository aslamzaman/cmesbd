import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';
import { dateDifferenceInDays } from '@/lib/utils';




export const GET = async (Request) => {
    try {
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet("Sheet1").name("Worksheet");
        //--------------------------------------------------------
        //Style
        sheet.column("A").width(10).hidden(false);
        sheet.cell('A1').value("SL").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

        sheet.column("B").width(40).hidden(false);
        sheet.cell('B1').value("Participant Name").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

        sheet.column("C").width(25).hidden(false);
        sheet.cell('C1').value("Date Of Birth").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

        sheet.column("D").width(25).hidden(false);
        sheet.cell('D1').value("Mobile No").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

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








export const POST = async (Request) => {
    try {
        const data = await Request.json();
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet("Sheet1").name("Worksheet");
        //---------------------------------------------------------


        sheet.column("A").width(10).hidden(false);
        sheet.column("B").width(30).hidden(false);
        sheet.column("C").width(20).hidden(false);
        sheet.column("D").width(20).hidden(false);
        sheet.column("E").width(10).hidden(false);
        sheet.column("F").width(45).hidden(false);
        sheet.column("G").width(30).hidden(false);
        sheet.cell('A1').value("SL").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
        sheet.cell('B1').value("Name").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
        sheet.cell('C1').value("Date of Birth").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
        sheet.cell('D1').value("Mobile No").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
        sheet.cell('E1').value("Age").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
        sheet.cell('F1').value("Rgistration No.").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
        sheet.cell('G1').value("Learner ID").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

        const age = (dt) => {
            const getAge = dateDifferenceInDays(dt, new Date());
            return Math.round(getAge / 365);
        }


        const participant = data.participants;
        participant.forEach((item, i) => {
            const fourDigit =  `0000000${parseInt(data.sl)+ i}`;
            const reg = `CMES-${data.unit}-${fourDigit.slice(-4)}-${item.name}`;
            const lId = `CMES-${data.unit}-${fourDigit.slice(-4)}`;
           const createMobile = '00000000000000'+item.mobile;
           const finalMobile = createMobile.slice(-11);
            const newDt = new Date(item.dt);

            sheet.cell(`A${i + 2}`).value(item.sl).style({numberFormat: '@', horizontalAlignment: 'center', verticalAlignment: 'center' });
            sheet.cell(`B${i + 2}`).value(item.name).style({numberFormat: '@', horizontalAlignment: 'left', verticalAlignment: 'center' });
            sheet.cell(`C${i + 2}`).value(newDt).style({ numberFormat: 'MM/DD/YYYY', horizontalAlignment: 'center', verticalAlignment: 'center' });
            sheet.cell(`D${i + 2}`).value(finalMobile).style({numberFormat: '@', horizontalAlignment: 'center', verticalAlignment: 'center' });
            sheet.cell(`E${i + 2}`).value(age(item.dt)).style({numberFormat: '#,##0_);(#,##0)', horizontalAlignment: 'center', verticalAlignment: 'center' });
            sheet.cell(`F${i + 2}`).value(reg).style({numberFormat: '@', horizontalAlignment: 'left', verticalAlignment: 'center' });
            sheet.cell(`G${i + 2}`).value(lId).style({numberFormat: '@', horizontalAlignment: 'center', verticalAlignment: 'center' });
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
}
