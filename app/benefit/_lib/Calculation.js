import { lastDayInMonth } from "@/lib/utils";


export const leaveJoin = (dt) => {
    const d = new Date(dt);
    let day = d.getDate();
    const yr = d.getFullYear();
    let mn = d.getMonth();
    const lastDay = lastDayInMonth(yr, mn);
    let workingDay = (lastDay - day) + 1; // working days

    if (parseInt(workingDay) === parseInt(lastDay)) {
        workingDay = 0;
        mn = mn - 1;
    } else {
        workingDay = workingDay;
        mn = mn;
    }

    const total1 = ((11 - mn) * 1.667) + ((workingDay / lastDay) * 1.667);
    const total2 = ((11 - mn) * 1.5) + ((workingDay / lastDay) * 1.5);

    const str = `CL Block: ${yr} || [${(11 - mn)}*1.667 + (${workingDay}/${lastDay})*1.667] =    ${total1.toFixed(2)}
EL Block: ${yr} || [${(11 - mn)}*1.5 + (${workingDay}/${lastDay})*1.5] =            ${total2.toFixed(2)}`
    return str;
}


export const leaveLeave = (dt) => {
    const d = new Date(dt);
    const d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1); // Before one day
    let day = d1.getDate();
    let mn = d1.getMonth();
    const yr = d1.getFullYear();

    const lastDay = lastDayInMonth(yr, mn);

    if (parseInt(day) === parseInt(lastDay)) {
        day = 0;
        mn = mn + 1;
    } else {
        day = day;
        mn = mn;
    }

    const total1 = (mn * 1.667) + ((day / lastDay) * 1.667);
    const total2 = (mn * 1.5) + ((day / lastDay) * 1.5);

    const str = `CL Block: ${yr} || [${mn}*1.667 + (${day}/${lastDay})*1.667] =     ${total1.toFixed(2)}
EL Block: ${yr} || [${mn}*1.5 + (${day}/${lastDay})*1.5] =             ${total2.toFixed(2)}`
    return str;
}


export const elTaka = (salary15, el_days) => {
    const tk = (salary15 / 30)* el_days;
    const el_taka = `EL = ((${salary15} /30)* ${el_days})              = ${tk.toFixed(2)}`;
    return [el_taka,tk];
}
