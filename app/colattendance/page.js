"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, DropdownEn, BtnEn, TextDt } from "@/components/Form";
import { Close } from "@/components/Icons";
import Add from "@/components/anybill/Add";
import Edit from "@/components/anybill/Edit";
import Delete from "@/components/anybill/Delete";
import { jsPDF } from "jspdf";
import { damq1 } from "@/data/participant/damq1";

require("@/public/fonts/SUTOM_MJ-normal");
require("@/public/fonts/SUTOM_MJ-bold");
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";
import {convertCsvToJson, inwordBangla, numberWithComma, formatedDate, formatedDateDot, sortArray } from "@/lib/utils";

const user = `Advocacy events/sessions 2023-11-09 Botala CHAK NO 041/M.B;21938
Advocacy events/sessions 2023-11-10 Mitha Tiwana Rural Mitha Tiwana Janubi;21939
Advocacy events/sessions 2023-11-11 Bajar Bajar Janubi;21941
Advocacy events/sessions 2023-11-11 Mitha Tiwana MC Mitha Tiwana MC;21940
Advocacy events/sessions 2023-11-13 Botala Botala;21942
Advocacy events/sessions 2023-11-13 Mitha Tiwana MC Mitha Tiwana MC;21943
Advocacy events/sessions 2023-11-17 Khushab MC Khushab MC;21944
Advocacy events/sessions 2023-11-18 Hassanpur Tiwana Hassanpur Tiwana;21945
Advocacy events/sessions 2023-11-18 Jauhrabad MC Jauhrabad MC;21946
Advocacy events/sessions 2023-11-20 Bara Pangashi Bara Pangashi;110885
Advocacy events/sessions 2023-11-20 Barahar Khama Para;110881
Advocacy events/sessions 2023-11-20 Durganagar Purba Maheshpur;110889
Advocacy events/sessions 2023-11-20 Halsa Jhina Para;110871
Advocacy events/sessions 2023-11-20 Halsa Sultanpur;110866
Advocacy events/sessions 2023-11-20 Joari Kachuakora;110876
Advocacy events/sessions 2023-11-20 Pancha Krushi Bannakandi;110893
Advocacy events/sessions 2023-11-20 Potajia Bahalbari;110897
Advocacy events/sessions 2023-11-21 Khushab MC Khushab MC;21947
Advocacy events/sessions 2023-11-22 Bara Pangashi Chaksa;110886
Advocacy events/sessions 2023-11-22 Barahar Debhalbaria;110882
Advocacy events/sessions 2023-11-22 Halsa Halsa;110867
Advocacy events/sessions 2023-11-22 Hatikumrul Alokdia;110890
Advocacy events/sessions 2023-11-22 Joari Kayemkola;110877
Advocacy events/sessions 2023-11-22 Lakshmipur Kholabaria Barabaria;110872
Advocacy events/sessions 2023-11-22 Pancha Krushi Bannakandi;110894
Advocacy events/sessions 2023-11-22 Potajia Rautara;110898
Advocacy events/sessions 2023-11-26 Barahar Khas Char Jamalpur;110883
Advocacy events/sessions 2023-11-26 Durganagar Par Santala;110887
Advocacy events/sessions 2023-11-26 Halsa Mahesha;110868
Advocacy events/sessions 2023-11-26 Hatikumrul Amdanga;110891
Advocacy events/sessions 2023-11-26 Joari Ahamadpur;110873
Advocacy events/sessions 2023-11-26 Lalore Barabari;110878
Advocacy events/sessions 2023-11-26 Pancha Krushi Pechar Para;110895
Advocacy events/sessions 2023-11-26 Potajia Chara Chithulia;110899
Advocacy events/sessions 2023-11-29 Barahar Tentulia;110884
Advocacy events/sessions 2023-11-29 Chamari Bahadurpur Kandi Para;110879
Advocacy events/sessions 2023-11-29 Durganagar Par Santala;110888
Advocacy events/sessions 2023-11-29 Halsa Nalkhola;110869
Advocacy events/sessions 2023-11-29 Hatikumrul Amdanga;110892
Advocacy events/sessions 2023-11-29 Joari Atghari;110874
Advocacy events/sessions 2023-11-29 Narina Narina Uttar Para;110900
Advocacy events/sessions 2023-11-29 Pancha Krushi Char Kaliganj;110896
Advocacy events/sessions 2023-12-09 Chamari Bahadurpur Kandi Para;110880
Advocacy events/sessions 2023-12-09 Durganagar Purba Maheshpur;110921
Advocacy events/sessions 2023-12-09 Halsa Baghrom;110870
Advocacy events/sessions 2023-12-09 Joari Balia;110875
Advocacy events/sessions 2023-12-11 Gadola Chuni Shumali Nasheb;21826
Advocacy events/sessions 2023-12-12 Bara Pangashi Bara Pangashi;110917
Advocacy events/sessions 2023-12-12 Barahar Khama Para;110913
Advocacy events/sessions 2023-12-12 Halsa Baghrom;110905
Advocacy events/sessions 2023-12-12 Halsa Sultanpur;110901
Advocacy events/sessions 2023-12-12 Hatikumrul Alokdia;110922
Advocacy events/sessions 2023-12-12 Joari Atghari;110909
Advocacy events/sessions 2023-12-20 Bara Pangashi Chaksa;110918
Advocacy events/sessions 2023-12-20 Barahar Debhalbaria;110914
Advocacy events/sessions 2023-12-20 Halsa Halsa;110902
Advocacy events/sessions 2023-12-20 Halsa Jhina Para;110906
Advocacy events/sessions 2023-12-20 Hatikumrul Amdanga;110923
Advocacy events/sessions 2023-12-20 Joari Balia;110910
Advocacy events/sessions 2023-12-24 Barahar Khas Char Jamalpur;110915
Advocacy events/sessions 2023-12-24 Durganagar Par Santala;110919
Advocacy events/sessions 2023-12-24 Halsa Mahesha;110903
Advocacy events/sessions 2023-12-24 Hatikumrul Amdanga;110924
Advocacy events/sessions 2023-12-24 Joari Kachuakora;110911
Advocacy events/sessions 2023-12-24 Lakshmipur Kholabaria Barabaria;110907
Advocacy events/sessions 2023-12-30 Barahar Tentulia;110916
Advocacy events/sessions 2023-12-30 Durganagar Par Santala;110920
Advocacy events/sessions 2023-12-30 Halsa Nalkhola;110904
Advocacy events/sessions 2023-12-30 Joari Ahamadpur;110908
Advocacy events/sessions 2023-12-30 Joari Kayemkola;110912
Advocacy events/sessions 2023-12-30 Pancha Krushi Bannakandi;110925
Advocacy events/sessions 2024-01-01 Halsa Aorail;96108
Advocacy events/sessions 2024-01-01 Halsa Sultanpur;96109
Advocacy events/sessions 2024-01-02 Chamari Bahadurpur Kandi Para;96111
Advocacy events/sessions 2024-01-02 Lalore Barabari;96110
Advocacy events/sessions 2024-01-04 Bara Pangashi Bara Pangashi;96112
Advocacy events/sessions 2024-01-04 Bara Pangashi Chaksa;96113
Advocacy events/sessions 2024-01-11 Durganagar Nandiganti;96115
Advocacy events/sessions 2024-01-11 Pancha Krushi Bannakandi;96114
Advocacy events/sessions 2024-01-13 Banwarinagar Madhya Sona Hara;96117
Advocacy events/sessions 2024-01-13 Banwarinagar Uttar Sona Hara;96116
Advocacy events/sessions 2024-02-21 Hassanpur Tiwana Mangur;50056
Advocacy events/sessions 2024-03-01 Chak No. 52 MB CHAK NO 053/M.B;50071
Advocacy events/sessions 2024-03-01 Jauhrabad MC Jauhrabad MC;50064
Advocacy events/sessions 2024-03-04 Botala Botala;50067
Advocacy events/sessions 2024-03-04 Chak No. 63 MB CHAK NO 063/M.B;50069
Advocacy events/sessions 2024-03-04 Hassanpur Tiwana Hassanpur Tiwana;50065
Advocacy events/sessions 2024-03-05 Hassanpur Tiwana Khurpalka;50059
Advocacy events/sessions 2024-03-05 Sandral Hardogag;50066
Advocacy events/sessions 2024-03-06 Hassanpur Tiwana Hassanpur Tiwana;50062
Advocacy events/sessions 2024-03-25 Kotla Jam Mohallah Qazian Wala;60910
Advocacy events/sessions 2024-03-25 Kuhawar Kalan Kuhawar Kalan Daggar;60913
Advocacy events/sessions 2024-03-26 Gadola Gadola Dagar City;60915
Advocacy events/sessions 2024-03-26 Gadola Gadola Dagar City;60916
Advocacy events/sessions 2024-03-27 Kuhawar Kalan Basti Barokhan Wali;60921
Advocacy events/sessions 2024-03-27 Kuhawar Kalan Chak#. 19/TDA;60925
Advocacy events/sessions 2024-03-29 Kuhawar Kalan Basti Barokhan Wali;60920
Advocacy events/sessions 2024-03-29 Kuhawar Kalan Chak# 17/TDA;60927
Advocacy events/sessions 2024-03-30 Kuhawar Kalan Daggar Awan;60917
Advocacy events/sessions 2024-03-30 Kuhawar Kalan Daggar Awan;60918
Advocacy events/sessions 2024-03-31 Kotla Jam Balochan Wala;60923
Advocacy events/sessions 2024-03-31 Kotla Jam Mohallah Moheran Wala;60911
Advocacy events/sessions 2024-04-01 Kuhawar Kalan Basti Barokhan Wali;60922
Advocacy events/sessions 2024-04-01 Kuhawar Kalan Chak# 17/TDA;60928
Advocacy events/sessions 2024-04-02 Kuhawar Kalan Chak# 18/TDA;60926
Advocacy events/sessions 2024-04-02 Kuhawar Kalan Daggar Awan;60919
Advocacy events/sessions 2024-04-03 Gadola Kotla Jam Nasheb;60912
Advocacy events/sessions 2024-04-03 Kotla Jam Sheikhan Wala;60909
Advocacy events/sessions 2024-04-04 Gadola Chak#. 30A/TDA;60924
Advocacy events/sessions 2024-04-04 Gadola Kotla Jam Nasheb;60914
Advocacy events/sessions 2024-04-04 Jauhrabad MC Jauhrabad MC;50060
Advocacy events/sessions 2024-05-21 Chak No. 50 MB CHAK NO 050/M.B;111163
Advocacy events/sessions 2024-06-01 Botala Botala;111164
Advocacy events/sessions 2024-06-01 Kund Kund Shumali;111162
Advocacy events/sessions 2024-06-04 Chak No. 63 MB CHAK NO 56/M.B;111160
Advocacy events/sessions 2024-06-05 Hadali Hadali MC;111159
Advocacy events/sessions 2024-06-05 Hassanpur Tiwana Joyia;111157
Advocacy events/sessions 2024-06-05 Nari Nari Shumali;111156
Advocacy events/sessions 2024-06-06 Chak No. 50 MB CHAK NO 047/M.B;111161
Advocacy events/sessions 2024-06-06 Hassanpur Tiwana Hassanpur Tiwana;111158
Advocacy events/sessions 2024-07-03 Kuhawar Kalan Basti Barokhan Wali;110998
Advocacy events/sessions 2024-07-03 Kuhawar Kalan Chak# 17/TDA;110994
Advocacy events/sessions 2024-07-04 Khushab MC Khushab MC;111155
Advocacy events/sessions 2024-07-04 Kuhawar Kalan Chak#. 19/TDA;110995
Advocacy events/sessions 2024-07-04 Kuhawar Kalan Chak#. 21/TDA;110996
Advocacy events/sessions 2024-07-04 Kuhawar Kalan Kuhawar Kalan Nasheb;111003
Advocacy events/sessions 2024-07-10 Jauhrabad MC Jauhrabad MC;111153
Advocacy events/sessions 2024-07-26 Kuhawar Kalan Basti Khokhar;110999
Advocacy events/sessions 2024-07-26 Kuhawar Kalan Chak#. 22/TDA;110997
Advocacy events/sessions 2024-07-27 Kuhawar Kalan Daggar Awan;111000
Advocacy events/sessions 2024-07-27 Kuhawar Kalan Daggar Awan;111001
Advocacy events/sessions 2024-07-27 Kuhawar Kalan Kuhawar Kalan Daggar;111002
Advocacy events/sessions 2024-09-04 Kuhawar Kalan Chak#. 22/TDA;126616
Advocacy events/sessions 2024-09-05 Chak No. 50 MB CHAK NO 050/M.B;125818
Advocacy events/sessions 2024-09-05 Gadola Gadola Dagar City;126615
Advocacy events/sessions 2024-09-05 Jauhrabad MC Jauhrabad MC;125817
Advocacy events/sessions 2024-09-05 Kuhawar Kalan Basti Barokhan Wali;126617
Advocacy events/sessions 2024-09-06 Hassanpur Tiwana Hassanpur Tiwana;125819
Advocacy events/sessions 2024-10-09 Jauhrabad MC Jauhrabad MC;131042
Advocacy events/sessions 2024-10-29 Kuhawar Kalan Basti Barokhan Wali;130876
Advocacy events/sessions 2024-10-31 Kotla Jam Mohallah Moheran Wala;130877
Advocacy events/sessions 2024-11-01 Jauhrabad MC Jauhrabad MC;131040
Advocacy events/sessions 2024-11-04 Jauhrabad MC Jauhrabad MC;131041
Advocacy events/sessions 2024-11-15 Kuhawar Kalan Chak# 17/TDA;130994
Advocacy events/sessions 2024-12-13 Jauhrabad MC Jauhrabad MC;141511
Back to school public campaigns 2024-08-19 Chak No. 50 MB CHAK NO 050/M.B;124359
Back to school public campaigns 2024-08-20 Hadali Hadali MC;124361
Back to school public campaigns 2024-08-20 Hassanpur Tiwana Hassanpur Tiwana;124360
Back to school public campaigns 2024-08-22 Hassanpur Tiwana Khurpalka;124363
Back to school public campaigns 2024-08-22 Khushab MC Khushab MC;124362
Back to school public campaigns 2024-09-23 Kuhawar Kalan Basti Barokhan Wali;126618
Back to school public campaigns 2024-09-24 Kuhawar Kalan Chak#. 19/TDA;126620
Back to school public campaigns 2024-09-24 Kuhawar Kalan Kuhawar Kalan Daggar;126619
Back to school public campaigns 2024-09-25 Kuhawar Kalan Daggar Awan;126622
Back to school public campaigns 2024-09-25 Kuhawar Kalan Kuhawar Kalan Nasheb;126621
Community awareness/mobilisation meeting or event 2023-08-28 Raththota Bodhikotuwa;3105
Community awareness/mobilisation meeting or event 2023-10-16 Jauhrabad MC Jauhrabad MC;14736
Community awareness/mobilisation meeting or event 2023-10-16 Jauhrabad MC Jauhrabad MC;14735
Community awareness/mobilisation meeting or event 2023-10-21 Jauhrabad MC Jauhrabad MC;14724
Community awareness/mobilisation meeting or event 2023-10-23 Gadola Chuni Shumali Nasheb;14717
Community awareness/mobilisation meeting or event 2023-10-23 Gadola Chuni Shumali Nasheb;14718
Community awareness/mobilisation meeting or event 2023-10-23 Jauhrabad MC Jauhrabad MC;14737
Community awareness/mobilisation meeting or event 2023-10-24 Gadola Chuni Shumali Nasheb;14719
Community awareness/mobilisation meeting or event 2023-10-24 Jauhrabad MC Jauhrabad MC;14738
Community awareness/mobilisation meeting or event 2023-10-24 Jauhrabad MC Jauhrabad MC;14739
Community awareness/mobilisation meeting or event 2023-10-25 Jauhrabad MC Jauhrabad MC;14740
Community awareness/mobilisation meeting or event 2023-10-28 Gadola Chuni Shumali Nasheb;14706
Community awareness/mobilisation meeting or event 2023-10-28 Gadola Chuni Shumali Nasheb;14720
Community awareness/mobilisation meeting or event 2023-10-31 Gadola Chuni Shumali Nasheb;14721
Community awareness/mobilisation meeting or event 2023-10-31 Gadola Chuni Shumali Nasheb;14722
Community awareness/mobilisation meeting or event 2023-10-31 Gadola Chuni Shumali Nasheb;14723
Community awareness/mobilisation meeting or event 2023-11-09 Kuhawar Kalan Chak#. 21/TDA;21670
Community awareness/mobilisation meeting or event 2023-11-10 Kuhawar Kalan Chak#. 21/TDA;21691
Community awareness/mobilisation meeting or event 2023-11-13 Kuhawar Kalan Chak# 18/TDA;21665
Community awareness/mobilisation meeting or event 2023-11-14 Kuhawar Kalan Chak# 18/TDA;21686
Community awareness/mobilisation meeting or event 2023-11-17 Kuhawar Kalan Chak# 18/TDA;21666
Community awareness/mobilisation meeting or event 2023-11-18 Kuhawar Kalan Chak# 18/TDA;21687
Community awareness/mobilisation meeting or event 2023-11-21 Kuhawar Kalan Chak#. 19/TDA;21667
Community awareness/mobilisation meeting or event 2023-11-22 Botala Botala;21949
Community awareness/mobilisation meeting or event 2023-11-22 Botala Botala;21950
Community awareness/mobilisation meeting or event 2023-11-22 Halsa Sultanpur;73573
Community awareness/mobilisation meeting or event 2023-11-22 Jauhrabad MC Jauhrabad MC;21844
Community awareness/mobilisation meeting or event 2023-11-22 Kuhawar Kalan Chak#. 19/TDA;21688
Community awareness/mobilisation meeting or event 2023-11-22 Mitha Tiwana MC Mitha Tiwana MC;21962
Community awareness/mobilisation meeting or event 2023-11-22 Potajia Bahalbari;73574
Community awareness/mobilisation meeting or event 2023-11-23 Bajar Bajar Janubi;21948
Community awareness/mobilisation meeting or event 2023-11-23 Bara Pangashi Bara Pangashi;73632
Community awareness/mobilisation meeting or event 2023-11-23 Bara Pangashi Chaksa;73633
Community awareness/mobilisation meeting or event 2023-11-23 Bara Pangashi Shuklai;73576
Community awareness/mobilisation meeting or event 2023-11-23 Barahar Khama Para;73619
Community awareness/mobilisation meeting or event 2023-11-23 Barahar Nabanna Para;73618
Community awareness/mobilisation meeting or event 2023-11-23 Durganagar Par Santala;73640
Community awareness/mobilisation meeting or event 2023-11-23 Durganagar Purba Maheshpur;73641
Community awareness/mobilisation meeting or event 2023-11-23 Halsa Aorail;73583
Community awareness/mobilisation meeting or event 2023-11-23 Halsa Mahesha;73575
Community awareness/mobilisation meeting or event 2023-11-23 Halsa Nabin Krishnapur;73593
Community awareness/mobilisation meeting or event 2023-11-23 Halsa Nalkhola;73594
Community awareness/mobilisation meeting or event 2023-11-23 Halsa Sultanpur;73584
Community awareness/mobilisation meeting or event 2023-11-23 Lakshmipur Kholabaria Kholabaria;73603
Community awareness/mobilisation meeting or event 2023-11-23 Lakshmipur Kholabaria Kholabaria;73604
Community awareness/mobilisation meeting or event 2023-11-23 Mitha Tiwana Rural Mitha Tiwana Janubi;21964
Community awareness/mobilisation meeting or event 2023-11-24 Banwarinagar Dakhin Gopal Nagar;73679
Community awareness/mobilisation meeting or event 2023-11-24 Banwarinagar Dakhin Sona Hara;73664
Community awareness/mobilisation meeting or event 2023-11-24 Banwarinagar Uttar Gopal Nagar;73665
Community awareness/mobilisation meeting or event 2023-11-24 Pancha Krushi Betbari;73648
Community awareness/mobilisation meeting or event 2023-11-24 Pancha Krushi Kalikanj;73649
Community awareness/mobilisation meeting or event 2023-11-24 Potajia Chara Chithulia;73657
Community awareness/mobilisation meeting or event 2023-11-24 Potajia Rautara;73656
Community awareness/mobilisation meeting or event 2023-11-25 Banwarinagar Uttar Sona Hara;73578
Community awareness/mobilisation meeting or event 2023-11-25 Halsa Nalkhola;73577
Community awareness/mobilisation meeting or event 2023-11-25 Kotla Jam Mohallah Qazian Wala;21678
Community awareness/mobilisation meeting or event 2023-11-26 Bara Pangashi Sukulhat;73580
Community awareness/mobilisation meeting or event 2023-11-26 Chamari Kalinagar Chamari;73579
Community awareness/mobilisation meeting or event 2023-11-26 Kotla Jam Mohallah Qazian Wala;21699
Community awareness/mobilisation meeting or event 2023-11-27 Botala CHAK NO 040/M.B;21951
Community awareness/mobilisation meeting or event 2023-11-27 Botala CHAK NO 041/M.B;21952
Community awareness/mobilisation meeting or event 2023-11-27 Chak No. 50 MB CHAK NO 047/M.B;21955
Community awareness/mobilisation meeting or event 2023-11-27 Pancha Krushi Char Pechar para;73582
Community awareness/mobilisation meeting or event 2023-11-27 Pancha Krushi Pechar Para;73581
Community awareness/mobilisation meeting or event 2023-11-28 Bara Pangashi Chaksa;73634
Community awareness/mobilisation meeting or event 2023-11-28 Bara Pangashi Shuklai;73635
Community awareness/mobilisation meeting or event 2023-11-28 Botala CHAK NO 043/M.B;21953
Community awareness/mobilisation meeting or event 2023-11-28 Halsa Baghrom;73595
Community awareness/mobilisation meeting or event 2023-11-28 Halsa Baghrom;73596
Community awareness/mobilisation meeting or event 2023-11-28 Halsa Sultanpur;73585
Community awareness/mobilisation meeting or event 2023-11-28 Halsa Sultanpur;73586
Community awareness/mobilisation meeting or event 2023-11-28 Hassanpur Tiwana Khurpalka;21961
Community awareness/mobilisation meeting or event 2023-11-28 Joari Ahamadpur;73606
Community awareness/mobilisation meeting or event 2023-11-28 Lakshmipur Kholabaria Kholabaria;73605
Community awareness/mobilisation meeting or event 2023-11-28 Narina Narina Uttar Para;73659
Community awareness/mobilisation meeting or event 2023-11-28 Pancha Krushi Char Kaliganj;73651
Community awareness/mobilisation meeting or event 2023-11-28 Pancha Krushi Kalikanj;73650
Community awareness/mobilisation meeting or event 2023-11-28 Potajia Tiorbanda;73658
Community awareness/mobilisation meeting or event 2023-11-29 Banwarinagar Madhya Sona Hara;96218
Community awareness/mobilisation meeting or event 2023-11-29 Banwarinagar Uttar Sona Hara;96217
Community awareness/mobilisation meeting or event 2023-11-29 Bara Pangashi Bara Pangashi;96187
Community awareness/mobilisation meeting or event 2023-11-29 Bara Pangashi Chaksa;96188
Community awareness/mobilisation meeting or event 2023-11-29 Barahar Khama Para;96174
Community awareness/mobilisation meeting or event 2023-11-29 Barahar Nabanna Para;96061
Community awareness/mobilisation meeting or event 2023-11-29 Barahar Nabanna Para;96173
Community awareness/mobilisation meeting or event 2023-11-29 Barahar Tiarhati;96067
Community awareness/mobilisation meeting or event 2023-11-29 Durganagar Par Santala;96195
Community awareness/mobilisation meeting or event 2023-11-29 Durganagar Purba Maheshpur;96196
Community awareness/mobilisation meeting or event 2023-11-29 Halsa Aorail;96038
Community awareness/mobilisation meeting or event 2023-11-29 Halsa Aorail;96138
Community awareness/mobilisation meeting or event 2023-11-29 Halsa Nabin Krishnapur;96148
Community awareness/mobilisation meeting or event 2023-11-29 Halsa Nalkhola;96046
Community awareness/mobilisation meeting or event 2023-11-29 Halsa Nalkhola;96149
Community awareness/mobilisation meeting or event 2023-11-29 Halsa Sultanpur;96139
Community awareness/mobilisation meeting or event 2023-11-29 Jauhrabad MC Jauhrabad MC;21958
Community awareness/mobilisation meeting or event 2023-11-29 Joari Atghari;96054
Community awareness/mobilisation meeting or event 2023-11-29 Khushab MC Khushab MC;21960
Community awareness/mobilisation meeting or event 2023-11-29 Kotla Jam Mohallah Sadique e Akbar;21682
Community awareness/mobilisation meeting or event 2023-11-29 Lakshmipur Kholabaria Kholabaria;96158
Community awareness/mobilisation meeting or event 2023-11-29 Lakshmipur Kholabaria Kholabaria;96159
Community awareness/mobilisation meeting or event 2023-11-29 Pancha Krushi Bannakandi;96079
Community awareness/mobilisation meeting or event 2023-11-30 Hassanpur Tiwana Joyia;21959
Community awareness/mobilisation meeting or event 2023-11-30 Hassanpur Tiwana Thatti Gangeria;21968
Community awareness/mobilisation meeting or event 2023-11-30 Kotla Jam Mohallah Sadique e Akbar;21703
Community awareness/mobilisation meeting or event 2023-11-30 Nari Nari Shumali;21963
Community awareness/mobilisation meeting or event 2023-12-03 Barahar Khama Para;96062
Community awareness/mobilisation meeting or event 2023-12-03 Barahar Khama Para;96126
Community awareness/mobilisation meeting or event 2023-12-03 Barahar Khama Para;96127
Community awareness/mobilisation meeting or event 2023-12-03 Durganagar Nandiganti;96073
Community awareness/mobilisation meeting or event 2023-12-03 Halsa Baghrom;96047
Community awareness/mobilisation meeting or event 2023-12-03 Halsa Sultanpur;96119
Community awareness/mobilisation meeting or event 2023-12-03 Halsa Sultanpur;96118
Community awareness/mobilisation meeting or event 2023-12-03 Halsa Sultanpur;96039
Community awareness/mobilisation meeting or event 2023-12-03 Kotla Jam Mohallah Sadique e Akbar;21680
Community awareness/mobilisation meeting or event 2023-12-03 Narina Narina Uttar Para;96089
Community awareness/mobilisation meeting or event 2023-12-03 Potajia Bahalbari;96085
Community awareness/mobilisation meeting or event 2023-12-04 Bara Pangashi Chaksa;96189
Community awareness/mobilisation meeting or event 2023-12-04 Bara Pangashi Shuklai;96190
Community awareness/mobilisation meeting or event 2023-12-04 Barahar Khama Para;96175
Community awareness/mobilisation meeting or event 2023-12-04 Barahar Khama Para;96176
Community awareness/mobilisation meeting or event 2023-12-04 Halsa Aorail;93896
Community awareness/mobilisation meeting or event 2023-12-04 Halsa Baghrom;96150
Community awareness/mobilisation meeting or event 2023-12-04 Halsa Baghrom;96151
Community awareness/mobilisation meeting or event 2023-12-04 Halsa Sultanpur;96140
Community awareness/mobilisation meeting or event 2023-12-04 Halsa Sultanpur;96141
Community awareness/mobilisation meeting or event 2023-12-04 Hassanpur Tiwana Hassanpur Tiwana;21957
Community awareness/mobilisation meeting or event 2023-12-04 Joari Ahamadpur;96161
Community awareness/mobilisation meeting or event 2023-12-04 Kotla Jam Mohallah Sadique e Akbar;21701
Community awareness/mobilisation meeting or event 2023-12-04 Lakshmipur Kholabaria Kholabaria;96160
Community awareness/mobilisation meeting or event 2023-12-04 Pancha Krushi Bannakandi;93897
Community awareness/mobilisation meeting or event 2023-12-04 Pancha Krushi Betbari;96203
Community awareness/mobilisation meeting or event 2023-12-04 Pancha Krushi Kalikanj;96204
Community awareness/mobilisation meeting or event 2023-12-04 Potajia Chara Chithulia;96212
Community awareness/mobilisation meeting or event 2023-12-04 Potajia Rautara;96211
Community awareness/mobilisation meeting or event 2023-12-05 Banwarinagar Dakhin Gopal Nagar;73666
Community awareness/mobilisation meeting or event 2023-12-05 Barahar Khama Para;73620
Community awareness/mobilisation meeting or event 2023-12-05 Barahar Khama Para;73621
Community awareness/mobilisation meeting or event 2023-12-05 Hadali Hadali MC;21956
Community awareness/mobilisation meeting or event 2023-12-05 Halsa Arjunpur;73588
Community awareness/mobilisation meeting or event 2023-12-05 Halsa Balakandi;73597
Community awareness/mobilisation meeting or event 2023-12-05 Halsa Balarampur;73598
Community awareness/mobilisation meeting or event 2023-12-05 Halsa Gouripur;73587
Community awareness/mobilisation meeting or event 2023-12-05 Hatikumrul Alokdia;73642
Community awareness/mobilisation meeting or event 2023-12-05 Hatikumrul Alokdia;73643
Community awareness/mobilisation meeting or event 2023-12-05 Sandral Khushab Rural;21965
Community awareness/mobilisation meeting or event 2023-12-06 Jauhrabad MC Jauhrabad MC;21966
Community awareness/mobilisation meeting or event 2023-12-06 Jauhrabad MC Jauhrabad MC;21967
Community awareness/mobilisation meeting or event 2023-12-06 Joari Kayemkola;93898
Community awareness/mobilisation meeting or event 2023-12-07 Kotla Jam Mohallah Sadique e Akbar;21681
Community awareness/mobilisation meeting or event 2023-12-08 Kotla Jam Mohallah Sadique e Akbar;21702
Community awareness/mobilisation meeting or event 2023-12-08 Mitha Tiwana Rural Mitha Tiwana Janubi;21829
Community awareness/mobilisation meeting or event 2023-12-09 Banwarinagar Dakhin Sona Hara;93899
Community awareness/mobilisation meeting or event 2023-12-09 Banwarinagar Dakhin Sona Hara;96219
Community awareness/mobilisation meeting or event 2023-12-09 Banwarinagar Uttar Gopal Nagar;96220
Community awareness/mobilisation meeting or event 2023-12-09 Barahar Debhalbaria;96178
Community awareness/mobilisation meeting or event 2023-12-09 Barahar Khama Para;96177
Community awareness/mobilisation meeting or event 2023-12-09 Halsa Balakandi;93900
Community awareness/mobilisation meeting or event 2023-12-09 Hatikumrul Alokdia;96198
Community awareness/mobilisation meeting or event 2023-12-09 Hatikumrul Alokdia;96197
Community awareness/mobilisation meeting or event 2023-12-09 Joari Ahamadpur;96162
Community awareness/mobilisation meeting or event 2023-12-09 Joari Atghari;96163
Community awareness/mobilisation meeting or event 2023-12-09 Mitha Tiwana Rural Mitha Tiwana Janubi;21848
Community awareness/mobilisation meeting or event 2023-12-09 Pancha Krushi Char Kaliganj;96206
Community awareness/mobilisation meeting or event 2023-12-09 Pancha Krushi Kalikanj;96205
Community awareness/mobilisation meeting or event 2023-12-10 Bara Pangashi Chaksa;96128
Community awareness/mobilisation meeting or event 2023-12-10 Bara Pangashi Chaksa;96129
Community awareness/mobilisation meeting or event 2023-12-10 Halsa Mahesha;96121
Community awareness/mobilisation meeting or event 2023-12-10 Halsa Mahesha;96120
Community awareness/mobilisation meeting or event 2023-12-11 Barahar Debhalbaria;73623
Community awareness/mobilisation meeting or event 2023-12-11 Barahar Khama Para;73622
Community awareness/mobilisation meeting or event 2023-12-11 Halsa Aorail;73667
Community awareness/mobilisation meeting or event 2023-12-11 Halsa Arjunpur;73668
Community awareness/mobilisation meeting or event 2023-12-11 Hatikumrul Alokdia;93901
Community awareness/mobilisation meeting or event 2023-12-11 Joari Ahamadpur;73607
Community awareness/mobilisation meeting or event 2023-12-11 Joari Atghari;73608
Community awareness/mobilisation meeting or event 2023-12-12 Hatikumrul Amdanga;93902
Community awareness/mobilisation meeting or event 2023-12-13 Banwarinagar Dakhin Sona Hara;96093
Community awareness/mobilisation meeting or event 2023-12-13 Bara Pangashi Bara Pangashi;96068
Community awareness/mobilisation meeting or event 2023-12-13 Durganagar Chamambiganti;96074
Community awareness/mobilisation meeting or event 2023-12-13 Halsa Baghrom;96122
Community awareness/mobilisation meeting or event 2023-12-13 Halsa Baghrom;96123
Community awareness/mobilisation meeting or event 2023-12-13 Hatikumrul Alokdia;96130
Community awareness/mobilisation meeting or event 2023-12-13 Hatikumrul Alokdia;96131
Community awareness/mobilisation meeting or event 2023-12-13 Joari Balia;96055
Community awareness/mobilisation meeting or event 2023-12-13 Kuhawar Kalan Daggar Awan;21674
Community awareness/mobilisation meeting or event 2023-12-13 Mitha Tiwana Rural Mitha Tiwana Janubi;21833
Community awareness/mobilisation meeting or event 2023-12-13 Pancha Krushi Pechar Para;96080
Community awareness/mobilisation meeting or event 2023-12-13 Potajia Rautara;96086
Community awareness/mobilisation meeting or event 2023-12-14 Banwarinagar Dakhin Gopal Nagar;93904
Community awareness/mobilisation meeting or event 2023-12-14 Banwarinagar Uttar Gopal Nagar;93903
Community awareness/mobilisation meeting or event 2023-12-14 Mitha Tiwana Rural Mitha Tiwana Janubi;21852
Community awareness/mobilisation meeting or event 2023-12-15 Barahar Durgapur;73624
Community awareness/mobilisation meeting or event 2023-12-15 Barahar Durgapur;73625
Community awareness/mobilisation meeting or event 2023-12-15 Halsa Baghrom;73670
Community awareness/mobilisation meeting or event 2023-12-15 Halsa Nalkhola;73669
Community awareness/mobilisation meeting or event 2023-12-15 Joari Atghari;73609
Community awareness/mobilisation meeting or event 2023-12-15 Joari Balia;73610
Community awareness/mobilisation meeting or event 2023-12-17 Banwarinagar Dakhin Gopal Nagar;96234
Community awareness/mobilisation meeting or event 2023-12-17 Barahar Durgapur;96179
Community awareness/mobilisation meeting or event 2023-12-17 Barahar Durgapur;96180
Community awareness/mobilisation meeting or event 2023-12-17 Durganagar Par Santala;93905
Community awareness/mobilisation meeting or event 2023-12-17 Halsa Arjunpur;96143
Community awareness/mobilisation meeting or event 2023-12-17 Halsa Balakandi;96152
Community awareness/mobilisation meeting or event 2023-12-17 Halsa Balarampur;96153
Community awareness/mobilisation meeting or event 2023-12-17 Halsa Gouripur;96142
Community awareness/mobilisation meeting or event 2023-12-17 Hatikumrul Alokdia;96229
Community awareness/mobilisation meeting or event 2023-12-17 Joari Atghari;96164
Community awareness/mobilisation meeting or event 2023-12-17 Joari Balia;96165
Community awareness/mobilisation meeting or event 2023-12-17 Narina Narina Uttar Para;96214
Community awareness/mobilisation meeting or event 2023-12-17 Potajia Tiorbanda;96213
Community awareness/mobilisation meeting or event 2023-12-18 Bara Pangashi Chaksa;96069
Community awareness/mobilisation meeting or event 2023-12-18 Barahar Debhalbaria;96063
Community awareness/mobilisation meeting or event 2023-12-18 Durganagar Par Santala;96075
Community awareness/mobilisation meeting or event 2023-12-18 Halsa Balakandi;96048
Community awareness/mobilisation meeting or event 2023-12-18 Halsa Gouripur;96040
Community awareness/mobilisation meeting or event 2023-12-18 Joari Kachuakora;96056
Community awareness/mobilisation meeting or event 2023-12-18 Kuhawar Kalan Daggar Awan;21675
Community awareness/mobilisation meeting or event 2023-12-19 Kuhawar Kalan Daggar Awan;21696
Community awareness/mobilisation meeting or event 2023-12-20 Hatikumrul Amdanga;96132
Community awareness/mobilisation meeting or event 2023-12-20 Hatikumrul Amdanga;96133
Community awareness/mobilisation meeting or event 2023-12-20 Jauhrabad MC Jauhrabad MC;21920
Community awareness/mobilisation meeting or event 2023-12-20 Joari Ahamadpur;96124
Community awareness/mobilisation meeting or event 2023-12-20 Joari Ahamadpur;96125
Community awareness/mobilisation meeting or event 2023-12-20 Mitha Tiwana Rural Mitha Tiwana Janubi;21836
Community awareness/mobilisation meeting or event 2023-12-21 Mitha Tiwana Rural Mitha Tiwana Janubi;21856
Community awareness/mobilisation meeting or event 2023-12-22 Kuhawar Kalan Daggar Awan;21676
Community awareness/mobilisation meeting or event 2023-12-22 Mitha Tiwana Rural Mitha Tiwana Janubi;21838
Community awareness/mobilisation meeting or event 2023-12-23 Kuhawar Kalan Chak#. 22/TDA;21772
Community awareness/mobilisation meeting or event 2023-12-23 Kuhawar Kalan Daggar Awan;21697
Community awareness/mobilisation meeting or event 2023-12-23 Mitha Tiwana Rural Mitha Tiwana Janubi;21858
Community awareness/mobilisation meeting or event 2023-12-23 Narina Narina Uttar Para;96137
Community awareness/mobilisation meeting or event 2023-12-23 Narina Narina Uttar Para;96136
Community awareness/mobilisation meeting or event 2023-12-23 Potajia Rautara;96134
Community awareness/mobilisation meeting or event 2023-12-23 Potajia Rautara;96135
Community awareness/mobilisation meeting or event 2023-12-24 Banwarinagar Uttar Gopal Nagar;96094
Community awareness/mobilisation meeting or event 2023-12-24 Bara Pangashi Chaksa;110816
Community awareness/mobilisation meeting or event 2023-12-24 Barahar Nabanna Para;110813
Community awareness/mobilisation meeting or event 2023-12-24 Botala Botala;21839
Community awareness/mobilisation meeting or event 2023-12-24 Botala Botala;21859
Community awareness/mobilisation meeting or event 2023-12-24 Halsa Arjunpur;96041
Community awareness/mobilisation meeting or event 2023-12-24 Halsa Balarampur;96049
Community awareness/mobilisation meeting or event 2023-12-24 Halsa Halsa;110803
Community awareness/mobilisation meeting or event 2023-12-24 Halsa Pale Halsa;110807
Community awareness/mobilisation meeting or event 2023-12-24 Joari Kayemkola;96057
Community awareness/mobilisation meeting or event 2023-12-24 Lalore Gopalpur;110810
Community awareness/mobilisation meeting or event 2023-12-24 Pancha Krushi Betbari;96081
Community awareness/mobilisation meeting or event 2023-12-24 Pancha Krushi Betbari;110822
Community awareness/mobilisation meeting or event 2023-12-24 Pancha Krushi Pechar Para;110819
Community awareness/mobilisation meeting or event 2023-12-24 Pungali Sreegobindapur;96090
Community awareness/mobilisation meeting or event 2023-12-26 Botala CHAK NO 040/M.B;21840
Community awareness/mobilisation meeting or event 2023-12-26 Botala CHAK NO 040/M.B;21827
Community awareness/mobilisation meeting or event 2023-12-27 Bara Pangashi Sukulhat;96191
Community awareness/mobilisation meeting or event 2023-12-27 Barahar Khas Char Jamalpur;96181
Community awareness/mobilisation meeting or event 2023-12-27 Barahar Khas Char Jamalpur;96182
Community awareness/mobilisation meeting or event 2023-12-27 Botala CHAK NO 040/M.B;21860
Community awareness/mobilisation meeting or event 2023-12-27 Durganagar Konabari;96192
Community awareness/mobilisation meeting or event 2023-12-27 Halsa Arjunpur;96223
Community awareness/mobilisation meeting or event 2023-12-27 Halsa Jhina Para;96154
Community awareness/mobilisation meeting or event 2023-12-27 Halsa Jhina Para;96155
Community awareness/mobilisation meeting or event 2023-12-27 Hatikumrul Amdanga;96199
Community awareness/mobilisation meeting or event 2023-12-27 Joari Kachuakora;96166
Community awareness/mobilisation meeting or event 2023-12-27 Joari Kayemkola;96167
Community awareness/mobilisation meeting or event 2023-12-27 Lakshmipur Kholabaria Barabaria;96226
Community awareness/mobilisation meeting or event 2023-12-27 Pancha Krushi Bannakandi;96200
Community awareness/mobilisation meeting or event 2023-12-27 Pancha Krushi Shahjahanpur;96207
Community awareness/mobilisation meeting or event 2023-12-27 Pancha Krushi Shahjahanpur;96208
Community awareness/mobilisation meeting or event 2023-12-28 Barahar Khas Char Jamalpur;73626
Community awareness/mobilisation meeting or event 2023-12-28 Barahar Khas Char Jamalpur;73627
Community awareness/mobilisation meeting or event 2023-12-28 Barahar Tentulia;73672
Community awareness/mobilisation meeting or event 2023-12-28 Gadola Chak #. 30/TDA;21774
Community awareness/mobilisation meeting or event 2023-12-28 Halsa Chirakhola;73589
Community awareness/mobilisation meeting or event 2023-12-28 Halsa Halsa;73590
Community awareness/mobilisation meeting or event 2023-12-28 Joari Kachuakora;73611
Community awareness/mobilisation meeting or event 2023-12-28 Joari Kayemkola;73612
Community awareness/mobilisation meeting or event 2023-12-28 Kotla Jam Mohallah Sadique e Akbar;21783
Community awareness/mobilisation meeting or event 2023-12-28 Kuhawar Kalan Tibba Khokhran Wala;21677
Community awareness/mobilisation meeting or event 2023-12-28 Lakshmipur Kholabaria Barabaria;73671
Community awareness/mobilisation meeting or event 2023-12-28 Mitha Tiwana Rural Mitha Tiwana Janubi;21841
Community awareness/mobilisation meeting or event 2023-12-29 Gadola Chak #. 29/TDA;21773
Community awareness/mobilisation meeting or event 2023-12-29 Gadola Mohallah Khokhran Wala;21698
Community awareness/mobilisation meeting or event 2023-12-29 Mitha Tiwana Rural Mitha Tiwana Janubi;21861
Community awareness/mobilisation meeting or event 2023-12-30 Bajar Bajar Janubi;21843
Community awareness/mobilisation meeting or event 2023-12-30 Bajar Bajar Janubi;21862
Community awareness/mobilisation meeting or event 2023-12-30 Banwarinagar Dakhin Gopal Nagar;96095
Community awareness/mobilisation meeting or event 2023-12-30 Bara Pangashi Shuklai;96070
Community awareness/mobilisation meeting or event 2023-12-30 Durganagar Purba Maheshpur;96076
Community awareness/mobilisation meeting or event 2023-12-30 Halsa Chirakhola;96042
Community awareness/mobilisation meeting or event 2023-12-30 Halsa Jhina Para;96050
Community awareness/mobilisation meeting or event 2023-12-30 Pancha Krushi Kalikanj;96082
Community awareness/mobilisation meeting or event 2023-12-31 Barahar Debhalbaria;110814
Community awareness/mobilisation meeting or event 2023-12-31 Chamari Bahadurpur Kandi Para;110811
Community awareness/mobilisation meeting or event 2023-12-31 Halsa Sultanpur;110804
Community awareness/mobilisation meeting or event 2023-12-31 Hatikumrul Amdanga;110817
Community awareness/mobilisation meeting or event 2023-12-31 Joari Ahamadpur;110808
Community awareness/mobilisation meeting or event 2023-12-31 Pancha Krushi Kalikanj;110820
Community awareness/mobilisation meeting or event 2023-12-31 Potajia Bahalbari;110823
Community awareness/mobilisation meeting or event 2024-01-01 Banwarinagar Uttar Sona Hara;96091
Community awareness/mobilisation meeting or event 2024-01-01 Barahar Durgapur;96064
Community awareness/mobilisation meeting or event 2024-01-01 Halsa Halsa;96043
Community awareness/mobilisation meeting or event 2024-01-01 Halsa Pale Halsa;96051
Community awareness/mobilisation meeting or event 2024-01-01 Lalore Gopalpur;96058
Community awareness/mobilisation meeting or event 2024-01-01 Potajia Chara Chithulia;96087
Community awareness/mobilisation meeting or event 2024-01-02 Banwarinagar Dakhin Gopal Nagar;96221
Community awareness/mobilisation meeting or event 2024-01-02 Barahar Durgapur;73464
Community awareness/mobilisation meeting or event 2024-01-02 Barahar Tentulia;96184
Community awareness/mobilisation meeting or event 2024-01-02 Barahar Tentulia;96183
Community awareness/mobilisation meeting or event 2024-01-02 Gadola Chak #. 29/TDA;21672
Community awareness/mobilisation meeting or event 2024-01-02 Halsa Aorail;96222
Community awareness/mobilisation meeting or event 2024-01-02 Halsa Gouripur;73456
Community awareness/mobilisation meeting or event 2024-01-02 Joari Kayemkola;96168
Community awareness/mobilisation meeting or event 2024-01-02 Kuhawar Kalan Chak# 17/TDA;21767
Community awareness/mobilisation meeting or event 2024-01-02 Lalore Gopalpur;96169
Community awareness/mobilisation meeting or event 2024-01-02 Pungali Sreegobindapur;96215
Community awareness/mobilisation meeting or event 2024-01-02 Pungali Sreegobindapur;96216
Community awareness/mobilisation meeting or event 2024-01-03 Gadola Chak #. 29/TDA;21693
Community awareness/mobilisation meeting or event 2024-01-03 Gadola Tibba Qureshian Wala;21782
Community awareness/mobilisation meeting or event 2024-01-04 Kuhawar Kalan Chak#. 20/TDA;21770
Community awareness/mobilisation meeting or event 2024-01-04 Kuhawar Kalan Chak#. 21/TDA;21771
Community awareness/mobilisation meeting or event 2024-01-05 Botala CHAK NO 040/M.B;21846
Community awareness/mobilisation meeting or event 2024-01-06 Bara Pangashi Sukulhat;96071
Community awareness/mobilisation meeting or event 2024-01-06 Barahar Khama Para;110839
Community awareness/mobilisation meeting or event 2024-01-06 Barahar Khas Char Jamalpur;96065
Community awareness/mobilisation meeting or event 2024-01-06 Botala CHAK NO 040/M.B;21828
Community awareness/mobilisation meeting or event 2024-01-06 Halsa Jhina Para;110836
Community awareness/mobilisation meeting or event 2024-01-06 Halsa Mahesha;96044
Community awareness/mobilisation meeting or event 2024-01-06 Halsa Sultanpur;110833
Community awareness/mobilisation meeting or event 2024-01-06 Hatikumrul Alokdia;96077
Community awareness/mobilisation meeting or event 2024-01-06 Hatikumrul Alokdia;110842
Community awareness/mobilisation meeting or event 2024-01-06 Lakshmipur Kholabaria Kholabaria;96052
Community awareness/mobilisation meeting or event 2024-01-06 Lalore Barabari;96059
Community awareness/mobilisation meeting or event 2024-01-07 Botala CHAK NO 041/M.B;21847
Community awareness/mobilisation meeting or event 2024-01-08 Banwarinagar Madhya Sona Hara;110846
Community awareness/mobilisation meeting or event 2024-01-08 Bara Pangashi Bara Pangashi;110840
Community awareness/mobilisation meeting or event 2024-01-08 Bara Pangashi Bara Pangashi;110860
Community awareness/mobilisation meeting or event 2024-01-08 Barahar Khama Para;73465
Community awareness/mobilisation meeting or event 2024-01-08 Durganagar Konabari;110861
Community awareness/mobilisation meeting or event 2024-01-08 Gadola Tibba Qureshian Wala;21679
Community awareness/mobilisation meeting or event 2024-01-08 Halsa Aorail;110856
Community awareness/mobilisation meeting or event 2024-01-08 Halsa Arjunpur;73457
Community awareness/mobilisation meeting or event 2024-01-08 Halsa Halsa;110857
Community awareness/mobilisation meeting or event 2024-01-08 Halsa Nabin Krishnapur;110834
Community awareness/mobilisation meeting or event 2024-01-08 Jauhrabad MC Jauhrabad MC;21830
Community awareness/mobilisation meeting or event 2024-01-08 Kuhawar Kalan Basti Khokhar;21777
Community awareness/mobilisation meeting or event 2024-01-09 Durganagar Purba Maheshpur;110862
Community awareness/mobilisation meeting or event 2024-01-09 Gadola Tibba Qureshian Wala;21700
Community awareness/mobilisation meeting or event 2024-01-09 Halsa Mahesha;110858
Community awareness/mobilisation meeting or event 2024-01-09 Jauhrabad MC Jauhrabad MC;21849
Community awareness/mobilisation meeting or event 2024-01-09 Kuhawar Kalan Chak# 18/TDA;21768
Community awareness/mobilisation meeting or event 2024-01-09 Lalore Barabari;110859
Community awareness/mobilisation meeting or event 2024-01-09 Pancha Krushi Bannakandi;110863
Community awareness/mobilisation meeting or event 2024-01-10 Bara Pangashi Chaksa;110841
Community awareness/mobilisation meeting or event 2024-01-10 Bara Pangashi Sukulhat;73636
Community awareness/mobilisation meeting or event 2024-01-10 Durganagar Konabari;73637
Community awareness/mobilisation meeting or event 2024-01-10 Halsa Baghrom;110835
Community awareness/mobilisation meeting or event 2024-01-10 Halsa Halsa;110848
Community awareness/mobilisation meeting or event 2024-01-10 Halsa Mahesha;73591
Community awareness/mobilisation meeting or event 2024-01-10 Halsa Nabin Krishnapur;73592
Community awareness/mobilisation meeting or event 2024-01-10 Jauhrabad MC Jauhrabad MC;21831
Community awareness/mobilisation meeting or event 2024-01-10 Joari Kayemkola;73613
Community awareness/mobilisation meeting or event 2024-01-10 Kuhawar Kalan Tibba Khokhran Wala;21780
Community awareness/mobilisation meeting or event 2024-01-10 Lakshmipur Kholabaria Barabaria;110837
Community awareness/mobilisation meeting or event 2024-01-10 Lalore Gopalpur;73614
Community awareness/mobilisation meeting or event 2024-01-10 Narina Narina Uttar Para;110865
Community awareness/mobilisation meeting or event 2024-01-10 Pancha Krushi Kalikanj;110843
Community awareness/mobilisation meeting or event 2024-01-10 Potajia Rautara;110864
Community awareness/mobilisation meeting or event 2024-01-11 Jauhrabad MC Jauhrabad MC;21850
Community awareness/mobilisation meeting or event 2024-01-11 Kuhawar Kalan Daggar Awan;21779
Community awareness/mobilisation meeting or event 2024-01-12 Gadola Chak #. 30/TDA;21673
Community awareness/mobilisation meeting or event 2024-01-12 Jauhrabad MC Jauhrabad MC;21832
Community awareness/mobilisation meeting or event 2024-01-12 Kotla Jam Balochan Wala;21775
Community awareness/mobilisation meeting or event 2024-01-12 Kotla Jam Sheikhan Wala;21785
Community awareness/mobilisation meeting or event 2024-01-13 Gadola Chak #. 30/TDA;21694
Community awareness/mobilisation meeting or event 2024-01-13 Halsa Halsa;73458
Community awareness/mobilisation meeting or event 2024-01-13 Jauhrabad MC Jauhrabad MC;21851
Community awareness/mobilisation meeting or event 2024-01-13 Kuhawar Kalan Basti Barokhan Wali;21776
Community awareness/mobilisation meeting or event 2024-01-13 Pancha Krushi Shahjahanpur;73466
Community awareness/mobilisation meeting or event 2024-01-14 Kuhawar Kalan Daggar Awan;21695
Community awareness/mobilisation meeting or event 2024-01-15 Banwarinagar Uttar Gopal Nagar;110847
Community awareness/mobilisation meeting or event 2024-01-15 Bara Pangashi Bara Pangashi;110849
Community awareness/mobilisation meeting or event 2024-01-15 Jauhrabad MC Jauhrabad MC;21834
Community awareness/mobilisation meeting or event 2024-01-15 Kuhawar Kalan Tibba Khokhran Wala;21786
Community awareness/mobilisation meeting or event 2024-01-16 Barahar Tentulia;73628
Community awareness/mobilisation meeting or event 2024-01-16 Barahar Tentulia;73629
Community awareness/mobilisation meeting or event 2024-01-16 Chamari Bahadurpur Kandi Para;73616
Community awareness/mobilisation meeting or event 2024-01-16 Halsa Jhina Para;73599
Community awareness/mobilisation meeting or event 2024-01-16 Halsa Jhina Para;73600
Community awareness/mobilisation meeting or event 2024-01-16 Hatikumrul Amdanga;73644
Community awareness/mobilisation meeting or event 2024-01-16 Jauhrabad MC Jauhrabad MC;21853
Community awareness/mobilisation meeting or event 2024-01-16 Joari Ahamadpur;73459
Community awareness/mobilisation meeting or event 2024-01-16 Kotla Jam Sandian Wala;21784
Community awareness/mobilisation meeting or event 2024-01-16 Lalore Barabari;73615
Community awareness/mobilisation meeting or event 2024-01-16 Pancha Krushi Bannakandi;73645
Community awareness/mobilisation meeting or event 2024-01-16 Pancha Krushi Betbari;73467
Community awareness/mobilisation meeting or event 2024-01-16 Pancha Krushi Shahjahanpur;73652
Community awareness/mobilisation meeting or event 2024-01-16 Pancha Krushi Shahjahanpur;73653
Community awareness/mobilisation meeting or event 2024-01-17 Banwarinagar Dakhin Sona Hara;110850
Community awareness/mobilisation meeting or event 2024-01-17 Chamari Bahadurpur Kandi Para;110838
Community awareness/mobilisation meeting or event 2024-01-17 Hadali Hadali MC;21835
Community awareness/mobilisation meeting or event 2024-01-17 Halsa Aorail;110828
Community awareness/mobilisation meeting or event 2024-01-17 Halsa Baghrom;110829
Community awareness/mobilisation meeting or event 2024-01-17 Kotla Jam Mohallah Qazian Wala;21781
Community awareness/mobilisation meeting or event 2024-01-17 Pancha Krushi Shahjahanpur;110844
Community awareness/mobilisation meeting or event 2024-01-17 Pungali Sreegobindapur;110845
Community awareness/mobilisation meeting or event 2024-01-18 Gadola Chuni Shumali Nasheb;21823
Community awareness/mobilisation meeting or event 2024-01-18 Gadola Gadola Nasheb;21683
Community awareness/mobilisation meeting or event 2024-01-18 Hadali Hadali MC;21854
Community awareness/mobilisation meeting or event 2024-01-19 Kotla Jam Chuni Shumali Daggar;21778
Community awareness/mobilisation meeting or event 2024-01-19 Kuhawar Kalan Chak#. 19/TDA;21769
Community awareness/mobilisation meeting or event 2024-01-19 Kuhawar Kalan Chak#. 22/TDA;21671
Community awareness/mobilisation meeting or event 2024-01-20 Barahar Tentulia;73468
Community awareness/mobilisation meeting or event 2024-01-20 Botala CHAK NO 044/M.B;21855
Community awareness/mobilisation meeting or event 2024-01-20 Halsa Pale Halsa;96156
Community awareness/mobilisation meeting or event 2024-01-20 Halsa Pale Halsa;73460
Community awareness/mobilisation meeting or event 2024-01-20 Kuhawar Kalan Chak#. 22/TDA;21692
Community awareness/mobilisation meeting or event 2024-01-20 Lakshmipur Kholabaria Kholabaria;96157
Community awareness/mobilisation meeting or event 2024-01-20 Pancha Krushi Bannakandi;96201
Community awareness/mobilisation meeting or event 2024-01-20 Pancha Krushi Betbari;96232
Community awareness/mobilisation meeting or event 2024-01-20 Pancha Krushi Pechar Para;96202
Community awareness/mobilisation meeting or event 2024-01-20 Potajia Bahalbari;96209
Community awareness/mobilisation meeting or event 2024-01-20 Potajia Chara Chithulia;96233
Community awareness/mobilisation meeting or event 2024-01-20 Potajia Rautara;96210
Community awareness/mobilisation meeting or event 2024-01-21 Banwarinagar Dakhin Gopal Nagar;110832
Community awareness/mobilisation meeting or event 2024-01-21 Banwarinagar Uttar Gopal Nagar;110826
Community awareness/mobilisation meeting or event 2024-01-21 Bara Pangashi Bara Pangashi;73631
Community awareness/mobilisation meeting or event 2024-01-21 Bara Pangashi Chaksa;110830
Community awareness/mobilisation meeting or event 2024-01-21 Barahar Durgapur;110815
Community awareness/mobilisation meeting or event 2024-01-21 Barahar Tiarhati;73630
Community awareness/mobilisation meeting or event 2024-01-21 Botala CHAK NO 044/M.B;21837
Community awareness/mobilisation meeting or event 2024-01-21 Durganagar Chamambiganti;73639
Community awareness/mobilisation meeting or event 2024-01-21 Durganagar Nandiganti;73638
Community awareness/mobilisation meeting or event 2024-01-21 Halsa Arjunpur;110805
Community awareness/mobilisation meeting or event 2024-01-21 Halsa Pale Halsa;73601
Community awareness/mobilisation meeting or event 2024-01-21 Hatikumrul Alokdia;110831
Community awareness/mobilisation meeting or event 2024-01-21 Lakshmipur Kholabaria Kholabaria;73602
Community awareness/mobilisation meeting or event 2024-01-21 Lalore Barabari;110809
Community awareness/mobilisation meeting or event 2024-01-21 Pancha Krushi Bannakandi;73646
Community awareness/mobilisation meeting or event 2024-01-21 Pancha Krushi Pechar Para;73647
Community awareness/mobilisation meeting or event 2024-01-21 Pungali Sreegobindapur;110824
Community awareness/mobilisation meeting or event 2024-01-22 Botala CHAK NO 044/M.B;21857
Community awareness/mobilisation meeting or event 2024-01-22 Chamari Bahadurpur Kandi Para;96060
Community awareness/mobilisation meeting or event 2024-01-22 Halsa Nabin Krishnapur;96045
Community awareness/mobilisation meeting or event 2024-01-22 Hatikumrul Amdanga;96078
Community awareness/mobilisation meeting or event 2024-01-22 Joari Ahamadpur;96053
Community awareness/mobilisation meeting or event 2024-01-22 Lakshmipur Kholabaria Kholabaria;96096
Community awareness/mobilisation meeting or event 2024-01-22 Pancha Krushi Shahjahanpur;96084
Community awareness/mobilisation meeting or event 2024-01-23 Barahar Tiarhati;73469
Community awareness/mobilisation meeting or event 2024-01-23 Lalore Gopalpur;73461
Community awareness/mobilisation meeting or event 2024-01-24 Durganagar Chamambiganti;96194
Community awareness/mobilisation meeting or event 2024-01-24 Durganagar Nandiganti;96193
Community awareness/mobilisation meeting or event 2024-01-24 Halsa Baghrom;96225
Community awareness/mobilisation meeting or event 2024-01-24 Halsa Nalkhola;96224
Community awareness/mobilisation meeting or event 2024-01-24 Kuhawar Kalan Chak#. 20/TDA;21668
Community awareness/mobilisation meeting or event 2024-01-24 Kuhawar Kalan Chak#. 20/TDA;21689
Community awareness/mobilisation meeting or event 2024-01-25 Durganagar Chamambiganti;73470
Community awareness/mobilisation meeting or event 2024-01-25 Jauhrabad MC Jauhrabad MC;21845
Community awareness/mobilisation meeting or event 2024-01-25 Lalore Barabari;73462
Community awareness/mobilisation meeting or event 2024-01-27 Bara Pangashi Chaksa;73673
Community awareness/mobilisation meeting or event 2024-01-27 Chamari Bahadurpur Kandi Para;73617
Community awareness/mobilisation meeting or event 2024-01-27 Hatikumrul Alokdia;73674
Community awareness/mobilisation meeting or event 2024-01-27 Kuhawar Kalan Kuhawar Kalan Nasheb;21684
Community awareness/mobilisation meeting or event 2024-01-27 Lakshmipur Kholabaria Barabaria;73463
Community awareness/mobilisation meeting or event 2024-01-27 Narina Narina Uttar Para;73471
Community awareness/mobilisation meeting or event 2024-01-27 Potajia Bahalbari;73654
Community awareness/mobilisation meeting or event 2024-01-27 Potajia Rautara;73655
Community awareness/mobilisation meeting or event 2024-01-27 Pungali Sreegobindapur;73660
Community awareness/mobilisation meeting or event 2024-01-27 Pungali Sreegobindapur;73661
Community awareness/mobilisation meeting or event 2024-01-28 Bara Pangashi Chaksa;96228
Community awareness/mobilisation meeting or event 2024-01-28 Barahar Tentulia;96227
Community awareness/mobilisation meeting or event 2024-01-28 Hatikumrul Amdanga;96230
Community awareness/mobilisation meeting or event 2024-01-28 Kuhawar Kalan Chak#. 20/TDA;21690
Community awareness/mobilisation meeting or event 2024-01-28 Kuhawar Kalan Chak#. 20/TDA;21669
Community awareness/mobilisation meeting or event 2024-01-28 Pancha Krushi Char Pechar para;96231
Community awareness/mobilisation meeting or event 2024-01-28 Potajia Tiorbanda;73472
Community awareness/mobilisation meeting or event 2024-01-28 Pungali Sreegobindapur;73473
Community awareness/mobilisation meeting or event 2024-01-29 Banwarinagar Madhya Sona Hara;96092
Community awareness/mobilisation meeting or event 2024-01-29 Barahar Khama Para;96097
Community awareness/mobilisation meeting or event 2024-01-29 Barahar Tentulia;96066
Community awareness/mobilisation meeting or event 2024-01-29 Botala CHAK NO 043/M.B;21842
Community awareness/mobilisation meeting or event 2024-01-29 Durganagar Konabari;96072
Community awareness/mobilisation meeting or event 2024-01-29 Kotla Jam Sheikhan Wala;21685
Community awareness/mobilisation meeting or event 2024-01-29 Pancha Krushi Char Kaliganj;96083
Community awareness/mobilisation meeting or event 2024-01-29 Potajia Tiorbanda;96088
Community awareness/mobilisation meeting or event 2024-01-30 Banwarinagar Dakhin Gopal Nagar;110827
Community awareness/mobilisation meeting or event 2024-01-30 Banwarinagar Madhya Sona Hara;73474
Community awareness/mobilisation meeting or event 2024-01-30 Banwarinagar Madhya Sona Hara;110825
Community awareness/mobilisation meeting or event 2024-01-30 Barahar Nabanna Para;73475
Community awareness/mobilisation meeting or event 2024-01-30 Halsa Baghrom;110806
Community awareness/mobilisation meeting or event 2024-01-30 Lakshmipur Kholabaria Barabaria;110812
Community awareness/mobilisation meeting or event 2024-01-30 Pancha Krushi Bannakandi;110818
Community awareness/mobilisation meeting or event 2024-01-30 Pancha Krushi Shahjahanpur;110821
Community awareness/mobilisation meeting or event 2024-01-31 Bara Pangashi Bara Pangashi;96186
Community awareness/mobilisation meeting or event 2024-01-31 Barahar Tiarhati;96185
Community awareness/mobilisation meeting or event 2024-01-31 Chamari Bahadurpur Kandi Para;96171
Community awareness/mobilisation meeting or event 2024-01-31 Gadola Chuni Shumali Nasheb;21825
Community awareness/mobilisation meeting or event 2024-01-31 Halsa Chirakhola;96144
Community awareness/mobilisation meeting or event 2024-01-31 Halsa Halsa;96145
Community awareness/mobilisation meeting or event 2024-01-31 Lalore Barabari;96170
Community awareness/mobilisation meeting or event 2024-02-03 Hatikumrul Amdanga;73675
Community awareness/mobilisation meeting or event 2024-02-03 Pancha Krushi Betbari;73677
Community awareness/mobilisation meeting or event 2024-02-03 Pancha Krushi Char Pechar para;73676
Community awareness/mobilisation meeting or event 2024-02-04 Chamari Bahadurpur Kandi Para;96172
Community awareness/mobilisation meeting or event 2024-02-07 Potajia Chara Chithulia;73678
Community awareness/mobilisation meeting or event 2024-02-13 Banwarinagar Madhya Sona Hara;73663
Community awareness/mobilisation meeting or event 2024-02-13 Banwarinagar Uttar Sona Hara;73662
Community awareness/mobilisation meeting or event 2024-02-14 Halsa Mahesha;96146
Community awareness/mobilisation meeting or event 2024-02-14 Halsa Nabin Krishnapur;96147
Community awareness/mobilisation meeting or event 2024-02-17 Hassanpur Tiwana Khurpalka;50072
Community awareness/mobilisation meeting or event 2024-02-19 Chak No. 50 MB CHAK NO 050/M.B;50081
Community awareness/mobilisation meeting or event 2024-02-19 Jauhrabad MC Jauhrabad MC;50074
Community awareness/mobilisation meeting or event 2024-02-20 Jauhrabad MC Jauhrabad MC;50077
Community awareness/mobilisation meeting or event 2024-02-21 Gadola Mohallah Malikan Wala;60933
Community awareness/mobilisation meeting or event 2024-02-21 Kotla Jam Sheikhan Wala;60929
Community awareness/mobilisation meeting or event 2024-02-22 Chak No. 52 MB CHAK NO 053/M.B;50079
Community awareness/mobilisation meeting or event 2024-02-22 Gadola Doulat Wala;60936
Community awareness/mobilisation meeting or event 2024-02-22 Gadola Khichi Kalan;60934
Community awareness/mobilisation meeting or event 2024-02-25 Botala CHAK NO 040/M.B;43495
Community awareness/mobilisation meeting or event 2024-02-26 Botala CHAK NO 040/M.B;43542
Community awareness/mobilisation meeting or event 2024-02-26 Gadola Gadola Dagar City;60937
Community awareness/mobilisation meeting or event 2024-02-29 Chak No. 50 MB CHAK NO 050/M.B;43498
Community awareness/mobilisation meeting or event 2024-03-01 Chak No. 50 MB CHAK NO 050/M.B;43540
Community awareness/mobilisation meeting or event 2024-03-01 Jauhrabad MC Jauhrabad MC;43522
Community awareness/mobilisation meeting or event 2024-03-04 Botala Botala;43502
Community awareness/mobilisation meeting or event 2024-03-05 Botala Botala;43537
Community awareness/mobilisation meeting or event 2024-03-05 Jauhrabad MC Jauhrabad MC;43520
Community awareness/mobilisation meeting or event 2024-03-06 Kotla Jam Hafizabad;60931
Community awareness/mobilisation meeting or event 2024-03-07 Kotla Jam Hayat Colony;60935
Community awareness/mobilisation meeting or event 2024-03-08 Gadola Gadola Dagar City;60908
Community awareness/mobilisation meeting or event 2024-03-08 Jauhrabad MC Jauhrabad MC;44028
Community awareness/mobilisation meeting or event 2024-03-09 Gadola Chak#. 30A/TDA;60938
Community awareness/mobilisation meeting or event 2024-03-09 Gadola Gadola Dagar City;60861
Community awareness/mobilisation meeting or event 2024-03-09 Gadola Kotla Jam Nasheb;60930
Community awareness/mobilisation meeting or event 2024-03-09 Hadali Hadali MC;43505
Community awareness/mobilisation meeting or event 2024-03-12 Botala CHAK NO 040/M.B;59656
Community awareness/mobilisation meeting or event 2024-03-12 Chak No. 50 MB CHAK NO 047/M.B;59658
Community awareness/mobilisation meeting or event 2024-03-12 Hassanpur Tiwana Khurpalka;43514
Community awareness/mobilisation meeting or event 2024-03-13 Hadali Hadali MC;43535
Community awareness/mobilisation meeting or event 2024-03-13 Hassanpur Tiwana Khurpalka;43527
Community awareness/mobilisation meeting or event 2024-03-14 Gadola Gadola Nasheb;60932
Community awareness/mobilisation meeting or event 2024-03-16 Hassanpur Tiwana Hassanpur Tiwana;43509
Community awareness/mobilisation meeting or event 2024-03-17 Chak No. 52 MB CHAK NO 051/M.B.;50080
Community awareness/mobilisation meeting or event 2024-03-17 Hassanpur Tiwana Hassanpur Tiwana;43531
Community awareness/mobilisation meeting or event 2024-03-18 Sandral Hardogag;50075
Community awareness/mobilisation meeting or event 2024-03-19 Chak No. 50 MB CHAK NO 048/M.B;50082
Community awareness/mobilisation meeting or event 2024-03-20 Hadali Hadali MC;50076
Community awareness/mobilisation meeting or event 2024-03-20 Jauhrabad MC Jauhrabad MC;43461
Community awareness/mobilisation meeting or event 2024-03-21 Chak No. 50 MB CHAK NO 045/M.B;50083
Community awareness/mobilisation meeting or event 2024-03-21 Jauhrabad MC Jauhrabad MC;43524
Community awareness/mobilisation meeting or event 2024-03-24 Hadali Hadali MC;43507
Community awareness/mobilisation meeting or event 2024-03-25 Hadali Hadali MC;43533
Community awareness/mobilisation meeting or event 2024-04-01 Kotla Jam Mohallah Sadique e Akbar;60852
Community awareness/mobilisation meeting or event 2024-04-02 Kotla Jam Mohallah Sadique e Akbar;60863
Community awareness/mobilisation meeting or event 2024-04-03 Jauhrabad MC Jauhrabad MC;43512
Community awareness/mobilisation meeting or event 2024-04-03 Kuhawar Kalan Chak# 18/TDA;60860
Community awareness/mobilisation meeting or event 2024-04-03 Kuhawar Kalan Kuhawar Kalan Daggar;60939
Community awareness/mobilisation meeting or event 2024-04-04 Jauhrabad MC Jauhrabad MC;43528
Community awareness/mobilisation meeting or event 2024-04-04 Kuhawar Kalan Chak# 18/TDA;60871
Community awareness/mobilisation meeting or event 2024-04-05 Kuhawar Kalan Daggar Awan;60855
Community awareness/mobilisation meeting or event 2024-04-06 Kuhawar Kalan Daggar Awan;60866
Community awareness/mobilisation meeting or event 2024-04-07 Kuhawar Kalan Chak#. 22/TDA;60857
Community awareness/mobilisation meeting or event 2024-04-08 Kotla Jam Tibba Habib Shah;60940
Community awareness/mobilisation meeting or event 2024-04-08 Kuhawar Kalan Chak#. 22/TDA;60868
Community awareness/mobilisation meeting or event 2024-04-14 Kuhawar Kalan Chak#. 19/TDA;60859
Community awareness/mobilisation meeting or event 2024-04-15 Kuhawar Kalan Chak#. 19/TDA;60870
Community awareness/mobilisation meeting or event 2024-04-16 Kuhawar Kalan Chak#. 20/TDA;60858
Community awareness/mobilisation meeting or event 2024-04-17 Kuhawar Kalan Chak#. 20/TDA;60869
Community awareness/mobilisation meeting or event 2024-04-18 Kotla Jam Mohallah Qazian Wala;60853
Community awareness/mobilisation meeting or event 2024-04-18 Kuhawar Kalan Kuhawar Kalan Daggar;60862
Community awareness/mobilisation meeting or event 2024-04-19 Kotla Jam Mohallah Qazian Wala;60864
Community awareness/mobilisation meeting or event 2024-04-22 Gadola Chak #. 30/TDA;60856
Community awareness/mobilisation meeting or event 2024-04-23 Gadola Mohallah Khokhran Wala;60865
Community awareness/mobilisation meeting or event 2024-04-24 Gadola Mohallah Khokhran Wala;60854
Community awareness/mobilisation meeting or event 2024-04-25 Gadola Chak #. 30/TDA;60867
Community awareness/mobilisation meeting or event 2024-05-17 Chak No. 63 MB CHAK NO 062/M.B;111172
Community awareness/mobilisation meeting or event 2024-05-18 Itakumari Union Bara Hayat Khan;124445
Community awareness/mobilisation meeting or event 2024-05-18 Kalyani Union Fakira;124446
Community awareness/mobilisation meeting or event 2024-05-19 Chak No. 52 MB CHAK NO 051/M.B.;111174
Community awareness/mobilisation meeting or event 2024-05-19 Itakumari Union Satbhita;124444
Community awareness/mobilisation meeting or event 2024-05-19 Kund Kund Shumali;111168
Community awareness/mobilisation meeting or event 2024-05-20 Hassanpur Tiwana Mangur;111167
Community awareness/mobilisation meeting or event 2024-05-25 Botala CHAK NO 040/M.B;111085
Community awareness/mobilisation meeting or event 2024-05-26 Botala CHAK NO 040/M.B;111102
Community awareness/mobilisation meeting or event 2024-05-29 Itakumari Union Itakumari;124470
Community awareness/mobilisation meeting or event 2024-05-29 Jauhrabad MC Jauhrabad MC;111080
Community awareness/mobilisation meeting or event 2024-06-01 Jauhrabad MC Jauhrabad MC;111097
Community awareness/mobilisation meeting or event 2024-06-02 Bajar Bajar Janubi;111176
Community awareness/mobilisation meeting or event 2024-06-02 Botala Botala;111175
Community awareness/mobilisation meeting or event 2024-06-02 Chak No. 50 MB CHAK NO 047/M.B;111177
Community awareness/mobilisation meeting or event 2024-06-03 Botala CHAK NO 041/M.B;111171
Community awareness/mobilisation meeting or event 2024-06-03 Chak No. 63 MB CHAK NO 56/M.B;111170
Community awareness/mobilisation meeting or event 2024-06-03 Gadola Sheikh Nasheb;111012
Community awareness/mobilisation meeting or event 2024-06-03 Kotla Jam Tibba Habib Shah;111013
Community awareness/mobilisation meeting or event 2024-06-03 Kuhawar Kalan Chak#. 22/TDA;110940
Community awareness/mobilisation meeting or event 2024-06-04 Botala CHAK NO 043/M.B;111083
Community awareness/mobilisation meeting or event 2024-06-04 Gadola Janju;111004
Community awareness/mobilisation meeting or event 2024-06-04 Hassanpur Tiwana Hassanpur Tiwana;111169
Community awareness/mobilisation meeting or event 2024-06-04 Kuhawar Kalan Chak#. 22/TDA;110954
Community awareness/mobilisation meeting or event 2024-06-05 Botala CHAK NO 043/M.B;111100
Community awareness/mobilisation meeting or event 2024-06-06 Kuhawar Kalan Kuhawar Kalan Daggar;111005
Community awareness/mobilisation meeting or event 2024-06-06 Kuhawar Kalan Kuhawar Kalan Nasheb;111006
Community awareness/mobilisation meeting or event 2024-06-07 Chak No. 63 MB CHAK NO 062/M.B;111173
Community awareness/mobilisation meeting or event 2024-06-08 Kuhawar Kalan Daggar Awan;110943
Community awareness/mobilisation meeting or event 2024-06-09 Jauhrabad MC Jauhrabad MC;111079
Community awareness/mobilisation meeting or event 2024-06-09 Kuhawar Kalan Daggar Awan;110957
Community awareness/mobilisation meeting or event 2024-06-10 Itakumari Union Hasna;124442
Community awareness/mobilisation meeting or event 2024-06-10 Jauhrabad MC Jauhrabad MC;111096
Community awareness/mobilisation meeting or event 2024-06-11 Kotla Jam Mohallah Sadique e Akbar;110949
Community awareness/mobilisation meeting or event 2024-06-12 Itakumari Union Hasna;124441
Community awareness/mobilisation meeting or event 2024-06-12 Itakumari Union Itakumari;124440
Community awareness/mobilisation meeting or event 2024-06-12 Kotla Jam Mohallah Sadique e Akbar;110963
Community awareness/mobilisation meeting or event 2024-06-12 Mitha Tiwana MC Mitha Tiwana MC;111072
Community awareness/mobilisation meeting or event 2024-06-13 Mitha Tiwana MC Mitha Tiwana MC;111089
Community awareness/mobilisation meeting or event 2024-06-14 Gadola Mohallah Khokhran Wala;110946
Community awareness/mobilisation meeting or event 2024-06-15 Gadola Mohallah Khokhran Wala;110960
Community awareness/mobilisation meeting or event 2024-06-16 Hassanpur Tiwana Hassanpur Tiwana;111081
Community awareness/mobilisation meeting or event 2024-06-17 Hassanpur Tiwana Hassanpur Tiwana;111098
Community awareness/mobilisation meeting or event 2024-06-17 Sandral Namewali;111166
Community awareness/mobilisation meeting or event 2024-06-18 Nari Nari Shumali;111165
Community awareness/mobilisation meeting or event 2024-06-20 Jauhrabad MC Jauhrabad MC;111078
Community awareness/mobilisation meeting or event 2024-06-21 Jauhrabad MC Jauhrabad MC;111095
Community awareness/mobilisation meeting or event 2024-06-22 Itakumari Union Itakumari;124449
Community awareness/mobilisation meeting or event 2024-06-24 Mitha Tiwana Rural Mitha Tiwana Janubi;111071
Community awareness/mobilisation meeting or event 2024-06-25 Mitha Tiwana Rural Mitha Tiwana Janubi;111088
Community awareness/mobilisation meeting or event 2024-07-01 Gadola Mohallah Khokhran Wala;110945
Community awareness/mobilisation meeting or event 2024-07-02 Mitha Tiwana Rural Mitha Tiwana Janubi;111070
Community awareness/mobilisation meeting or event 2024-07-03 Gadola Chak #. 30/TDA;110942
Community awareness/mobilisation meeting or event 2024-07-03 Jauhrabad MC Jauhrabad MC;111077
Community awareness/mobilisation meeting or event 2024-07-04 Gadola Chak #. 30/TDA;110956
Community awareness/mobilisation meeting or event 2024-07-04 Gadola Mohallah Khokhran Wala;110959
Community awareness/mobilisation meeting or event 2024-07-04 Hassanpur Tiwana Khurpalka;111075
Community awareness/mobilisation meeting or event 2024-07-04 Itakumari Union Hasna;124439
Community awareness/mobilisation meeting or event 2024-07-04 Jauhrabad MC Jauhrabad MC;111094
Community awareness/mobilisation meeting or event 2024-07-04 Mitha Tiwana MC Mitha Tiwana MC;111069
Community awareness/mobilisation meeting or event 2024-07-05 Hassanpur Tiwana Khurpalka;111073
Community awareness/mobilisation meeting or event 2024-07-05 Hassanpur Tiwana Khurpalka;111092
Community awareness/mobilisation meeting or event 2024-07-05 Itakumari Union Madhuram;124448
Community awareness/mobilisation meeting or event 2024-07-06 Hassanpur Tiwana Khurpalka;111074
Community awareness/mobilisation meeting or event 2024-07-06 Khushab MC Khushab MC;111076
Community awareness/mobilisation meeting or event 2024-07-07 Gadola Sheikh Daggar;111011
Community awareness/mobilisation meeting or event 2024-07-07 Hadali Hadali MC;111082
Community awareness/mobilisation meeting or event 2024-07-07 Hassanpur Tiwana Khurpalka;111091
Community awareness/mobilisation meeting or event 2024-07-07 Kotla Jam Sheikhan Wala;111010
Community awareness/mobilisation meeting or event 2024-07-07 Kuhawar Kalan Tibba Segeran Wala;111009
Community awareness/mobilisation meeting or event 2024-07-08 Botala CHAK NO 040/M.B;111084
Community awareness/mobilisation meeting or event 2024-07-08 Botala CHAK NO 040/M.B;111101
Community awareness/mobilisation meeting or event 2024-07-10 Khushab MC Khushab MC;111093
Community awareness/mobilisation meeting or event 2024-07-10 Kuhawar Kalan Chak#. 20/TDA;110939
Community awareness/mobilisation meeting or event 2024-07-10 Kuhawar Kalan Daggar Awan;110944
Community awareness/mobilisation meeting or event 2024-07-11 Hassanpur Tiwana Khurpalka;111090
Community awareness/mobilisation meeting or event 2024-07-11 Kuhawar Kalan Chak#. 20/TDA;110953
Community awareness/mobilisation meeting or event 2024-07-11 Kuhawar Kalan Daggar Awan;110958
Community awareness/mobilisation meeting or event 2024-07-12 Hadali Hadali MC;111099
Community awareness/mobilisation meeting or event 2024-07-12 Kotla Jam Mohallah Sadique e Akbar;110950
Community awareness/mobilisation meeting or event 2024-07-13 Gadola Mohallah Peer Farsi;111008
Community awareness/mobilisation meeting or event 2024-07-13 Itakumari Union Sreekanta;124443
Community awareness/mobilisation meeting or event 2024-07-13 Kotla Jam Mohallah Sadique e Akbar;110964
Community awareness/mobilisation meeting or event 2024-07-13 Mitha Tiwana MC Mitha Tiwana MC;111086
Community awareness/mobilisation meeting or event 2024-07-14 Gadola Chak #. 29/TDA;110941
Community awareness/mobilisation meeting or event 2024-07-14 Kotla Jam Mohallah Moheran Wala;111007
Community awareness/mobilisation meeting or event 2024-07-14 Mitha Tiwana Rural Mitha Tiwana Janubi;111087
Community awareness/mobilisation meeting or event 2024-07-15 Gadola Chak #. 29/TDA;110955
Community awareness/mobilisation meeting or event 2024-07-22 Kotla Jam Mohallah Qazian Wala;110947
Community awareness/mobilisation meeting or event 2024-07-23 Gadola Mohallah Khokhran Wala;110951
Community awareness/mobilisation meeting or event 2024-07-23 Kotla Jam Mohallah Qazian Wala;110961
Community awareness/mobilisation meeting or event 2024-07-24 Kuhawar Kalan Chak# 18/TDA;110938
Community awareness/mobilisation meeting or event 2024-07-25 Kuhawar Kalan Chak# 18/TDA;110952
Community awareness/mobilisation meeting or event 2024-07-27 Itakumari Union Itakumari;124447
Community awareness/mobilisation meeting or event 2024-07-28 Kotla Jam Mohallah Qazian Wala;110948
Community awareness/mobilisation meeting or event 2024-07-29 Kotla Jam Mohallah Qazian Wala;110962
Community awareness/mobilisation meeting or event 2024-07-31 Itakumari Union Itakumari;124450
Community awareness/mobilisation meeting or event 2024-08-15 Gadola Chak#. 30A/TDA;124364
Community awareness/mobilisation meeting or event 2024-08-15 Gadola Chak#. 30A/TDA;124372
Community awareness/mobilisation meeting or event 2024-08-15 Gadola Sheikh Daggar;124365
Community awareness/mobilisation meeting or event 2024-08-15 Gadola Sheikh Daggar;124373
Community awareness/mobilisation meeting or event 2024-08-16 Hassanpur Tiwana Hassanpur Tiwana;124318
Community awareness/mobilisation meeting or event 2024-08-16 Hassanpur Tiwana Hassanpur Tiwana;124324
Community awareness/mobilisation meeting or event 2024-08-18 Hassanpur Tiwana Hassanpur Tiwana;124319
Community awareness/mobilisation meeting or event 2024-08-18 Hassanpur Tiwana Hassanpur Tiwana;124325
Community awareness/mobilisation meeting or event 2024-08-18 Kotla Jam Sheikhan Wala;124366
Community awareness/mobilisation meeting or event 2024-08-18 Kotla Jam Sheikhan Wala;124374
Community awareness/mobilisation meeting or event 2024-08-19 Gadola Doulat Wala;124367
Community awareness/mobilisation meeting or event 2024-08-19 Gadola Doulat Wala;124375
Community awareness/mobilisation meeting or event 2024-08-20 Chak No. 50 MB CHAK NO 047/M.B;124326
Community awareness/mobilisation meeting or event 2024-08-20 Chak No. 50 MB CHAK NO 047/M.B;124320
Community awareness/mobilisation meeting or event 2024-08-22 Chak No. 50 MB CHAK NO 045/M.B;124321
Community awareness/mobilisation meeting or event 2024-08-22 Chak No. 50 MB CHAK NO 045/M.B;124327
Community awareness/mobilisation meeting or event 2024-08-22 Gadola Doulat Wala;124368
Community awareness/mobilisation meeting or event 2024-08-22 Gadola Doulat Wala;124376
Community awareness/mobilisation meeting or event 2024-08-27 Gadola Chuni Shumali Nasheb;124369
Community awareness/mobilisation meeting or event 2024-08-27 Gadola Chuni Shumali Nasheb;124377
Community awareness/mobilisation meeting or event 2024-08-27 Hassanpur Tiwana Khurpalka;124322
Community awareness/mobilisation meeting or event 2024-08-27 Hassanpur Tiwana Khurpalka;124328
Community awareness/mobilisation meeting or event 2024-08-29 Gadola Chak#. 30A/TDA;124370
Community awareness/mobilisation meeting or event 2024-08-29 Gadola Chak#. 30A/TDA;124378
Community awareness/mobilisation meeting or event 2024-08-29 Hassanpur Tiwana Mangur;124323
Community awareness/mobilisation meeting or event 2024-08-29 Hassanpur Tiwana Mangur;124329
Community awareness/mobilisation meeting or event 2024-08-30 Jauhrabad MC Jauhrabad MC;124614
Community awareness/mobilisation meeting or event 2024-08-31 Gadola Gadola Dagar City;124371
Community awareness/mobilisation meeting or event 2024-09-03 Chak No. 50 MB CHAK NO 050/M.B;125727
Community awareness/mobilisation meeting or event 2024-09-03 Chak No. 50 MB CHAK NO 050/M.B;125739
Community awareness/mobilisation meeting or event 2024-09-04 Botala CHAK NO 040/M.B;125821
Community awareness/mobilisation meeting or event 2024-09-04 Chak No. 50 MB CHAK NO 050/M.B;125728
Community awareness/mobilisation meeting or event 2024-09-04 Chak No. 50 MB CHAK NO 050/M.B;125740
Community awareness/mobilisation meeting or event 2024-09-04 Kuhawar Kalan Basti Barokhan Wali;126535
Community awareness/mobilisation meeting or event 2024-09-04 Kuhawar Kalan Basti Barokhan Wali;126536
Community awareness/mobilisation meeting or event 2024-09-04 Kuhawar Kalan Basti Barokhan Wali;126547
Community awareness/mobilisation meeting or event 2024-09-04 Kuhawar Kalan Basti Barokhan Wali;126548
Community awareness/mobilisation meeting or event 2024-09-05 Chak No. 50 MB CHAK NO 045/M.B;125822
Community awareness/mobilisation meeting or event 2024-09-08 Chak No. 52 MB CHAK NO 052/M.B;125823
Community awareness/mobilisation meeting or event 2024-09-09 Hassanpur Tiwana Hassanpur Tiwana;125824
Community awareness/mobilisation meeting or event 2024-09-10 Chak No. 63 MB CHAK NO 057/M.B;125729
Community awareness/mobilisation meeting or event 2024-09-10 Chak No. 63 MB CHAK NO 057/M.B;125741
Community awareness/mobilisation meeting or event 2024-09-10 Hassanpur Tiwana Khurpalka;125825
Community awareness/mobilisation meeting or event 2024-09-10 Sandral Khushab Rural;125826
Community awareness/mobilisation meeting or event 2024-09-11 Chak No. 63 MB CHAK NO 057/M.B;125730
Community awareness/mobilisation meeting or event 2024-09-11 Chak No. 63 MB CHAK NO 057/M.B;125742
Community awareness/mobilisation meeting or event 2024-09-11 Kuhawar Kalan Chak# 17/TDA;126549
Community awareness/mobilisation meeting or event 2024-09-11 Kuhawar Kalan Chak# 17/TDA;126550
Community awareness/mobilisation meeting or event 2024-09-11 Kuhawar Kalan Chak# 17/TDA;126538
Community awareness/mobilisation meeting or event 2024-09-11 Kuhawar Kalan Chak# 17/TDA;126537
Community awareness/mobilisation meeting or event 2024-09-13 Chak No. 50 MB CHAK NO 049/M.B;125731
Community awareness/mobilisation meeting or event 2024-09-13 Chak No. 50 MB CHAK NO 049/M.B;125743
Community awareness/mobilisation meeting or event 2024-09-16 Chak No. 50 MB CHAK NO 049/M.B;125732
Community awareness/mobilisation meeting or event 2024-09-16 Chak No. 50 MB CHAK NO 049/M.B;125744
Community awareness/mobilisation meeting or event 2024-09-16 Kuhawar Kalan Kuhawar Kalan Nasheb;126539
Community awareness/mobilisation meeting or event 2024-09-16 Kuhawar Kalan Kuhawar Kalan Nasheb;126540
Community awareness/mobilisation meeting or event 2024-09-16 Kuhawar Kalan Kuhawar Kalan Nasheb;126551
Community awareness/mobilisation meeting or event 2024-09-16 Kuhawar Kalan Kuhawar Kalan Nasheb;126552
Community awareness/mobilisation meeting or event 2024-09-18 Chak No. 52 MB CHAK NO 051/M.B.;125745
Community awareness/mobilisation meeting or event 2024-09-18 Chak No. 52 MB CHAK NO 051/M.B.;125733
Community awareness/mobilisation meeting or event 2024-09-19 Chak No. 52 MB CHAK NO 053/M.B;125734
Community awareness/mobilisation meeting or event 2024-09-19 Chak No. 52 MB CHAK NO 053/M.B;125746
Community awareness/mobilisation meeting or event 2024-09-19 Kotla Jam Sheikhan Wala;126541
Community awareness/mobilisation meeting or event 2024-09-19 Kotla Jam Sheikhan Wala;126542
Community awareness/mobilisation meeting or event 2024-09-19 Kotla Jam Sheikhan Wala;126553
Community awareness/mobilisation meeting or event 2024-09-19 Kotla Jam Sheikhan Wala;126554
Community awareness/mobilisation meeting or event 2024-09-23 Chak No. 52 MB CHAK NO 052/M.B;125747
Community awareness/mobilisation meeting or event 2024-09-23 Chak No. 52 MB CHAK NO 052/M.B;125735
Community awareness/mobilisation meeting or event 2024-09-23 Kotla Jam Chuni Shumali Daggar;126543
Community awareness/mobilisation meeting or event 2024-09-23 Kotla Jam Chuni Shumali Daggar;126555
Community awareness/mobilisation meeting or event 2024-09-24 Chak No. 52 MB CHAK NO 052/M.B;125736
Community awareness/mobilisation meeting or event 2024-09-24 Chak No. 52 MB CHAK NO 052/M.B;125748
Community awareness/mobilisation meeting or event 2024-09-24 Kotla Jam Chuni Shumali Daggar;126544
Community awareness/mobilisation meeting or event 2024-09-24 Kotla Jam Chuni Shumali Daggar;126556
Community awareness/mobilisation meeting or event 2024-09-25 Chak No. 52 MB CHAK NO 052/M.B;125737
Community awareness/mobilisation meeting or event 2024-09-25 Chak No. 52 MB CHAK NO 052/M.B;125749
Community awareness/mobilisation meeting or event 2024-09-26 Gadola Sheikh Daggar;126557
Community awareness/mobilisation meeting or event 2024-09-26 Gadola Sheikh Daggar;126545
Community awareness/mobilisation meeting or event 2024-09-26 Sandral Khushab Rural;125738
Community awareness/mobilisation meeting or event 2024-09-26 Sandral Khushab Rural;125750
Community awareness/mobilisation meeting or event 2024-09-30 Hassanpur Tiwana Hassanpur Tiwana;125820
Community awareness/mobilisation meeting or event 2024-09-30 Kuhawar Kalan Tibba Khokhran Wala;126546
Community awareness/mobilisation meeting or event 2024-09-30 Kuhawar Kalan Tibba Khokhran Wala;126558
Community awareness/mobilisation meeting or event 2024-10-01 Chak No. 50 MB CHAK NO 049/M.B;131078
Community awareness/mobilisation meeting or event 2024-10-01 Gadola Khichi Kalan;130906
Community awareness/mobilisation meeting or event 2024-10-01 Gadola Mohallah Peer Farsi;130905
Community awareness/mobilisation meeting or event 2024-10-01 Gadola Sheikh Daggar;130907
Community awareness/mobilisation meeting or event 2024-10-01 Hassanpur Tiwana Khurpalka;131077
Community awareness/mobilisation meeting or event 2024-10-01 Hassanpur Tiwana Khurpalka;131087
Community awareness/mobilisation meeting or event 2024-10-01 Sandral Shiwala;131086
Community awareness/mobilisation meeting or event 2024-10-02 Kotla Jam Chuni Shumali Daggar;130910
Community awareness/mobilisation meeting or event 2024-10-02 Kotla Jam Sheikhan Wala;130911
Community awareness/mobilisation meeting or event 2024-10-02 Kuhawar Kalan Kuhawar Kalan Daggar;130908
Community awareness/mobilisation meeting or event 2024-10-02 Kuhawar Kalan Tibba Khokhran Wala;130909
Community awareness/mobilisation meeting or event 2024-10-02 Kuhawar Kalan Tibba Segeran Wala;130890
Community awareness/mobilisation meeting or event 2024-10-02 Mitha Tiwana MC Mitha Tiwana MC;131084
Community awareness/mobilisation meeting or event 2024-10-02 Sandral Hardogag;131085
Community awareness/mobilisation meeting or event 2024-10-02 Sandral Kora;131076
Community awareness/mobilisation meeting or event 2024-10-02 Sandral Noor Wana;131075
Community awareness/mobilisation meeting or event 2024-10-03 Gadola Kotla Jam Nasheb;130912
Community awareness/mobilisation meeting or event 2024-10-03 Kotla Jam Mohallah Moheran Wala;130913
Community awareness/mobilisation meeting or event 2024-10-03 Kuhawar Kalan Kuhawar Kalan Daggar;130915
Community awareness/mobilisation meeting or event 2024-10-03 Kuhawar Kalan Kuhawar Kalan Nasheb;130914
Community awareness/mobilisation meeting or event 2024-10-03 Mitha Tiwana MC Mitha Tiwana MC;131071
Community awareness/mobilisation meeting or event 2024-10-03 Mitha Tiwana Rural Mitha Tiwana Janubi;131072
Community awareness/mobilisation meeting or event 2024-10-03 Sandral Kora;131083
Community awareness/mobilisation meeting or event 2024-10-03 Sandral Noor Wana;131082
Community awareness/mobilisation meeting or event 2024-10-03 Sandral Sandral;131073
Community awareness/mobilisation meeting or event 2024-10-03 Sandral Shiwala;131074
Community awareness/mobilisation meeting or event 2024-10-04 Gadola Chuni Shumali Nasheb;130917
Community awareness/mobilisation meeting or event 2024-10-04 Gadola Doulat Wala;130916
Community awareness/mobilisation meeting or event 2024-10-04 Jauhrabad MC Jauhrabad MC;131070
Community awareness/mobilisation meeting or event 2024-10-04 Kuhawar Kalan Chak#. 21/TDA;130891
Community awareness/mobilisation meeting or event 2024-10-04 Sandral Hardogag;131069
Community awareness/mobilisation meeting or event 2024-10-07 Botala Botala;131067
Community awareness/mobilisation meeting or event 2024-10-07 Hadali Hadali MC;131068
Community awareness/mobilisation meeting or event 2024-10-07 Khushab MC Khushab MC;131081
Community awareness/mobilisation meeting or event 2024-10-07 Kuhawar Kalan Basti Barokhan Wali;130918
Community awareness/mobilisation meeting or event 2024-10-07 Kuhawar Kalan Chak# 17/TDA;130919
Community awareness/mobilisation meeting or event 2024-10-07 Kuhawar Kalan Chak#. 20/TDA;130892
Community awareness/mobilisation meeting or event 2024-10-07 Nari Nari Shumali;131080
Community awareness/mobilisation meeting or event 2024-10-08 Kotla Jam Mohallah Qazian Wala;130893
Community awareness/mobilisation meeting or event 2024-10-10 Kuhawar Kalan Chak#. 19/TDA;130894
Community awareness/mobilisation meeting or event 2024-10-11 Kuhawar Kalan Basti Khokhar;130895
Community awareness/mobilisation meeting or event 2024-10-14 Kuhawar Kalan Chak# 18/TDA;130896
Community awareness/mobilisation meeting or event 2024-10-15 Kuhawar Kalan Basti Barokhan Wali;130860
Community awareness/mobilisation meeting or event 2024-10-15 Kuhawar Kalan Basti Barokhan Wali;130861
Community awareness/mobilisation meeting or event 2024-10-15 Kuhawar Kalan Basti Barokhan Wali;130868
Community awareness/mobilisation meeting or event 2024-10-15 Kuhawar Kalan Basti Barokhan Wali;130869
Community awareness/mobilisation meeting or event 2024-10-15 Kuhawar Kalan Tibba Khokhran Wala;130897
Community awareness/mobilisation meeting or event 2024-10-16 Kuhawar Kalan Kuhawar Kalan Nasheb;130898
Community awareness/mobilisation meeting or event 2024-10-16 Sandral Sandral;131039
Community awareness/mobilisation meeting or event 2024-10-16 Sandral Sandral;131031
Community awareness/mobilisation meeting or event 2024-10-17 Kotla Jam Chuni Shumali Daggar;130899
Community awareness/mobilisation meeting or event 2024-10-17 Sandral Sandral;131030
Community awareness/mobilisation meeting or event 2024-10-17 Sandral Sandral;131038
Community awareness/mobilisation meeting or event 2024-10-21 Gadola Chuni Shumali Nasheb;130900
Community awareness/mobilisation meeting or event 2024-10-21 Kotla Jam Sheikhan Wala;130901
Community awareness/mobilisation meeting or event 2024-10-21 Kuhawar Kalan Kuhawar Kalan Nasheb;130862
Community awareness/mobilisation meeting or event 2024-10-21 Kuhawar Kalan Kuhawar Kalan Nasheb;130870
Community awareness/mobilisation meeting or event 2024-10-21 Sandral Kora;131029
Community awareness/mobilisation meeting or event 2024-10-21 Sandral Kora;131037
Community awareness/mobilisation meeting or event 2024-10-22 Gadola Mohallah Peer Farsi;130863
Community awareness/mobilisation meeting or event 2024-10-22 Gadola Mohallah Peer Farsi;130871
Community awareness/mobilisation meeting or event 2024-10-22 Kuhawar Kalan Kuhawar Kalan Daggar;130902
Community awareness/mobilisation meeting or event 2024-10-22 Sandral Kora;131028
Community awareness/mobilisation meeting or event 2024-10-22 Sandral Kora;131036
Community awareness/mobilisation meeting or event 2024-10-23 Kotla Jam Sheikhan Wala;130864
Community awareness/mobilisation meeting or event 2024-10-23 Kotla Jam Sheikhan Wala;130872
Community awareness/mobilisation meeting or event 2024-10-23 Sandral Hardogag;131035
Community awareness/mobilisation meeting or event 2024-10-23 Sandral Hardogag;131027
Community awareness/mobilisation meeting or event 2024-10-24 Kotla Jam Balochan Wala;130904
Community awareness/mobilisation meeting or event 2024-10-24 Kuhawar Kalan Chak# 17/TDA;130903
Community awareness/mobilisation meeting or event 2024-10-25 Gadola Kotla Jam Nasheb;130865
Community awareness/mobilisation meeting or event 2024-10-25 Gadola Kotla Jam Nasheb;130873
Community awareness/mobilisation meeting or event 2024-10-25 Sandral Noor Wana;131026
Community awareness/mobilisation meeting or event 2024-10-25 Sandral Noor Wana;131034
Community awareness/mobilisation meeting or event 2024-10-28 Kotla Jam Mohallah Moheran Wala;130866
Community awareness/mobilisation meeting or event 2024-10-28 Kotla Jam Mohallah Moheran Wala;130874
Community awareness/mobilisation meeting or event 2024-10-29 Sandral Shiwala;131025
Community awareness/mobilisation meeting or event 2024-10-29 Sandral Shiwala;131033
Community awareness/mobilisation meeting or event 2024-10-30 Chak No. 50 MB CHAK NO 045/M.B;131066
Community awareness/mobilisation meeting or event 2024-10-30 Khushab MC Khushab MC;131065
Community awareness/mobilisation meeting or event 2024-10-30 Kuhawar Kalan Chak# 17/TDA;130867
Community awareness/mobilisation meeting or event 2024-10-30 Kuhawar Kalan Chak# 17/TDA;130875
Community awareness/mobilisation meeting or event 2024-10-30 Sandral Sandral;131079
Community awareness/mobilisation meeting or event 2024-10-30 Sandral Sandral;131024
Community awareness/mobilisation meeting or event 2024-10-30 Sandral Sandral;131032
Community awareness/mobilisation meeting or event 2024-11-20 Kund Kund Shumali;141445
Community awareness/mobilisation meeting or event 2024-11-20 Kund Kund Shumali;141432
Community awareness/mobilisation meeting or event 2024-11-20 Kund Kund Shumali;141444
Community awareness/mobilisation meeting or event 2024-11-20 Kund Kund Shumali;141433
Community awareness/mobilisation meeting or event 2024-11-25 Sandral Namewali;141434
Community awareness/mobilisation meeting or event 2024-11-25 Sandral Namewali;141435
Community awareness/mobilisation meeting or event 2024-11-25 Sandral Namewali;141446
Community awareness/mobilisation meeting or event 2024-11-25 Sandral Namewali;141447
Community awareness/mobilisation meeting or event 2024-11-26 Gadola Gadola Dagar City;141356
Community awareness/mobilisation meeting or event 2024-11-26 Kuhawar Kalan Chak# 18/TDA;141354
Community awareness/mobilisation meeting or event 2024-11-26 Kuhawar Kalan Chak#. 22/TDA;141353
Community awareness/mobilisation meeting or event 2024-11-28 Gadola Gadola Dagar City;141357
Community awareness/mobilisation meeting or event 2024-11-28 Kuhawar Kalan Basti Khokhar;141355
Community awareness/mobilisation meeting or event 2024-11-28 Kuhawar Kalan Tibba Segeran Wala;141352
Community awareness/mobilisation meeting or event 2024-11-29 Kuhawar Kalan Chak#. 19/TDA;141351
Community awareness/mobilisation meeting or event 2024-12-02 Chak No. 63 MB CHAK NO 058/M.B;141513
Community awareness/mobilisation meeting or event 2024-12-02 Kuhawar Kalan Chak# 17/TDA;141377
Community awareness/mobilisation meeting or event 2024-12-02 Kuhawar Kalan Chak# 17/TDA;141388
Community awareness/mobilisation meeting or event 2024-12-02 Kund Kund Shumali;141512
Community awareness/mobilisation meeting or event 2024-12-02 Nari Nari Shumali;141515
Community awareness/mobilisation meeting or event 2024-12-02 Sandral Namewali;141514
Community awareness/mobilisation meeting or event 2024-12-03 Chak No. 50 MB CHAK NO 047/M.B;141519
Community awareness/mobilisation meeting or event 2024-12-03 Chak No. 50 MB CHAK NO 048/M.B;141518
Community awareness/mobilisation meeting or event 2024-12-03 Hassanpur Tiwana Thatti Gangeria;141517
Community awareness/mobilisation meeting or event 2024-12-03 Jauhrabad MC Jauhrabad MC;141458
Community awareness/mobilisation meeting or event 2024-12-03 Kuhawar Kalan Basti Barokhan Wali;141370
Community awareness/mobilisation meeting or event 2024-12-03 Kuhawar Kalan Basti Barokhan Wali;141381
Community awareness/mobilisation meeting or event 2024-12-03 Mitha Tiwana MC Mitha Tiwana MC;141516
Community awareness/mobilisation meeting or event 2024-12-05 Botala CHAK NO 044/M.B;21954
Community awareness/mobilisation meeting or event 2024-12-05 Gadola Kotla Jam Nasheb;141375
Community awareness/mobilisation meeting or event 2024-12-05 Gadola Kotla Jam Nasheb;141386
Community awareness/mobilisation meeting or event 2024-12-06 Jauhrabad MC Jauhrabad MC;141459
Community awareness/mobilisation meeting or event 2024-12-06 Kuhawar Kalan Tibba Khokhran Wala;141369
Community awareness/mobilisation meeting or event 2024-12-06 Kuhawar Kalan Tibba Khokhran Wala;141380
Community awareness/mobilisation meeting or event 2024-12-09 Hassanpur Tiwana Thatti Gangeria;141461
Community awareness/mobilisation meeting or event 2024-12-09 Hassanpur Tiwana Thatti Gangeria;141471
Community awareness/mobilisation meeting or event 2024-12-09 Jauhrabad MC Jauhrabad MC;141460
Community awareness/mobilisation meeting or event 2024-12-10 Hassanpur Tiwana Thatti Gangeria;141472
Community awareness/mobilisation meeting or event 2024-12-10 Hassanpur Tiwana Thatti Gangeria;141462
Community awareness/mobilisation meeting or event 2024-12-10 Kuhawar Kalan Kuhawar Kalan Nasheb;141376
Community awareness/mobilisation meeting or event 2024-12-10 Kuhawar Kalan Kuhawar Kalan Nasheb;141387
Community awareness/mobilisation meeting or event 2024-12-11 Kuhawar Kalan Daggar Awan;141374
Community awareness/mobilisation meeting or event 2024-12-11 Kuhawar Kalan Daggar Awan;141385
Community awareness/mobilisation meeting or event 2024-12-12 Chak No. 50 MB CHAK NO 047/M.B;141463
Community awareness/mobilisation meeting or event 2024-12-12 Chak No. 50 MB CHAK NO 047/M.B;141473
Community awareness/mobilisation meeting or event 2024-12-13 Chak No. 50 MB CHAK NO 047/M.B;141464
Community awareness/mobilisation meeting or event 2024-12-13 Chak No. 50 MB CHAK NO 047/M.B;141474
Community awareness/mobilisation meeting or event 2024-12-13 Kotla Jam Sheikhan Wala;141373
Community awareness/mobilisation meeting or event 2024-12-13 Kotla Jam Sheikhan Wala;141384
Community awareness/mobilisation meeting or event 2024-12-16 Gadola Sheikh Daggar;141372
Community awareness/mobilisation meeting or event 2024-12-16 Gadola Sheikh Daggar;141383
Community awareness/mobilisation meeting or event 2024-12-17 Chak No. 63 MB CHAK NO 058/M.B;141465
Community awareness/mobilisation meeting or event 2024-12-17 Chak No. 63 MB CHAK NO 058/M.B;141475
Community awareness/mobilisation meeting or event 2024-12-18 Chak No. 63 MB CHAK NO 058/M.B;141466
Community awareness/mobilisation meeting or event 2024-12-18 Chak No. 63 MB CHAK NO 058/M.B;141476
Community awareness/mobilisation meeting or event 2024-12-18 Gadola Gadola Dagar City;141382
Community awareness/mobilisation meeting or event 2024-12-18 Gadola Gadola Dagar City;141371
Community awareness/mobilisation meeting or event 2024-12-20 Nari Nari Shumali;141467
Community awareness/mobilisation meeting or event 2024-12-20 Nari Nari Shumali;141477
Community awareness/mobilisation meeting or event 2024-12-23 Kotla Jam Chuni Shumali Daggar;141378
Community awareness/mobilisation meeting or event 2024-12-23 Kotla Jam Chuni Shumali Daggar;141389
Community awareness/mobilisation meeting or event 2024-12-23 Nari Nari Shumali;141468
Community awareness/mobilisation meeting or event 2024-12-23 Nari Nari Shumali;141478
Community awareness/mobilisation meeting or event 2024-12-24 Gadola Mohallah Peer Farsi;141379
Community awareness/mobilisation meeting or event 2024-12-24 Gadola Mohallah Peer Farsi;141390
Community awareness/mobilisation meeting or event 2024-12-25 Chak No. 63 MB CHAK NO 063/M.B;141469
Community awareness/mobilisation meeting or event 2024-12-25 Chak No. 63 MB CHAK NO 063/M.B;141479
Community awareness/mobilisation meeting or event 2024-12-26 Chak No. 63 MB CHAK NO 063/M.B;141470
Community awareness/mobilisation meeting or event 2024-12-26 Chak No. 63 MB CHAK NO 063/M.B;141480
Community dialogues 2023-11-02 Bajar Bajar Janubi;21890
Community dialogues 2023-11-02 Bajar Bajar Janubi;21891
Community dialogues 2023-11-02 Mitha Tiwana Rural Mitha Tiwana Janubi;21916
Community dialogues 2023-11-02 Mitha Tiwana Rural Mitha Tiwana Janubi;21917
Community dialogues 2023-11-02 Mitha Tiwana Rural Mitha Tiwana Janubi;21915
Community dialogues 2023-11-02 Mitha Tiwana Rural Mitha Tiwana Janubi;21914
Community dialogues 2023-11-06 Botala Botala;21892
Community dialogues 2023-11-06 Botala Botala;21893
Community dialogues 2023-11-06 Botala CHAK NO 040/M.B;21894
Community dialogues 2023-11-06 Botala CHAK NO 040/M.B;21895
Community dialogues 2023-11-07 Botala CHAK NO 041/M.B;21896
Community dialogues 2023-11-07 Botala CHAK NO 041/M.B;21897
Community dialogues 2023-11-07 Botala CHAK NO 043/M.B;21899
Community dialogues 2023-11-07 Botala CHAK NO 043/M.B;21898
Community dialogues 2023-11-07 Botala CHAK NO 044/M.B;21900
Community dialogues 2023-11-07 Botala CHAK NO 044/M.B;21901
Community dialogues 2023-11-08 Chak No. 50 MB CHAK NO 047/M.B;21902
Community dialogues 2023-11-08 Chak No. 50 MB CHAK NO 047/M.B;21903
Community dialogues 2023-11-08 Hadali Hadali MC;21904
Community dialogues 2023-11-08 Hadali Hadali MC;21905
Community dialogues 2023-11-08 Jauhrabad MC Jauhrabad MC;21908
Community dialogues 2023-11-08 Jauhrabad MC Jauhrabad MC;21909
Community dialogues 2023-11-09 Hassanpur Tiwana Hassanpur Tiwana;21907
Community dialogues 2023-11-09 Hassanpur Tiwana Hassanpur Tiwana;21906
Community dialogues 2023-11-09 Khushab MC Khushab MC;21912
Community dialogues 2023-11-09 Khushab MC Khushab MC;21913
Community dialogues 2023-11-10 Hassanpur Tiwana Joyia;21910
Community dialogues 2023-11-10 Hassanpur Tiwana Joyia;21911
Community dialogues 2023-11-15 Sandral Khushab Rural;21918
Community dialogues 2023-11-15 Sandral Khushab Rural;21919
Community dialogues 2023-12-03 Bara Pangashi Bara Pangashi;96102
Community dialogues 2023-12-03 Bara Pangashi Shuklai;96103
Community dialogues 2023-12-03 Halsa Aorail;96098
Community dialogues 2023-12-03 Halsa Halsa;96099
Community dialogues 2023-12-20 Chamari Bahadurpur Kandi Para;96101
Community dialogues 2023-12-20 Lalore Barabari;96100
Community dialogues 2023-12-20 Pancha Krushi Bannakandi;96104
Community dialogues 2023-12-20 Pancha Krushi Shahjahanpur;96105
Community dialogues 2023-12-21 Banwarinagar Dakhin Gopal Nagar;96107
Community dialogues 2023-12-21 Banwarinagar Uttar Sona Hara;96106
Community dialogues 2024-01-05 Kotla Jam Sandian Wala;21747
Community dialogues 2024-01-05 Kuhawar Kalan Chak#. 21/TDA;21738
Community dialogues 2024-01-20 Kuhawar Kalan Chak#. 19/TDA;21736
Community dialogues 2024-01-20 Kuhawar Kalan Chak#. 20/TDA;21737
Community dialogues 2024-01-21 Kuhawar Kalan Basti Khokhar;21740
Community dialogues 2024-01-21 Kuhawar Kalan Tibba Khokhran Wala;21748
Community dialogues 2024-01-22 Gadola Tibba Qureshian Wala;21745
Community dialogues 2024-01-22 Kuhawar Kalan Tibba Khokhran Wala;21743
Community dialogues 2024-01-23 Kuhawar Kalan Chak# 18/TDA;21735
Community dialogues 2024-01-23 Kuhawar Kalan Daggar Awan;21742
Community dialogues 2024-01-24 Kotla Jam Mohallah Qazian Wala;21744
Community dialogues 2024-01-24 Kotla Jam Mohallah Sadique e Akbar;21746
Community dialogues 2024-01-25 Kotla Jam Chuni Shumali Daggar;21741
Community dialogues 2024-01-25 Kuhawar Kalan Basti Barokhan Wali;21739
Community dialogues 2024-01-27 Joari Ahamadpur;110851
Community dialogues 2024-01-27 Lalore Barabari;110852
Community dialogues 2024-01-28 Durganagar Nandiganti;110853
Community dialogues 2024-01-28 Pancha Krushi Shahjahanpur;110854
Community dialogues 2024-01-31 Banwarinagar Uttar Gopal Nagar;110855
Community dialogues 2024-02-01 Gadola Mohallah Malikan Wala;60896
Community dialogues 2024-02-01 Kotla Jam Sheikhan Wala;60895
Community dialogues 2024-02-13 Chak No. 50 MB CHAK NO 045/M.B;44026
Community dialogues 2024-02-13 Chak No. 50 MB CHAK NO 046/M.B;44024
Community dialogues 2024-02-13 Chak No. 50 MB CHAK NO 048/M.B;44022
Community dialogues 2024-02-13 Chak No. 52 MB CHAK NO 051/M.B.;44015
Community dialogues 2024-02-14 Hassanpur Tiwana Mangur;44002
Community dialogues 2024-02-14 Hassanpur Tiwana Thatti Gangeria;44027
Community dialogues 2024-02-15 Hassanpur Tiwana Khurpalka;44004
Community dialogues 2024-02-19 Gadola Doulat Wala;60903
Community dialogues 2024-02-19 Gadola Khichi Kalan;60898
Community dialogues 2024-02-20 Gadola Gadola Dagar City;60902
Community dialogues 2024-02-20 Kotla Jam Hafizabad;60900
Community dialogues 2024-02-23 Chak No. 52 MB CHAK NO 053/M.B;44012
Community dialogues 2024-02-23 Sandral Shiwala;44000
Community dialogues 2024-02-26 Chak No. 50 MB CHAK NO 050/M.B;44017
Community dialogues 2024-02-28 Sandral Hardogag;44006
Community dialogues 2024-02-29 Chak No. 63 MB CHAK NO 063/M.B;44008
Community dialogues 2024-03-04 Gadola Chak#. 30A/TDA;60905
Community dialogues 2024-03-04 Kotla Jam Hayat Colony;60899
Community dialogues 2024-03-05 Gadola Gadola Nasheb;60901
Community dialogues 2024-03-05 Gadola Kotla Jam Nasheb;60897
Community dialogues 2024-03-18 Gadola Chak #. 29/TDA;60907
Community dialogues 2024-03-18 Kuhawar Kalan Chak#. 22/TDA;60904
Community dialogues 2024-03-19 Gadola Chak #. 30/TDA;60906
Community dialogues 2024-03-19 Kuhawar Kalan Chak# 17/TDA;60894
Community dialogues 2024-05-13 Chak No. 52 MB CHAK NO 051/M.B.;111195
Community dialogues 2024-05-13 Chak No. 52 MB CHAK NO 052/M.B;111196
Community dialogues 2024-05-14 Chak No. 63 MB CHAK NO 56/M.B;111197
Community dialogues 2024-05-15 Chak No. 63 MB CHAK NO 057/M.B;111198
Community dialogues 2024-05-23 Chak No. 63 MB CHAK NO 058/M.B;111199
Community dialogues 2024-05-26 Chak No. 63 MB CHAK NO 059/M.B;111200
Community dialogues 2024-05-27 Sandral Khushab Rural;111201
Community dialogues 2024-05-28 Sandral Kora;111203
Community dialogues 2024-05-28 Sandral Namewali;111202
Community dialogues 2024-05-29 Chak No. 63 MB CHAK NO 062/M.B;111205
Community dialogues 2024-05-29 Gadola Sheikh Nasheb;110990
Community dialogues 2024-05-29 Kotla Jam Tibba Habib Shah;110991
Community dialogues 2024-05-29 Kund Kund Shumali;111206
Community dialogues 2024-05-29 Nari Nari Shumali;111204
Community dialogues 2024-05-30 Gadola Janju;110983
Community dialogues 2024-05-30 Kuhawar Kalan Kuhawar Kalan Daggar;110984
Community dialogues 2024-06-07 Sandral Noor Wana;111207
Community dialogues 2024-06-27 Kuhawar Kalan Kuhawar Kalan Nasheb;110985
Community dialogues 2024-07-01 Gadola Chuni Shumali Nasheb;110982
Community dialogues 2024-07-01 Gadola Sheikh Daggar;110989
Community dialogues 2024-07-01 Kuhawar Kalan Tibba Segeran Wala;110992
Community dialogues 2024-07-02 Kotla Jam Balochan Wala;110981
Community dialogues 2024-07-03 Gadola Mohallah Peer Farsi;110987
Community dialogues 2024-07-03 Kuhawar Kalan Basti Sheikhan wali;110988
Community dialogues 2024-07-04 Kotla Jam Mohallah Moheran Wala;110986
Community dialogues 2024-10-29 Gadola Gadola Dagar City;130889
Community dialogues 2024-10-31 Hadali Hadali MC;131043
Community dialogues 2024-10-31 Hassanpur Tiwana Hassanpur Tiwana;131044
Community dialogues 2024-11-01 Jauhrabad MC Jauhrabad MC;131056
Community dialogues 2024-11-14 Kuhawar Kalan Basti Barokhan Wali;130995
Community dialogues 2024-12-06 Jauhrabad MC Jauhrabad MC;141457
Gender equality training for men and boys 2023-10-19 Bajar Bajar Janubi;14727
Gender equality training for men and boys 2023-10-19 Mitha Tiwana MC Mitha Tiwana MC;14725
Gender equality training for men and boys 2023-10-19 Mitha Tiwana Rural Mitha Tiwana Janubi;14726
Gender equality training for men and boys 2023-10-20 Hadali Hadali MC;14729
Gender equality training for men and boys 2023-10-20 Jauhrabad MC Jauhrabad MC;14728
Gender equality training for men and boys 2023-10-20 Kuhawar Kalan Chak#. 19/TDA;14708
Gender equality training for men and boys 2023-10-20 Kuhawar Kalan Chak#. 20/TDA;14709
Gender equality training for men and boys 2023-10-20 Kuhawar Kalan Chak#. 22/TDA;14707
Gender equality training for men and boys 2023-10-21 Kuhawar Kalan Basti Barokhan Wali;14712
Gender equality training for men and boys 2023-10-21 Kuhawar Kalan Chak# 18/TDA;14711
Gender equality training for men and boys 2023-10-21 Kuhawar Kalan Daggar Awan;14710
Gender equality training for men and boys 2023-10-27 Kuhawar Kalan Basti Khokhar;14713
Gender equality training for men and boys 2023-10-27 Kuhawar Kalan Tibba Khokhran Wala;14714
Gender equality training for men and boys 2023-10-30 Khushab MC Khushab MC;14730
Gender equality training for men and boys 2023-10-30 Kuhawar Kalan Chak# 17/TDA;14715
Gender equality training for men and boys 2023-10-30 Kuhawar Kalan Tibba Segeran Wala;14716
Gender equality training for men and boys 2023-10-30 Nari Nari Shumali;14731
Gender equality training for men and boys 2023-10-31 Botala Botala;14734
Gender equality training for men and boys 2023-10-31 Botala CHAK NO 040/M.B;14732
Gender equality training for men and boys 2023-10-31 Botala CHAK NO 044/M.B;14733
Gender equality training for men and boys 2023-11-14 Botala Botala;21885
Gender equality training for men and boys 2023-11-14 Mitha Tiwana Rural Mitha Tiwana Janubi;21886
Gender equality training for men and boys 2023-11-15 Bajar Bajar Janubi;21887
Gender equality training for men and boys 2023-11-15 Botala CHAK NO 040/M.B;21873
Gender equality training for men and boys 2023-11-15 Mitha Tiwana Rural Mitha Tiwana Janubi;21888
Gender equality training for men and boys 2023-11-16 Botala CHAK NO 043/M.B;21874
Gender equality training for men and boys 2023-11-16 Chak No. 50 MB CHAK NO 047/M.B;21875
Gender equality training for men and boys 2023-11-16 Hadali Hadali MC;21877
Gender equality training for men and boys 2023-11-16 Jauhrabad MC Jauhrabad MC;21878
Gender equality training for men and boys 2023-11-20 Chak No. 50 MB CHAK NO 047/M.B;21876
Gender equality training for men and boys 2023-11-20 Hassanpur Tiwana Hassanpur Tiwana;21879
Gender equality training for men and boys 2023-11-20 Hassanpur Tiwana Joyia;21880
Gender equality training for men and boys 2023-11-20 Hassanpur Tiwana Mangur;21881
Gender equality training for men and boys 2023-11-20 Khushab MC Khushab MC;21882
Gender equality training for men and boys 2023-11-21 Hassanpur Tiwana Khurpalka;21884
Gender equality training for men and boys 2023-11-21 Hassanpur Tiwana Thatti Gangeria;21883
Gender equality training for men and boys 2023-12-04 Barahar Debhalbaria;97765
Gender equality training for men and boys 2023-12-04 Barahar Khama Para;97764
Gender equality training for men and boys 2023-12-04 Barahar Khas Char Jamalpur;97766
Gender equality training for men and boys 2023-12-04 Barahar Tentulia;97767
Gender equality training for men and boys 2023-12-04 Halsa Halsa;97749
Gender equality training for men and boys 2023-12-04 Halsa Mahesha;97750
Gender equality training for men and boys 2023-12-04 Halsa Nalkhola;97751
Gender equality training for men and boys 2023-12-04 Halsa Sultanpur;97748
Gender equality training for men and boys 2023-12-19 Bara Pangashi Bara Pangashi;97768
Gender equality training for men and boys 2023-12-19 Bara Pangashi Chaksa;97769
Gender equality training for men and boys 2023-12-19 Durganagar Par Santala;97770
Gender equality training for men and boys 2023-12-19 Durganagar Par Santala;97771
Gender equality training for men and boys 2023-12-19 Halsa Baghrom;97752
Gender equality training for men and boys 2023-12-19 Halsa Jhina Para;97753
Gender equality training for men and boys 2023-12-19 Joari Ahamadpur;97755
Gender equality training for men and boys 2023-12-19 Lakshmipur Kholabaria Barabaria;97754
Gender equality training for men and boys 2023-12-27 Kotla Jam Mohallah Sadique e Akbar;21712
Gender equality training for men and boys 2023-12-29 Gadola Chak #. 29/TDA;21705
Gender equality training for men and boys 2023-12-29 Gadola Chak #. 30/TDA;21706
Gender equality training for men and boys 2023-12-29 Gadola Tibba Qureshian Wala;21711
Gender equality training for men and boys 2023-12-29 Kotla Jam Mohallah Qazian Wala;21710
Gender equality training for men and boys 2023-12-31 Durganagar Purba Maheshpur;97772
Gender equality training for men and boys 2023-12-31 Hatikumrul Alokdia;97773
Gender equality training for men and boys 2023-12-31 Hatikumrul Amdanga;97774
Gender equality training for men and boys 2023-12-31 Hatikumrul Amdanga;97775
Gender equality training for men and boys 2023-12-31 Itakumari Union Itakumari;95671
Gender equality training for men and boys 2023-12-31 Joari Atghari;97756
Gender equality training for men and boys 2023-12-31 Joari Atghari;97757
Gender equality training for men and boys 2023-12-31 Joari Balia;97758
Gender equality training for men and boys 2023-12-31 Joari Kachuakora;97759
Gender equality training for men and boys 2024-01-03 Chamari Bahadurpur Kandi Para;97763
Gender equality training for men and boys 2024-01-03 Chamari Bahadurpur Kandi Para;97762
Gender equality training for men and boys 2024-01-03 Joari Kayemkola;97760
Gender equality training for men and boys 2024-01-03 Lalore Barabari;97761
Gender equality training for men and boys 2024-01-03 Pancha Krushi Bannakandi;97776
Gender equality training for men and boys 2024-01-03 Pancha Krushi Bannakandi;97777
Gender equality training for men and boys 2024-01-03 Pancha Krushi Char Kaliganj;97779
Gender equality training for men and boys 2024-01-03 Pancha Krushi Pechar Para;97778
Gender equality training for men and boys 2024-01-04 Kuhawar Kalan Chak#. 21/TDA;21704
Gender equality training for men and boys 2024-01-05 Kotla Jam Mohallah Qazian Wala;21728
Gender equality training for men and boys 2024-01-05 Kotla Jam Mohallah Sadique e Akbar;21729
Gender equality training for men and boys 2024-01-08 Banwarinagar Dakhin Gopal Nagar;97785
Gender equality training for men and boys 2024-01-08 Banwarinagar Dakhin Sona Hara;97786
Gender equality training for men and boys 2024-01-08 Banwarinagar Uttar Sona Hara;97787
Gender equality training for men and boys 2024-01-08 Narina Narina Uttar Para;97784
Gender equality training for men and boys 2024-01-08 Potajia Bahalbari;97780
Gender equality training for men and boys 2024-01-08 Potajia Chara Chithulia;97783
Gender equality training for men and boys 2024-01-08 Potajia Rautara;97781
Gender equality training for men and boys 2024-01-08 Potajia Tiorbanda;97782
Gender equality training for men and boys 2024-01-10 Gadola Mohallah Khokhran Wala;21709
Gender equality training for men and boys 2024-01-12 Kotla Jam Balochan Wala;21707
Gender equality training for men and boys 2024-01-16 Kotla Jam Sandian Wala;21713
Gender equality training for men and boys 2024-01-19 Kotla Jam Chuni Shumali Daggar;21708
Gender equality training for men and boys 2024-01-20 Kotla Jam Chuni Shumali Daggar;21724
Gender equality training for men and boys 2024-01-20 Kotla Jam Sandian Wala;21725
Gender equality training for men and boys 2024-01-21 Kuhawar Kalan Basti Barokhan Wali;21714
Gender equality training for men and boys 2024-01-21 Kuhawar Kalan Chak# 17/TDA;21715
Gender equality training for men and boys 2024-01-22 Kuhawar Kalan Chak#. 21/TDA;21719
Gender equality training for men and boys 2024-01-22 Kuhawar Kalan Chak#. 22/TDA;21718
Gender equality training for men and boys 2024-01-23 Botala CHAK NO 041/M.B;21863
Gender equality training for men and boys 2024-01-23 Botala CHAK NO 043/M.B;21864
Gender equality training for men and boys 2024-01-23 Hassanpur Tiwana Thatti Gangeria;21872
Gender equality training for men and boys 2024-01-23 Kuhawar Kalan Basti Khokhar;21733
Gender equality training for men and boys 2024-01-23 Kuhawar Kalan Basti Khokhar;21734
Gender equality training for men and boys 2024-01-23 Kuhawar Kalan Tibba Khokhran Wala;21732
Gender equality training for men and boys 2024-01-24 Hassanpur Tiwana Hassanpur Tiwana;21868
Gender equality training for men and boys 2024-01-24 Hassanpur Tiwana Joyia;21869
Gender equality training for men and boys 2024-01-24 Hassanpur Tiwana Mangur;21871
Gender equality training for men and boys 2024-01-24 Kuhawar Kalan Chak# 18/TDA;21727
Gender equality training for men and boys 2024-01-24 Kuhawar Kalan Daggar Awan;21726
Gender equality training for men and boys 2024-01-25 Chak No. 50 MB CHAK NO 045/M.B;21865
Gender equality training for men and boys 2024-01-25 Chak No. 50 MB CHAK NO 045/M.B;21866
Gender equality training for men and boys 2024-01-25 Chak No. 50 MB CHAK NO 048/M.B;21867
Gender equality training for men and boys 2024-01-25 Kuhawar Kalan Chak#. 19/TDA;21716
Gender equality training for men and boys 2024-01-25 Kuhawar Kalan Chak#. 20/TDA;21717
Gender equality training for men and boys 2024-01-26 Gadola Chak #. 29/TDA;21720
Gender equality training for men and boys 2024-01-26 Gadola Chak #. 30/TDA;21721
Gender equality training for men and boys 2024-01-26 Gadola Mohallah Khokhran Wala;21731
Gender equality training for men and boys 2024-01-26 Gadola Tibba Qureshian Wala;21730
Gender equality training for men and boys 2024-01-26 Hassanpur Tiwana Khurpalka;21870
Gender equality training for men and boys 2024-01-27 Kotla Jam Balochan Wala;21722
Gender equality training for men and boys 2024-01-27 Kotla Jam Sheikhan Wala;21723
Gender equality training for men and boys 2024-01-30 Itakumari Union Itakumari;95672
Gender equality training for men and boys 2024-02-04 Itakumari Union Itakumari;95673
Gender equality training for men and boys 2024-02-13 Chak No. 63 MB CHAK NO 059/M.B;43567
Gender equality training for men and boys 2024-02-14 Chak No. 52 MB CHAK NO 052/M.B;43572
Gender equality training for men and boys 2024-02-16 Chak No. 50 MB CHAK NO 046/M.B;43579
Gender equality training for men and boys 2024-02-16 Chak No. 50 MB CHAK NO 050/M.B;43576
Gender equality training for men and boys 2024-02-16 Chak No. 50 MB CHAK NO 050/M.B;43578
Gender equality training for men and boys 2024-02-21 Chak No. 50 MB CHAK NO 050/M.B;43869
Gender equality training for men and boys 2024-02-21 Chak No. 52 MB CHAK NO 051/M.B.;43870
Gender equality training for men and boys 2024-02-21 Chak No. 63 MB CHAK NO 058/M.B;43568
Gender equality training for men and boys 2024-02-21 Chak No. 63 MB CHAK NO 058/M.B;43594
Gender equality training for men and boys 2024-02-21 Chak No. 63 MB CHAK NO 059/M.B;52016
Gender equality training for men and boys 2024-02-21 Gadola Mohallah Malikan Wala;60873
Gender equality training for men and boys 2024-02-21 Kotla Jam Sheikhan Wala;60872
Gender equality training for men and boys 2024-02-22 Chak No. 52 MB CHAK NO 052/M.B;43867
Gender equality training for men and boys 2024-02-22 Chak No. 52 MB CHAK NO 053/M.B;43868
Gender equality training for men and boys 2024-02-22 Gadola Doulat Wala;60880
Gender equality training for men and boys 2024-02-22 Gadola Khichi Kalan;60875
Gender equality training for men and boys 2024-02-23 Chak No. 50 MB CHAK NO 045/M.B;43592
Gender equality training for men and boys 2024-02-23 Chak No. 63 MB CHAK NO 063/M.B;43590
Gender equality training for men and boys 2024-02-24 Sandral Hardogag;43586
Gender equality training for men and boys 2024-02-24 Sandral Shiwala;43587
Gender equality training for men and boys 2024-02-26 Sandral Shiwala;43544
Gender equality training for men and boys 2024-03-03 Chak No. 52 MB CHAK NO 053/M.B;43571
Gender equality training for men and boys 2024-03-06 Kotla Jam Hafizabad;60877
Gender equality training for men and boys 2024-03-07 Kotla Jam Hayat Colony;60876
Gender equality training for men and boys 2024-03-09 Gadola Chak #. 30/TDA;60881
Gender equality training for men and boys 2024-03-09 Gadola Kotla Jam Nasheb;60874
Gender equality training for men and boys 2024-03-14 Gadola Gadola Dagar City;60879
Gender equality training for men and boys 2024-03-14 Gadola Gadola Nasheb;60878
Gender equality training for men and boys 2024-03-20 Gadola Chak#. 30A/TDA;60890
Gender equality training for men and boys 2024-03-20 Gadola Doulat Wala;60888
Gender equality training for men and boys 2024-03-20 Gadola Khichi Kalan;60889
Gender equality training for men and boys 2024-03-20 Gadola Kotla Jam Nasheb;60891
Gender equality training for men and boys 2024-03-23 Gadola Mohallah Malikan Wala;60883
Gender equality training for men and boys 2024-03-23 Kotla Jam Sheikhan Wala;60882
Gender equality training for men and boys 2024-03-28 Gadola Gadola Dagar City;60886
Gender equality training for men and boys 2024-03-28 Gadola Gadola Nasheb;60887
Gender equality training for men and boys 2024-03-29 Kotla Jam Hafizabad;60885
Gender equality training for men and boys 2024-03-29 Kotla Jam Hayat Colony;60884
Gender equality training for men and boys 2024-04-01 Sandral Hardogag;43565
Gender equality training for men and boys 2024-04-02 Chak No. 52 MB CHAK NO 051/M.B.;43575
Gender equality training for men and boys 2024-04-02 Chak No. 63 MB CHAK NO 063/M.B;43566
Gender equality training for men and boys 2024-05-13 Chak No. 63 MB CHAK NO 057/M.B;111144
Gender equality training for men and boys 2024-05-13 Sandral Noor Wana;111137
Gender equality training for men and boys 2024-05-16 Chak No. 50 MB CHAK NO 048/M.B;111146
Gender equality training for men and boys 2024-05-16 Sandral Namewali;111139
Gender equality training for men and boys 2024-05-21 Chak No. 63 MB CHAK NO 062/M.B;111151
Gender equality training for men and boys 2024-05-21 Kund Kund Shumali;111149
Gender equality training for men and boys 2024-05-21 Sandral Kora;111141
Gender equality training for men and boys 2024-05-22 Sandral Namewali;111148
Gender equality training for men and boys 2024-05-23 Sandral Kora;111147
Gender equality training for men and boys 2024-06-03 Kotla Jam Tibba Habib Shah;110965
Gender equality training for men and boys 2024-06-03 Nari Nari Shumali;111138
Gender equality training for men and boys 2024-06-04 Chak No. 63 MB CHAK NO 56/M.B;111145
Gender equality training for men and boys 2024-06-05 Sandral Khushab Rural;111142
Gender equality training for men and boys 2024-06-06 Chak No. 63 MB CHAK NO 062/M.B;111143
Gender equality training for men and boys 2024-06-24 Chak No. 63 MB CHAK NO 56/M.B;111150
Gender equality training for men and boys 2024-06-26 Gadola Janju;110966
Gender equality training for men and boys 2024-06-26 Gadola Sheikh Nasheb;110968
Gender equality training for men and boys 2024-06-26 Kotla Jam Mohallah Moheran Wala;110967
Gender equality training for men and boys 2024-06-28 Kuhawar Kalan Kuhawar Kalan Nasheb;110969
Gender equality training for men and boys 2024-07-01 Kund Kund Shumali;111140
Gender equality training for men and boys 2024-07-03 Gadola Mohallah Peer Farsi;110971
Gender equality training for men and boys 2024-07-03 Kuhawar Kalan Basti Sheikhan wali;110970
Gender equality training for men and boys 2024-07-04 Gadola Janju;110975
Gender equality training for men and boys 2024-07-04 Kuhawar Kalan Kuhawar Kalan Daggar;110972
Gender equality training for men and boys 2024-07-13 Gadola Sheikh Daggar;110973
Gender equality training for men and boys 2024-07-13 Kotla Jam Chuni Shumali Daggar;110974
Gender equality training for men and boys 2024-07-30 Gadola Chuni Shumali Nasheb;110978
Gender equality training for men and boys 2024-07-30 Kotla Jam Mohallah Moheran Wala;110977
Gender equality training for men and boys 2024-07-30 Kuhawar Kalan Kuhawar Kalan Daggar;110976
Gender equality training for men and boys 2024-07-31 Kotla Jam Tibba Habib Shah;110979
Gender equality training for men and boys 2024-09-05 Chak No. 50 MB CHAK NO 048/M.B;125813
Gender equality training for men and boys 2024-09-06 Hassanpur Tiwana Hassanpur Tiwana;125814
Gender equality training for men and boys 2024-09-30 Chak No. 50 MB CHAK NO 050/M.B;125815
Gender equality training for men and boys 2024-09-30 Jauhrabad MC Jauhrabad MC;125816
Gender equality training for men and boys 2024-10-01 Gadola Khichi Kalan;130878
Gender equality training for men and boys 2024-10-01 Sandral Hardogag;131054
Gender equality training for men and boys 2024-10-01 Sandral Noor Wana;131055
Gender equality training for men and boys 2024-10-02 Kuhawar Kalan Tibba Khokhran Wala;130879
Gender equality training for men and boys 2024-10-02 Sandral Kora;131053
Gender equality training for men and boys 2024-10-03 Bajar Bajar Janubi;131051
Gender equality training for men and boys 2024-10-03 Gadola Chuni Shumali Nasheb;130880
Gender equality training for men and boys 2024-10-03 Khushab MC Khushab MC;131050
Gender equality training for men and boys 2024-10-03 Kuhawar Kalan Basti Barokhan Wali;130881
Gender equality training for men and boys 2024-10-03 Sandral Sandral;131052
Gender equality training for men and boys 2024-10-04 Botala Botala;131049
Gender equality training for men and boys 2024-10-04 Chak No. 63 MB CHAK NO 062/M.B;131048
Gender equality training for men and boys 2024-10-04 Gadola Kotla Jam Nasheb;130882
Gender equality training for men and boys 2024-10-07 Nari Nari Shumali;131047
Gender equality training for men and boys 2024-10-30 Gadola Mohallah Khokhran Wala;130884
Gender equality training for men and boys 2024-10-30 Kotla Jam Hafizabad;130885
Gender equality training for men and boys 2024-10-30 Kotla Jam Sheikhan Wala;130883
Gender equality training for men and boys 2024-10-31 Chak No. 63 MB CHAK NO 56/M.B;131046
Gender equality training for men and boys 2024-10-31 Kotla Jam Balochan Wala;130888
Gender equality training for men and boys 2024-10-31 Kotla Jam Mohallah Moheran Wala;130886
Gender equality training for men and boys 2024-10-31 Kuhawar Kalan Chak#. 22/TDA;130887
Gender equality training for men and boys 2024-10-31 Mitha Tiwana MC Mitha Tiwana MC;131045
Gender equality training for men and boys 2024-11-01 Kotla Jam Hayat Colony;130997
Gender equality training for men and boys 2024-11-01 Kotla Jam Mohallah Sadique e Akbar;130996
Gender equality training for men and boys 2024-11-04 Kotla Jam Chuni Shumali Daggar;130998
Gender equality training for men and boys 2024-11-04 Kotla Jam Mohallah Qazian Wala;130999
Gender equality training for men and boys 2024-12-02 Kund Kund Shumali;141520
Gender equality training for men and boys 2024-12-02 Sandral Namewali;141521
Gender equality training for men and boys 2024-12-03 Chak No. 50 MB CHAK NO 047/M.B;141523
Gender equality training for men and boys 2024-12-03 Chak No. 50 MB CHAK NO 048/M.B;141522
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-09 Kuhawar Kalan Chak#. 21/TDA;21810
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-10 Kuhawar Kalan Chak#. 21/TDA;21792
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-13 Kuhawar Kalan Chak# 18/TDA;21805
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-14 Kuhawar Kalan Chak# 18/TDA;21787
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-17 Kuhawar Kalan Chak# 18/TDA;21806
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-18 Kuhawar Kalan Chak# 18/TDA;21788
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Banwarinagar Dakhin Gopal Nagar;73776
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Banwarinagar Dakhin Sona Hara;73774
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Banwarinagar Madhya Sona Hara;73773
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Banwarinagar Uttar Gopal Nagar;73775
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Banwarinagar Uttar Sona Hara;73772
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Bara Pangashi Bara Pangashi;73741
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Bara Pangashi Bara Pangashi;73742
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Bara Pangashi Chaksa;73743
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Bara Pangashi Chaksa;73744
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Bara Pangashi Shuklai;73745
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Bara Pangashi Sukulhat;73746
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Debhalbaria;73733
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Durgapur;73734
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Durgapur;73735
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Khama Para;73729
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Khama Para;73730
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Khama Para;73731
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Khama Para;73732
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Khas Char Jamalpur;73737
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Khas Char Jamalpur;73736
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Nabanna Para;73728
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Tentulia;73738
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Tentulia;73739
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Barahar Tiarhati;73740
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Durganagar Chamambiganti;73749
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Durganagar Konabari;73747
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Durganagar Nandiganti;73748
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Durganagar Par Santala;73750
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Durganagar Purba Maheshpur;73751
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Aorail;73693
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Arjunpur;73698
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Baghrom;73705
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Baghrom;73706
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Balakandi;73707
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Balarampur;73708
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Chirakhola;73699
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Gouripur;73697
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Halsa;73700
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Jhina Para;73709
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Jhina Para;73710
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Mahesha;73701
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Nabin Krishnapur;73702
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Nabin Krishnapur;73703
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Nalkhola;73704
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Pale Halsa;73711
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Sultanpur;73696
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Sultanpur;73695
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Halsa Sultanpur;73694
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Hatikumrul Alokdia;73752
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Hatikumrul Alokdia;73753
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Kuhawar Kalan Chak#. 19/TDA;21807
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Lakshmipur Kholabaria Kholabaria;73712
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Lakshmipur Kholabaria Kholabaria;73713
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Pungali Sreegobindapur;73770
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-21 Pungali Sreegobindapur;73771
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Chamari Bahadurpur Kandi Para;73726
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Chamari Bahadurpur Kandi Para;73727
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Hatikumrul Amdanga;73754
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Joari Ahamadpur;73716
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Joari Ahamadpur;73717
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Joari Atghari;73718
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Joari Atghari;73719
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Joari Balia;73720
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Joari Kachuakora;73721
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Joari Kayemkola;73723
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Joari Kayemkola;73722
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Kuhawar Kalan Chak#. 19/TDA;21789
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Lakshmipur Kholabaria Kholabaria;73714
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Lakshmipur Kholabaria Kholabaria;73715
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Lalore Barabari;73725
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Lalore Gopalpur;73724
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Narina Narina Uttar Para;73769
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Bannakandi;73755
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Bannakandi;73756
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Betbari;73758
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Char Kaliganj;73761
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Kalikanj;73759
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Kalikanj;73760
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Pechar Para;73757
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Shahjahanpur;73762
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Pancha Krushi Shahjahanpur;73763
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Potajia Bahalbari;73764
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Potajia Chara Chithulia;73767
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Potajia Rautara;73765
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Potajia Rautara;73766
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-22 Potajia Tiorbanda;73768
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-25 Kotla Jam Mohallah Qazian Wala;21818
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-26 Kotla Jam Mohallah Qazian Wala;21800
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-29 Kotla Jam Mohallah Sadique e Akbar;21822
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-11-30 Kotla Jam Mohallah Sadique e Akbar;21804
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-03 Kotla Jam Mohallah Sadique e Akbar;21820
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-04 Kotla Jam Mohallah Sadique e Akbar;21802
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-05 Halsa Aorail;73680
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-05 Halsa Arjunpur;73681
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-05 Halsa Baghrom;73683
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-05 Halsa Nalkhola;73682
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-07 Kotla Jam Mohallah Sadique e Akbar;21821
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-08 Kotla Jam Mohallah Sadique e Akbar;21803
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-08 Mitha Tiwana Rural Mitha Tiwana Janubi;21988
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-09 Bara Pangashi Chaksa;73686
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-09 Barahar Tentulia;73685
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-09 Hatikumrul Alokdia;73687
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-09 Lakshmipur Kholabaria Barabaria;73684
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-09 Mitha Tiwana Rural Mitha Tiwana Janubi;21971
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-12 Hatikumrul Amdanga;73688
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-12 Pancha Krushi Betbari;73690
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-12 Pancha Krushi Char Pechar para;73689
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-12 Potajia Chara Chithulia;73691
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-13 Kuhawar Kalan Daggar Awan;21814
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-13 Mitha Tiwana Rural Mitha Tiwana Janubi;21992
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-14 Kuhawar Kalan Daggar Awan;21796
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-14 Mitha Tiwana Rural Mitha Tiwana Janubi;21975
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-18 Kuhawar Kalan Daggar Awan;21815
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-19 Kuhawar Kalan Daggar Awan;21797
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-20 Mitha Tiwana Rural Mitha Tiwana Janubi;21995
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-21 Mitha Tiwana Rural Mitha Tiwana Janubi;21979
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-22 Kuhawar Kalan Daggar Awan;21816
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-22 Mitha Tiwana Rural Mitha Tiwana Janubi;21997
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-23 Kuhawar Kalan Daggar Awan;21798
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-23 Mitha Tiwana Rural Mitha Tiwana Janubi;21981
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-24 Botala Botala;21982
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-24 Botala Botala;21998
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-26 Botala CHAK NO 040/M.B;21999
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-28 Kuhawar Kalan Tibba Khokhran Wala;21817
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-28 Mitha Tiwana Rural Mitha Tiwana Janubi;22000
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-29 Kuhawar Kalan Tibba Khokhran Wala;21799
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-29 Mitha Tiwana Rural Mitha Tiwana Janubi;21984
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-30 Bajar Bajar Janubi;21985
Labour market relevant lifelihood skills training for women/girls and men/boys 2023-12-30 Bajar Bajar Janubi;22002
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-02 Gadola Chak #. 29/TDA;21812
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-03 Gadola Chak #. 29/TDA;21794
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-04 Botala CHAK NO 040/M.B;21986
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-05 Botala CHAK NO 040/M.B;21969
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-05 Botala CHAK NO 040/M.B;21983
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-06 Banwarinagar Dakhin Gopal Nagar;73692
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-06 Botala CHAK NO 041/M.B;21987
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-07 Botala CHAK NO 041/M.B;21970
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-08 Gadola Tibba Qureshian Wala;21819
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-08 Jauhrabad MC Jauhrabad MC;21989
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-09 Gadola Tibba Qureshian Wala;21801
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-09 Jauhrabad MC Jauhrabad MC;21972
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-10 Jauhrabad MC Jauhrabad MC;21990
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-11 Jauhrabad MC Jauhrabad MC;21973
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-12 Gadola Chak #. 30/TDA;21813
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-12 Jauhrabad MC Jauhrabad MC;21991
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-13 Gadola Chak #. 30/TDA;21795
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-13 Jauhrabad MC Jauhrabad MC;21974
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-15 Jauhrabad MC Jauhrabad MC;21993
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-16 Jauhrabad MC Jauhrabad MC;21976
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-17 Hadali Hadali MC;21994
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-18 Hadali Hadali MC;21977
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-19 Kuhawar Kalan Chak#. 22/TDA;21811
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-20 Botala CHAK NO 043/M.B;21978
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-20 Kuhawar Kalan Chak#. 22/TDA;21793
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-21 Botala CHAK NO 044/M.B;21996
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-22 Botala CHAK NO 044/M.B;21980
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-24 Kuhawar Kalan Chak#. 20/TDA;21808
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-24 Kuhawar Kalan Chak#. 20/TDA;21790
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-28 Kuhawar Kalan Chak#. 20/TDA;21791
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-28 Kuhawar Kalan Chak#. 20/TDA;21809
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-01-29 Botala CHAK NO 043/M.B;22001
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-02-23 Botala CHAK NO 040/M.B;50107
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-02-25 Botala CHAK NO 040/M.B;50135
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-02-26 Botala CHAK NO 040/M.B;50122
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-02-27 Chak No. 50 MB CHAK NO 050/M.B;50105
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-02-29 Chak No. 50 MB CHAK NO 050/M.B;50134
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-01 Chak No. 50 MB CHAK NO 050/M.B;50121
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-02 Botala Botala;50104
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-04 Botala Botala;50133
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-05 Botala Botala;50120
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-07 Hadali Hadali MC;50102
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-09 Hadali Hadali MC;50132
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-10 Hassanpur Tiwana Khurpalka;50097
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-12 Hassanpur Tiwana Khurpalka;50126
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-13 Hadali Hadali MC;50118
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-13 Hassanpur Tiwana Khurpalka;50112
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-14 Hassanpur Tiwana Hassanpur Tiwana;50100
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-16 Hassanpur Tiwana Hassanpur Tiwana;50130
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-17 Hassanpur Tiwana Hassanpur Tiwana;50115
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-18 Jauhrabad MC Jauhrabad MC;52014
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-20 Jauhrabad MC Jauhrabad MC;50125
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-21 Jauhrabad MC Jauhrabad MC;50110
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-22 Hadali Hadali MC;52015
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-24 Hadali Hadali MC;50131
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-25 Hadali Hadali MC;50117
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-03-29 Kotla Jam Mohallah Sadique e Akbar;60943
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-01 Kotla Jam Mohallah Sadique e Akbar;60959
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-01 Kuhawar Kalan Chak# 18/TDA;60949
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-02 Kotla Jam Mohallah Sadique e Akbar;60950
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-03 Jauhrabad MC Jauhrabad MC;50129
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-03 Kuhawar Kalan Chak# 18/TDA;60967
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-03 Kuhawar Kalan Daggar Awan;60945
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-04 Jauhrabad MC Jauhrabad MC;50114
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-04 Kuhawar Kalan Chak# 18/TDA;60958
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-05 Kuhawar Kalan Chak#. 22/TDA;60946
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-05 Kuhawar Kalan Daggar Awan;60962
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-06 Kuhawar Kalan Daggar Awan;60953
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-07 Kuhawar Kalan Chak#. 19/TDA;60948
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-07 Kuhawar Kalan Chak#. 22/TDA;60964
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-08 Kuhawar Kalan Chak#. 22/TDA;60955
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-14 Kuhawar Kalan Chak#. 19/TDA;60966
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-14 Kuhawar Kalan Chak#. 20/TDA;60947
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-15 Kuhawar Kalan Chak#. 19/TDA;60957
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-16 Kotla Jam Mohallah Qazian Wala;60944
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-16 Kuhawar Kalan Chak#. 20/TDA;60965
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-17 Kuhawar Kalan Chak#. 20/TDA;60956
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-18 Kotla Jam Mohallah Qazian Wala;60960
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-19 Kotla Jam Mohallah Qazian Wala;60951
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-22 Gadola Chak #. 30/TDA;60963
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-23 Gadola Mohallah Khokhran Wala;60952
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-24 Gadola Mohallah Khokhran Wala;60961
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-04-25 Gadola Chak #. 30/TDA;60954
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-05-25 Botala CHAK NO 040/M.B;111136
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-05-26 Botala CHAK NO 040/M.B;111119
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-05-26 Botala CHAK NO 040/M.B;111224
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-05-29 Jauhrabad MC Jauhrabad MC;111131
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-01 Jauhrabad MC Jauhrabad MC;111114
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-01 Jauhrabad MC Jauhrabad MC;111219
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-03 Kuhawar Kalan Chak#. 22/TDA;111042
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-03 Kuhawar Kalan Chak#. 22/TDA;111055
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-04 Botala CHAK NO 043/M.B;111134
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-04 Kuhawar Kalan Chak#. 22/TDA;111029
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-05 Botala CHAK NO 043/M.B;111117
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-05 Botala CHAK NO 043/M.B;111222
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-08 Kuhawar Kalan Daggar Awan;111045
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-08 Kuhawar Kalan Daggar Awan;111058
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-09 Jauhrabad MC Jauhrabad MC;111130
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-09 Kuhawar Kalan Daggar Awan;111032
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-10 Jauhrabad MC Jauhrabad MC;111113
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-10 Jauhrabad MC Jauhrabad MC;111218
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-11 Kotla Jam Mohallah Sadique e Akbar;111051
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-11 Kotla Jam Mohallah Sadique e Akbar;111064
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-12 Kotla Jam Mohallah Sadique e Akbar;111038
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-12 Mitha Tiwana MC Mitha Tiwana MC;111123
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-13 Mitha Tiwana MC Mitha Tiwana MC;111106
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-13 Mitha Tiwana MC Mitha Tiwana MC;111211
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-14 Gadola Mohallah Khokhran Wala;111048
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-14 Gadola Mohallah Khokhran Wala;111061
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-15 Gadola Mohallah Khokhran Wala;111035
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-16 Hassanpur Tiwana Hassanpur Tiwana;111132
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-17 Hassanpur Tiwana Hassanpur Tiwana;111115
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-17 Hassanpur Tiwana Hassanpur Tiwana;111220
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-20 Jauhrabad MC Jauhrabad MC;111129
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-21 Jauhrabad MC Jauhrabad MC;111112
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-21 Jauhrabad MC Jauhrabad MC;111217
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-24 Mitha Tiwana Rural Mitha Tiwana Janubi;111122
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-25 Mitha Tiwana Rural Mitha Tiwana Janubi;111105
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-06-25 Mitha Tiwana Rural Mitha Tiwana Janubi;111210
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-01 Gadola Mohallah Khokhran Wala;111060
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-01 Gadola Mohallah Khokhran Wala;111047
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-02 Mitha Tiwana Rural Mitha Tiwana Janubi;111121
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-03 Gadola Chak #. 30/TDA;111044
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-03 Gadola Chak #. 30/TDA;111057
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-03 Jauhrabad MC Jauhrabad MC;111128
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-04 Gadola Chak #. 30/TDA;111031
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-04 Gadola Mohallah Khokhran Wala;111034
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-04 Hassanpur Tiwana Khurpalka;111126
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-04 Jauhrabad MC Jauhrabad MC;111111
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-04 Jauhrabad MC Jauhrabad MC;111216
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-04 Mitha Tiwana MC Mitha Tiwana MC;111120
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-05 Hassanpur Tiwana Khurpalka;111109
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-05 Hassanpur Tiwana Khurpalka;111124
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-05 Hassanpur Tiwana Khurpalka;111214
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-06 Hassanpur Tiwana Khurpalka;111125
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-06 Khushab MC Khushab MC;111127
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-07 Hadali Hadali MC;111133
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-07 Hassanpur Tiwana Khurpalka;111213
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-07 Hassanpur Tiwana Khurpalka;111108
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-08 Botala CHAK NO 040/M.B;111118
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-08 Botala CHAK NO 040/M.B;111135
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-08 Botala CHAK NO 040/M.B;111223
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-10 Khushab MC Khushab MC;111110
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-10 Khushab MC Khushab MC;111215
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-10 Kuhawar Kalan Chak#. 20/TDA;111041
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-10 Kuhawar Kalan Chak#. 20/TDA;111054
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-10 Kuhawar Kalan Daggar Awan;111059
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-10 Kuhawar Kalan Daggar Awan;111046
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-11 Hassanpur Tiwana Khurpalka;111107
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-11 Hassanpur Tiwana Khurpalka;111212
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-11 Kuhawar Kalan Chak#. 20/TDA;111028
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-11 Kuhawar Kalan Daggar Awan;111033
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-12 Hadali Hadali MC;111116
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-12 Hadali Hadali MC;111221
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-12 Kotla Jam Mohallah Sadique e Akbar;111052
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-12 Kotla Jam Mohallah Sadique e Akbar;111065
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-13 Kotla Jam Mohallah Sadique e Akbar;111039
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-13 Mitha Tiwana MC Mitha Tiwana MC;111208
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-13 Mitha Tiwana MC Mitha Tiwana MC;111103
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-14 Gadola Chak #. 29/TDA;111043
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-14 Gadola Chak #. 29/TDA;111056
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-14 Mitha Tiwana Rural Mitha Tiwana Janubi;111104
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-14 Mitha Tiwana Rural Mitha Tiwana Janubi;111209
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-15 Gadola Chak #. 29/TDA;111030
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-22 Kotla Jam Mohallah Qazian Wala;111049
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-22 Kotla Jam Mohallah Qazian Wala;111062
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-23 Kotla Jam Mohallah Qazian Wala;111036
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-24 Kuhawar Kalan Chak# 18/TDA;111053
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-24 Kuhawar Kalan Chak# 18/TDA;111040
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-25 Kuhawar Kalan Chak# 18/TDA;111027
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-28 Kotla Jam Mohallah Qazian Wala;111050
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-28 Kotla Jam Mohallah Qazian Wala;111063
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-07-29 Kotla Jam Mohallah Qazian Wala;111037
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-15 Gadola Chak#. 30A/TDA;124400
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-15 Gadola Sheikh Daggar;124401
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-15 Hassanpur Tiwana Hassanpur Tiwana;124348
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-15 Hassanpur Tiwana Hassanpur Tiwana;124336
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-15 Hassanpur Tiwana Hassanpur Tiwana;124342
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-16 Gadola Chak#. 30A/TDA;124386
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-16 Gadola Chak#. 30A/TDA;124393
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-16 Gadola Sheikh Daggar;124387
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-16 Gadola Sheikh Daggar;124394
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-17 Hassanpur Tiwana Hassanpur Tiwana;124337
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-17 Hassanpur Tiwana Hassanpur Tiwana;124343
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-17 Hassanpur Tiwana Hassanpur Tiwana;124349
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-17 Kotla Jam Sheikhan Wala;124388
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-17 Kotla Jam Sheikhan Wala;124395
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-18 Kotla Jam Sheikhan Wala;124402
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-19 Chak No. 50 MB CHAK NO 047/M.B;124338
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-19 Chak No. 50 MB CHAK NO 047/M.B;124344
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-19 Chak No. 50 MB CHAK NO 047/M.B;124350
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-19 Chak No. 50 MB CHAK NO 050/M.B;124351
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-19 Gadola Doulat Wala;124403
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-20 Gadola Doulat Wala;124396
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-20 Gadola Doulat Wala;124389
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-20 Hadali Hadali MC;124353
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-20 Hassanpur Tiwana Hassanpur Tiwana;124352
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-21 Chak No. 50 MB CHAK NO 045/M.B;124339
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-21 Chak No. 50 MB CHAK NO 045/M.B;124345
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-21 Chak No. 50 MB CHAK NO 045/M.B;124354
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-21 Gadola Doulat Wala;124390
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-21 Gadola Doulat Wala;124397
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-22 Gadola Doulat Wala;124404
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-22 Hassanpur Tiwana Khurpalka;124356
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-22 Khushab MC Khushab MC;124355
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-26 Gadola Chuni Shumali Nasheb;124391
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-26 Gadola Chuni Shumali Nasheb;124398
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-26 Hassanpur Tiwana Khurpalka;124340
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-26 Hassanpur Tiwana Khurpalka;124346
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-26 Hassanpur Tiwana Khurpalka;124357
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-27 Gadola Chuni Shumali Nasheb;124405
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-28 Gadola Chak#. 30A/TDA;124399
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-28 Gadola Chak#. 30A/TDA;124392
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-28 Hassanpur Tiwana Mangur;124341
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-28 Hassanpur Tiwana Mangur;124347
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-28 Hassanpur Tiwana Mangur;124358
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-29 Gadola Chak#. 30A/TDA;124406
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-30 Jauhrabad MC Jauhrabad MC;124615
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-08-31 Gadola Gadola Dagar City;124407
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-02 Kuhawar Kalan Basti Barokhan Wali;126603
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-02 Kuhawar Kalan Basti Barokhan Wali;126591
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-02 Kuhawar Kalan Basti Barokhan Wali;126579
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-03 Chak No. 50 MB CHAK NO 050/M.B;125751
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-03 Chak No. 50 MB CHAK NO 050/M.B;125777
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-03 Chak No. 50 MB CHAK NO 050/M.B;125789
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-03 Kuhawar Kalan Basti Barokhan Wali;126580
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-03 Kuhawar Kalan Basti Barokhan Wali;126592
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-03 Kuhawar Kalan Basti Barokhan Wali;126604
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-04 Botala CHAK NO 040/M.B;125771
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-04 Chak No. 50 MB CHAK NO 050/M.B;125790
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-04 Chak No. 50 MB CHAK NO 050/M.B;125752
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-04 Chak No. 50 MB CHAK NO 050/M.B;125778
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-04 Kuhawar Kalan Basti Barokhan Wali;126559
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-04 Kuhawar Kalan Basti Barokhan Wali;126560
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-04 Kuhawar Kalan Chak#. 22/TDA;126572
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-05 Chak No. 50 MB CHAK NO 045/M.B;125772
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-05 Chak No. 50 MB CHAK NO 048/M.B;125763
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-05 Chak No. 50 MB CHAK NO 050/M.B;125768
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-05 Gadola Gadola Dagar City;126571
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-05 Jauhrabad MC Jauhrabad MC;125767
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-05 Kuhawar Kalan Basti Barokhan Wali;126573
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-06 Hassanpur Tiwana Hassanpur Tiwana;125764
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-06 Hassanpur Tiwana Hassanpur Tiwana;125769
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-08 Chak No. 52 MB CHAK NO 052/M.B;125773
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-09 Hassanpur Tiwana Hassanpur Tiwana;125774
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-09 Kuhawar Kalan Chak# 17/TDA;126581
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-09 Kuhawar Kalan Chak# 17/TDA;126593
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-09 Kuhawar Kalan Chak# 17/TDA;126605
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-10 Chak No. 63 MB CHAK NO 057/M.B;125791
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-10 Chak No. 63 MB CHAK NO 057/M.B;125779
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-10 Chak No. 63 MB CHAK NO 057/M.B;125753
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-10 Hassanpur Tiwana Khurpalka;125775
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-10 Kuhawar Kalan Chak# 17/TDA;126582
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-10 Kuhawar Kalan Chak# 17/TDA;126594
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-10 Kuhawar Kalan Chak# 17/TDA;126606
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-10 Sandral Khushab Rural;125776
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-11 Chak No. 63 MB CHAK NO 057/M.B;125792
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-11 Chak No. 63 MB CHAK NO 057/M.B;125780
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-11 Chak No. 63 MB CHAK NO 057/M.B;125754
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-11 Kuhawar Kalan Chak# 17/TDA;126561
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-11 Kuhawar Kalan Chak# 17/TDA;126562
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-12 Kuhawar Kalan Kuhawar Kalan Nasheb;126583
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-12 Kuhawar Kalan Kuhawar Kalan Nasheb;126595
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-12 Kuhawar Kalan Kuhawar Kalan Nasheb;126607
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-13 Chak No. 50 MB CHAK NO 049/M.B;125755
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-13 Chak No. 50 MB CHAK NO 049/M.B;125781
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-13 Chak No. 50 MB CHAK NO 049/M.B;125793
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-13 Kuhawar Kalan Kuhawar Kalan Nasheb;126608
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-13 Kuhawar Kalan Kuhawar Kalan Nasheb;126584
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-13 Kuhawar Kalan Kuhawar Kalan Nasheb;126596
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-16 Chak No. 50 MB CHAK NO 049/M.B;125756
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-16 Chak No. 50 MB CHAK NO 049/M.B;125782
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-16 Chak No. 50 MB CHAK NO 049/M.B;125794
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-16 Kuhawar Kalan Kuhawar Kalan Nasheb;126563
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-16 Kuhawar Kalan Kuhawar Kalan Nasheb;126564
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-17 Kotla Jam Sheikhan Wala;126609
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-17 Kotla Jam Sheikhan Wala;126597
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-17 Kotla Jam Sheikhan Wala;126585
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-18 Chak No. 52 MB CHAK NO 051/M.B.;125757
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-18 Chak No. 52 MB CHAK NO 053/M.B;125783
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-18 Chak No. 52 MB CHAK NO 053/M.B;125795
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-18 Kotla Jam Sheikhan Wala;126586
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-18 Kotla Jam Sheikhan Wala;126598
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-18 Kotla Jam Sheikhan Wala;126610
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-19 Chak No. 52 MB CHAK NO 051/M.B.;125784
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-19 Chak No. 52 MB CHAK NO 051/M.B.;125796
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-19 Chak No. 52 MB CHAK NO 053/M.B;125758
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-19 Kotla Jam Sheikhan Wala;126566
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-19 Kotla Jam Sheikhan Wala;126565
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-20 Kotla Jam Chuni Shumali Daggar;126587
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-20 Kotla Jam Chuni Shumali Daggar;126599
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-20 Kotla Jam Chuni Shumali Daggar;126611
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-23 Chak No. 52 MB CHAK NO 052/M.B;125759
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-23 Chak No. 52 MB CHAK NO 052/M.B;125785
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-23 Chak No. 52 MB CHAK NO 052/M.B;125797
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-23 Kotla Jam Chuni Shumali Daggar;126600
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-23 Kotla Jam Chuni Shumali Daggar;126567
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-23 Kotla Jam Chuni Shumali Daggar;126588
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-23 Kuhawar Kalan Basti Barokhan Wali;126574
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-24 Chak No. 52 MB CHAK NO 052/M.B;125760
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-24 Chak No. 52 MB CHAK NO 052/M.B;125786
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-24 Chak No. 52 MB CHAK NO 052/M.B;125798
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-24 Kotla Jam Chuni Shumali Daggar;126568
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-24 Kotla Jam Chuni Shumali Daggar;126612
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-24 Kuhawar Kalan Chak#. 19/TDA;126576
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-24 Kuhawar Kalan Kuhawar Kalan Daggar;126575
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-25 Chak No. 52 MB CHAK NO 052/M.B;125761
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-25 Kuhawar Kalan Daggar Awan;126578
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-25 Kuhawar Kalan Kuhawar Kalan Nasheb;126577
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-26 Gadola Sheikh Daggar;126569
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-26 Gadola Sheikh Daggar;126613
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-26 Sandral Khushab Rural;125762
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-27 Chak No. 52 MB CHAK NO 052/M.B;125788
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-27 Chak No. 52 MB CHAK NO 052/M.B;125800
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-27 Gadola Sheikh Daggar;126589
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-27 Gadola Sheikh Daggar;126601
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-27 Kuhawar Kalan Tibba Khokhran Wala;126590
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-27 Kuhawar Kalan Tibba Khokhran Wala;126602
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-27 Sandral Khushab Rural;125787
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-27 Sandral Khushab Rural;125799
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-30 Chak No. 50 MB CHAK NO 050/M.B;125765
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-30 Hassanpur Tiwana Hassanpur Tiwana;125770
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-30 Jauhrabad MC Jauhrabad MC;125766
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-30 Kuhawar Kalan Tibba Khokhran Wala;126570
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-09-30 Kuhawar Kalan Tibba Khokhran Wala;126614
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Chak No. 50 MB CHAK NO 049/M.B;131143
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Gadola Khichi Kalan;130946
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Gadola Khichi Kalan;130974
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Gadola Mohallah Peer Farsi;130973
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Gadola Sheikh Daggar;130975
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Hassanpur Tiwana Khurpalka;131142
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Hassanpur Tiwana Khurpalka;131152
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Sandral Hardogag;131127
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Sandral Noor Wana;131128
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-01 Sandral Shiwala;131151
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Kotla Jam Chuni Shumali Daggar;130978
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Kotla Jam Sheikhan Wala;130979
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Kuhawar Kalan Kuhawar Kalan Daggar;130976
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Kuhawar Kalan Tibba Khokhran Wala;130947
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Kuhawar Kalan Tibba Khokhran Wala;130977
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Kuhawar Kalan Tibba Segeran Wala;130958
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Mitha Tiwana MC Mitha Tiwana MC;131149
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Sandral Hardogag;131150
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Sandral Kora;131126
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Sandral Kora;131141
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-02 Sandral Noor Wana;131140
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Bajar Bajar Janubi;131124
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Gadola Chuni Shumali Nasheb;130948
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Gadola Kotla Jam Nasheb;130980
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Khushab MC Khushab MC;131123
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Kotla Jam Mohallah Moheran Wala;130981
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Kuhawar Kalan Basti Barokhan Wali;130949
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Kuhawar Kalan Kuhawar Kalan Daggar;130983
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Kuhawar Kalan Kuhawar Kalan Nasheb;130982
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Mitha Tiwana MC Mitha Tiwana MC;131136
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Mitha Tiwana Rural Mitha Tiwana Janubi;131137
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Sandral Kora;131148
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Sandral Noor Wana;131147
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Sandral Sandral;131138
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Sandral Sandral;131125
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-03 Sandral Shiwala;131139
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-04 Botala Botala;131122
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-04 Chak No. 63 MB CHAK NO 062/M.B;131121
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-04 Gadola Chuni Shumali Nasheb;130985
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-04 Gadola Doulat Wala;130984
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-04 Gadola Kotla Jam Nasheb;130950
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-04 Jauhrabad MC Jauhrabad MC;131135
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-04 Kuhawar Kalan Chak#. 21/TDA;130959
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-04 Sandral Hardogag;131134
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-07 Botala Botala;131132
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-07 Hadali Hadali MC;131133
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-07 Khushab MC Khushab MC;131146
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-07 Kuhawar Kalan Basti Barokhan Wali;130986
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-07 Kuhawar Kalan Chak# 17/TDA;130987
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-07 Kuhawar Kalan Chak#. 20/TDA;130960
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-07 Nari Nari Shumali;131120
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-07 Nari Nari Shumali;131145
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-08 Kotla Jam Mohallah Qazian Wala;130961
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-09 Jauhrabad MC Jauhrabad MC;131115
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-10 Kuhawar Kalan Chak#. 19/TDA;130962
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-11 Kuhawar Kalan Basti Khokhar;130963
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-14 Kuhawar Kalan Chak# 18/TDA;130964
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-15 Kuhawar Kalan Basti Barokhan Wali;130936
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-15 Kuhawar Kalan Basti Barokhan Wali;130937
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-15 Kuhawar Kalan Tibba Khokhran Wala;130965
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-16 Kuhawar Kalan Basti Barokhan Wali;131019
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-16 Kuhawar Kalan Basti Barokhan Wali;130929
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-16 Kuhawar Kalan Basti Barokhan Wali;130921
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-16 Kuhawar Kalan Kuhawar Kalan Nasheb;130966
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-16 Sandral Sandral;131095
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-16 Sandral Sandral;131103
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-16 Sandral Sandral;131112
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-17 Kotla Jam Chuni Shumali Daggar;130967
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-17 Kuhawar Kalan Basti Barokhan Wali;130920
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-17 Kuhawar Kalan Basti Barokhan Wali;130928
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-17 Kuhawar Kalan Basti Barokhan Wali;131020
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-17 Sandral Sandral;131111
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-17 Sandral Sandral;131094
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-17 Sandral Sandral;131102
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-18 Gadola Mohallah Peer Farsi;131016
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-18 Kuhawar Kalan Kuhawar Kalan Nasheb;130922
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-18 Kuhawar Kalan Kuhawar Kalan Nasheb;130930
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-21 Gadola Chuni Shumali Nasheb;130968
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-21 Gadola Mohallah Peer Farsi;130923
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-21 Gadola Mohallah Peer Farsi;130931
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-21 Kotla Jam Sheikhan Wala;130969
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-21 Kuhawar Kalan Kuhawar Kalan Nasheb;130938
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-21 Sandral Kora;131093
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-21 Sandral Kora;131101
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-21 Sandral Kora;131110
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-22 Gadola Mohallah Peer Farsi;130939
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-22 Kuhawar Kalan Kuhawar Kalan Daggar;130970
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-22 Kuhawar Kalan Kuhawar Kalan Nasheb;131017
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-22 Sandral Kora;131109
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-22 Sandral Kora;131100
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-22 Sandral Kora;131092
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-23 Gadola Kotla Jam Nasheb;131015
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-23 Kotla Jam Sheikhan Wala;130940
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-23 Sandral Hardogag;131108
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-24 Gadola Kotla Jam Nasheb;130924
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-24 Gadola Kotla Jam Nasheb;130932
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-24 Kotla Jam Balochan Wala;130972
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-24 Kotla Jam Sheikhan Wala;131018
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-24 Kuhawar Kalan Chak# 17/TDA;130971
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-24 Sandral Noor Wana;131091
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-24 Sandral Noor Wana;131099
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-25 Gadola Kotla Jam Nasheb;130941
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-25 Kotla Jam Sheikhan Wala;130925
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-25 Kotla Jam Sheikhan Wala;130933
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-25 Sandral Hardogag;131090
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-25 Sandral Hardogag;131098
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-25 Sandral Noor Wana;131107
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-28 Kotla Jam Mohallah Moheran Wala;130942
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-28 Kuhawar Kalan Chak# 17/TDA;131021
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-28 Sandral Sandral;131089
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-28 Sandral Sandral;131097
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-29 Gadola Gadola Dagar City;130957
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-29 Kotla Jam Mohallah Moheran Wala;131014
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-29 Kuhawar Kalan Basti Barokhan Wali;130944
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-29 Kuhawar Kalan Chak# 17/TDA;130926
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-29 Kuhawar Kalan Chak# 17/TDA;130934
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-29 Sandral Shiwala;131106
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Chak No. 50 MB CHAK NO 045/M.B;131131
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Gadola Mohallah Khokhran Wala;130952
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Khushab MC Khushab MC;131130
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Kotla Jam Hafizabad;130953
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Kotla Jam Mohallah Moheran Wala;130927
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Kotla Jam Mohallah Moheran Wala;130935
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Kotla Jam Sheikhan Wala;130951
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Kuhawar Kalan Chak# 17/TDA;130943
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Sandral Sandral;131144
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Sandral Sandral;131105
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Sandral Shiwala;131088
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-30 Sandral Shiwala;131096
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-31 Chak No. 63 MB CHAK NO 56/M.B;131119
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-31 Hadali Hadali MC;131116
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-31 Hassanpur Tiwana Hassanpur Tiwana;131117
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-31 Kotla Jam Balochan Wala;130956
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-31 Kotla Jam Mohallah Moheran Wala;130945
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-31 Kotla Jam Mohallah Moheran Wala;130954
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-31 Kuhawar Kalan Chak#. 22/TDA;130955
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-10-31 Mitha Tiwana MC Mitha Tiwana MC;131118
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-01 Jauhrabad MC Jauhrabad MC;131113
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-01 Jauhrabad MC Jauhrabad MC;131129
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-01 Kotla Jam Hayat Colony;130991
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-01 Kotla Jam Mohallah Sadique e Akbar;130990
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-04 Jauhrabad MC Jauhrabad MC;131114
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-04 Kotla Jam Chuni Shumali Daggar;130992
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-04 Kotla Jam Mohallah Qazian Wala;130993
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-05 Jauhrabad MC Jauhrabad MC;131153
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-14 Kuhawar Kalan Basti Barokhan Wali;130989
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-15 Kuhawar Kalan Chak# 17/TDA;130988
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-18 Khushab MC Khushab MC;141452
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-18 Kund Kund Shumali;141436
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-18 Kund Kund Shumali;141440
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-19 Kund Kund Shumali;141437
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-19 Kund Kund Shumali;141441
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-20 Kund Kund Shumali;141449
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-20 Kund Kund Shumali;141448
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-21 Sandral Namewali;141438
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-21 Sandral Namewali;141442
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-22 Sandral Namewali;141439
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-22 Sandral Namewali;141443
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-25 Sandral Namewali;141450
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-25 Sandral Namewali;141451
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-26 Gadola Gadola Dagar City;141429
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-26 Kuhawar Kalan Chak# 18/TDA;141427
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-26 Kuhawar Kalan Chak#. 22/TDA;141426
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-28 Gadola Gadola Dagar City;141430
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-28 Kuhawar Kalan Basti Khokhar;141428
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-28 Kuhawar Kalan Tibba Segeran Wala;141425
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-11-29 Kuhawar Kalan Chak#. 19/TDA;141424
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-02 Chak No. 63 MB CHAK NO 058/M.B;141540
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-02 Kuhawar Kalan Chak# 17/TDA;141421
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-02 Kund Kund Shumali;141539
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-02 Kund Kund Shumali;141547
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-02 Nari Nari Shumali;141542
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-02 Sandral Namewali;141541
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-02 Sandral Namewali;141548
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Chak No. 50 MB CHAK NO 047/M.B;141546
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Chak No. 50 MB CHAK NO 047/M.B;141550
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Chak No. 50 MB CHAK NO 048/M.B;141545
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Chak No. 50 MB CHAK NO 048/M.B;141549
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Hassanpur Tiwana Thatti Gangeria;141544
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Jauhrabad MC Jauhrabad MC;141535
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Kuhawar Kalan Basti Barokhan Wali;141414
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Kuhawar Kalan Chak# 17/TDA;141399
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Kuhawar Kalan Chak# 17/TDA;141410
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-03 Mitha Tiwana MC Mitha Tiwana MC;141543
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-04 Kuhawar Kalan Basti Barokhan Wali;141392
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-04 Kuhawar Kalan Basti Barokhan Wali;141403
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-05 Gadola Kotla Jam Nasheb;141419
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-06 Gadola Kotla Jam Nasheb;141397
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-06 Gadola Kotla Jam Nasheb;141408
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-06 Jauhrabad MC Jauhrabad MC;141536
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-06 Jauhrabad MC Jauhrabad MC;141534
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-06 Kuhawar Kalan Tibba Khokhran Wala;141413
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-07 Kuhawar Kalan Tibba Khokhran Wala;141391
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-07 Kuhawar Kalan Tibba Khokhran Wala;141402
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-09 Hassanpur Tiwana Thatti Gangeria;141491
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-09 Hassanpur Tiwana Thatti Gangeria;141501
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-09 Hassanpur Tiwana Thatti Gangeria;141524
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-09 Jauhrabad MC Jauhrabad MC;141537
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-10 Hassanpur Tiwana Thatti Gangeria;141525
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-10 Hassanpur Tiwana Thatti Gangeria;141502
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-10 Hassanpur Tiwana Thatti Gangeria;141492
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-10 Kuhawar Kalan Kuhawar Kalan Nasheb;141420
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-11 Kuhawar Kalan Daggar Awan;141418
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-11 Kuhawar Kalan Kuhawar Kalan Nasheb;141398
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-11 Kuhawar Kalan Kuhawar Kalan Nasheb;141409
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-12 Chak No. 50 MB CHAK NO 047/M.B;141493
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-12 Chak No. 50 MB CHAK NO 047/M.B;141503
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-12 Chak No. 50 MB CHAK NO 047/M.B;141526
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-12 Kuhawar Kalan Daggar Awan;141407
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-12 Kuhawar Kalan Daggar Awan;141396
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-13 Chak No. 50 MB CHAK NO 047/M.B;141504
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-13 Chak No. 50 MB CHAK NO 047/M.B;141527
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-13 Chak No. 50 MB CHAK NO 047/M.B;141494
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-13 Jauhrabad MC Jauhrabad MC;141538
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-13 Kotla Jam Sheikhan Wala;141417
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-16 Gadola Sheikh Daggar;141416
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-16 Kotla Jam Sheikhan Wala;141395
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-16 Kotla Jam Sheikhan Wala;141406
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-17 Chak No. 63 MB CHAK NO 058/M.B;141528
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-17 Chak No. 63 MB CHAK NO 058/M.B;141495
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-17 Chak No. 63 MB CHAK NO 058/M.B;141505
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-17 Gadola Sheikh Daggar;141394
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-17 Gadola Sheikh Daggar;141405
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-18 Chak No. 63 MB CHAK NO 058/M.B;141496
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-18 Chak No. 63 MB CHAK NO 058/M.B;141506
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-18 Chak No. 63 MB CHAK NO 058/M.B;141529
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-18 Gadola Gadola Dagar City;141415
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-19 Gadola Gadola Dagar City;141393
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-19 Gadola Gadola Dagar City;141404
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-20 Nari Nari Shumali;141497
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-20 Nari Nari Shumali;141507
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-20 Nari Nari Shumali;141530
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-23 Kotla Jam Chuni Shumali Daggar;141422
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-23 Nari Nari Shumali;141498
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-23 Nari Nari Shumali;141508
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-23 Nari Nari Shumali;141531
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-24 Gadola Mohallah Peer Farsi;141423
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-24 Kotla Jam Chuni Shumali Daggar;141400
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-24 Kotla Jam Chuni Shumali Daggar;141411
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-25 Chak No. 63 MB CHAK NO 063/M.B;141499
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-25 Chak No. 63 MB CHAK NO 063/M.B;141509
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-25 Chak No. 63 MB CHAK NO 063/M.B;141532
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-26 Chak No. 63 MB CHAK NO 063/M.B;141500
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-26 Chak No. 63 MB CHAK NO 063/M.B;141510
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-26 Chak No. 63 MB CHAK NO 063/M.B;141533
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-26 Gadola Mohallah Peer Farsi;141412
Labour market relevant lifelihood skills training for women/girls and men/boys 2024-12-26 Gadola Mohallah Peer Farsi;141401
Life skills training for girls and women 2023-11-07 Jauhrabad MC Jauhrabad MC;21937
Life skills training for girls and women 2023-11-07 Kuhawar Kalan Chak#. 21/TDA;21762
Life skills training for girls and women 2023-11-11 Kuhawar Kalan Chak# 18/TDA;21755
Life skills training for girls and women 2023-11-15 Kuhawar Kalan Chak# 18/TDA;21758
Life skills training for girls and women 2023-11-19 Kuhawar Kalan Chak#. 19/TDA;21757
Life skills training for girls and women 2023-11-23 Kotla Jam Mohallah Qazian Wala;21751
Life skills training for girls and women 2023-11-25 Bara Pangashi Bara Pangashi;73525
Life skills training for girls and women 2023-11-25 Bara Pangashi Chaksa;73526
Life skills training for girls and women 2023-11-25 Durganagar Par Santala;73533
Life skills training for girls and women 2023-11-25 Durganagar Purba Maheshpur;73534
Life skills training for girls and women 2023-11-25 Halsa Aorail;73476
Life skills training for girls and women 2023-11-25 Halsa Nabin Krishnapur;73486
Life skills training for girls and women 2023-11-25 Halsa Nalkhola;73487
Life skills training for girls and women 2023-11-25 Halsa Sultanpur;73477
Life skills training for girls and women 2023-11-25 Lakshmipur Kholabaria Kholabaria;73496
Life skills training for girls and women 2023-11-25 Lakshmipur Kholabaria Kholabaria;73497
Life skills training for girls and women 2023-11-27 Kotla Jam Mohallah Sadique e Akbar;21750
Life skills training for girls and women 2023-11-30 Banwarinagar Madhya Sona Hara;73556
Life skills training for girls and women 2023-11-30 Banwarinagar Uttar Sona Hara;73555
Life skills training for girls and women 2023-11-30 Barahar Khama Para;73512
Life skills training for girls and women 2023-11-30 Barahar Nabanna Para;73511
Life skills training for girls and women 2023-11-30 Pancha Krushi Betbari;73541
Life skills training for girls and women 2023-11-30 Pancha Krushi Kalikanj;73542
Life skills training for girls and women 2023-11-30 Potajia Chara Chithulia;73550
Life skills training for girls and women 2023-11-30 Potajia Rautara;73549
Life skills training for girls and women 2023-12-01 Kotla Jam Mohallah Sadique e Akbar;21752
Life skills training for girls and women 2023-12-05 Kotla Jam Mohallah Sadique e Akbar;21756
Life skills training for girls and women 2023-12-06 Mitha Tiwana Rural Mitha Tiwana Janubi;21931
Life skills training for girls and women 2023-12-07 Barahar Khama Para;73513
Life skills training for girls and women 2023-12-07 Barahar Khama Para;73514
Life skills training for girls and women 2023-12-07 Halsa Baghrom;73488
Life skills training for girls and women 2023-12-07 Halsa Baghrom;73489
Life skills training for girls and women 2023-12-07 Halsa Sultanpur;73478
Life skills training for girls and women 2023-12-07 Halsa Sultanpur;73479
Life skills training for girls and women 2023-12-07 Hatikumrul Alokdia;73535
Life skills training for girls and women 2023-12-07 Hatikumrul Alokdia;73536
Life skills training for girls and women 2023-12-07 Joari Ahamadpur;73499
Life skills training for girls and women 2023-12-07 Lakshmipur Kholabaria Kholabaria;73498
Life skills training for girls and women 2023-12-11 Kuhawar Kalan Daggar Awan;21763
Life skills training for girls and women 2023-12-11 Mitha Tiwana Rural Mitha Tiwana Janubi;21932
Life skills training for girls and women 2023-12-15 Kuhawar Kalan Daggar Awan;21766
Life skills training for girls and women 2023-12-18 Mitha Tiwana Rural Mitha Tiwana Janubi;21929
Life skills training for girls and women 2023-12-20 Mitha Tiwana Rural Mitha Tiwana Janubi;21930
Life skills training for girls and women 2023-12-21 Kuhawar Kalan Daggar Awan;21753
Life skills training for girls and women 2023-12-24 Botala Botala;21926
Life skills training for girls and women 2023-12-24 Botala CHAK NO 040/M.B;21928
Life skills training for girls and women 2023-12-26 Kuhawar Kalan Tibba Khokhran Wala;21749
Life skills training for girls and women 2023-12-26 Mitha Tiwana Rural Mitha Tiwana Janubi;21933
Life skills training for girls and women 2023-12-30 Bajar Bajar Janubi;21925
Life skills training for girls and women 2023-12-30 Gadola Chak #. 29/TDA;21760
Life skills training for girls and women 2024-01-02 Botala CHAK NO 040/M.B;21927
Life skills training for girls and women 2024-01-04 Botala CHAK NO 041/M.B;21922
Life skills training for girls and women 2024-01-04 Gadola Tibba Qureshian Wala;21765
Life skills training for girls and women 2024-01-06 Jauhrabad MC Jauhrabad MC;21936
Life skills training for girls and women 2024-01-10 Gadola Chak #. 30/TDA;21764
Life skills training for girls and women 2024-01-10 Jauhrabad MC Jauhrabad MC;21934
Life skills training for girls and women 2024-01-13 Jauhrabad MC Jauhrabad MC;21935
Life skills training for girls and women 2024-01-14 Banwarinagar Dakhin Sona Hara;73557
Life skills training for girls and women 2024-01-14 Banwarinagar Uttar Gopal Nagar;73558
Life skills training for girls and women 2024-01-14 Bara Pangashi Chaksa;73527
Life skills training for girls and women 2024-01-14 Bara Pangashi Shuklai;73528
Life skills training for girls and women 2024-01-14 Halsa Aorail;73560
Life skills training for girls and women 2024-01-14 Lakshmipur Kholabaria Barabaria;73564
Life skills training for girls and women 2024-01-14 Narina Narina Uttar Para;73552
Life skills training for girls and women 2024-01-14 Pancha Krushi Char Kaliganj;73544
Life skills training for girls and women 2024-01-14 Pancha Krushi Kalikanj;73543
Life skills training for girls and women 2024-01-14 Potajia Tiorbanda;73551
Life skills training for girls and women 2024-01-15 Hadali Hadali MC;21923
Life skills training for girls and women 2024-01-17 Botala CHAK NO 043/M.B;21921
Life skills training for girls and women 2024-01-17 Kuhawar Kalan Chak#. 22/TDA;21754
Life skills training for girls and women 2024-01-18 Barahar Debhalbaria;73516
Life skills training for girls and women 2024-01-18 Barahar Khama Para;73515
Life skills training for girls and women 2024-01-18 Halsa Arjunpur;73481
Life skills training for girls and women 2024-01-18 Halsa Balakandi;73490
Life skills training for girls and women 2024-01-18 Halsa Balarampur;73491
Life skills training for girls and women 2024-01-18 Halsa Gouripur;73480
Life skills training for girls and women 2024-01-18 Joari Ahamadpur;73500
Life skills training for girls and women 2024-01-18 Joari Atghari;73501
Life skills training for girls and women 2024-01-19 Botala CHAK NO 044/M.B;21924
Life skills training for girls and women 2024-01-22 Kuhawar Kalan Chak#. 20/TDA;21761
Life skills training for girls and women 2024-01-23 Bara Pangashi Sukulhat;73529
Life skills training for girls and women 2024-01-23 Barahar Durgapur;73517
Life skills training for girls and women 2024-01-23 Barahar Durgapur;73518
Life skills training for girls and women 2024-01-23 Durganagar Konabari;73530
Life skills training for girls and women 2024-01-23 Hatikumrul Amdanga;73537
Life skills training for girls and women 2024-01-23 Joari Atghari;73502
Life skills training for girls and women 2024-01-23 Joari Balia;73503
Life skills training for girls and women 2024-01-23 Pancha Krushi Bannakandi;73538
Life skills training for girls and women 2024-01-23 Pancha Krushi Shahjahanpur;73545
Life skills training for girls and women 2024-01-23 Pancha Krushi Shahjahanpur;73546
Life skills training for girls and women 2024-01-26 Kuhawar Kalan Chak#. 20/TDA;21759
Life skills training for girls and women 2024-01-30 Barahar Khas Char Jamalpur;73519
Life skills training for girls and women 2024-01-30 Barahar Khas Char Jamalpur;73520
Life skills training for girls and women 2024-01-30 Halsa Chirakhola;73482
Life skills training for girls and women 2024-01-30 Halsa Halsa;73483
Life skills training for girls and women 2024-01-30 Halsa Jhina Para;73492
Life skills training for girls and women 2024-01-30 Halsa Jhina Para;73493
Life skills training for girls and women 2024-01-30 Joari Kachuakora;73504
Life skills training for girls and women 2024-01-30 Joari Kayemkola;73505
Life skills training for girls and women 2024-01-30 Pancha Krushi Betbari;73570
Life skills training for girls and women 2024-01-30 Pancha Krushi Char Pechar para;73569
Life skills training for girls and women 2024-02-05 Barahar Tentulia;73521
Life skills training for girls and women 2024-02-05 Barahar Tentulia;73522
Life skills training for girls and women 2024-02-05 Durganagar Chamambiganti;73532
Life skills training for girls and women 2024-02-05 Durganagar Nandiganti;73531
Life skills training for girls and women 2024-02-05 Halsa Mahesha;73484
Life skills training for girls and women 2024-02-05 Halsa Nabin Krishnapur;73485
Life skills training for girls and women 2024-02-05 Halsa Pale Halsa;73494
Life skills training for girls and women 2024-02-05 Joari Kayemkola;73506
Life skills training for girls and women 2024-02-05 Lakshmipur Kholabaria Kholabaria;73495
Life skills training for girls and women 2024-02-05 Lalore Gopalpur;73507
Life skills training for girls and women 2024-02-05 Pancha Krushi Bannakandi;73539
Life skills training for girls and women 2024-02-05 Pancha Krushi Pechar Para;73540
Life skills training for girls and women 2024-02-08 Banwarinagar Dakhin Gopal Nagar;73559
Life skills training for girls and women 2024-02-08 Bara Pangashi Bara Pangashi;73524
Life skills training for girls and women 2024-02-08 Bara Pangashi Chaksa;73566
Life skills training for girls and women 2024-02-08 Barahar Tiarhati;73523
Life skills training for girls and women 2024-02-08 Chamari Bahadurpur Kandi Para;73509
Life skills training for girls and women 2024-02-08 Hatikumrul Alokdia;73567
Life skills training for girls and women 2024-02-08 Lalore Barabari;73508
Life skills training for girls and women 2024-02-08 Potajia Bahalbari;73547
Life skills training for girls and women 2024-02-08 Potajia Rautara;73548
Life skills training for girls and women 2024-02-08 Pungali Sreegobindapur;73553
Life skills training for girls and women 2024-02-08 Pungali Sreegobindapur;73554
Life skills training for girls and women 2024-02-14 Banwarinagar Dakhin Gopal Nagar;73572
Life skills training for girls and women 2024-02-14 Barahar Tentulia;73565
Life skills training for girls and women 2024-02-14 Chamari Bahadurpur Kandi Para;73510
Life skills training for girls and women 2024-02-14 Halsa Arjunpur;73561
Life skills training for girls and women 2024-02-14 Halsa Baghrom;73563
Life skills training for girls and women 2024-02-14 Halsa Nalkhola;73562
Life skills training for girls and women 2024-02-14 Hatikumrul Amdanga;73568
Life skills training for girls and women 2024-02-14 Potajia Chara Chithulia;73571
Life skills training for girls and women 2024-04-01 Jauhrabad MC Jauhrabad MC;50084
Life skills training for girls and women 2024-04-22 Gadola Mohallah Khokhran Wala;60941
Life skills training for girls and women 2024-04-24 Gadola Chak #. 30/TDA;60942
Life skills training for girls and women 2024-05-23 Botala CHAK NO 040/M.B;111194
Life skills training for girls and women 2024-05-27 Jauhrabad MC Jauhrabad MC;111186
Life skills training for girls and women 2024-06-01 Kuhawar Kalan Chak#. 22/TDA;111022
Life skills training for girls and women 2024-06-02 Botala CHAK NO 043/M.B;111192
Life skills training for girls and women 2024-06-08 Kuhawar Kalan Daggar Awan;111023
Life skills training for girls and women 2024-06-09 Kotla Jam Mohallah Sadique e Akbar;111026
Life skills training for girls and women 2024-06-10 Mitha Tiwana MC Mitha Tiwana MC;111181
Life skills training for girls and women 2024-06-12 Gadola Mohallah Khokhran Wala;111024
Life skills training for girls and women 2024-06-12 Jauhrabad MC Jauhrabad MC;111187
Life skills training for girls and women 2024-06-14 Hassanpur Tiwana Hassanpur Tiwana;111190
Life skills training for girls and women 2024-06-18 Jauhrabad MC Jauhrabad MC;111188
Life skills training for girls and women 2024-06-22 Mitha Tiwana Rural Mitha Tiwana Janubi;111180
Life skills training for girls and women 2024-07-01 Botala CHAK NO 040/M.B;111193
Life skills training for girls and women 2024-07-01 Gadola Chak #. 30/TDA;111018
Life skills training for girls and women 2024-07-01 Gadola Mohallah Khokhran Wala;111019
Life skills training for girls and women 2024-07-01 Hadali Hadali MC;111191
Life skills training for girls and women 2024-07-01 Hassanpur Tiwana Khurpalka;111182
Life skills training for girls and women 2024-07-01 Jauhrabad MC Jauhrabad MC;111189
Life skills training for girls and women 2024-07-01 Khushab MC Khushab MC;111185
Life skills training for girls and women 2024-07-01 Kotla Jam Mohallah Qazian Wala;111025
Life skills training for girls and women 2024-07-01 Mitha Tiwana MC Mitha Tiwana MC;111178
Life skills training for girls and women 2024-07-01 Mitha Tiwana Rural Mitha Tiwana Janubi;111179
Life skills training for girls and women 2024-07-02 Hassanpur Tiwana Khurpalka;111183
Life skills training for girls and women 2024-07-04 Hassanpur Tiwana Khurpalka;111184
Life skills training for girls and women 2024-07-08 Kuhawar Kalan Chak#. 20/TDA;111014
Life skills training for girls and women 2024-07-08 Kuhawar Kalan Daggar Awan;111016
Life skills training for girls and women 2024-07-12 Gadola Chak #. 29/TDA;111015
Life skills training for girls and women 2024-07-12 Kotla Jam Mohallah Sadique e Akbar;111017
Life skills training for girls and women 2024-07-22 Kuhawar Kalan Chak# 18/TDA;111021
Life skills training for girls and women 2024-07-26 Kotla Jam Mohallah Qazian Wala;111020
Life skills training for girls and women 2024-08-15 Hassanpur Tiwana Hassanpur Tiwana;124330
Life skills training for girls and women 2024-08-15 Kotla Jam Sheikhan Wala;124379
Life skills training for girls and women 2024-08-17 Gadola Chak#. 30A/TDA;124381
Life skills training for girls and women 2024-08-17 Gadola Sheikh Daggar;124380
Life skills training for girls and women 2024-08-17 Hassanpur Tiwana Hassanpur Tiwana;124331
Life skills training for girls and women 2024-08-19 Chak No. 50 MB CHAK NO 045/M.B;124332
Life skills training for girls and women 2024-08-19 Gadola Doulat Wala;124382
Life skills training for girls and women 2024-08-21 Chak No. 50 MB CHAK NO 047/M.B;124333
Life skills training for girls and women 2024-08-21 Gadola Doulat Wala;124383
Life skills training for girls and women 2024-08-26 Gadola Chak#. 30A/TDA;124384
Life skills training for girls and women 2024-08-26 Hassanpur Tiwana Mangur;124334
Life skills training for girls and women 2024-08-28 Gadola Chuni Shumali Nasheb;124385
Life skills training for girls and women 2024-08-28 Hassanpur Tiwana Khurpalka;124335
Life skills training for girls and women 2024-09-02 Chak No. 50 MB CHAK NO 050/M.B;125801
Life skills training for girls and women 2024-09-02 Chak No. 50 MB CHAK NO 050/M.B;125802
Life skills training for girls and women 2024-09-09 Chak No. 63 MB CHAK NO 057/M.B;125804
Life skills training for girls and women 2024-09-09 Chak No. 63 MB CHAK NO 057/M.B;125803
Life skills training for girls and women 2024-09-12 Chak No. 50 MB CHAK NO 049/M.B;125805
Life skills training for girls and women 2024-09-12 Chak No. 50 MB CHAK NO 049/M.B;125806
Life skills training for girls and women 2024-09-17 Chak No. 52 MB CHAK NO 051/M.B.;125807
Life skills training for girls and women 2024-09-17 Chak No. 52 MB CHAK NO 053/M.B;125808
Life skills training for girls and women 2024-09-20 Chak No. 52 MB CHAK NO 052/M.B;125809
Life skills training for girls and women 2024-09-20 Chak No. 52 MB CHAK NO 052/M.B;125810
Life skills training for girls and women 2024-09-25 Sandral Khushab Rural;125811
Life skills training for girls and women 2024-09-26 Chak No. 52 MB CHAK NO 052/M.B;125812
Life skills training for girls and women 2024-10-15 Sandral Sandral;131064
Life skills training for girls and women 2024-10-15 Sandral Sandral;131063
Life skills training for girls and women 2024-10-16 Kuhawar Kalan Basti Barokhan Wali;131011
Life skills training for girls and women 2024-10-17 Kuhawar Kalan Basti Barokhan Wali;131012
Life skills training for girls and women 2024-10-18 Gadola Mohallah Peer Farsi;131008
Life skills training for girls and women 2024-10-18 Sandral Kora;131061
Life skills training for girls and women 2024-10-18 Sandral Kora;131062
Life skills training for girls and women 2024-10-22 Kuhawar Kalan Kuhawar Kalan Nasheb;131009
Life skills training for girls and women 2024-10-23 Gadola Kotla Jam Nasheb;131007
Life skills training for girls and women 2024-10-23 Sandral Noor Wana;131060
Life skills training for girls and women 2024-10-24 Kotla Jam Sheikhan Wala;131010
Life skills training for girls and women 2024-10-24 Sandral Hardogag;131059
Life skills training for girls and women 2024-10-28 Kuhawar Kalan Chak# 17/TDA;131013
Life skills training for girls and women 2024-10-28 Sandral Shiwala;131058
Life skills training for girls and women 2024-10-29 Kotla Jam Mohallah Moheran Wala;131006
Life skills training for girls and women 2024-10-29 Sandral Sandral;131057
Life skills training for girls and women 2024-11-18 Kund Kund Shumali;141453
Life skills training for girls and women 2024-11-19 Kund Kund Shumali;141454
Life skills training for girls and women 2024-11-21 Sandral Namewali;141455
Life skills training for girls and women 2024-11-22 Sandral Namewali;141456
Life skills training for girls and women 2024-12-02 Gadola Gadola Dagar City;141360
Life skills training for girls and women 2024-12-02 Kuhawar Kalan Basti Barokhan Wali;141359
Life skills training for girls and women 2024-12-04 Kuhawar Kalan Chak# 17/TDA;141366
Life skills training for girls and women 2024-12-05 Kuhawar Kalan Tibba Khokhran Wala;141358
Life skills training for girls and women 2024-12-06 Hassanpur Tiwana Thatti Gangeria;141481
Life skills training for girls and women 2024-12-06 Hassanpur Tiwana Thatti Gangeria;141482
Life skills training for girls and women 2024-12-09 Gadola Kotla Jam Nasheb;141364
Life skills training for girls and women 2024-12-10 Kuhawar Kalan Daggar Awan;141363
Life skills training for girls and women 2024-12-11 Chak No. 50 MB CHAK NO 047/M.B;141483
Life skills training for girls and women 2024-12-11 Chak No. 50 MB CHAK NO 047/M.B;141484
Life skills training for girls and women 2024-12-12 Kuhawar Kalan Kuhawar Kalan Nasheb;141365
Life skills training for girls and women 2024-12-13 Gadola Sheikh Daggar;141361
Life skills training for girls and women 2024-12-16 Chak No. 63 MB CHAK NO 058/M.B;141485
Life skills training for girls and women 2024-12-16 Chak No. 63 MB CHAK NO 058/M.B;141486
Life skills training for girls and women 2024-12-17 Kotla Jam Sheikhan Wala;141362
Life skills training for girls and women 2024-12-19 Nari Nari Shumali;141487
Life skills training for girls and women 2024-12-19 Nari Nari Shumali;141488
Life skills training for girls and women 2024-12-23 Gadola Mohallah Peer Farsi;141368
Life skills training for girls and women 2024-12-24 Chak No. 63 MB CHAK NO 063/M.B;141489
Life skills training for girls and women 2024-12-24 Chak No. 63 MB CHAK NO 063/M.B;141490
Life skills training for girls and women 2024-12-26 Kotla Jam Chuni Shumali Daggar;141367
Policy dialogues 2024-03-17 3 de Fevereiro Bairro VI;2457
Staff training or meeting 2024-06-25 Itakumari Union Itakumari;124452
Staff training or meeting 2024-07-09 Khushab MC Khushab MC;111154
Staff training or meeting 2024-07-11 Gadola Mohallah Khokhran Wala;110993
Staff training or meeting 2024-11-05 Jauhrabad MC Jauhrabad MC;131104
Staff training or meeting 2024-11-18 Khushab MC Khushab MC;141431
Training for government officials/policymakers 2023-12-16 Jauhrabad MC Jauhrabad MC;21889
Training for government officials/policymakers 2023-12-28 Gadola Chuni Shumali Nasheb;21824
Training for government officials/policymakers 2024-03-01 Jauhrabad MC Jauhrabad MC;43992
Training for government officials/policymakers 2024-03-16 Jauhrabad MC Jauhrabad MC;43581
Training for government officials/policymakers 2024-03-24 Gadola Gadola Dagar City;60893
Training for government officials/policymakers 2024-04-16 Gadola Gadola Dagar City;60892
Training for government officials/policymakers 2024-07-12 Gadola Mohallah Khokhran Wala;110980
Training for government officials/policymakers 2024-07-24 Jauhrabad MC Jauhrabad MC;111152
`;



