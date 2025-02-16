export const landAreaConverter = {
    sft(area, opt) {
        let sft = 0;
        switch (opt) {
            case "sf":
                sft = (parseFloat(area) * 1);
                break;
            case "sm":
                sft = (parseFloat(area) * 10.7639);
                break;
            case "sc":
                sft = (parseFloat(area) * 4356);
                break;
            case "ojutangsho":
                sft = (parseFloat(area) * 4.356);
                break;
            case "shotok":
                sft = (parseFloat(area) * 435.6);
                break;
            case "katha":
                sft = (parseFloat(area) * 720);
                break;
            case "bigha":
                sft = (parseFloat(area) * 14400);
                break;
            case "kani":
                sft = (parseFloat(area) * 17280);
                break;
            case "acre":
                sft = (parseFloat(area) * 43560);
                break;
            case "hectare":
                sft = (parseFloat(area) * 107639);
                break;
            case "gonda":
                sft = (parseFloat(area) * 864);
                break;
            case "kora":
                sft = (parseFloat(area) * 653.4);
                break;
            case "kranti":
                sft = (parseFloat(area) * 72);
                break;
            case "til":
                sft = (parseFloat(area) * 3.6);
                break;
            case "slink":
                sft = (parseFloat(area) * 0.4356);
                break;
            default:
                sft = 0;
        }
        return sft;
    },
    result(area, opt) {
        let x = this.sft(area, opt);
        let obj = {
            sft: x.toFixed(3),
            sm: (x / 10.7639).toFixed(3),
            sc: (x / 4356).toFixed(3),
            ojutangsho: (x / 4.356).toFixed(3),
            shotok: (x / 435.6).toFixed(3),
            katha: (x / 720).toFixed(3),
            bigha: (x / 14400).toFixed(3),
            kani: (x / 17280).toFixed(3),
            acre: (x / 43560).toFixed(3),
            hectare: (x / 107639).toFixed(3),
            gonda: (x / 864).toFixed(3),
            kora: (x / 653.4).toFixed(3),
            kranti: (x / 72).toFixed(3),
            til: (x / 3.6).toFixed(3),
            link: (x / 0.4356).toFixed(3)
        }
        return obj
    }
}