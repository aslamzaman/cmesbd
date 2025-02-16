export const conv_sft = (s1, s2, d, opt) => {
  var sft = 0;
  if (opt == "0") {
    sft = (parseFloat(s1) + parseFloat(s2)) * 435.6;
  }
  if (opt == "1") {
    sft = (parseFloat(s1) + parseFloat(s2)) * 720;
  }
  if (opt == "2") {
    sft = (parseFloat(s1) + parseFloat(s2));
  }
  return sft;
}


export const get_mgc = (s1, s2, d, opt) => {
  let mgc = 0;
  let far = 0;
  let mgc_ratio = 0;

  var total_sft = conv_sft(s1, s2, d, opt);
  var katha = parseFloat(total_sft / 720);

  if ((katha >= 0.001) && (katha < 2)) {
    mgc = total_sft * 3.15;
    far = 3.15;
    mgc_ratio = 67.5;
  }
  else if ((katha >= 2) && (katha < 3)) {
    mgc = total_sft * 3.35;
    far = 3.35;
    mgc_ratio = 65.0;
  }
  else if ((katha >= 3) && (katha < 5)) {
    mgc = total_sft * 3.50;
    far = 3.50;
    mgc_ratio = 62.5;
  }
  else if ((katha >= 5) && (katha < 7)) {
    mgc = total_sft * 3.75;
    far = 3.75;
    mgc_ratio = 60.0;
  }
  else if ((katha >= 7) && (katha < 9)) {
    mgc = total_sft * 4.00;
    far = 4.00;
    mgc_ratio = 60.0;
  }
  else if ((katha >= 9) && (katha < 10)) {
    mgc = total_sft * 4.25;
    far = 4.25;
    mgc_ratio = 57.5;

  }
  else if ((katha >= 10) && (katha < 12)) {
    mgc = total_sft * 4.50;
    far = 4.50;
    mgc_ratio = 57.50;

  }
  else if ((katha >= 12) && (katha < 14)) {
    mgc = total_sft * 4.75;
    far = 4.75;
    mgc_ratio = 55.00;

  }
  else if ((katha >= 14) && (katha < 16)) {
    mgc = total_sft * 5.00;
    far = 5.00;
    mgc_ratio = 52.50;

  }
  else if ((katha >= 16) && (katha < 18)) {
    mgc = total_sft * 5.25;
    far = 5.25;
    mgc_ratio = 52.50;

  }
  else if ((katha >= 18) && (katha < 20)) {
    mgc = total_sft * 5.25;
    far = 5.25;
    mgc_ratio = 50.00;

  }
  else {
    mgc = total_sft * 5.50;
    far = 5.50;
    mgc_ratio = 50.00;

  };



  /** ---------------------------  */

  var x = {
    result_mgc: mgc,
    result_far: far,
    result_mgc_ratio: mgc_ratio
  };

  return x;
};



export const sharing = (s1, s2, d, opt) => {

  let w = parseFloat(get_mgc(s1, s2, d, opt).result_mgc);

  let ds = (parseFloat(w) * (parseFloat(d) / 100));
  let s1s = (((parseFloat(w) - parseFloat(ds)) / (parseFloat(s1) + parseFloat(s2))) * parseFloat(s1));
  let s2s = (((parseFloat(w) - parseFloat(ds)) / (parseFloat(s1) + parseFloat(s2))) * parseFloat(s2));
  let x = {
    developer_sft: ds,
    share1_sft: s1s,
    share2_sft: s2s
  };

  return x;
}