const Colattendance = () => {
    const [datas, setDatas] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [dt, setDt] = useState('');
    const [staff, setStaff] = useState('');
    const [trade, setTrade] = useState('');
    const [quarter, setQuarter] = useState('');
    const [unit, setUnit] = useState('');

    useEffect(() => {
        const local = localStorage.getItem('colattendance');
        if (local) {
            const data = JSON.parse(local);
            setStaff(data.staff);
            setTrade(data.trade);
            setQuarter(data.quarter);
            setUnit(data.unit);
        } else {
            setStaff('');
            setTrade('');
            setQuarter('');
            setUnit('');
        }
        setDt(formatedDate(new Date()));
    }, [waitMsg])



    const storeLocal = { staff, trade, quarter, unit, dt };

    const searchHandler = async (e) => {
        e.preventDefault();
        localStorage.setItem('colattendance', JSON.stringify(storeLocal));
        setWaitMsg('Please Wait...');
        try {
            /*
            const p = participantsDamkura.split("\n")
                .map(a => a.trim(''))
                .map((s, i) => ({ id: `${Date.now()}_${i}`, name: s, unit: 'DAM', qt: 'Q1', trade: 'computer' }));
            console.log(p);
*/
            const participants = [...damq1];
            const searchResult = participants.filter(participant => participant.unit === unit && participant.qt === quarter && participant.trade === trade);
            setDatas(searchResult);
            console.log(searchResult);
            setWaitMsg(`Total participant: ${searchResult.length}`);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteHandler = (id) => {
        console.log(id);
        const restData = datas.filter(participant => participant.id !== id);
        setDatas(restData);
        setWaitMsg(`Total participant: ${restData.length}`);
        console.log(restData);
    }

    const CreateClick = async (e) => {
        setWaitMsg("Please wait...");

        try {
            const obj = { formData:storeLocal, participants: datas };
            const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/colattendance`;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            };

            const response = await fetch(apiUrl, requestOptions);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "Attendance.xlsx";
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log("Excel file created and downloaded.");
            } else {
                throw new Error("Failed to create Excel file");
            }
            setWaitMsg(`Total participant: ${datas.length}`);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };




    const dd = () => {
        const aslam = convertCsvToJson(user, ["name", "sl"]);
        console.log("aslam", aslam);
    }



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">COL Attendance</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <button onClick={dd}>Click Me</button>

            <div className="w-full border-2 p-4 shadow-md rounded-md">
                <form onSubmit={searchHandler}>
                    <div className="grid grid-cols-5 gap-2 my-2">
                        <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                        <DropdownEn Title="Quarter" Id="quarter" Change={e => setQuarter(e.target.value)} Value={quarter}>
                            <option value="Q1">Q1</option>
                            <option value="Q2">Q2</option>
                            <option value="Q3">Q3</option>
                            <option value="Q4">Q4</option>
                        </DropdownEn>
                        <DropdownEn Title="Trade" Id="trade" Change={e => setTrade(e.target.value)} Value={trade}>
                            <option value="computer">Computer</option>
                            <option value="vermi">Vermicompost</option>
                            <option value="garments">Garments</option>
                        </DropdownEn>
                        <DropdownEn Title="Staff" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                            <option value="Aktera Khatun">Aktera Khatun</option>
                            <option value="Amena Khatun">Amena Khatun</option>
                            <option value="Bilkis parvin">Bilkis parvin</option>
                            <option value="Md Shahin  Sarker">Md Shahin  Sarker</option>
                            <option value="Md. Habibbur Rahman">Md. Habibbur Rahman</option>
                            <option value="Md. Mizanur Rahman">Md. Mizanur Rahman</option>
                            <option value="Md. Suaibur Rahman">Md. Suaibur Rahman</option>
                            <option value="Md. Zohurul Haque">Md. Zohurul Haque</option>
                            <option value="Sabina Yesmin">Sabina Yesmin</option>
                            <option value="Zakia Akter">Zakia Akter</option>
                        </DropdownEn>
                        <DropdownEn Title="Unit" Id="unit" Change={e => setUnit(e.target.value)} Value={unit}>
                            <option value="SRJ">Suruj</option>
                            <option value="DEUTY">DEUTY</option>
                            <option value="DAM">Damkura</option>
                            <option value="JAL">Jaldhaka</option>
                            <option value="NDR">Noyadiary</option>
                            <option value="RNB">Ranirbandar</option>
                            <option value="JNP">Jointapur</option>
                        </DropdownEn>
                    </div>
                    <div className="w-full flex justify-start">
                        <BtnSubmit Title="Search Paritcipatns" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                    </div>
                </form>
            </div>


            <div className="w-full border-2 border-gray-200 p-4 shadow-md rounded-md">
                <div className="w-full overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                                <th className="text-start border-b border-gray-200 px-4 py-2">Name</th>
                                <th className="w-[100px] font-normal text-end"><span className="font-bold">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datas.length ? datas.map((data, i) => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={data.id}>
                                            <td className="text-center py-2 px-4">{i + 1}.</td>
                                            <td className="text-start py-2 px-4">{data.name}</td>
                                            <td className="flex justify-end items-center mt-1">
                                                <Close Click={() => deleteHandler(data.id)} Size="w-6 h-6" />
                                            </td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                    {datas.length ? (<BtnEn Title="Create Attendance" Click={CreateClick} Class="bg-blue-600 hover:bg-blue-800 text-white" />) : null}
                </div>
            </div>



        </>
    );
};

export default Colattendance;



