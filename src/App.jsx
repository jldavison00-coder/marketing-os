import React, { useState, useMemo, useEffect } from "react";
const SUPABASE_URL = "https://heaqekkpdpeoxmiemwer.supabase.co";
const SUPABASE_KEY = "paste-your-new-key-here";

async function sbGet(key) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/app_data?key=eq.${key}&select=value`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.length > 0 ? data[0].value : null;
}

async function sbSet(key, value) {
  await fetch(`${SUPABASE_URL}/rest/v1/app_data`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates"
    },
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() })
  });
}



const PRODUCTS_RAW = 
[{"id": "48091", "name": "INDEED TALLYS LAGER 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "13775", "name": "HAMM'S 30/12 CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "30/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22883", "name": "FULTON LONELY BLONDE 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "57755", "name": "BELLS TWO HEARTED IPA 2/12/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "13783", "name": "HAMM'S 1/2 BBL", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "57783", "name": "BELLS TWO HEARTED IPA 1/2 BBL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "13763", "name": "HAMM'S 4/6/16 CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22855", "name": "FULTON LONELY BLONDE 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "24965", "name": "FOUNDERS ALL DAY IPA 2/15/12 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "2/15/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86655", "name": "FIND WUNDER 10THC HV BLACKBERRY 6/4/12 CN", "supplier": "FIND WUNDER", "brandFamily": "FIND WUNDER (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48161", "name": "INDEED PINK BURST 10THC 6/4/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17557", "name": "COORS LIGHT 24/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "24/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85317", "name": "TRAIL MAGIC 10THC H&H 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "26083", "name": "LAGUNITAS IPA 1/2 BBL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "80117", "name": "HEINEKEN 24/12 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Beer Package", "package": "24/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "46283", "name": "INDEED PISTACHIO CREAM ALE 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "26055", "name": "LAGUNITAS IPA 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "13755", "name": "HAMM'S 2/12/12 CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "21865", "name": "FULTON NARC TRIPLE BERRY 10THC 6/4/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "27755", "name": "LAGUNITAS VARIETY PACK 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17583", "name": "COORS LIGHT 1/2 BBL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "21880", "name": "FULTON NARC VARIETY 5&10THC 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "47263", "name": "INDEED MEXICAN HONEY IMPERIAL 6/4/16 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57711", "name": "BELLS TWO HEARTED IPA 4/6/12 BTL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "57455", "name": "BELLS HEARTED VARIETY 2/12/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10163", "name": "PABST 4/6/16 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10164", "name": "PABST 24/16 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "24/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10157", "name": "PABST 24/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "24/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57763", "name": "BELLS TWO HEARTED IPA 6/4/16 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "21860", "name": "FULTON NARC TROPICAL 10THC 6/4/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23055", "name": "FULTON SELTZER CITRUS VARIETY 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86650", "name": "FIND WUNDER 10THC HV WATERMELON 6/4/12 CN", "supplier": "FIND WUNDER", "brandFamily": "FIND WUNDER (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57457", "name": "BELLS SEASONAL VARIETY 24/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "24/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "26483", "name": "LAGUNITAS HAZY IPA 1/2 BBL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "22853", "name": "FULTON LONELY BLONDE 4/6/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17562", "name": "COORS LIGHT 24/16 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "24/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85321", "name": "TRAIL MAGIC 10THC MARGARITA 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86660", "name": "FIND WUNDER 10THC HV GRAPEFRUIT 6/4/12 CN", "supplier": "FIND WUNDER", "brandFamily": "FIND WUNDER (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46653", "name": "INDEED FLAVORWAVE IPA 4/6/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17517", "name": "COORS LIGHT 24/12 BTL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "24/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "14355", "name": "ARNOLD PALMER SPIKED 2/12/12 CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22555", "name": "FULTON SWEET CHILD IPA 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46253", "name": "INDEED PISTACHIO CREAM ALE 4/6/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22863", "name": "FULTON LONELY BLONDE 6/4/16 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "80115", "name": "HEINEKEN 2/12/12 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "48163", "name": "INDEED ORANGE BURST 10THC 6/4/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48164", "name": "INDEED BURST VARIETY 10THC 2/12/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10155", "name": "PABST 2/12/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "27355", "name": "LAGUNITAS LIL SUMPIN' 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "21890", "name": "FULTON NARC STRAW/LEM 10THC 6/4/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "47055", "name": "INDEED CREATURE CRATE 2/12/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23665", "name": "FOUNDERS CENTENNIAL IPA 2/15/12 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "2/15/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22856", "name": "FULTON LONELY BLONDE VARIETY PACK 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "60483", "name": "PAULANER OKTOBERFEST MARZEN 50LTR BBL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "85316", "name": "TRAIL MAGIC 5THC H&H 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46655", "name": "INDEED FLAVORWAVE IPA 2/12/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48506", "name": "KEEF 10THC ROOT BEER 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60383", "name": "PAULANER HEFEWEIZEN 50LTR BBL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "11475", "name": "SCHMIDT 30/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "SCHMIDT (F)", "type": "Beer Package", "package": "30/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "12011", "name": "DRAGONS MILK BBA STOUT 6/4/12 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "26255", "name": "LAGUNITAS MAXIMUS 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46683", "name": "INDEED FLAVORWAVE IPA 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "46183", "name": "INDEED MEXICAN HONEY LIGHT 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "85313", "name": "TRAIL MAGIC 10THC H&H VARIETY 2/12/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "80118", "name": "HEINEKEN 28/12 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Beer Package", "package": "28/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "46153", "name": "INDEED MEXICAN HONEY LIGHT 4/6/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48165", "name": "INDEED DBL HIGH FIVER WG 10THC 6/4/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "27555", "name": "LAGUNITAS HOP REFRESH VARIETY NA 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Non Alc Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57722", "name": "BELLS TWO HEARTED IPA 15/19.2 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "15/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86680", "name": "FIND WUNDER 10THC HV BLOOD ORANGE 6/4/12 CN", "supplier": "FIND WUNDER", "brandFamily": "FIND WUNDER (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22255", "name": "FULTON HOP KINGDOM 300 IPA 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48820", "name": "SURLY LLL 10THC MOCKTAIL VARIETY 2/12/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85322", "name": "TRAIL MAGIC 10THC STRAW H&H 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46255", "name": "INDEED PISTACHIO CREAM ALE 2/12/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23183", "name": "FULTON SHANDY 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "23059", "name": "FULTON SELTZER BLOOD ORANGE 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "27511", "name": "LAGUNITAS HOP REFRESH NA 6/4/12 BTL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Non Alc Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "48155", "name": "INDEED TURN DOWN DREAMS 5THC 6/4/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "80311", "name": "HEINEKEN 0.0% NA 4/6/11.2 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Non Alc Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "22057", "name": "FULTON CHILL CITY 24/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "3.2 Beer Package", "package": "24/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "14036", "name": "OLDE ENGLISH 12/40 BTL", "supplier": "MILLER BREWING COMPANY", "brandFamily": "OLD ENGLISH (S)", "type": "Beer Package", "package": "12/40 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "86520", "name": "CAMINO 5THC CHERRY EXCITE GUMMIES 12/10 PK", "supplier": "KIVA CONFECTIONS", "brandFamily": "KIVA (K)", "type": "THC/CBD Package", "package": "12/10 PK", "seasonality": "Annual", "status": "Active"}, {"id": "27553", "name": "LAGUNITAS HOP REFRESH NA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85320", "name": "TRAIL MAGIC 5THC MARGARITA 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22283", "name": "FULTON HOP KINGDOM 300 IPA 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "48152", "name": "INDEED HIGH FIVER CITRUS 5THC 6/4/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "13771", "name": "HAMM'S 12/24 BIG CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "12/24 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "21885", "name": "FULTON NARC CITRUS 10THC 6/4/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "13511", "name": "TSINGTAO 4/6/12 BTL", "supplier": "PAULANER HP USA", "brandFamily": "TSINGTAO (R)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "26011", "name": "LAGUNITAS IPA 4/6/12 BTL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "27453", "name": "LAGUNITAS IPNA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48511", "name": "KEEF 10THC PURPLE PASSION 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85319", "name": "TRAIL MAGIC 10THC PEACH H&H 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "74355", "name": "JDCC VARIETY 2/12/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60415", "name": "PAULANER OKTOBERFEST MARZEN 2/12/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "2/12/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "27155", "name": "LAGUNITAS DAYTIME IPA 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "3.2 Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "64611", "name": "SINGHA 4/6/11.2 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "SINGHA (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "48516", "name": "KEEF 10THC ORANGE 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48550", "name": "KEEF 10THC VARIETY 2/12/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60363", "name": "PAULANER HEFEWEIZEN 6/4/16.9 CN", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "6/4/16.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23080", "name": "FULTON SELTZER BLOOD ORANGE 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "17555", "name": "COORS LIGHT 2/12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23154", "name": "FULTON LONELY SHANDY 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "80155", "name": "HEINEKEN 2/12/12 CN", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23511", "name": "FOUNDERS DIRTY BASTARD 4/6/12 BTL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "63521", "name": "TAJ MAHAL 12/22 BTL", "supplier": "EAST WEST BEV", "brandFamily": "TAJ MAHAL (K)", "type": "Beer Package", "package": "12/22 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "46053", "name": "INDEED DAY TRIPPER 4/6/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22553", "name": "FULTON SWEET CHILD IPA 4/6/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48625", "name": "SENORITA LJ MARGARITA 10THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "SENORITA (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "37553", "name": "BAD WEATHER HOPCROMANCER IPA 4/6/12 CN", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48630", "name": "SENORITA MANGO MARGARITA 10THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "SENORITA (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "58555", "name": "BELLS OBERON ALE 2/12/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "60163", "name": "PAULANER ORIG MUNICH 6/4/16.9 CN", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "6/4/16.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22563", "name": "FULTON SWEET CHILD IPA 6/4/16 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "14063", "name": "OLDE ENGLISH 4/6/16 CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "OLD ENGLISH (S)", "type": "Beer Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86500", "name": "CAMINO 5THC BLUE BERRY SLEEP GUMMIES 12/10 PK", "supplier": "KIVA CONFECTIONS", "brandFamily": "KIVA (K)", "type": "THC/CBD Package", "package": "12/10 PK", "seasonality": "Annual", "status": "Active"}, {"id": "22885", "name": "FULTON LONELY BLONDE 1/4 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "23058", "name": "FULTON SELTZER CITRUS GINGER 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46055", "name": "INDEED DAY TRIPPER 2/12/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57952", "name": "BELLS BIG HEARTED IPA 4/6/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "18083", "name": "BLUE MOON 1/2 BBL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "60663", "name": "PAULANER GRAPEFRUIT RADLER 6/4/16.9 CN", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "3.2 Beer Package", "package": "6/4/16.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "80111", "name": "HEINEKEN 4/6/12 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "86405", "name": "NOWADAYS 10THC 12/2 BTL", "supplier": "NOWADAYS", "brandFamily": "NOWADAYS (K)", "type": "THC/CBD Package", "package": "12 PER CASE", "seasonality": "Annual", "status": "Active"}, {"id": "84932", "name": "SPOOKY DILL PICKLE BLOODY 12/32 BTL", "supplier": "SPOOKY BEVERAGE, LLC", "brandFamily": "SPOOKY (K)", "type": "Non Alc Package", "package": "12/32 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "26015", "name": "LAGUNITAS IPA 2/12/12 BTL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "21755", "name": "FULTON HOP KINGDOM VARIETY 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17564", "name": "COORS LIGHT 15/16 ALUMA PINT", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "15/16 ALUM BTL", "seasonality": "Annual", "status": "Active"}, {"id": "86510", "name": "CAMINO 5THC WATERMELON BLISS GUMMIES 12/10 PK", "supplier": "KIVA CONFECTIONS", "brandFamily": "KIVA (K)", "type": "THC/CBD Package", "package": "12/10 PK", "seasonality": "Annual", "status": "Active"}, {"id": "11250", "name": "ST IDES 10THC VARIETY PACK 2/12/12 CN", "supplier": "PABST LABS", "brandFamily": "PABST LABS (K)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60915", "name": "PAULANER VARIETY PK 2/12/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "2/12/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "56955", "name": "BELLS LIGHT HEARTED 2/12/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "3.2 Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "51411", "name": "LEFTHAND NITRO MILKSTOUT 4/6/12 BTL", "supplier": "LEFT HAND BREWING", "brandFamily": "LEFT HAND (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "22055", "name": "FULTON CHILL CITY 2/12/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "3.2 Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "47062", "name": "INDEED MEXICAN HONEY VARIETY 2/12/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "60211", "name": "PAULANER SALVATOR 4/6/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "48635", "name": "SENORITA GF PALOMA 10THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "SENORITA (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "14071", "name": "OLDE ENGLISH 12/24 BIG CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "OLD ENGLISH (S)", "type": "Beer Package", "package": "12/24 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "80355", "name": "HEINEKEN 0.0% NA 2/12/11.2 CN", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Non Alc Package", "package": "2/12/11.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "61063", "name": "PAULANER PILS 6/4/16.9 CN", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "6/4/16.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86515", "name": "CAMINO 5THC BERRY CHILL GUMMIES 12/10 PK", "supplier": "KIVA CONFECTIONS", "brandFamily": "KIVA (K)", "type": "THC/CBD Package", "package": "12/10 PK", "seasonality": "Annual", "status": "Active"}, {"id": "17457", "name": "COORS BANQUET 24/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "24/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "61083", "name": "PAULANER PILS 50LTR BBL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "85583", "name": "MPLS CIDER ORCHARD 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "46083", "name": "INDEED DAY TRIPPER 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "26253", "name": "LAGUNITAS MAXIMUS 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84420", "name": "KLARBRUNN CLUB SODA 15/1LTR PET", "supplier": "WIS-PAK", "brandFamily": "KLARBRUNN MIXES (G)", "type": "Non Alc Package", "package": "15/1LTR PET", "seasonality": "Annual", "status": "Active"}, {"id": "60411", "name": "PAULANER OKTOBERFEST MARZEN 4/6/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "17515", "name": "COORS LIGHT 2/12/12 BTL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "35853", "name": "GREAT LAKES ED FITZ PORTER 4/6/12 CN", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57922", "name": "BELLS BIG HEARTED 15/19.2 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "15/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48150", "name": "INDEED TWO GOOD LAVENDER LEMON 2THC 6/4/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "14755", "name": "ARNOLD PALMER SPIKED LITE 2/12/12 CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57757", "name": "BELLS TWO HEARTED IPA 24/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "24/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "26020", "name": "LAGUNITAS IPA 12/19.2 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48520", "name": "KEEF 10THC COLA 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "21875", "name": "FULTON NARC BLOOD ORANGE 5THC 6/4/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "53483", "name": "RUSH RIVER UNFORGIVEN AMBER 1/2 BBL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "85861", "name": "MPLS CIDER BLUEBERRY 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "15055", "name": "ARNOLD PALMER SPIKED VARIETY 2/12/12 CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "58155", "name": "BELLS HAZY HEARTED IPA 2/12/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85312", "name": "TRAIL MAGIC 5THC H&H VARIETY 2/12/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22083", "name": "FULTON CHILL CITY 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "3.2 Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "86525", "name": "CAMINO 5THC FRESH SQUEEZED RECOVER FRESH 12/10 PK", "supplier": "KIVA CONFECTIONS", "brandFamily": "KIVA (K)", "type": "THC/CBD Package", "package": "12/10 PK", "seasonality": "Annual", "status": "Active"}, {"id": "26155", "name": "LAGUNITAS HAZICUS MAX IPA 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "58153", "name": "BELLS HAZY HEARTED IPA 4/6/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "68683", "name": "OLD SPECKLED HEN 50LTR BBL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "51483", "name": "LEFTHAND NITRO MILKSTOUT 1/2 BBL", "supplier": "LEFT HAND BREWING", "brandFamily": "LEFT HAND (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "86695", "name": "FIND WUNDER 10THC HV VARIETY 3/8/12 CN", "supplier": "FIND WUNDER", "brandFamily": "FIND WUNDER (K)", "type": "THC/CBD Package", "package": "3/8/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60315", "name": "PAULANER HEFEWEIZEN 2/12/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "2/12/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "23811", "name": "FOUNDERS PORTER 4/6/12 BTL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "23164", "name": "FULTON LONELY SHANDY 6/4/16 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "85314", "name": "TRAIL MAGIC 5THC H&H 2/12/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10975", "name": "OLD MILWAUKEE 30/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "STROH & OLD MILWAUKEE & ST. IDES (B)", "type": "Beer Package", "package": "30/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "24511", "name": "FOUNDERS KBS 6/4/12 BTL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "27353", "name": "LAGUNITAS LIL SUMPIN' 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48525", "name": "KEEF 10THC BLUE RAZZ 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "27493", "name": "LAGUNITAS HAZY IPNA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57753", "name": "BELLS TWO HEARTED IPA 4/6/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85205", "name": "CRISPIN ORIGINAL CIDER 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "CRISPIN (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "58583", "name": "BELLS OBERON ALE 1/2 BBL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "26220", "name": "LAGUNITAS MAXIMUS 12/19.2 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "11215", "name": "ST IDES 10THC HIGH PUNCH 6/4/12 CN", "supplier": "PABST LABS", "brandFamily": "PABST LABS (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23314", "name": "FULTON TROPICAL BLONDE 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "10183", "name": "PABST 1/2 BBL", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "85862", "name": "MPLS CIDER BLUEBERRY 4/6/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60311", "name": "PAULANER HEFEWEIZEN 4/6/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "80163", "name": "HEINEKEN 6/4/16 CN", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46620", "name": "INDEED FLAVORWAVE IPA 12/19.2 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "37652", "name": "BAD WEATHER HAZE OASIS 4/6/12 CN", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85553", "name": "MPLS CIDER ORCHARD 4/6/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "73511", "name": "JDCC DOWNHOME PUNCH 4/6/10 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "4/6/10 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "43083", "name": "BIG SKY MOOSEDROOL BROWN 1/2 BBL", "supplier": "BIG SKY BREWING", "brandFamily": "BIG SKY (Q)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "67711", "name": "WEIHENSTEPHANER HEFEWEISS 4/6/11.2 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "45211", "name": "VICTORY GOLDEN MONKEY 4/6/12 BTL", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "48645", "name": "SENORITA VARIETY10THC 3/8/12 CN", "supplier": "GREEN THUMB", "brandFamily": "SENORITA (K)", "type": "THC/CBD Package", "package": "3/8/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60183", "name": "PAULANER ORIG MUNICH 50LTR BBL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "10115", "name": "PABST 2/12/12 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "85653", "name": "MPLS CIDER MANGO HABANERO 4/6/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85323", "name": "TRAIL MAGIC 5THC STRAW H&H 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "70083", "name": "MAGNERS ORIGINAL 1/2 BBL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "MAGNERS (J)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "57785", "name": "BELLS TWO HEARTED IPA 1/4 BBL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "11205", "name": "ST IDES 10THC RASPBERRY TEA 6/4/12 CN", "supplier": "PABST LABS", "brandFamily": "PABST LABS (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57715", "name": "BELLS TWO HEARTED IPA 2/12/12 BTL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "22666", "name": "FULTON TRIPLE BERRY SOUR 6/4/16 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "64711", "name": "LEO 4/6/11.2 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "SINGHA (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "27315", "name": "LAGUNITAS LIL SUMPIN' 2/12/12 BTL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "14353", "name": "ARNOLD PALMER SPIKED 4/6/12 CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48530", "name": "KEEF 10THC PINEAPPLE 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "21870", "name": "FULTON NARC WATERMELON 5THC 6/4/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48101", "name": "INDEED BRIGHTSIDE 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "44611", "name": "VICTORY SOUR MONKEY 4/6/12 BTL", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "22253", "name": "FULTON HOP KINGDOM 300 IPA 4/6/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "47998", "name": "INDEED STRAWBERRY FIELDS 6/4/16 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "18015", "name": "BLUE MOON 2/12/12 BTL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "48135", "name": "INDEED BRIGHTSIDE 2/12/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "60115", "name": "PAULANER ORIG MUNICH 2/12/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "2/12/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "85563", "name": "MPLS CIDER ORCHARD 6/4/16 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "64687", "name": "SINGHA 1/4 BBL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "SINGHA (K)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "10265", "name": "PABST LIGHT 2/12/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "70063", "name": "MAGNERS ORIGINAL 6/4/16.9 CN", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "MAGNERS (J)", "type": "Cider Package", "package": "6/4/16.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "26455", "name": "LAGUNITAS HAZY IPA 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "83753", "name": "ACE PEAR CIDER 4/6/12 CN", "supplier": "CALIFORNIA CIDER CO INC", "brandFamily": "ACE CIDER (Q)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22881", "name": "FULTON LONELY BLONDE 1/6 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "12210", "name": "DRAGONS MILK RESERVE SEASONAL 6/4/12 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Package", "package": "6/4/12 BTL", "seasonality": "Seasonal", "status": "Active"}, {"id": "27311", "name": "LAGUNITAS LIL SUMPIN' 4/6/12 BTL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "48154", "name": "INDEED TURN UP BLAST 5THC 6/4/12 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86699", "name": "FIND WUNDER 10THC CITRUS 2/12/2 BTL", "supplier": "FIND WUNDER", "brandFamily": "FIND WUNDER (K)", "type": "THC/CBD Package", "package": "24 PER CASE", "seasonality": "Annual", "status": "Active"}, {"id": "46220", "name": "INDEED IMPERIAL PISTACHIO 12/19.2 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46281", "name": "INDEED PISTACHIO CREAM ALE 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "25653", "name": "LAGUNITAS BEAST IPA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "56953", "name": "BELLS LIGHT HEARTED 4/6/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "3.2 Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "25655", "name": "LAGUNITAS BEAST IPA 2/12/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "50311", "name": "LEFTHAND NITRO PB MILKSTOUT 4/6/12 BTL", "supplier": "LEFT HAND BREWING", "brandFamily": "LEFT HAND (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "84410", "name": "KLARBRUNN TONIC 15/1LTR PET", "supplier": "WIS-PAK", "brandFamily": "KLARBRUNN MIXES (G)", "type": "Non Alc Package", "package": "15/1LTR PET", "seasonality": "Annual", "status": "Active"}, {"id": "67783", "name": "WEIHENSTEPHANER HEFEWEISS 50LTR BBL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "81045", "name": "MURPHYS STOUT 6/4/14.9 CN", "supplier": "HEINEKEN USA", "brandFamily": "MURPHYS (E)", "type": "3.2 Beer Package", "package": "6/4/14.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "61283", "name": "HACKER PSCHORR MUNICH DARK 50LTR BBL", "supplier": "PAULANER HP USA", "brandFamily": "HACKER-PSCHORR (C)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "11200", "name": "ST IDES 10THC PEACH TEA 6/4/12 CN", "supplier": "PABST LABS", "brandFamily": "PABST LABS (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "73411", "name": "JDCC STRAWBERRY PUNCH 4/6/10 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "4/6/10 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "84415", "name": "KLARBRUNN DIET TONIC 15/1LTR PET", "supplier": "WIS-PAK", "brandFamily": "KLARBRUNN MIXES (G)", "type": "Non Alc Package", "package": "15/1LTR PET", "seasonality": "Annual", "status": "Active"}, {"id": "29653", "name": "GO BREWING SUN STATE TROP IPA NA 4/6/12 CN", "supplier": "GO BREWING", "brandFamily": "GO BREWING (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "21897", "name": "FULTON NARC AFTER DARK 10THC 6/4/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86505", "name": "CAMINO 2THC PEAR SOCIAL GUMMIES 12/10 PK", "supplier": "KIVA CONFECTIONS", "brandFamily": "KIVA (K)", "type": "THC/CBD Package", "package": "12/10 PK", "seasonality": "Annual", "status": "Active"}, {"id": "51463", "name": "LEFTHAND NITRO MILKSTOUT 4/6/13.65 CN", "supplier": "LEFT HAND BREWING", "brandFamily": "LEFT HAND (K)", "type": "Beer Package", "package": "4/6/13.65 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "53411", "name": "RUSH RIVER UNFORGIVEN AMBER 4/6/12 BTL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "22583", "name": "FULTON SWEET CHILD IPA 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "69063", "name": "SAISON DUPONT 6/4/16.9 CN", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "6/4/16.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "73611", "name": "JDCC SOUTHERN PEACH 4/6/10 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "4/6/10 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "27320", "name": "LAGUNITAS LIL SUMPIN' 12/19.2 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86698", "name": "FIND WUNDER 10THC BERRY 2/12/2 BTL", "supplier": "FIND WUNDER", "brandFamily": "FIND WUNDER (K)", "type": "THC/CBD Package", "package": "24 PER CASE", "seasonality": "Annual", "status": "Active"}, {"id": "47061", "name": "INDEED COZY CREAM VARIETY 2/12/12 CN (OFF 2/11/26)", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "24211", "name": "FOUNDERS BREAKFAST STOUT 6/4/12 BTL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "17561", "name": "COORS LIGHT 18/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "18/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "25011", "name": "FOUNDERS BACKWOODS BAST 6/4/12 BTL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "17563", "name": "COORS LIGHT 4/6/16 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "73811", "name": "JDCC WATERMELON PUNCH 4/6/10 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "4/6/10 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "34883", "name": "PADRAIGS RED ALE 1/2 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "49070", "name": "SURLY DBL TAKE TROPICAL 10THC 6/4/16 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "26053", "name": "LAGUNITAS IPA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60011", "name": "ZYWIEC 4/6/11.2 BTL", "supplier": "AMTEC INT'L OF NY CORP", "brandFamily": "ZYWIEC (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "35883", "name": "GREAT LAKES ED FITZ PORTER 1/2 BBL", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "37572", "name": "BAD WEATHER HOPCROMANCER IPA 1/2 BBL", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "80215", "name": "AMSTEL LIGHT 2/12/12 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "3.2 Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "68483", "name": "BELHAVEN SCOTTISH ALE 50LTR BBL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "BELHAVEN (K)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "58553", "name": "BELLS OBERON ALE 4/6/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "85202", "name": "CRISPIN ORIGINAL CIDER 6/4/16 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "CRISPIN (K)", "type": "Cider Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17566", "name": "COORS LIGHT 2/9/16 ALUMA PINT", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/9/16 ALUM BTL", "seasonality": "Annual", "status": "Active"}, {"id": "60111", "name": "PAULANER ORIG MUNICH 4/6/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "10264", "name": "PABST LIGHT 4/6/16 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "20153", "name": "21A BLOOD ORANGE IPA 4/6/12 CN", "supplier": "21st AMENDMENT BREWERY", "brandFamily": "21st AMENDMENT (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17415", "name": "COORS BANQUET STUBBY 2/12/12 BTL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "30955", "name": "BROOKLYN VARIETY PACK NA 2/12/12 CN", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Non Alc Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "11210", "name": "ST IDES 10THC LEMONADE TEA 6/4/12 CN", "supplier": "PABST LABS", "brandFamily": "PABST LABS (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "43053", "name": "BIG SKY MOOSEDROOL BROWN 4/6/12 CN", "supplier": "BIG SKY BREWING", "brandFamily": "BIG SKY (Q)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "63511", "name": "TAJ MAHAL 4/6/11.2 BTL", "supplier": "EAST WEST BEV", "brandFamily": "TAJ MAHAL (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "10170", "name": "PABST 15/25 BIG CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "15/25 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17455", "name": "COORS BANQUET 2/12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "53481", "name": "RUSH RIVER UNFORGIVEN AMBER 1/6 BBL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "48600", "name": "RYTHM SATIVA MAND-ORANGE 10THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "RYTHM (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "74315", "name": "JDCC VARIETY 2/12/10 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "2/12/10 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "47283", "name": "INDEED MEXICAN HONEY IMPERIAL 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "61183", "name": "HACKER PSCHORR MUNICH GOLD 50LTR BBL", "supplier": "PAULANER HP USA", "brandFamily": "HACKER-PSCHORR (C)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "84614", "name": "REEDS EXTRA GINGER BEER 24/7.5 CN", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "24/7.5 CN", "seasonality": "Annual", "status": "Active"}, {"id": "67611", "name": "WEIHENSTEPHANER LAGER 4/6/11.2 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "46681", "name": "INDEED FLAVORWAVE IPA 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "35653", "name": "GREAT LAKES ELIOT NESS AMBER 4/6/12 CN", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "30953", "name": "BROOKLYN ORIGINAL CLASSIC AMBER NA 4/6/12 CN", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10575", "name": "STROH 30/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "STROH & OLD MILWAUKEE & ST. IDES (B)", "type": "Beer Package", "package": "30/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "63621", "name": "FLYING HORSE 12/22 BTL", "supplier": "EAST WEST BEV", "brandFamily": "TAJ MAHAL (K)", "type": "Beer Package", "package": "12/22 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "10263", "name": "PABST EXTRA 4/6/16 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48605", "name": "RYTHM KUSH MANGO-PINE 10THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "RYTHM (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "29553", "name": "GO BREWING DOUBLE IPA NA 4/6/12 CN", "supplier": "GO BREWING", "brandFamily": "GO BREWING (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "11712", "name": "DRAGONS MILK TALES OF GOLD 6/4/12 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "68111", "name": "WEIHENSTEPHANER NA 4/6/11.2 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Non Alc Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "85211", "name": "CRISPIN IMP APPLE CIDER 4/6/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "CRISPIN (K)", "type": "Wine Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "71653", "name": "WOODCHUCK AMBER 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "58122", "name": "BELLS HAZY HEARTED IPA 15/19.2 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "15/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "65311", "name": "TONA CERVEZA 4/6/12 BTL", "supplier": "ARTISANAL IMPORTS", "brandFamily": "TONA (Z)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "86606", "name": "FIND WUNDER 5THC SESSIONS BLACKBERRY 6/4/12 CN", "supplier": "FIND WUNDER", "brandFamily": "FIND WUNDER (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22483", "name": "FULTON PO BOY PILS 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "46583", "name": "INDEED PILS 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "48640", "name": "SENORITA RANCH WATER 10THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "SENORITA (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10266", "name": "PABST LIGHT 24/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "24/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84660", "name": "REEDS GINGER MULE 6/4/12 CN", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Beer Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "14371", "name": "ARNOLD PALMER SPIKED 12/24 BIG CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "12/24 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "64653", "name": "SINGHA 4/6/11.2 CN", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "SINGHA (K)", "type": "Beer Package", "package": "4/6/11.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "37483", "name": "BAD WEATHER PILS 1/2 BBL", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "85325", "name": "TRAIL MAGIC 3THC MIMOSA 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "34853", "name": "PADRAIGS RED ALE 4/6/12 CN", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "11075", "name": "OLD MILWAUKEE LIGHT 30/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "STROH & OLD MILWAUKEE & ST. IDES (B)", "type": "Beer Package", "package": "30/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "12021", "name": "DRAGONS MILK BBA STOUT 12/22 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Package", "package": "12/22 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "65355", "name": "TONA CERVEZA 2/12/12 CN", "supplier": "ARTISANAL IMPORTS", "brandFamily": "TONA (Z)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "18865", "name": "KEYSTONE LIGHT 2/15/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/15/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "73572", "name": "JDCC BOLDER DOWNHOME PUNCH 12/23.5 BIG CN", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "12/23.5 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "26153", "name": "LAGUNITAS HAZICUS MAX IPA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "70683", "name": "WYDERS REPOSADO 1/2 BBL", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "DAY CHASE, WYDERS (J)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "10855", "name": "OLD MILWAUKEE NA 2/12/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "STROH & OLD MILWAUKEE & ST. IDES (B)", "type": "Non Alc Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84153", "name": "ACE PINEAPPLE CIDER 4/6/12 CN", "supplier": "CALIFORNIA CIDER CO INC", "brandFamily": "ACE CIDER (Q)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23795", "name": "FOUNDERS MORTAL BLOOM VARIETY 2/12/12 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84183", "name": "ACE PINEAPPLE CIDER 1/2 BBL", "supplier": "CALIFORNIA CIDER CO INC", "brandFamily": "ACE CIDER (Q)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "68011", "name": "WEIHENSTEPHANER VITUS 4/6/11.2 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "84425", "name": "KLARBRUNN SOUR 15/1LTR PET", "supplier": "WIS-PAK", "brandFamily": "KLARBRUNN MIXES (G)", "type": "Non Alc Package", "package": "15/1LTR PET", "seasonality": "Annual", "status": "Active"}, {"id": "20155", "name": "21A BLOOD ORANGE IPA 2/12/12 CN", "supplier": "21st AMENDMENT BREWERY", "brandFamily": "21st AMENDMENT (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60283", "name": "PAULANER SALVATOR 50LTR BBL", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "73911", "name": "JDCC LYNCHBURG LEMONADE 4/6/10 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "4/6/10 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "13517", "name": "TSINGTAO 24/12 BTL", "supplier": "PAULANER HP USA", "brandFamily": "TSINGTAO (R)", "type": "Beer Package", "package": "24/12 BTL", "seasonality": "Seasonal", "status": "Active"}, {"id": "43055", "name": "BIG SKY MOOSEDROOL BROWN 2/12/12 CN", "supplier": "BIG SKY BREWING", "brandFamily": "BIG SKY (Q)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "27153", "name": "LAGUNITAS DAYTIME IPA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "3.2 Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48040", "name": "INDEED HAUL IN SEA SALT 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "85032", "name": "SPOOKY LIME JUICE 12/32 PET", "supplier": "SPOOKY BEVERAGE, LLC", "brandFamily": "SPOOKY (K)", "type": "Non Alc Package", "package": "12/32 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "23329", "name": "FULTON B2B BLONDE ALE 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "35683", "name": "GREAT LAKES ELIOT NESS AMBER 1/2 BBL", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "23783", "name": "FOUNDERS MORTAL BLOOM HAZY IPA 1/2 BBL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "85867", "name": "MPLS CIDER ROAST PINEAPPLE 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "27383", "name": "LAGUNITAS LIL SUMPIN' 1/2 BBL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "10215", "name": "PABST NA 2/12/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Non Alc Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85318", "name": "TRAIL MAGIC 5THC PEACH H&H 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "32404", "name": "AVERY MAHARAJA IPA 4/6/12 CN", "supplier": "AVERY BREWING CO", "brandFamily": "AVERY BREWING CO (Y)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "49230", "name": "SURLY VODKA CHERRY LIMEADE 6/4/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COCKTAILS (I)", "type": "Liquor Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "26085", "name": "LAGUNITAS IPA 1/4 BBL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "49225", "name": "SURLY VODKA LEMON DROP 6/4/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COCKTAILS (I)", "type": "Liquor Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "29453", "name": "GO BREWING NEW SCHOOL SOUR NA 4/6/12 CN", "supplier": "GO BREWING", "brandFamily": "GO BREWING (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48535", "name": "KEEF 10THC MR PUFFER 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46963", "name": "INDEED PEACH BUM IPA 6/4/16 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "35001", "name": "PADRAIGS DULLAHANS NITRO STOUT 6/4/16 CN", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48540", "name": "KEEF 10THC CREAM 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "58558", "name": "BELLS OBERON ALE 24/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "24/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "32402", "name": "AVERY ELLIES BROWN 4/6/12 CN", "supplier": "AVERY BREWING CO", "brandFamily": "AVERY BREWING CO (Y)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85029", "name": "SPOOKY GRENADINE 12/32 PET", "supplier": "SPOOKY BEVERAGE, LLC", "brandFamily": "SPOOKY (K)", "type": "Non Alc Package", "package": "12/32 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "53311", "name": "RUSH RIVER BUBBLEJACK IPA 4/6/12 BTL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "46181", "name": "INDEED MEXICAN HONEY LIGHT 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "73052", "name": "WOODCHUCK BLUEBERRY 1/2 BBL", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "67911", "name": "WEIHENSTEPHANER PILSNER 4/6/11.2 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "11812", "name": "DRAGONS MILK CRIMSON 6/4/12 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "72453", "name": "WOODCHUCK PEARSECCO 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "24921", "name": "FOUNDERS ALL DAY IPA 15/19.2 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "15/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "34683", "name": "PADRAIGS LAGER 1/2 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "12020", "name": "DRAGONS MILK BBA STOUT 12/19.2 CN", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10353", "name": "PABST GRILLOS PICKLE BEER 4/6/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "18011", "name": "BLUE MOON 4/6/12 BTL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "63711", "name": "MAHARAJA 24/11.2 BTL", "supplier": "EAST WEST BEV", "brandFamily": "TAJ MAHAL (K)", "type": "Beer Package", "package": "24/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "26120", "name": "LAGUNITAS HAZICUS MAX IPA 12/19.2 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "29853", "name": "GO BREWING SUNBEAM PILS NA 4/6/12 CN", "supplier": "GO BREWING", "brandFamily": "GO BREWING (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "26453", "name": "LAGUNITAS HAZY IPA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "80611", "name": "RED STRIPE 4/6/11.2 BTL", "supplier": "HEINEKEN USA", "brandFamily": "RED STRIPE (U)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "33265", "name": "SoTIER OVERPACK'D VARIETY 2/15/12 CN", "supplier": "SOUTHERN TIER BREWING COMPANY", "brandFamily": "SOUTHERN TIER (K)", "type": "Beer Package", "package": "2/15/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17511", "name": "COORS LIGHT 4/6/12 BTL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "85030", "name": "SPOOKY MARGARITA MIX 12/32 PET", "supplier": "SPOOKY BEVERAGE, LLC", "brandFamily": "SPOOKY (K)", "type": "Non Alc Package", "package": "12/32 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "23755", "name": "FOUNDERS MORTAL BLOOM HAZY IPA 2/12/12 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "80315", "name": "HEINEKEN 0.0% NA 2/12/11.2 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Non Alc Package", "package": "2/12/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "84430", "name": "KLARBRUNN GINGER ALE 15/1LTR PET", "supplier": "WIS-PAK", "brandFamily": "KLARBRUNN MIXES (G)", "type": "Non Alc Package", "package": "15/1LTR PET", "seasonality": "Annual", "status": "Active"}, {"id": "17411", "name": "COORS BANQUET STUBBY 4/6/12 BTL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "30954", "name": "BROOKLYN EAST IPA NA 4/6/12 CN", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84612", "name": "REEDS EXTRA GINGER BEER 6/4/12 CN", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10857", "name": "OLD MILWAUKEE NA 24/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "STROH & OLD MILWAUKEE & ST. IDES (B)", "type": "Non Alc Package", "package": "24/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "60964", "name": "PAULANER VARIETY PK 2/10/16.9 CN", "supplier": "PAULANER HP USA", "brandFamily": "PAULANER (H)", "type": "Beer Package", "package": "2/10/16.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "37754", "name": "BAD WEATHER ANOMALY TRIPLE BERRY SOUR 6/4/12 CN", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "24983", "name": "FOUNDERS ALL DAY IPA 1/2 BBL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "17755", "name": "COORS EDGE NA 2/12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "53211", "name": "RUSH RIVER DOUBLE BUBBLE 4/6/12 BTL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "37453", "name": "BAD WEATHER PILS 4/6/12 CN", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "57011", "name": "BELLS AMBER ALE 4/6/12 BTL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "22688", "name": "FULTON TRIPLE BERRY SOUR 1/4 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "61311", "name": "HACKER PSCHORR WEISSE 4/6/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "HACKER-PSCHORR (C)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "68611", "name": "OLD SPECKLED HEN 4/6/12 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "85683", "name": "MPLS CIDER MANGO HABANERO 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "58563", "name": "BELLS OBERON ALE 6/4/16 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "18862", "name": "KEYSTONE LIGHT 24/16 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "24/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "53484", "name": "RUSH RIVER HOUSE RED 1/2 BBL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "86400", "name": "NOWADAYS 5THC 12/2 BTL", "supplier": "NOWADAYS", "brandFamily": "NOWADAYS (K)", "type": "THC/CBD Package", "package": "12 PER CASE", "seasonality": "Annual", "status": "Active"}, {"id": "48045", "name": "INDEED PINK RABBIT PILS 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "37682", "name": "BAD WEATHER HAZE OASIS 1/2 BBL", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "57211", "name": "BELLS PORTER 4/6/12 BTL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "35007", "name": "PADRAIGS ESB 1/2 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "70753", "name": "WYDERS PEAR 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "DAY CHASE, WYDERS (J)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "34983", "name": "PADRAIGS PORTER 1/2 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "48032", "name": "INDEED BIA SIDE PILSNER 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "45220", "name": "VICTORY GOLDEN MONKEY 15/19.2 CN", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Package", "package": "15/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48800", "name": "SURLY LLL 10THC BLUE LAGOON 6/4/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "74011", "name": "JDCC BLACK JACK COLA 4/6/10 BTL", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "4/6/10 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "37781", "name": "BAD WEATHER ANOMALY TRIPLE BERRY SOUR 1/6 BBL", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "37571", "name": "BAD WEATHER HOPCROMANCER IPA 1/6 BBL", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "84710", "name": "VIRGILS ROOT BEER 6/4/12 BTL", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "63421", "name": "TAJ MAHAL BLACK 12/22 BTL", "supplier": "EAST WEST BEV", "brandFamily": "TAJ MAHAL (K)", "type": "Beer Package", "package": "12/22 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "74365", "name": "JDCC BOLDER VARIETY 2/12/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "49075", "name": "SURLY DBL TAKE LEMONADE 10THC 6/4/16 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "20183", "name": "21A BLOOD ORANGE IPA 1/2 BBL", "supplier": "21st AMENDMENT BREWERY", "brandFamily": "21st AMENDMENT (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "57311", "name": "BELLS KALAMAZOO STOUT 4/6/12 BTL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "17585", "name": "COORS LIGHT 1/4 BBL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "85663", "name": "MPLS CIDER MANGO HABANERO 6/4/16 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "52883", "name": "RUSH RIVER LIGHT 1/2 BBL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "3.2 Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "34953", "name": "PADRAIGS PORTER 4/6/12 CN", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17464", "name": "COORS BANQUET 15/16 ALUMA PINT", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "15/16 ALUM BTL", "seasonality": "Annual", "status": "Active"}, {"id": "34653", "name": "PADRAIGS LAGER 4/6/12 CN", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "86700", "name": "BUZ POP 10THC GRAPE 6/4/12 CN", "supplier": "NOCOAST CANNABIS CO", "brandFamily": "NOCOAST CANNABIS CO (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "49015", "name": "SURLY TAKE 5 5THC BERRY 4/6/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46081", "name": "INDEED DAY TRIPPER 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "80055", "name": "HEINEKEN SILVER 2/12/12 CN", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "3.2 Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85873", "name": "MPLS CIDER PINK PINEAPPLE 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "18081", "name": "BLUE MOON 1/6 BBL", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "84931", "name": "SPOOKY SRIRACHA BLOODY 12/32 BTL", "supplier": "SPOOKY BEVERAGE, LLC", "brandFamily": "SPOOKY (K)", "type": "Non Alc Package", "package": "12/32 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "18055", "name": "BLUE MOON 2/12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "27565", "name": "LAGUNITAS SPRITZ REFRESHER NA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "14871", "name": "ARNOLD PALMER SPIKED RASPBERRY 12/24 BIG CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "12/24 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "37481", "name": "BAD WEATHER PILS 1/6 BBL", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "48810", "name": "SURLY LLL 10THC SEX ON BEACH 6/4/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "56865", "name": "BELLS FLYOVER LIGHT 2/15/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "2/15/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "72255", "name": "WOODCHUCK VARIETY 2/12/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Cider Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "12083", "name": "DRAGONS MILK BBA STOUT 1/2 BBL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "27720", "name": "LAGUNITAS TROOPER IPA 4/6/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "23185", "name": "FULTON SHANDY 1/4 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "83782", "name": "ACE PEAR CIDER 1/2 BBL", "supplier": "CALIFORNIA CIDER CO INC", "brandFamily": "ACE CIDER (Q)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "68783", "name": "TENNENTS LAGER 50LTR BBL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "84760", "name": "FLYING CAULDRON BUTTERSCOTCH 6/4/12 BTL", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "80615", "name": "RED STRIPE 2/12/11.2 BTL", "supplier": "HEINEKEN USA", "brandFamily": "RED STRIPE (U)", "type": "Beer Package", "package": "2/12/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "73086", "name": "WOODCHUCK PINEAPPLE 1/2 BBL", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "84355", "name": "ACE HIGH PEACH 4/6/12 CN", "supplier": "CALIFORNIA CIDER CO INC", "brandFamily": "ACE CIDER (Q)", "type": "Wine Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "30663", "name": "BROOKLYN SHACKMEISTER 6/4/16 CN", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "26621", "name": "LAGUNITAS UNCENSORED PUNCH 12/19.2 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "64622", "name": "SINGHA 12/21 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "SINGHA (K)", "type": "Beer Package", "package": "12/22 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "85031", "name": "SPOOKY SWEET/SOUR MIX 12/32 PET", "supplier": "SPOOKY BEVERAGE, LLC", "brandFamily": "SPOOKY (K)", "type": "Non Alc Package", "package": "12/32 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "86710", "name": "BUZ POP 10THC MANGO/PINE 6/4/12 CN", "supplier": "NOCOAST CANNABIS CO", "brandFamily": "NOCOAST CANNABIS CO (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "35000", "name": "PADRAIGS DULLAHANS NITRO STOUT 1/2 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "53381", "name": "RUSH RIVER BUBBLEJACK IPA 1/6 BBL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "48685", "name": "SENORITA LJ MARGARITA 5THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "SENORITA (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "47281", "name": "INDEED MEXICAN HONEY IMPERIAL 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "73472", "name": "JDCC BOLDER STRAWBERRY 12/23.5 BIG CN", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "12/23.5 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "35553", "name": "GREAT LAKES DORTMUND GOLD 4/6/12 CN", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "21954", "name": "FULTON HOP KINGDOM HW MANGO NA 4/6/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23339", "name": "FULTON LUCE SAAZQUACH PILS 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "47999", "name": "INDEED STRAWBERRY FIELDS 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "85875", "name": "MPLS CIDER TART CHERRY 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "48575", "name": "KEEF LIFE H2O 7.5THC SNOOZE 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "44955", "name": "VICTORY PRIMA PILS 2/12/12 CN", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48580", "name": "KEEF LIFE H2O 7.5THC BALANCE 6/4/12 CN", "supplier": "KEEF", "brandFamily": "KEEF THC (Y)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85204", "name": "CRISPIN ORIGINAL CIDER 12/19.2 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "CRISPIN (K)", "type": "Cider Package", "package": "12/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84055", "name": "ACE TROPICAL VARIETY 2/12/12 CN", "supplier": "CALIFORNIA CIDER CO INC", "brandFamily": "ACE CIDER (Q)", "type": "Cider Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "50075", "name": "CYCLING FROG HUCKLEBERRY 5THC GUMMIES 10/10 PK", "supplier": "CYCLING FROG", "brandFamily": "CYCLING FROG (K)", "type": "THC/CBD Package", "package": "10/10 PK", "seasonality": "Annual", "status": "Active"}, {"id": "53383", "name": "RUSH RIVER BUBBLEJACK IPA 1/2 BBL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "51511", "name": "LEFTHAND MILKSTOUT 4/6/12 BTL", "supplier": "LEFT HAND BREWING", "brandFamily": "LEFT HAND (K)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "25354", "name": "FOUNDERS MOSAIC PROMISE 2/12/12 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "85232", "name": "CRISPIN ZERO NA 6/4/16 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "CRISPIN (K)", "type": "Non Alc Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "34753", "name": "PADRAIGS HONEY BLONDE 4/6/12 CN", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84356", "name": "ACE HIGH PINEAPPLE 4/6/12 CN", "supplier": "CALIFORNIA CIDER CO INC", "brandFamily": "ACE CIDER (Q)", "type": "Wine Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17571", "name": "COORS LIGHT 12/24 BIG CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "12/24 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "32403", "name": "AVERY ELLIES BROWN 1/2 BBL", "supplier": "AVERY BREWING CO", "brandFamily": "AVERY BREWING CO (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "85851", "name": "MPLS CIDER DOCKSIDE 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "13509", "name": "TSINGTAO 0.0 NA 4/6/11.2 BTL", "supplier": "PAULANER HP USA", "brandFamily": "TSINGTAO (R)", "type": "Non Alc Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "85864", "name": "MPLS CIDER CITRUS HOP CIDER 1/2 BBL", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "27721", "name": "LAGUNITAS TROOPER IPA 1/2 BBL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "24353", "name": "FOUNDERS NONETHELESS NA 4/6/12 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "68411", "name": "BELHAVEN SCOTTISH ALE 4/6/11.2 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "BELHAVEN (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "18875", "name": "KEYSTONE LIGHT 30/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "30/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "29353", "name": "GO BREWING DISARM HAZY NA 4/6/12 CN", "supplier": "GO BREWING", "brandFamily": "GO BREWING (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "58585", "name": "BELLS OBERON ALE 1/4 BBL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "68811", "name": "XINGU BLACK 4/6/12 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "4/6/11.2 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "32083", "name": "AVERY WHITE RASCAL 1/2 BBL", "supplier": "AVERY BREWING CO", "brandFamily": "AVERY BREWING CO (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "48102", "name": "INDEED BRIGHTSIDE 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "80515", "name": "HEINEKEN LIGHT 2/12/12 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "3.2 Beer Package", "package": "2/12/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "80211", "name": "AMSTEL LIGHT 4/6/12 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "3.2 Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "50085", "name": "CYCLING FROG MANGO PINEAPPLE 5THC GUMMIES 10/10 PK", "supplier": "CYCLING FROG", "brandFamily": "CYCLING FROG (K)", "type": "THC/CBD Package", "package": "10/10 PK", "seasonality": "Annual", "status": "Active"}, {"id": "68545", "name": "WEXFORD IRISH CREAM 6/4/14.9 CN", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "6/4/14.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "52423", "name": "LEFTHAND COCONUT MILK STOUT 4/6/12 CN", "supplier": "LEFT HAND BREWING", "brandFamily": "LEFT HAND (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "12081", "name": "DRAGONS MILK BBA STOUT 1/6 BBL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "80123", "name": "HEINEKEN 12/22 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Beer Package", "package": "12/22 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "14971", "name": "ARNOLD PALMER SPIKED STRAWBERRY 12/24 BIG CN", "supplier": "MILLER BREWING COMPANY", "brandFamily": "HAMMS & ARNIE P (T)", "type": "Beer Package", "package": "12/24 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "71753", "name": "WOODCHUCK GRANNY SMITH 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17955", "name": "BLUE MOON LIGHT 2/12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "3.2 Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "24655", "name": "FOUNDERS EASY DRINKING BEER 2/12/12 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85872", "name": "MPLS CIDER PINK PINEAPPLE 6/4/16 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "24111", "name": "FOUNDERS RUBAEUS 4/6/12 BTL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "85939", "name": "TRAIL MAGIC COCKTAIL H&H 8.0% 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC COCKTAILS (K)", "type": "Wine Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48695", "name": "SENORITA GF PALOMA 5THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "SENORITA (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "73672", "name": "JDCC BOLDER SOUTHERN PEACH 12/23.5 BIG CN", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "12/23.5 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23793", "name": "FOUNDERS MB IMP THORN 4/6/12 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "47463", "name": "INDEED EASY LEAGUE LIGHT BAR PACK 4/6/16 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17466", "name": "COORS BANQUET 2/9/16 ALUMA PINT", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Beer Package", "package": "2/9/16 ALUM BTL", "seasonality": "Annual", "status": "Active"}, {"id": "17853", "name": "BLUE MOON NA 4/6/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "70553", "name": "WYDERS RASPBERRY 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "DAY CHASE, WYDERS (J)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "49020", "name": "SURLY TAKE 5 5THC LIME 6/4/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "29953", "name": "BROOKLYN PILSNER 4/6/12 CN", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84651", "name": "REEDS GINGER ALE 6/4/12 SLIM CN", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "34783", "name": "PADRAIGS HONEY BLONDE 1/2 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "26885", "name": "LAGUNITAS HOP STOOPID 1/4 BBL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "48880", "name": "SURLY LLL 3THC MOCKTAIL VARIETY 2/12/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "36853", "name": "GREAT LAKES LAKE ERIE MONSTER 4/6/12 CN", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "37163", "name": "GREAT LAKES INDEPENDENCE 4/6/12 CN", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "12211", "name": "DRAGONS MILK RESERVE SEASONAL 1/6 BBL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "47465", "name": "INDEED EASY LEAGUE LIGHT 3/8/16 CN", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Package", "package": "3/8/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48720", "name": "NORTH CANNA 10THC BERRY LEMONADE 6/4/12 CN", "supplier": "NORTH CANNA CO", "brandFamily": "NORTH CANNA CO", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "29753", "name": "GO BREWING SALTY AF CHELADA NA 4/6/12 CN", "supplier": "GO BREWING", "brandFamily": "GO BREWING (K)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "21895", "name": "FULTON NARC PUNK LEMON 3THC 6/4/12 CN", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48690", "name": "SENORITA MANGO MARGARITA 5THC 6/4/12 CN", "supplier": "GREEN THUMB", "brandFamily": "SENORITA (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48002", "name": "INDEED STRAWBERRY FIELDS 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "30854", "name": "BROOKLYN STONEWALL IPA 1/2 BBL", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "70853", "name": "WYDERS PINEAPPLE 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "DAY CHASE, WYDERS (J)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "43283", "name": "BIG SKY SUMMER HONEY 1/2 BBL", "supplier": "BIG SKY BREWING", "brandFamily": "BIG SKY (Q)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "32413", "name": "AVERY THE REVEREND 4/6/12 CN", "supplier": "AVERY BREWING CO", "brandFamily": "AVERY BREWING CO (Y)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "73050", "name": "WOODCHUCK BLUEBERRY 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10176", "name": "PABST 250 FREEDOM PACK 10/25 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "10/25 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "50020", "name": "CYCLING FROG BLACK CURRANT 10THC 6/4/12 CN", "supplier": "CYCLING FROG", "brandFamily": "CYCLING FROG (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "35005", "name": "PADRAIGS PUB ALE 1/2 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "48830", "name": "SURLY LLL 10THC BAHAMA MAMA 6/4/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "58853", "name": "BELLS OBERON LIGHT 4/6/12 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "50005", "name": "CYCLING FROG CRAN RAZZ 10THC 6/4/12 CN", "supplier": "CYCLING FROG", "brandFamily": "CYCLING FROG (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "53683", "name": "DRY DOCK APRICOT BLONDE 1/2 BBL", "supplier": "LEFT HAND BREWING", "brandFamily": "Dry Dock (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "50010", "name": "CYCLING FROG WILD CHERRY 10THC 6/4/12 CN", "supplier": "CYCLING FROG", "brandFamily": "CYCLING FROG (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "31154", "name": "BROOKLYN SUMMER ALE 4/6/12 CN", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "48715", "name": "NORTH CANNA 10THC VARIETY 3/8/12 CN", "supplier": "NORTH CANNA CO", "brandFamily": "NORTH CANNA CO", "type": "THC/CBD Package", "package": "3/8/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "80511", "name": "HEINEKEN LIGHT 4/6/12 BTL", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "3.2 Beer Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "37853", "name": "BAD WEATHER SUN PILLAR 4/6/12 CN", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "23983", "name": "FOUNDERS NITRO OATMEAL STOUT 1/2 BBL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "44458", "name": "VICTORY IPA VARIETY 2/12/12 CN", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "10963", "name": "OLD MILWAUKEE 4/6/16 CN", "supplier": "PABST BREWING CO.", "brandFamily": "STROH & OLD MILWAUKEE & ST. IDES (B)", "type": "Beer Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46983", "name": "INDEED PEACH BUM IPA 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "28587", "name": "LAGUNITAS HAZY IPA 1/4 BBL", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "37943", "name": "BAD WEATHER HERITAGE LAGER 4/6/12 CN", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "84610", "name": "REEDS ORIGINAL GINGER BEER 6/4/12 BTL", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "6/4/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "23083", "name": "FULTON SELTZER PURPLE AVE 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "36453", "name": "GREAT LAKES CHILLWAVE 4/6/12 CN", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "50000", "name": "CYCLING FROG VARIETY 10THC 3/8/12 CN", "supplier": "CYCLING FROG", "brandFamily": "CYCLING FROG (K)", "type": "THC/CBD Package", "package": "3/8/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "53653", "name": "DRY DOCK APRICOT BLONDE 4/6/12 CN", "supplier": "LEFT HAND BREWING", "brandFamily": "Dry Dock (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48825", "name": "SURLY LLL 10THC HURRICANE 6/4/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "68983", "name": "GAFFEL KOLSCH 50LTR BBL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Keg", "package": "50 LTR", "seasonality": "Annual", "status": "Active"}, {"id": "45971", "name": "VICTORY PRIMA PILS 1/2 BBL", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "70111", "name": "MAGNERS PEAR 4/6/12 BTL", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "MAGNERS (J)", "type": "Cider Package", "package": "4/6/12 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "45283", "name": "VICTORY GOLDEN MONKEY 1/2 BBL", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "48710", "name": "NORTH CANNA 10THC ORANGE MANGO 6/4/12 CN", "supplier": "NORTH CANNA CO", "brandFamily": "NORTH CANNA CO", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "46981", "name": "INDEED PEACH BUM IPA 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "45804", "name": "VICTORY TIKI MONKEY 4/6/12 CN", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "30083", "name": "BROOKLYN LAGER 1/2 BBL", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "59061", "name": "BELLS CITRUS HOPSLAM 1/4 BBL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "50015", "name": "CYCLING FROG RUBY GRAPEFRUIT 10THC 6/4/12 CN", "supplier": "CYCLING FROG", "brandFamily": "CYCLING FROG (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17330", "name": "ZOA TROPICAL PUNCH ZERO 12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "31153", "name": "BROOKLYN FONIO RISING 4/6/12 CN", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "44253", "name": "VICTORY DIRTWOLF IPA 4/6/12 CN", "supplier": "VICTORY BREWING", "brandFamily": "VICTORY (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "74671", "name": "EL JIMADOR MARGARITA 12/23.5 BIG CN", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "12/23.5 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85038", "name": "SPOOKY TRIPLE SEC 12/32 PET", "supplier": "SPOOKY BEVERAGE, LLC", "brandFamily": "SPOOKY (K)", "type": "Non Alc Package", "package": "12/32 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "53018", "name": "RUSH RIVER SHANDY 4/6/12 BTL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "3.2 Beer Package", "package": "4/6/12 BTL", "seasonality": "Seasonal", "status": "Active"}, {"id": "85901", "name": "TRAIL MAGIC COCKTAIL H&H 2.9% 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC COCKTAILS (K)", "type": "Wine Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17360", "name": "ZOA GRAPE 12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "25260", "name": "FOUNDERS KBS ICED MOCHA 6/4/12 BTL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "6/4/12 BTL", "seasonality": "Seasonal", "status": "Active"}, {"id": "85039", "name": "SPOOKY ESPRESSO MARTINI 12/32 PET", "supplier": "SPOOKY BEVERAGE, LLC", "brandFamily": "SPOOKY (K)", "type": "Non Alc Package", "package": "12/32 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "52407", "name": "LEFTHAND GOOD JUJU 4/6/12 CN (OFF 6/8/26)", "supplier": "LEFT HAND BREWING", "brandFamily": "LEFT HAND (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "17365", "name": "ZOA MANGO SPLASH 12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48151", "name": "INDEED WAMDOODLE 1/2 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "10955", "name": "OLD MILWAUKEE 2/12/12 CAN", "supplier": "PABST BREWING CO.", "brandFamily": "STROH & OLD MILWAUKEE & ST. IDES (B)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17370", "name": "ZOA GREEN APPLE ZERO 12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "30863", "name": "BROOKLYN STONEWALL IPA 6/4/16 CN", "supplier": "BROOKLYN BREWERY", "brandFamily": "BROOKLYN (K)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "51180", "name": "LEFTHAND NITRO FLAMINGO DREAMS 1/6 BBL", "supplier": "LEFT HAND BREWING", "brandFamily": "LEFT HAND (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "53753", "name": "DRY DOCK HOPRICOT IPA 4/6/12 CN", "supplier": "LEFT HAND BREWING", "brandFamily": "Dry Dock (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17340", "name": "ZOA WHITE PEACH ZERO 12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "72153", "name": "WOODCHUCK BIG CRUSH 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Wine Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "23082", "name": "FULTON SELTZER CITRUS GINGER 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "24683", "name": "FOUNDERS EASY DRINKING BEER 1/2 BBL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "69400", "name": "SHIPYARD SMASHED WATERMELON 6/4/16 CN", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "SHIPYARD (K)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "23721", "name": "FOUNDERS MORTAL BLOOM HAZY IPA 15/19.2 CN", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Package", "package": "15/19.2 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "58597", "name": "BELLS OBERON ALE 2/5L CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "2/5 LTR CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "869000", "name": "BLACK FROST BLENDED BOURBON 750ML", "supplier": "BLACK FROST", "brandFamily": "BLACK FROST (K)", "type": "Liquor Package", "package": "750ML", "seasonality": "Annual", "status": "Active"}, {"id": "86480", "name": "NOWADAYS 10THC CITRUS 4/6/16 CN", "supplier": "NOWADAYS", "brandFamily": "NOWADAYS (K)", "type": "THC/CBD Package", "package": "4/6/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "68645", "name": "OLD SPECKLED HEN 6/4/14.9 CN", "supplier": "TOTAL BEVERAGE SOLUTION", "brandFamily": "TBS ALL BRANDS (K)", "type": "Beer Package", "package": "6/4/14.9 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17335", "name": "ZOA WILD ORANGE ZERO 12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "22097", "name": "FULTON CHILL CITY DRY HOP 1/2 BBL", "supplier": "FULTON BREWING COMPANY", "brandFamily": "FULTON (K)", "type": "3.2 Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "37881", "name": "BAD WEATHER SUN PILLAR 1/6 BBL", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "56883", "name": "BELLS FLYOVER LIGHT 1/2 BBL", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "48089", "name": "INDEED MEX HON GF RADLER 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "32053", "name": "AVERY WHITE RASCAL 4/6/12 CN", "supplier": "AVERY BREWING CO", "brandFamily": "AVERY BREWING CO (Y)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48086", "name": "INDEED CHELADA HONEY LIGHT 1/6 BBL", "supplier": "INDEED BREWING COMPANY", "brandFamily": "INDEED BREWING (Y)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "869005", "name": "BLACK FROST BLENDED RYE 750ML", "supplier": "BLACK FROST", "brandFamily": "BLACK FROST (K)", "type": "Liquor Package", "package": "750ML", "seasonality": "Annual", "status": "Active"}, {"id": "84640", "name": "REEDS BLACKBERRY GINGER ALE 6/4/12 CN", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84670", "name": "REEDS HARD CHERRY LIME 6/4/12 CN", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Beer Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "11055", "name": "OLD MILWAUKEE LIGHT 2/12/12 CN", "supplier": "PABST BREWING CO.", "brandFamily": "STROH & OLD MILWAUKEE & ST. IDES (B)", "type": "Beer Package", "package": "2/12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "869010", "name": "BLACK FROST SINGLE MALT 750ML", "supplier": "BLACK FROST", "brandFamily": "BLACK FROST (K)", "type": "Liquor Package", "package": "750ML", "seasonality": "Annual", "status": "Active"}, {"id": "85209", "name": "CRISPIN IMP APPLE CIDER 6/4/16 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "CRISPIN (K)", "type": "Wine Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "17375", "name": "ZOA LEMON LIME ZERO 12/12 CN", "supplier": "COORS BREWING CO", "brandFamily": "COORS BREWING (L)", "type": "Non Alc Package", "package": "12/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "37164", "name": "GREAT LAKES INDEPENDENCE 1/6 BBL", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "65370", "name": "TONA CERVEZA 12/24 BIG CN", "supplier": "ARTISANAL IMPORTS", "brandFamily": "TONA (Z)", "type": "Beer Package", "package": "12/24 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "25261", "name": "FOUNDERS KBS ICED MOCHA 1/4 BBL", "supplier": "FOUNDERS BREWING COMPANY", "brandFamily": "FOUNDERS (N)", "type": "Beer Keg", "package": "1/4 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "34981", "name": "PADRAIGS PORTER 1/6 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "13571", "name": "TSINGTAO 12/24 BIG CN", "supplier": "PAULANER HP USA", "brandFamily": "TSINGTAO (R)", "type": "Beer Package", "package": "12/24 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48410", "name": "CORNBREAD VARIETY PACK 10THC 6/4/12 CN", "supplier": "CORNBREAD HEMP", "brandFamily": "CORNBREAD HEMP", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48700", "name": "NORTH CANNA 5THC VARIETY 3/8/12 CN", "supplier": "NORTH CANNA CO", "brandFamily": "NORTH CANNA CO", "type": "THC/CBD Package", "package": "3/8/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48400", "name": "CORNBREAD BLUEBERRY BREEZE 10THC 6/4/12 CN", "supplier": "CORNBREAD HEMP", "brandFamily": "CORNBREAD HEMP", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "48405", "name": "CORNBREAD RASP LIMEADE 10THC 6/4/12 CN", "supplier": "CORNBREAD HEMP", "brandFamily": "CORNBREAD HEMP", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "869015", "name": "BLACK FROST COFFEE LIQUEUR 750ML", "supplier": "BLACK FROST", "brandFamily": "BLACK FROST (K)", "type": "Liquor Package", "package": "750ML", "seasonality": "Annual", "status": "Active"}, {"id": "34881", "name": "PADRAIGS RED ALE 1/6 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "35006", "name": "PADRAIGS PUB ALE 1/6 BBL", "supplier": "PADRAIGS BREWING", "brandFamily": "PADRAIGS BREWING (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "84615", "name": "REEDS EXTRA GINGER BEER 3/8/7.5 CN", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "3/8/7.5 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "869020", "name": "BLACK FROST WHITE RUM 750ML", "supplier": "BLACK FROST", "brandFamily": "BLACK FROST (K)", "type": "Liquor Package", "package": "750ML", "seasonality": "Annual", "status": "Active"}, {"id": "48885", "name": "SURLY LLL 3THC SEX ON BEACH 6/4/12 CN", "supplier": "SURLY BREWING COMPANY", "brandFamily": "SURLY BREWING COMPANY (I)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "869025", "name": "BLACK FROST GIN 750ML", "supplier": "BLACK FROST", "brandFamily": "BLACK FROST (K)", "type": "Liquor Package", "package": "750ML", "seasonality": "Annual", "status": "Active"}, {"id": "27557", "name": "LAGUNITAS HOP REFRESH VARIETY NA 24/12 CN", "supplier": "LAGUNITAS BREWING COMPANY", "brandFamily": "LAGUNITAS (K)", "type": "Non Alc Package", "package": "24/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "73872", "name": "JDCC BOLDER WATERMELON 12/23.5 BIG CN", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "12/23.5 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "74211", "name": "JDCC SOUTHERN CITRUS 4/6/10 BTL (OFF 7/28/25)", "supplier": "PABST BREWING CO.", "brandFamily": "JACK DANIELS (Y)", "type": "Beer Package", "package": "4/6/10 BTL", "seasonality": "Annual", "status": "Active"}, {"id": "80353", "name": "HEINEKEN 0.0% NA 4/6/11.2 CN", "supplier": "HEINEKEN USA", "brandFamily": "HEINEKEN (D)", "type": "Non Alc Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "84652", "name": "REEDS GINGER ALE 6/4/12 CN", "supplier": "REED'S INCORPORATED", "brandFamily": "REEDS (K)", "type": "Non Alc Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "85858", "name": "MPLS CIDER BLUEBERRY 6/4/16 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "MINNEAPOLIS CIDER (K)", "type": "Cider Package", "package": "6/4/16 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "90983", "name": "CRISPIN PINK PINEAPPLE 6/4/16 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "CRISPIN (K)", "type": "Cider Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "10172", "name": "PABST 12/32 CN", "supplier": "PABST BREWING CO.", "brandFamily": "PABST (A)", "type": "Beer Package", "package": "12/32 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "12181", "name": "DRAGONS MILK TRIPLE MASH 1/6 BBL", "supplier": "PABST BREWING CO.", "brandFamily": "NEW HOLLAND (K)", "type": "Beer Keg", "package": "1/6 BBL", "seasonality": "Annual", "status": "Active"}, {"id": "32412", "name": "AVERY THE KAISER 1/2 BBL", "supplier": "AVERY BREWING CO", "brandFamily": "AVERY BREWING CO (Y)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "35112", "name": "GREAT LAKES 73 KOLSCH 1/2 BBL", "supplier": "GREAT LAKES BREWING COMPANY", "brandFamily": "GREAT LAKES (K)", "type": "Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "37930", "name": "BAD WEATHER KOLSCH 4/6/12 CN", "supplier": "BAD WEATHER BREWING LLC", "brandFamily": "BAD WEATHER (K)", "type": "Beer Package", "package": "4/6/12 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "53019", "name": "RUSH RIVER SHANDY 1/2 BBL", "supplier": "RUSH RIVER BREWING COMPANY", "brandFamily": "RUSH RIVER (K)", "type": "3.2 Beer Keg", "package": "1/2 BBL", "seasonality": "Seasonal", "status": "Active"}, {"id": "59060", "name": "BELLS CITRUS HOPSLAM 6/4/16 CN", "supplier": "BELLS BREWERY, INC.", "brandFamily": "BELLS (P)", "type": "Beer Package", "package": "6/4/16 CAN", "seasonality": "Seasonal", "status": "Active"}, {"id": "73020", "name": "WOODCHUCK SPICED APPLE 4/6/12 CN", "supplier": "VERMONT HARD CIDER CO., LLC", "brandFamily": "WOODCHUCK (M)", "type": "Cider Package", "package": "4/6/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "87001", "name": "BREAKAGE DISCOUNT BEVERAGE 24/12", "supplier": "zOTHER ITEMS", "brandFamily": "zOTHER ITEMS (W)", "type": "Beer Package", "package": "24/12 CAN", "seasonality": "Annual", "status": "Active"}, {"id": "90999", "name": "TRAIL MAGIC H&H NON DOSE 6/4/12 CN", "supplier": "MINNEAPOLIS CIDER CO", "brandFamily": "TRAIL MAGIC THC (K)", "type": "THC/CBD Package", "package": "6/4/12 CAN", "seasonality": "Annual", "status": "Active"}];

const STYLE = `
  :root {
    --cream: #FBF5EC;
    --cream-deep: #F3E6D4;
    --card: #FFFFFF;
    --blush: #ECC2CB;
    --blush-deep: #6E2A45;
    --blush-darker: #531F35;
    --rose: #C45C7C;
    --rose-deep: #A8456A;
    --lavender: #C9BBDA;
    --lavender-deep: #8A76A8;
    --peach: #ECD2C7;
    --sand: #EEDFC0;
    --ink: #3D2A35;
    --ink-soft: #7A6470;
    --line: #EBDCDE;
  }
  .pl-app { background: var(--cream); min-height: 100vh; font-family: 'Inter', -apple-system, sans-serif; color: var(--ink); }
  .pl-header { background: linear-gradient(135deg, var(--blush-deep), var(--blush-darker)); padding: 28px 28px 20px; }
  .pl-logo { font-family: Georgia, 'Times New Roman', serif; color: #FBEEF1; font-size: 28px; font-weight: 700; letter-spacing: 0.3px; margin: 0; }
  .pl-tagline { color: #E3B9C6; font-size: 13px; margin: 4px 0 18px; }
  .pl-nav { display: flex; gap: 8px; flex-wrap: wrap; }
  .pl-nav-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 999px; font-size: 13.5px; font-weight: 600; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.08); color: #F4D9E0; cursor: pointer; transition: all .15s ease; }
  .pl-nav-btn:hover { background: rgba(255,255,255,0.15); }
  .pl-nav-btn.active { background: var(--rose); border-color: var(--rose); color: #fff; box-shadow: 0 2px 8px rgba(196,92,124,0.45); }
  .pl-body { padding: 24px 28px 80px; max-width: 1100px; margin: 0 auto; }
  .pl-subnav { display: flex; gap: 10px; margin-bottom: 18px; }
  .pl-pill { padding: 7px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; cursor: pointer; border: 1px solid var(--line); background: var(--card); color: var(--ink-soft); transition: all .15s ease; }
  .pl-pill.active { background: var(--blush-deep); border-color: var(--blush-deep); color: #fff; }
  .pl-link { color: var(--rose-deep); font-weight: 600; cursor: pointer; font-size: 13.5px; }
  .pl-link:hover { text-decoration: underline; }
  .pl-card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; }
  .pl-empty { padding: 56px 24px; text-align: center; }
  .pl-empty-icon { width: 44px; height: 44px; margin: 0 auto 14px; color: var(--rose); }
  .pl-empty h3 { font-size: 16px; font-weight: 700; color: var(--ink); margin: 0 0 4px; }
  .pl-empty p { font-size: 13.5px; color: var(--ink-soft); margin: 0; }
  .pl-fab { position: fixed; bottom: 28px; right: 28px; width: 52px; height: 52px; border-radius: 50%; background: var(--rose); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 26px; border: none; cursor: pointer; box-shadow: 0 6px 16px rgba(196,92,124,0.45); transition: transform .15s ease; }
  .pl-fab:hover { transform: scale(1.06); }
  .pl-input { border: 1px solid var(--line); border-radius: 10px; padding: 9px 12px; font-size: 13.5px; background: var(--card); color: var(--ink); outline: none; }
  .pl-input:focus { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(196,92,124,0.12); }
  .pl-row { display: flex; align-items: center; justify-content: space-between; padding: 13px 18px; border-bottom: 1px solid var(--line); font-size: 13.5px; }
  .pl-row:last-child { border-bottom: none; }
  .pl-tag { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.4px; }
  .pl-tag.annual { background: var(--lavender); color: #4A3A63; }
  .pl-tag.seasonal { background: var(--peach); color: #7A4A30; }
  .pl-supplier-card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; cursor: pointer; transition: all .15s ease; }
  .pl-supplier-card:hover { border-color: var(--rose); box-shadow: 0 4px 14px rgba(196,92,124,0.15); transform: translateY(-1px); }
  .pl-supplier-name { font-weight: 700; font-size: 14.5px; color: var(--ink); margin: 0 0 2px; }
  .pl-supplier-meta { font-size: 12.5px; color: var(--ink-soft); }
  .pl-count-badge { background: var(--blush); color: var(--blush-darker); font-size: 11.5px; font-weight: 700; padding: 2px 9px; border-radius: 999px; }

  .pl-camp-card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; margin-bottom: 12px; }
  .pl-camp-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  .pl-camp-name { font-weight: 700; font-size: 14.5px; color: var(--ink); margin: 0 0 3px; }
  .pl-camp-meta { font-size: 12.5px; color: var(--ink-soft); }
  .pl-camp-type { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.4px; white-space: nowrap; }
  .pl-camp-type.focus { background: var(--lavender); color: #4A3A63; }
  .pl-camp-type.deal { background: var(--peach); color: #7A4A30; }
  .pl-camp-type.pfp { background: var(--blush); color: var(--blush-darker); }
  .pl-status-dot { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 600; }
  .pl-status-dot .dot { width: 7px; height: 7px; border-radius: 50%; }
  .pl-camp-actions { display: flex; gap: 12px; margin-top: 10px; }
  .pl-camp-actions span { font-size: 12px; font-weight: 600; color: var(--rose-deep); cursor: pointer; }
  .pl-camp-actions span:hover { text-decoration: underline; }
  .pl-modal-overlay { position: fixed; inset: 0; background: rgba(61,42,53,0.4); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px; }
  .pl-modal { background: var(--card); border-radius: 16px; width: 100%; max-width: 460px; max-height: 88vh; overflow-y: auto; padding: 26px; }
  .pl-modal h2 { font-size: 17px; font-weight: 700; margin: 0 0 18px; color: var(--ink); }
  .pl-field { margin-bottom: 14px; }
  .pl-field label { display: block; font-size: 12.5px; font-weight: 600; color: var(--ink-soft); margin-bottom: 5px; }
  .pl-field input, .pl-field select, .pl-field textarea { width: 100%; border: 1px solid var(--line); border-radius: 9px; padding: 9px 11px; font-size: 13.5px; background: var(--cream); color: var(--ink); outline: none; box-sizing: border-box; font-family: inherit; }
  .pl-field input:focus, .pl-field select:focus, .pl-field textarea:focus { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(196,92,124,0.12); }
  .pl-field-row { display: flex; gap: 10px; }
  .pl-field-row .pl-field { flex: 1; }
  .pl-modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  .pl-btn-primary { background: var(--rose); color: #fff; border: none; padding: 9px 18px; border-radius: 999px; font-size: 13px; font-weight: 700; cursor: pointer; }
  .pl-btn-primary:hover { background: var(--rose-deep); }
  .pl-btn-ghost { background: transparent; color: var(--ink-soft); border: 1px solid var(--line); padding: 9px 18px; border-radius: 999px; font-size: 13px; font-weight: 600; cursor: pointer; }
  .pl-filter-row { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }

  .pl-tl-wrap { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 18px 18px 8px; overflow-x: auto; }
  .pl-tl-months { display: grid; grid-template-columns: 200px repeat(12, 1fr); margin-bottom: 6px; min-width: 880px; }
  .pl-tl-months span { font-size: 11px; font-weight: 700; color: var(--ink-soft); text-align: center; text-transform: uppercase; letter-spacing: 0.3px; }
  .pl-tl-group-label { font-size: 12.5px; font-weight: 700; color: var(--blush-deep); padding: 10px 0 6px; min-width: 880px; }
  .pl-tl-row { display: grid; grid-template-columns: 200px 1fr; align-items: center; min-width: 880px; min-height: 38px; border-top: 1px solid var(--line); }
  .pl-tl-row-label { font-size: 12.5px; font-weight: 600; color: var(--ink); padding-right: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pl-tl-track { position: relative; height: 24px; background: repeating-linear-gradient(to right, var(--line) 0, var(--line) 1px, transparent 1px, transparent calc(100%/12)); border-radius: 6px; }
  .pl-tl-bar { position: absolute; top: 2px; height: 20px; border-radius: 999px; font-size: 10.5px; font-weight: 700; color: #fff; display: flex; align-items: center; padding: 0 8px; white-space: nowrap; overflow: hidden; cursor: pointer; }
  .pl-tl-bar.focus { background: var(--lavender-deep); }
  .pl-tl-bar.deal { background: #C97A4A; }
  .pl-tl-bar.pfp { background: var(--rose); }
  .pl-tl-today { position: absolute; top: 0; bottom: -4px; width: 2px; background: var(--blush-darker); z-index: 2; }
  .pl-tl-legend { display: flex; gap: 16px; margin-top: 14px; padding: 0 2px 14px; font-size: 12px; color: var(--ink-soft); }
  .pl-tl-legend span { display: inline-flex; align-items: center; gap: 6px; }
  .pl-tl-legend .sw { width: 10px; height: 10px; border-radius: 3px; }

  .pl-kd-cat-pill { display: inline-flex; align-items: center; gap: 6px; }
  .pl-kd-cat-pill .sw { width: 8px; height: 8px; border-radius: 50%; }
  .pl-kd-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
  .pl-kd-dow { background: var(--cream-deep); text-align: center; font-size: 11px; font-weight: 700; color: var(--ink-soft); padding: 8px 0; text-transform: uppercase; }
  .pl-kd-day { background: var(--card); min-height: 84px; padding: 6px; position: relative; min-width: 0; overflow: hidden; }
  .pl-kd-day.outside { background: var(--cream); opacity: 0.5; }
  .pl-kd-day.today .pl-kd-daynum { background: var(--rose); color: #fff; border-radius: 50%; }
  .pl-kd-daynum { font-size: 11.5px; font-weight: 700; color: var(--ink); display: inline-flex; width: 20px; height: 20px; align-items: center; justify-content: center; }
  .pl-kd-event { font-size: 10px; font-weight: 600; color: #fff; border-radius: 5px; padding: 2px 5px; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; display: block; width: 100%; box-sizing: border-box; }
  .pl-kd-list-item { display: flex; align-items: center; gap: 12px; padding: 12px 18px; border-bottom: 1px solid var(--line); }
  .pl-kd-list-item:last-child { border-bottom: none; }
  .pl-kd-list-date { font-size: 12px; font-weight: 700; color: var(--ink-soft); width: 64px; flex-shrink: 0; }
  .pl-header-actions { display: flex; gap: 8px; margin-top: 14px; }
  .pl-header-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 13px; border-radius: 999px; font-size: 12px; font-weight: 600; border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.1); color: #F4D9E0; cursor: pointer; transition: all .15s ease; }
  .pl-header-btn:hover { background: rgba(255,255,255,0.2); }
  .pl-import-success { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); background: #3F8F5C; color: #fff; padding: 10px 20px; border-radius: 999px; font-size: 13px; font-weight: 600; z-index: 100; box-shadow: 0 4px 14px rgba(0,0,0,0.2); animation: fadeup .3s ease; }
  @keyframes fadeup { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  .pl-export-box { width: 100%; height: 180px; font-family: monospace; font-size: 11px; border: 1px solid var(--line); border-radius: 9px; padding: 10px; background: var(--cream); color: var(--ink); resize: none; outline: none; box-sizing: border-box; }
  .pl-detail-row { display: flex; gap: 8px; margin-bottom: 10px; align-items: flex-start; }
  .pl-detail-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: var(--ink-soft); width: 80px; flex-shrink: 0; padding-top: 1px; }
  .pl-detail-value { font-size: 13.5px; color: var(--ink); flex: 1; }
  .pl-detail-notes { background: var(--cream); border-radius: 8px; padding: 10px 12px; font-size: 13px; color: var(--ink); white-space: pre-wrap; line-height: 1.5; margin-top: 4px; }

  .pl-proj-card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; margin-bottom: 12px; transition: box-shadow .15s ease; }
  .pl-proj-card:hover { box-shadow: 0 4px 14px rgba(196,92,124,0.1); }
  .pl-proj-title { font-weight: 700; font-size: 15px; color: var(--ink); margin: 0 0 4px; }
  .pl-proj-meta { font-size: 12.5px; color: var(--ink-soft); margin-bottom: 8px; }
  .pl-proj-notes { font-size: 13px; color: var(--ink); background: var(--cream); border-radius: 8px; padding: 10px 12px; margin-top: 10px; white-space: pre-wrap; line-height: 1.5; }
  .pl-proj-status { font-size: 10.5px; font-weight: 700; padding: 3px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.4px; white-space: nowrap; }
  .pl-proj-status.concept { background: var(--lavender); color: #4A3A63; }
  .pl-proj-status.planning { background: var(--sand); color: #6B5020; }
  .pl-proj-status.in-progress { background: var(--blush); color: var(--blush-darker); }
  .pl-proj-status.hold { background: #E5DEE1; color: #6B5A63; }
  .pl-proj-status.complete { background: #D4E8DA; color: #2F6B45; }
  .pl-proj-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }

  .pl-rel-health { font-size: 10.5px; font-weight: 700; padding: 3px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.4px; white-space: nowrap; }
  .pl-rel-health.strong { background: #D4E8DA; color: #2F6B45; }
  .pl-rel-health.good { background: var(--lavender); color: #4A3A63; }
  .pl-rel-health.needs-attention { background: var(--peach); color: #7A4A30; }
  .pl-rel-health.at-risk { background: var(--blush); color: var(--blush-darker); }
  .pl-rel-section { margin-top: 20px; }
  .pl-rel-section h3 { font-size: 14px; font-weight: 700; color: var(--ink); margin: 0 0 12px; }
  .pl-log-entry { padding: 12px 16px; border-bottom: 1px solid var(--line); }
  .pl-log-entry:last-child { border-bottom: none; }
  .pl-log-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
  .pl-log-type { font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: var(--cream-deep); color: var(--ink-soft); }
  .pl-log-date { font-size: 12px; color: var(--ink-soft); }
  .pl-log-notes { font-size: 13px; color: var(--ink); line-height: 1.5; }

  .pl-asset-card { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 6px; transition: box-shadow .15s ease; }
  .pl-asset-card:hover { box-shadow: 0 4px 14px rgba(196,92,124,0.12); }
  .pl-asset-type { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.4px; white-space: nowrap; display: inline-block; }
  .pl-asset-type.photo { background: #D4E8DA; color: #2F6B45; }
  .pl-asset-type.video-reel { background: var(--lavender); color: #4A3A63; }
  .pl-asset-type.graphic { background: var(--peach); color: #7A4A30; }
  .pl-asset-type.logo { background: var(--blush); color: var(--blush-darker); }
  .pl-asset-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
  .pl-asset-name { font-weight: 700; font-size: 13.5px; color: var(--ink); }
  .pl-asset-meta { font-size: 12px; color: var(--ink-soft); }
  .pl-asset-link { font-size: 12px; color: var(--rose-deep); font-weight: 600; word-break: break-all; cursor: pointer; }
  .pl-asset-link:hover { text-decoration: underline; }

  .pl-analytics-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .pl-analytics-table th { text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; color: var(--ink-soft); padding: 10px 14px; border-bottom: 2px solid var(--line); background: var(--cream-deep); }
  .pl-analytics-table td { padding: 11px 14px; border-bottom: 1px solid var(--line); vertical-align: middle; }
  .pl-analytics-table tr:last-child td { border-bottom: none; }
  .pl-analytics-table tr:hover td { background: var(--cream); }
  .pl-trend-up { color: #2F6B45; font-weight: 700; font-size: 11px; }
  .pl-trend-down { color: #A8456A; font-weight: 700; font-size: 11px; }
  .pl-trend-flat { color: var(--ink-soft); font-size: 11px; }
  .pl-budget-card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; margin-bottom: 14px; }
  .pl-budget-bar-bg { background: var(--cream-deep); border-radius: 999px; height: 8px; margin: 10px 0 6px; overflow: hidden; }
  .pl-budget-bar-fill { height: 8px; border-radius: 999px; transition: width .3s ease; }
  .pl-spend-entry { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-top: 1px solid var(--line); font-size: 13px; }
  .pl-csv-stat { text-align: center; flex: 1; padding: 12px; border-radius: 10px; }
  .pl-csv-stat .num { font-size: 24px; font-weight: 700; }
  .pl-csv-stat .lbl { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }






  .pl-sheet { width: 100%; border-collapse: collapse; font-size: 13px; }
  .pl-sheet th { text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; color: var(--ink-soft); padding: 10px 14px; border-bottom: 2px solid var(--line); background: var(--cream-deep); }
  .pl-sheet td { padding: 11px 14px; border-bottom: 1px solid var(--line); vertical-align: top; }
  .pl-sheet tr:last-child td { border-bottom: none; }
  .pl-sheet tr:hover td { background: var(--cream); }
  .pl-platform-tag { font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: var(--lavender); color: #4A3A63; white-space: nowrap; }
  .pl-status-pill { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.3px; white-space: nowrap; }
  .pl-status-pill.draft { background: #E5DEE1; color: #6B5A63; }
  .pl-status-pill.scheduled { background: var(--blush); color: var(--blush-darker); }
  .pl-status-pill.published { background: #D4E8DA; color: #2F6B45; }
  .pl-sheet-actions { display: flex; gap: 10px; }
  .pl-sheet-actions span { font-size: 12px; font-weight: 600; color: var(--rose-deep); cursor: pointer; white-space: nowrap; }
  .pl-sheet-actions span:hover { text-decoration: underline; }

  .pl-todo-panel { background: var(--card); border: 1px solid var(--line); border-radius: 14px; margin-bottom: 18px; overflow: hidden; }
  .pl-todo-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; cursor: pointer; }
  .pl-todo-header h3 { margin: 0; font-size: 14px; font-weight: 700; color: var(--ink); }
  .pl-todo-chevron { transition: transform .15s ease; color: var(--ink-soft); }
  .pl-todo-chevron.open { transform: rotate(180deg); }
  .pl-todo-body { padding: 0 18px 16px; }
  .pl-todo-item { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-top: 1px solid var(--line); font-size: 13px; }
  .pl-todo-item:first-child { border-top: none; }
  .pl-todo-badge { background: var(--blush); color: var(--blush-darker); font-size: 11px; font-weight: 700; padding: 2px 9px; border-radius: 999px; }
`;

function IconBuilding() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/></svg>;
}
function IconPackage() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg>;
}
function IconSearch() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
}
function IconBack() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M15 18l-6-6 6-6"/></svg>;
}
function IconDownload() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M12 3v13M7 11l5 5 5-5"/><path d="M3 20h18"/></svg>;
}
function IconUpload() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M12 16V3M7 8l5-5 5 5"/><path d="M3 20h18"/></svg>;
}


function titleCase(s) {
  return s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

// Backward-compatible: old posts have .platform (string), new ones have .platforms (array)
function getPlatforms(post) {
  if (post.platforms && post.platforms.length) return post.platforms;
  if (post.platform) return [post.platform];
  return [];
}

const NATIONAL_DAYS_SEED = [{"id": "seed-national-0001", "name": "Darts Day", "category": "national", "date": "2026-06-29", "notes": "", "seeded": true}, {"id": "seed-national-0002", "name": "Waffle Iron Day", "category": "national", "date": "2026-06-29", "notes": "", "seeded": true}, {"id": "seed-national-0003", "name": "Social Media Day", "category": "national", "date": "2026-06-30", "notes": "", "seeded": true}, {"id": "seed-national-0004", "name": "Creative Ice Cream Flavor Day", "category": "national", "date": "2026-07-01", "notes": "", "seeded": true}, {"id": "seed-national-0005", "name": "Alice in Wonderland Day", "category": "national", "date": "2026-07-04", "notes": "", "seeded": true}, {"id": "seed-national-0006", "name": "BBQ Spareribs Day", "category": "national", "date": "2026-07-04", "notes": "", "seeded": true}, {"id": "seed-national-0007", "name": "Bikini Day", "category": "national", "date": "2026-07-05", "notes": "", "seeded": true}, {"id": "seed-national-0008", "name": "Fried Chicken Day", "category": "national", "date": "2026-07-06", "notes": "", "seeded": true}, {"id": "seed-national-0009", "name": "Day of Rock 'N' Roll", "category": "national", "date": "2026-07-07", "notes": "", "seeded": true}, {"id": "seed-national-0010", "name": "Dive Bar Day", "category": "national", "date": "2026-07-07", "notes": "", "seeded": true}, {"id": "seed-national-0011", "name": "Strawberry Sunday Day", "category": "national", "date": "2026-07-07", "notes": "", "seeded": true}, {"id": "seed-national-0012", "name": "Raspberry Day", "category": "national", "date": "2026-07-08", "notes": "", "seeded": true}, {"id": "seed-national-0013", "name": "French Fry Day", "category": "national", "date": "2026-07-10", "notes": "", "seeded": true}, {"id": "seed-national-0014", "name": "Pina Colada Day", "category": "national", "date": "2026-07-10", "notes": "", "seeded": true}, {"id": "seed-national-0015", "name": "Mojito Day", "category": "national", "date": "2026-07-11", "notes": "", "seeded": true}, {"id": "seed-national-0016", "name": "Pecan Pie Day", "category": "national", "date": "2026-07-12", "notes": "", "seeded": true}, {"id": "seed-national-0017", "name": "Beans 'N' Franks Day", "category": "national", "date": "2026-07-13", "notes": "", "seeded": true}, {"id": "seed-national-0018", "name": "Grand Marnier Day", "category": "national", "date": "2026-07-14", "notes": "", "seeded": true}, {"id": "seed-national-0019", "name": "Mac and Cheese Day", "category": "national", "date": "2026-07-14", "notes": "", "seeded": true}, {"id": "seed-national-0020", "name": "Gummi Worm Day", "category": "national", "date": "2026-07-15", "notes": "", "seeded": true}, {"id": "seed-national-0021", "name": "Hot Dog Day", "category": "national", "date": "2026-07-15", "notes": "", "seeded": true}, {"id": "seed-national-0022", "name": "Cherry Day", "category": "national", "date": "2026-07-16", "notes": "", "seeded": true}, {"id": "seed-national-0023", "name": "Dole Whip Day", "category": "national", "date": "2026-07-16", "notes": "", "seeded": true}, {"id": "seed-national-0024", "name": "Lottery Day", "category": "national", "date": "2026-07-17", "notes": "", "seeded": true}, {"id": "seed-national-0025", "name": "Tattoo Day", "category": "national", "date": "2026-07-17", "notes": "", "seeded": true}, {"id": "seed-national-0026", "name": "Tropical Fruit Day", "category": "national", "date": "2026-07-18", "notes": "", "seeded": true}, {"id": "seed-national-0027", "name": "Fortune Cookie Day", "category": "national", "date": "2026-07-20", "notes": "", "seeded": true}, {"id": "seed-national-0028", "name": "Moon Day", "category": "national", "date": "2026-07-20", "notes": "", "seeded": true}, {"id": "seed-national-0029", "name": "Junk Food Day", "category": "national", "date": "2026-07-21", "notes": "", "seeded": true}, {"id": "seed-national-0030", "name": "Mango Day", "category": "national", "date": "2026-07-22", "notes": "", "seeded": true}, {"id": "seed-national-0031", "name": "Lemon Day", "category": "national", "date": "2026-07-23", "notes": "", "seeded": true}, {"id": "seed-national-0032", "name": "Refreshment Day", "category": "national", "date": "2026-07-23", "notes": "", "seeded": true}, {"id": "seed-national-0033", "name": "Tequila Day", "category": "national", "date": "2026-07-24", "notes": "", "seeded": true}, {"id": "seed-national-0034", "name": "Hot Fudge Sunday Day", "category": "national", "date": "2026-07-25", "notes": "", "seeded": true}, {"id": "seed-national-0035", "name": "Wine & Cheese Day", "category": "national", "date": "2026-07-25", "notes": "", "seeded": true}, {"id": "seed-national-0036", "name": "Coffee Milkshake Day", "category": "national", "date": "2026-07-26", "notes": "", "seeded": true}, {"id": "seed-national-0037", "name": "Creme Brulee Day", "category": "national", "date": "2026-07-27", "notes": "", "seeded": true}, {"id": "seed-national-0038", "name": "Scotch Day", "category": "national", "date": "2026-07-27", "notes": "", "seeded": true}, {"id": "seed-national-0039", "name": "Milk Chocolate Day", "category": "national", "date": "2026-07-28", "notes": "", "seeded": true}, {"id": "seed-national-0040", "name": "Chicken Wing Day", "category": "national", "date": "2026-07-29", "notes": "", "seeded": true}, {"id": "seed-national-0041", "name": "Lasagna Day", "category": "national", "date": "2026-07-29", "notes": "", "seeded": true}, {"id": "seed-national-0042", "name": "Cheesecake Day", "category": "national", "date": "2026-07-30", "notes": "", "seeded": true}, {"id": "seed-national-0043", "name": "Chili Dog Day", "category": "national", "date": "2026-07-30", "notes": "", "seeded": true}, {"id": "seed-national-0044", "name": "Mutt Day", "category": "national", "date": "2026-07-31", "notes": "", "seeded": true}, {"id": "seed-national-0045", "name": "Raspberry Cake Day", "category": "national", "date": "2026-07-31", "notes": "", "seeded": true}, {"id": "seed-national-0046", "name": "Disc Golf Day", "category": "national", "date": "2026-08-01", "notes": "", "seeded": true}, {"id": "seed-national-0047", "name": "Mead Day", "category": "national", "date": "2026-08-01", "notes": "", "seeded": true}, {"id": "seed-national-0048", "name": "Raspberry Cream Pie Day", "category": "national", "date": "2026-08-01", "notes": "", "seeded": true}, {"id": "seed-national-0049", "name": "Coloring Book Day", "category": "national", "date": "2026-08-02", "notes": "", "seeded": true}, {"id": "seed-national-0050", "name": "Ice Cream Sandwich Day", "category": "national", "date": "2026-08-02", "notes": "", "seeded": true}, {"id": "seed-national-0051", "name": "Grab Some Nuts Day", "category": "national", "date": "2026-08-03", "notes": "", "seeded": true}, {"id": "seed-national-0052", "name": "Watermelon Day", "category": "national", "date": "2026-08-03", "notes": "", "seeded": true}, {"id": "seed-national-0053", "name": "Choc Chip Cookie Day", "category": "national", "date": "2026-08-04", "notes": "", "seeded": true}, {"id": "seed-national-0054", "name": "National Night Out Day", "category": "national", "date": "2026-08-04", "notes": "", "seeded": true}, {"id": "seed-national-0055", "name": "IPA Day", "category": "national", "date": "2026-08-06", "notes": "", "seeded": true}, {"id": "seed-national-0056", "name": "Root Beer Float Day", "category": "national", "date": "2026-08-06", "notes": "", "seeded": true}, {"id": "seed-national-0057", "name": "Raspberries and Cream Day", "category": "national", "date": "2026-08-07", "notes": "", "seeded": true}, {"id": "seed-national-0058", "name": "Water Balloon Day", "category": "national", "date": "2026-08-07", "notes": "", "seeded": true}, {"id": "seed-national-0059", "name": "Bowling Day", "category": "national", "date": "2026-08-08", "notes": "", "seeded": true}, {"id": "seed-national-0060", "name": "CBD Day", "category": "national", "date": "2026-08-08", "notes": "", "seeded": true}, {"id": "seed-national-0061", "name": "Pickleball Day", "category": "national", "date": "2026-08-08", "notes": "", "seeded": true}, {"id": "seed-national-0062", "name": "Passion Fruit Day", "category": "national", "date": "2026-08-09", "notes": "", "seeded": true}, {"id": "seed-national-0063", "name": "Smores Day", "category": "national", "date": "2026-08-10", "notes": "", "seeded": true}, {"id": "seed-national-0064", "name": "Prosecco Day", "category": "national", "date": "2026-08-13", "notes": "", "seeded": true}, {"id": "seed-national-0065", "name": "Creamsicle Day", "category": "national", "date": "2026-08-14", "notes": "", "seeded": true}, {"id": "seed-national-0066", "name": "Lemon Meringue Pie Day", "category": "national", "date": "2026-08-15", "notes": "", "seeded": true}, {"id": "seed-national-0067", "name": "Rum Day", "category": "national", "date": "2026-08-16", "notes": "", "seeded": true}, {"id": "seed-national-0068", "name": "Tell a Dad Joke Day", "category": "national", "date": "2026-08-16", "notes": "", "seeded": true}, {"id": "seed-national-0069", "name": "Pineapple Juice Day", "category": "national", "date": "2026-08-17", "notes": "", "seeded": true}, {"id": "seed-national-0070", "name": "Fajita Day", "category": "national", "date": "2026-08-18", "notes": "", "seeded": true}, {"id": "seed-national-0071", "name": "Pinot Noir Day", "category": "national", "date": "2026-08-18", "notes": "", "seeded": true}, {"id": "seed-national-0072", "name": "Soft Ice Cream Day", "category": "national", "date": "2026-08-19", "notes": "", "seeded": true}, {"id": "seed-national-0073", "name": "Bacon Lovers Day", "category": "national", "date": "2026-08-20", "notes": "", "seeded": true}, {"id": "seed-national-0074", "name": "Hazy IPA Day", "category": "national", "date": "2026-08-20", "notes": "", "seeded": true}, {"id": "seed-national-0075", "name": "Spumoni Day", "category": "national", "date": "2026-08-21", "notes": "", "seeded": true}, {"id": "seed-national-0076", "name": "Sponge Cake Day", "category": "national", "date": "2026-08-23", "notes": "", "seeded": true}, {"id": "seed-national-0077", "name": "Peach Pie Day", "category": "national", "date": "2026-08-24", "notes": "", "seeded": true}, {"id": "seed-national-0078", "name": "Waffle Day", "category": "national", "date": "2026-08-24", "notes": "", "seeded": true}, {"id": "seed-national-0079", "name": "Banana Split Day", "category": "national", "date": "2026-08-25", "notes": "", "seeded": true}, {"id": "seed-national-0080", "name": "Whiskey Sour Day", "category": "national", "date": "2026-08-25", "notes": "", "seeded": true}, {"id": "seed-national-0081", "name": "Dog Day", "category": "national", "date": "2026-08-26", "notes": "", "seeded": true}, {"id": "seed-national-0082", "name": "Peach Day", "category": "national", "date": "2026-08-27", "notes": "", "seeded": true}, {"id": "seed-national-0083", "name": "Red Wine Day", "category": "national", "date": "2026-08-28", "notes": "", "seeded": true}, {"id": "seed-national-0084", "name": "Chop Suey Day", "category": "national", "date": "2026-08-29", "notes": "", "seeded": true}, {"id": "seed-national-0085", "name": "Lemon Juice Day", "category": "national", "date": "2026-08-29", "notes": "", "seeded": true}, {"id": "seed-national-0086", "name": "Beach Day", "category": "national", "date": "2026-08-30", "notes": "", "seeded": true}, {"id": "seed-national-0087", "name": "Toasted Marshmallow Day", "category": "national", "date": "2026-08-30", "notes": "", "seeded": true}, {"id": "seed-national-0088", "name": "Bowling League Day", "category": "national", "date": "2026-09-03", "notes": "", "seeded": true}, {"id": "seed-national-0089", "name": "College Colors Day", "category": "national", "date": "2026-09-04", "notes": "", "seeded": true}, {"id": "seed-national-0090", "name": "Macadamia Nut Day", "category": "national", "date": "2026-09-04", "notes": "", "seeded": true}, {"id": "seed-national-0091", "name": "Cheese Pizza Day", "category": "national", "date": "2026-09-05", "notes": "", "seeded": true}, {"id": "seed-national-0092", "name": "Tailgating Day", "category": "national", "date": "2026-09-05", "notes": "", "seeded": true}, {"id": "seed-national-0093", "name": "Coffee Ice Cream Day", "category": "national", "date": "2026-09-06", "notes": "", "seeded": true}, {"id": "seed-national-0094", "name": "Beer Lovers Day", "category": "national", "date": "2026-09-07", "notes": "", "seeded": true}, {"id": "seed-national-0095", "name": "Star Trek Day", "category": "national", "date": "2026-09-08", "notes": "", "seeded": true}, {"id": "seed-national-0096", "name": "Teddy Bear Day", "category": "national", "date": "2026-09-09", "notes": "", "seeded": true}, {"id": "seed-national-0097", "name": "Chocolate Milkshake Day", "category": "national", "date": "2026-09-12", "notes": "", "seeded": true}, {"id": "seed-national-0098", "name": "Video Games Day", "category": "national", "date": "2026-09-12", "notes": "", "seeded": true}, {"id": "seed-national-0099", "name": "Hug Your Hound Day", "category": "national", "date": "2026-09-13", "notes": "", "seeded": true}, {"id": "seed-national-0100", "name": "Peanut Day", "category": "national", "date": "2026-09-13", "notes": "", "seeded": true}, {"id": "seed-national-0101", "name": "Sober Day", "category": "national", "date": "2026-09-14", "notes": "", "seeded": true}, {"id": "seed-national-0102", "name": "Creme De Menthe Day", "category": "national", "date": "2026-09-15", "notes": "", "seeded": true}, {"id": "seed-national-0103", "name": "Double Cheeseburger Day", "category": "national", "date": "2026-09-15", "notes": "", "seeded": true}, {"id": "seed-national-0104", "name": "IT Professionals Day", "category": "national", "date": "2026-09-15", "notes": "", "seeded": true}, {"id": "seed-national-0105", "name": "Guacamole Day", "category": "national", "date": "2026-09-16", "notes": "", "seeded": true}, {"id": "seed-national-0106", "name": "Monte Cristo Sandwich Day", "category": "national", "date": "2026-09-17", "notes": "", "seeded": true}, {"id": "seed-national-0107", "name": "Cheeseburger Day", "category": "national", "date": "2026-09-18", "notes": "", "seeded": true}, {"id": "seed-national-0108", "name": "Love Your Lunch Day", "category": "national", "date": "2026-09-19", "notes": "", "seeded": true}, {"id": "seed-national-0109", "name": "Pepperoni Pizza Day", "category": "national", "date": "2026-09-20", "notes": "", "seeded": true}, {"id": "seed-national-0110", "name": "Punch Day", "category": "national", "date": "2026-09-20", "notes": "", "seeded": true}, {"id": "seed-national-0111", "name": "Chai Day", "category": "national", "date": "2026-09-21", "notes": "", "seeded": true}, {"id": "seed-national-0112", "name": "Ice Cream Cone Day", "category": "national", "date": "2026-09-22", "notes": "", "seeded": true}, {"id": "seed-national-0113", "name": "National Girls Night", "category": "national", "date": "2026-09-22", "notes": "", "seeded": true}, {"id": "seed-national-0114", "name": "Pot Pie Day", "category": "national", "date": "2026-09-23", "notes": "", "seeded": true}, {"id": "seed-national-0115", "name": "Cherries Jubilee Day", "category": "national", "date": "2026-09-24", "notes": "", "seeded": true}, {"id": "seed-national-0116", "name": "Lobster Day", "category": "national", "date": "2026-09-25", "notes": "", "seeded": true}, {"id": "seed-national-0117", "name": "Quesadilla Day", "category": "national", "date": "2026-09-25", "notes": "", "seeded": true}, {"id": "seed-national-0118", "name": "Dumpling Day", "category": "national", "date": "2026-09-26", "notes": "", "seeded": true}, {"id": "seed-national-0119", "name": "Hunting & Fishing Day", "category": "national", "date": "2026-09-26", "notes": "", "seeded": true}, {"id": "seed-national-0120", "name": "Pancake Day", "category": "national", "date": "2026-09-26", "notes": "", "seeded": true}, {"id": "seed-national-0121", "name": "Singles Day", "category": "national", "date": "2026-09-26", "notes": "", "seeded": true}, {"id": "seed-national-0122", "name": "Crush a Can Day", "category": "national", "date": "2026-09-27", "notes": "", "seeded": true}, {"id": "seed-national-0123", "name": "Drink Beer Day", "category": "national", "date": "2026-09-28", "notes": "", "seeded": true}, {"id": "seed-national-0124", "name": "Coffee Day", "category": "national", "date": "2026-09-29", "notes": "", "seeded": true}, {"id": "seed-national-0125", "name": "Hot Mulled Cider Day", "category": "national", "date": "2026-09-30", "notes": "", "seeded": true}];

const CAMPAIGN_TYPES = [
  { id: "focus", label: "Supplier Product Focus" },
  { id: "deal", label: "Deal Period" },
  { id: "pfp", label: "Pay-for-Performance" },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function campaignStatus(c) {
  const today = todayISO();
  if (c.endDate && c.endDate < today) return "ended";
  if (c.startDate && c.startDate > today) return "upcoming";
  return "active";
}

function formatDate(d) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  const dt = new Date(Number(y), Number(m) - 1, Number(day));
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const STATUS_META = {
  active: { label: "Active", color: "#3F8F5C" },
  upcoming: { label: "Upcoming", color: "#A8456A" },
  ended: { label: "Ended", color: "#9A8A93" },
};

const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function dayOfYear(dateStr, year) {
  const d = new Date(dateStr + "T00:00:00");
  const start = new Date(year, 0, 1);
  return Math.max(0, Math.min(365, (d - start) / 86400000));
}

function isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

function CampaignTimeline({ campaigns, products, year, supplierFilter }) {
  const yearDays = isLeap(year) ? 366 : 365;
  const grouped = useMemo(() => {
    if (supplierFilter !== "all") return { [supplierFilter]: campaigns.filter(c => c.supplier === supplierFilter) };
    const map = {};
    campaigns.forEach(c => {
      if (!map[c.supplier]) map[c.supplier] = [];
      map[c.supplier].push(c);
    });
    return map;
  }, [campaigns, supplierFilter]);

  const todayPct = (dayOfYear(todayISO(), year) / yearDays) * 100;
  const currentYear = new Date().getFullYear();

  const rows = Object.entries(grouped).filter(([, list]) => list.length > 0);

  if (rows.length === 0) {
    return (
      <div className="pl-card pl-empty">
        <div className="pl-empty-icon"><IconPackage /></div>
        <h3>Nothing scheduled for {year}</h3>
        <p>Add a campaign with dates in this year to see it here.</p>
      </div>
    );
  }

  return (
    <div className="pl-tl-wrap">
      <div className="pl-tl-months">
        <span></span>
        {MONTH_LABELS.map(m => <span key={m}>{m}</span>)}
      </div>
      {rows.map(([supplierName, list]) => (
        <div key={supplierName}>
          {supplierFilter === "all" && <div className="pl-tl-group-label">{titleCase(supplierName)}</div>}
          {list.map(c => {
            const clipStart = c.startDate < `${year}-01-01` ? `${year}-01-01` : c.startDate;
            const clipEnd = (c.endDate && c.endDate > `${year}-12-31`) || !c.endDate ? `${year}-12-31` : c.endDate;
            if (!c.startDate || clipStart > `${year}-12-31` || clipEnd < `${year}-01-01`) return null;
            const startPct = (dayOfYear(clipStart, year) / yearDays) * 100;
            const endPct = (dayOfYear(clipEnd, year) / yearDays) * 100;
            const widthPct = Math.max(endPct - startPct, 1.5);
            const product = products.find(p => p.id === c.productId);
            return (
              <div className="pl-tl-row" key={c.id}>
                <div className="pl-tl-row-label" title={c.name}>{c.name}</div>
                <div className="pl-tl-track">
                  {year === currentYear && <div className="pl-tl-today" style={{ left: todayPct + "%" }}></div>}
                  <div
                    className={"pl-tl-bar " + c.type}
                    style={{ left: startPct + "%", width: widthPct + "%" }}
                    title={`${c.name}${product ? " · " + titleCase(product.name) : ""} · ${formatDate(c.startDate)}${c.endDate ? " – " + formatDate(c.endDate) : ""}`}
                  >
                    {product ? titleCase(product.name) : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div className="pl-tl-legend">
        <span><span className="sw" style={{ background: "var(--lavender-deep)" }}></span>Supplier Focus</span>
        <span><span className="sw" style={{ background: "#C97A4A" }}></span>Deal Period</span>
        <span><span className="sw" style={{ background: "var(--rose)" }}></span>Pay-for-Performance</span>
      </div>
    </div>
  );
}

const KD_CATEGORIES = [
  { id: "anniversary", label: "Employee Anniversary", color: "#8A76A8" },
  { id: "national", label: "National Calendar Day", color: "#C97A4A" },
  { id: "beer", label: "Holidays", color: "#C45C7C" },
  { id: "promo", label: "Customer Promo Event", color: "#C9A227" },
];

function kdCategory(id) {
  return KD_CATEGORIES.find(c => c.id === id) || KD_CATEGORIES[0];
}

function generateAnniversaries(employees) {
  const events = [];
  const thisYear = new Date().getFullYear();
  employees.forEach(emp => {
    if (!emp.startDate) return;
    const [y, m, d] = emp.startDate.split("-").map(Number);
    for (let years = 5; years <= 50; years += 5) {
      const annivYear = y + years;
      if (annivYear < thisYear - 1 || annivYear > thisYear + 5) continue;
      const mm = String(m).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      events.push({
        id: `anniv-${emp.id}-${years}`,
        name: `${emp.name} — ${years} Year Anniversary`,
        category: "anniversary",
        date: `${annivYear}-${mm}-${dd}`,
        notes: "",
        generated: true,
      });
    }
  });
  return events;
}

function EmployeeForm({ initial, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(initial || { name: "", startDate: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit employee" : "Add employee"}</h2>
        <div className="pl-field">
          <label>Name</label>
          <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Maria Lopez" />
        </div>
        <div className="pl-field">
          <label>Start date</label>
          <input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} />
        </div>
        <div className="pl-modal-actions" style={{ justifyContent: initial ? "space-between" : "flex-end" }}>
          {initial && <button className="pl-btn-ghost" style={{ color: "#A8456A", borderColor: "#A8456A" }} onClick={() => onDelete(initial.id)}>Remove</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="pl-btn-primary" onClick={() => { if (form.name.trim() && form.startDate) onSave(form); }}>
              {initial ? "Save changes" : "Add employee"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeeManager({ employees, onAdd, onEdit, onClose }) {
  return (
    <div className="pl-modal-overlay" onClick={onClose}>
      <div className="pl-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <h2>Employees</h2>
        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: -10, marginBottom: 16 }}>
          Anniversaries (5, 10, 15 years...) are added to the calendar automatically based on start date.
        </p>
        {employees.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>No employees added yet.</p>
        ) : (
          <div style={{ marginBottom: 16, border: "1px solid var(--line)", borderRadius: 10, overflow: "hidden" }}>
            {employees.map(emp => (
              <div className="pl-row" key={emp.id} style={{ cursor: "pointer" }} onClick={() => onEdit(emp)}>
                <div>
                  <div style={{ fontWeight: 600 }}>{emp.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Started {formatDate(emp.startDate)}</div>
                </div>
                <span className="pl-link">Edit</span>
              </div>
            ))}
          </div>
        )}
        <div className="pl-modal-actions" style={{ justifyContent: "space-between" }}>
          <button className="pl-btn-primary" onClick={onAdd}>+ Add employee</button>
          <button className="pl-btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

const PLATFORMS = ["Instagram", "Facebook", "LinkedIn", "X/Twitter", "Email"];

const DSD_CAPACITY = 8;

const MEDIA_TYPES = ["Image", "Video", "Multi-Media"];

const POST_TYPES = [
  "Product Spotlight", "New Arrival", "Display", "Event Highlight", "Event Announcement",
  "Behind the Scenes", "Employee Spotlight", "Educational", "Cocktail Recipe", "Seasonal",
  "Company News", "Supplier Support", "Customer/Account Highlight", "Engagement",
];

const POST_STATUSES = [
  { id: "draft", label: "Draft" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
];

function PostDetailModal({ post, products, onEdit, onClose }) {
  const platforms = getPlatforms(post);
  const product = products.find(p => p.id === post.productId);
  const status = POST_STATUSES.find(s => s.id === post.status) || POST_STATUSES[0];
  return (
    <div className="pl-modal-overlay" onClick={onClose}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <h2 style={{ margin: 0, paddingRight: 12, lineHeight: 1.3 }}>{post.topic}</h2>
          <span className={"pl-status-pill " + post.status} style={{ flexShrink: 0 }}>{status.label}</span>
        </div>
        <div className="pl-detail-row">
          <span className="pl-detail-label">Date</span>
          <span className="pl-detail-value">{formatDate(post.date)}</span>
        </div>
        <div className="pl-detail-row">
          <span className="pl-detail-label">Platforms</span>
          <span className="pl-detail-value" style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {platforms.map(pl => <span key={pl} className="pl-platform-tag">{pl}</span>)}
          </span>
        </div>
        {post.postType && (
          <div className="pl-detail-row">
            <span className="pl-detail-label">Post type</span>
            <span className="pl-detail-value">{post.postType}</span>
          </div>
        )}
        {post.mediaType && (
          <div className="pl-detail-row">
            <span className="pl-detail-label">Media</span>
            <span className="pl-detail-value">{post.mediaType}</span>
          </div>
        )}
        {post.supplier && (
          <div className="pl-detail-row">
            <span className="pl-detail-label">Supplier</span>
            <span className="pl-detail-value">
              {titleCase(post.supplier)}{product ? ` · ${titleCase(product.name)}` : ""}
            </span>
          </div>
        )}
        <div className="pl-modal-actions" style={{ justifyContent: "space-between", marginTop: 20 }}>
          <button className="pl-btn-ghost" onClick={onClose}>Close</button>
          <button className="pl-btn-primary" onClick={onEdit}>Edit post</button>
        </div>
      </div>
    </div>
  );
}

function KeyDateDetailModal({ event, onEdit, onClose, isGenerated }) {
  const cat = KD_CATEGORIES.find(c => c.id === event.category) || KD_CATEGORIES[0];
  return (
    <div className="pl-modal-overlay" onClick={onClose}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <h2 style={{ margin: 0, paddingRight: 12, lineHeight: 1.3 }}>{event.name}</h2>
          <span style={{ background: cat.color, color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>{cat.label}</span>
        </div>
        <div className="pl-detail-row">
          <span className="pl-detail-label">Date</span>
          <span className="pl-detail-value">{formatDate(event.date)}</span>
        </div>
        {event.notes && (
          <div className="pl-detail-row">
            <span className="pl-detail-label">Notes</span>
            <div className="pl-detail-notes">{event.notes}</div>
          </div>
        )}
        {isGenerated && (
          <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 12 }}>
            This anniversary is auto-generated from the employee roster. Edit the employee record to change it.
          </p>
        )}
        <div className="pl-modal-actions" style={{ justifyContent: "space-between", marginTop: 20 }}>
          <button className="pl-btn-ghost" onClick={onClose}>Close</button>
          {!isGenerated && <button className="pl-btn-primary" onClick={onEdit}>Edit date</button>}
          {isGenerated && <button className="pl-btn-primary" onClick={onEdit}>Manage employees</button>}
        </div>
      </div>
    </div>
  );
}

function DSDLinkForm({ initial, suppliers, products, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(initial || { title: "", supplier: "", productId: "", startDate: "", endDate: "", notes: "" });
  const supplierProducts = useMemo(() => products.filter(p => p.supplier === form.supplier), [products, form.supplier]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v, ...(k === "supplier" ? { productId: "" } : {}) }));
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit DSD link" : "New DSD link"}</h2>
        <div className="pl-field">
          <label>Title</label>
          <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Indeed Tallys Lager push" />
        </div>
        <div className="pl-field">
          <label>Supplier</label>
          <select value={form.supplier} onChange={e => set("supplier", e.target.value)}>
            <option value="">Select a supplier...</option>
            {suppliers.map(s => <option key={s.name} value={s.name}>{titleCase(s.name)}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>Product (optional)</label>
          <select value={form.productId} onChange={e => set("productId", e.target.value)} disabled={!form.supplier}>
            <option value="">Whole supplier focus</option>
            {supplierProducts.map(p => <option key={p.id} value={p.id}>{titleCase(p.name)}</option>)}
          </select>
        </div>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Start date</label>
            <input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} />
          </div>
          <div className="pl-field">
            <label>End date</label>
            <input type="date" value={form.endDate} onChange={e => set("endDate", e.target.value)} />
          </div>
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="3" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Optional details" />
        </div>
        <div className="pl-modal-actions" style={{ justifyContent: initial ? "space-between" : "flex-end" }}>
          {initial && <button className="pl-btn-ghost" style={{ color: "#A8456A", borderColor: "#A8456A" }} onClick={() => onDelete(initial.id)}>Delete</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="pl-btn-primary" onClick={() => { if (form.title.trim() && form.supplier && form.startDate) onSave(form); }}>
              {initial ? "Save changes" : "Add DSD link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DSDLinkTimeline({ links, year, products }) {
  const yearDays = isLeap(year) ? 366 : 365;
  const todayStr = todayISO();
  const todayPct = (dayOfYear(todayStr, year) / yearDays) * 100;
  const currentYear = new Date().getFullYear();

  const visible = links.filter(l => {
    if (!l.startDate) return false;
    const start = l.startDate;
    const end = l.endDate || `${year}-12-31`;
    return start <= `${year}-12-31` && end >= `${year}-01-01`;
  }).sort((a, b) => a.startDate.localeCompare(b.startDate));

  if (visible.length === 0) {
    return (
      <div className="pl-card pl-empty">
        <div className="pl-empty-icon"><IconPackage /></div>
        <h3>Nothing scheduled for {year}</h3>
        <p>Add a DSD link with dates in this year to see it here.</p>
      </div>
    );
  }

  return (
    <div className="pl-tl-wrap">
      <div className="pl-tl-months">
        <span></span>
        {MONTH_LABELS.map(m => <span key={m}>{m}</span>)}
      </div>
      {visible.map(l => {
        const clipStart = l.startDate < `${year}-01-01` ? `${year}-01-01` : l.startDate;
        const clipEnd = (l.endDate && l.endDate > `${year}-12-31`) || !l.endDate ? `${year}-12-31` : l.endDate;
        const startPct = (dayOfYear(clipStart, year) / yearDays) * 100;
        const endPct = (dayOfYear(clipEnd, year) / yearDays) * 100;
        const widthPct = Math.max(endPct - startPct, 1.5);
        const product = products.find(p => p.id === l.productId);
        const isActive = l.startDate <= todayStr && (!l.endDate || l.endDate >= todayStr);
        return (
          <div className="pl-tl-row" key={l.id}>
            <div className="pl-tl-row-label" title={l.title}>{titleCase(l.supplier)}{product ? ` · ${titleCase(product.name)}` : ""}</div>
            <div className="pl-tl-track">
              {year === currentYear && <div className="pl-tl-today" style={{ left: todayPct + "%" }}></div>}
              <div
                className="pl-tl-bar"
                style={{ left: startPct + "%", width: widthPct + "%", background: isActive ? "#3F8F5C" : "var(--rose)" }}
                title={`${l.title} · ${formatDate(l.startDate)}${l.endDate ? " – " + formatDate(l.endDate) : ""}`}
              >
                {l.title}
              </div>
            </div>
          </div>
        );
      })}
      <div className="pl-tl-legend">
        <span><span className="sw" style={{ background: "#3F8F5C" }}></span>Active now</span>
        <span><span className="sw" style={{ background: "var(--rose)" }}></span>Scheduled</span>
      </div>
    </div>
  );
}

const ASSET_TYPES = [
  { id: "photo",      label: "Photo",      cls: "photo" },
  { id: "video-reel", label: "Video/Reel", cls: "video-reel" },
  { id: "graphic",    label: "Graphic",    cls: "graphic" },
  { id: "logo",       label: "Logo",       cls: "logo" },
];

function assetType(id) {
  return ASSET_TYPES.find(t => t.id === id) || ASSET_TYPES[0];
}

function AssetForm({ initial, suppliers, products, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(initial || {
    name: "", type: "photo", supplier: "", productId: "",
    dateCreated: todayISO(), fileLocation: "", notes: "",
  });
  const supplierProducts = useMemo(() => products.filter(p => p.supplier === form.supplier), [products, form.supplier]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v, ...(k === "supplier" ? { productId: "" } : {}) }));

  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit asset" : "New asset"}</h2>
        <div className="pl-field">
          <label>Asset name</label>
          <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Indeed Summer Patio Photo Set" />
        </div>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Type</label>
            <select value={form.type} onChange={e => set("type", e.target.value)}>
              {ASSET_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div className="pl-field">
            <label>Date created</label>
            <input type="date" value={form.dateCreated} onChange={e => set("dateCreated", e.target.value)} />
          </div>
        </div>
        <div className="pl-field">
          <label>Supplier</label>
          <select value={form.supplier} onChange={e => set("supplier", e.target.value)}>
            <option value="">None</option>
            {suppliers.map(s => <option key={s.name} value={s.name}>{titleCase(s.name)}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>Product (optional)</label>
          <select value={form.productId} onChange={e => set("productId", e.target.value)} disabled={!form.supplier}>
            <option value="">Whole supplier</option>
            {supplierProducts.map(p => <option key={p.id} value={p.id}>{titleCase(p.name)}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>File location / link</label>
          <input value={form.fileLocation} onChange={e => set("fileLocation", e.target.value)} placeholder="Google Drive link or folder path" />
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="3" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="What's in this asset, when it was used, quality notes..." />
        </div>
        <div className="pl-modal-actions" style={{ justifyContent: initial ? "space-between" : "flex-end" }}>
          {initial && <button className="pl-btn-ghost" style={{ color: "#A8456A", borderColor: "#A8456A" }} onClick={() => onDelete(initial.id)}>Delete</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="pl-btn-primary" onClick={() => { if (form.name.trim()) onSave(form); }}>
              {initial ? "Save changes" : "Add asset"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const BUDGET_PERIODS = ["Annual", "Q1", "Q2", "Q3", "Q4"];

function AnalyticsForm({ initial, onSave, onCancel, onDelete }) {
  const thisMonth = new Date().toISOString().slice(0, 7);
  const [form, setForm] = useState(initial || {
    platform: PLATFORMS[0], month: thisMonth,
    reach: "", engagement: "", followers: "", notes: "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit snapshot" : "New monthly snapshot"}</h2>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Platform</label>
            <select value={form.platform} onChange={e => set("platform", e.target.value)}>
              {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="pl-field">
            <label>Month</label>
            <input type="month" value={form.month} onChange={e => set("month", e.target.value)} />
          </div>
        </div>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Total reach</label>
            <input type="number" value={form.reach} onChange={e => set("reach", e.target.value)} placeholder="0" />
          </div>
          <div className="pl-field">
            <label>Engagement</label>
            <input type="number" value={form.engagement} onChange={e => set("engagement", e.target.value)} placeholder="Likes + comments + shares" />
          </div>
        </div>
        <div className="pl-field">
          <label>Follower count</label>
          <input type="number" value={form.followers} onChange={e => set("followers", e.target.value)} placeholder="Total followers at end of month" />
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="3" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Wins, context, what drove performance..." />
        </div>
        <div className="pl-modal-actions" style={{ justifyContent: initial ? "space-between" : "flex-end" }}>
          {initial && <button className="pl-btn-ghost" style={{ color: "#A8456A", borderColor: "#A8456A" }} onClick={() => onDelete(initial.id)}>Delete</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="pl-btn-primary" onClick={() => { if (form.platform && form.month) onSave(form); }}>
              {initial ? "Save changes" : "Save snapshot"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetForm({ initial, suppliers, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(initial || {
    supplier: "", period: "Annual", year: new Date().getFullYear().toString(),
    amount: "", notes: "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit budget" : "New co-marketing budget"}</h2>
        <div className="pl-field">
          <label>Supplier</label>
          <select value={form.supplier} onChange={e => set("supplier", e.target.value)}>
            <option value="">Select a supplier...</option>
            {suppliers.map(s => <option key={s.name} value={s.name}>{titleCase(s.name)}</option>)}
          </select>
        </div>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Period</label>
            <select value={form.period} onChange={e => set("period", e.target.value)}>
              {BUDGET_PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="pl-field">
            <label>Year</label>
            <input type="number" value={form.year} onChange={e => set("year", e.target.value)} placeholder="2026" />
          </div>
        </div>
        <div className="pl-field">
          <label>Budget amount ($)</label>
          <input type="number" value={form.amount} onChange={e => set("amount", e.target.value)} placeholder="0.00" />
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="3" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Terms, contacts, conditions..." />
        </div>
        <div className="pl-modal-actions" style={{ justifyContent: initial ? "space-between" : "flex-end" }}>
          {initial && <button className="pl-btn-ghost" style={{ color: "#A8456A", borderColor: "#A8456A" }} onClick={() => onDelete(initial.id)}>Delete</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="pl-btn-primary" onClick={() => { if (form.supplier && form.amount) onSave(form); }}>
              {initial ? "Save changes" : "Add budget"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpendForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ date: todayISO(), amount: "", description: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>Log spend</h2>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Date</label>
            <input type="date" value={form.date} onChange={e => set("date", e.target.value)} />
          </div>
          <div className="pl-field">
            <label>Amount ($)</label>
            <input type="number" value={form.amount} onChange={e => set("amount", e.target.value)} placeholder="0.00" />
          </div>
        </div>
        <div className="pl-field">
          <label>Description</label>
          <textarea rows="3" value={form.description} onChange={e => set("description", e.target.value)} placeholder="What was this spend for?" />
        </div>
        <div className="pl-modal-actions">
          <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="pl-btn-primary" onClick={() => { if (form.amount && form.description.trim()) onSave(form); }}>Log spend</button>
        </div>
      </div>
    </div>
  );
}

const PROJECT_STATUSES = [
  { id: "concept",     label: "Concept",     cls: "concept" },
  { id: "planning",    label: "Planning",    cls: "planning" },
  { id: "in-progress", label: "In Progress", cls: "in-progress" },
  { id: "hold",        label: "On Hold",     cls: "hold" },
  { id: "complete",    label: "Complete",    cls: "complete" },
];

const HEALTH_STATUSES = [
  { id: "strong",          label: "Strong",          cls: "strong" },
  { id: "good",            label: "Good",            cls: "good" },
  { id: "needs-attention", label: "Needs Attention", cls: "needs-attention" },
  { id: "at-risk",         label: "At Risk",         cls: "at-risk" },
];

const INTERACTION_TYPES = ["Meeting", "Call", "Email", "Event", "Other"];

function healthStatus(id) {
  return HEALTH_STATUSES.find(h => h.id === id) || HEALTH_STATUSES[1];
}

function RelationshipForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    contactName: "", contactEmail: "", contactPhone: "",
    health: "good", nextFollowUp: "", coMarketingBudget: "", notes: "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>Supplier relationship details</h2>
        <div className="pl-field">
          <label>Relationship health</label>
          <select value={form.health} onChange={e => set("health", e.target.value)}>
            {HEALTH_STATUSES.map(h => <option key={h.id} value={h.id}>{h.label}</option>)}
          </select>
        </div>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Primary contact name</label>
            <input value={form.contactName} onChange={e => set("contactName", e.target.value)} placeholder="e.g. Sarah Johnson" />
          </div>
          <div className="pl-field">
            <label>Next follow-up date</label>
            <input type="date" value={form.nextFollowUp} onChange={e => set("nextFollowUp", e.target.value)} />
          </div>
        </div>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Email</label>
            <input value={form.contactEmail} onChange={e => set("contactEmail", e.target.value)} placeholder="contact@supplier.com" />
          </div>
          <div className="pl-field">
            <label>Phone</label>
            <input value={form.contactPhone} onChange={e => set("contactPhone", e.target.value)} placeholder="(612) 555-0100" />
          </div>
        </div>
        <div className="pl-field">
          <label>Co-marketing budget</label>
          <input value={form.coMarketingBudget} onChange={e => set("coMarketingBudget", e.target.value)} placeholder="e.g. $2,500/year" />
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="4" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Relationship context, preferences, history summary..." />
        </div>
        <div className="pl-modal-actions">
          <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="pl-btn-primary" onClick={() => onSave(form)}>Save</button>
        </div>
      </div>
    </div>
  );
}

function InteractionForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ date: todayISO(), type: "Meeting", notes: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>Log interaction</h2>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Date</label>
            <input type="date" value={form.date} onChange={e => set("date", e.target.value)} />
          </div>
          <div className="pl-field">
            <label>Type</label>
            <select value={form.type} onChange={e => set("type", e.target.value)}>
              {INTERACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="5" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="What was discussed, action items, outcomes..." />
        </div>
        <div className="pl-modal-actions">
          <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="pl-btn-primary" onClick={() => { if (form.notes.trim()) onSave(form); }}>Log interaction</button>
        </div>
      </div>
    </div>
  );
}


function projStatus(id) {
  return PROJECT_STATUSES.find(s => s.id === id) || PROJECT_STATUSES[0];
}

function ProjectForm({ initial, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(initial || {
    title: "", status: "concept", dueDate: "", openEnded: true, notes: "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit project" : "New project"}</h2>
        <div className="pl-field">
          <label>Title</label>
          <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Website product catalog" />
        </div>
        <div className="pl-field">
          <label>Status</label>
          <select value={form.status} onChange={e => set("status", e.target.value)}>
            {PROJECT_STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>Due date</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="date"
              value={form.dueDate}
              disabled={form.openEnded}
              onChange={e => set("dueDate", e.target.value)}
              style={{ flex: 1, opacity: form.openEnded ? 0.4 : 1 }}
            />
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--ink-soft)", cursor: "pointer", whiteSpace: "nowrap" }}>
              <input
                type="checkbox"
                checked={form.openEnded}
                onChange={e => set("openEnded", e.target.checked)}
              />
              Open-ended
            </label>
          </div>
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="5" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Goals, blockers, next steps, links..." />
        </div>
        <div className="pl-modal-actions" style={{ justifyContent: initial ? "space-between" : "flex-end" }}>
          {initial && <button className="pl-btn-ghost" style={{ color: "#A8456A", borderColor: "#A8456A" }} onClick={() => onDelete(initial.id)}>Delete</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="pl-btn-primary" onClick={() => { if (form.title.trim()) onSave(form); }}>
              {initial ? "Save changes" : "Add project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TargetsForm({ targets, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    const init = {};
    PLATFORMS.forEach(p => { init[p] = targets[p] || 0; });
    return init;
  });
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>Weekly posting targets</h2>
        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: -10, marginBottom: 16 }}>
          Set how many scheduled or published posts you want per platform each week. Set to 0 to ignore a platform.
        </p>
        {PLATFORMS.map(p => (
          <div className="pl-field" key={p}>
            <label>{p}</label>
            <input
              type="number"
              min="0"
              value={form[p]}
              onChange={e => setForm(f => ({ ...f, [p]: e.target.value }))}
            />
          </div>
        ))}
        <div className="pl-modal-actions">
          <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="pl-btn-primary" onClick={() => onSave(form)}>Save targets</button>
        </div>
      </div>
    </div>
  );
}

function PostForm({ initial, suppliers, products, onSave, onCancel, onDelete }) {
  const initPlatforms = initial
    ? (initial.platforms || (initial.platform ? [initial.platform] : [PLATFORMS[0]]))
    : [PLATFORMS[0]];
  const [form, setForm] = useState({
    ...(initial || { date: "", mediaType: MEDIA_TYPES[0], postType: POST_TYPES[0], topic: "", supplier: "", productId: "", status: "draft" }),
    platforms: initPlatforms,
  });
  const supplierProducts = useMemo(() => products.filter(p => p.supplier === form.supplier), [products, form.supplier]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v, ...(k === "supplier" ? { productId: "" } : {}) }));

  function togglePlatform(plat) {
    setForm(f => {
      const has = f.platforms.includes(plat);
      const next = has ? f.platforms.filter(p => p !== plat) : [...f.platforms, plat];
      return { ...f, platforms: next.length === 0 ? [plat] : next };
    });
  }

  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit post" : "New post"}</h2>
        <div className="pl-field">
          <label>Date</label>
          <input type="date" value={form.date} onChange={e => set("date", e.target.value)} style={{ maxWidth: 200 }} />
        </div>
        <div className="pl-field">
          <label>Platforms</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {PLATFORMS.map(plat => {
              const checked = form.platforms.includes(plat);
              return (
                <label key={plat} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", padding: "5px 11px", borderRadius: 999, border: `1px solid ${checked ? "var(--rose)" : "var(--line)"}`, background: checked ? "var(--blush)" : "var(--card)", color: checked ? "var(--blush-darker)" : "var(--ink-soft)", fontWeight: checked ? 700 : 400, transition: "all .12s ease" }}>
                  <input type="checkbox" checked={checked} onChange={() => togglePlatform(plat)} style={{ display: "none" }} />
                  {plat}
                </label>
              );
            })}
          </div>
        </div>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Media type</label>
            <select value={form.mediaType} onChange={e => set("mediaType", e.target.value)}>
              {MEDIA_TYPES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="pl-field">
            <label>Post type</label>
            <select value={form.postType} onChange={e => set("postType", e.target.value)}>
              {POST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="pl-field">
          <label>Topic / caption</label>
          <textarea rows="3" value={form.topic} onChange={e => set("topic", e.target.value)} placeholder="What the post is about" />
        </div>
        <div className="pl-field">
          <label>Supplier (optional)</label>
          <select value={form.supplier} onChange={e => set("supplier", e.target.value)}>
            <option value="">None</option>
            {suppliers.map(s => <option key={s.name} value={s.name}>{titleCase(s.name)}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>Product (optional)</label>
          <select value={form.productId} onChange={e => set("productId", e.target.value)} disabled={!form.supplier}>
            <option value="">None</option>
            {supplierProducts.map(p => <option key={p.id} value={p.id}>{titleCase(p.name)}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>Status</label>
          <select value={form.status} onChange={e => set("status", e.target.value)}>
            {POST_STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div className="pl-modal-actions" style={{ justifyContent: initial ? "space-between" : "flex-end" }}>
          {initial && <button className="pl-btn-ghost" style={{ color: "#A8456A", borderColor: "#A8456A" }} onClick={() => onDelete(initial.id)}>Delete</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="pl-btn-primary" onClick={() => { if (form.date && form.topic.trim()) onSave(form); }}>
              {initial ? "Save changes" : "Add post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostMonthGrid({ posts, year, month, onSelect }) {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  for (let i = startWeekday - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, m: prevMonth, y: prevMonthYear, outside: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, m: month, y: year, outside: false });
  let nextDay = 1;
  while (cells.length % 7 !== 0) cells.push({ day: nextDay++, m: nextMonth, y: nextMonthYear, outside: true });

  const todayStr = todayISO();
  const postsByDate = useMemo(() => {
    const map = {};
    posts.forEach(p => {
      if (!map[p.date]) map[p.date] = [];
      map[p.date].push(p);
    });
    return map;
  }, [posts]);

  const statusColor = { draft: "#9A8A93", scheduled: "#C45C7C", published: "#3F8F5C" };

  return (
    <div className="pl-kd-grid">
      {["S","M","T","W","T","F","S"].map((d, i) => <div className="pl-kd-dow" key={i}>{d}</div>)}
      {cells.map((c, i) => {
        const dateStr = `${c.y}-${String(c.m + 1).padStart(2, "0")}-${String(c.day).padStart(2, "0")}`;
        const dayPosts = dateStr ? (postsByDate[dateStr] || []) : [];
        const isToday = dateStr === todayStr;
        return (
          <div className={"pl-kd-day" + (c.outside ? " outside" : "") + (isToday ? " today" : "")} key={i}>
            <span className="pl-kd-daynum">{c.day}</span>
            {dayPosts.map(p => (
              <div
                key={p.id}
                className="pl-kd-event"
                style={{ background: statusColor[p.status] || statusColor.draft }}
                title={p.topic}
                onClick={() => onSelect(p)}
              >
                {p.topic}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}


function KeyDateForm({ initial, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(initial || { name: "", category: "beer", date: "", notes: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const manualCategories = KD_CATEGORIES.filter(c => c.id !== "anniversary");
  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit key date" : "New key date"}</h2>
        <div className="pl-field">
          <label>Name</label>
          <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. National Beer Day" />
        </div>
        <div className="pl-field">
          <label>Category</label>
          <select value={form.category} onChange={e => set("category", e.target.value)}>
            {manualCategories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>Date</label>
          <input type="date" value={form.date} onChange={e => set("date", e.target.value)} />
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="3" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Optional details" />
        </div>
        <div className="pl-modal-actions" style={{ justifyContent: initial ? "space-between" : "flex-end" }}>
          {initial && <button className="pl-btn-ghost" style={{ color: "#A8456A", borderColor: "#A8456A" }} onClick={() => onDelete(initial.id)}>Delete</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="pl-btn-primary" onClick={() => { if (form.name.trim() && form.date) onSave(form); }}>
              {initial ? "Save changes" : "Add key date"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyDateMonthGrid({ events, year, month, onSelect }) {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  for (let i = startWeekday - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, m: prevMonth, y: prevMonthYear, outside: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, m: month, y: year, outside: false });
  let nextDay2 = 1;
  while (cells.length % 7 !== 0) cells.push({ day: nextDay2++, m: nextMonth, y: nextMonthYear, outside: true });

  const todayStr = todayISO();
  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [events]);

  return (
    <div className="pl-kd-grid">
      {["S","M","T","W","T","F","S"].map((d, i) => <div className="pl-kd-dow" key={i}>{d}</div>)}
      {cells.map((c, i) => {
        const dateStr = `${c.y}-${String(c.m + 1).padStart(2, "0")}-${String(c.day).padStart(2, "0")}`;
        const dayEvents = dateStr ? (eventsByDate[dateStr] || []) : [];
        const isToday = dateStr === todayStr;
        return (
          <div className={"pl-kd-day" + (c.outside ? " outside" : "") + (isToday ? " today" : "")} key={i}>
            <span className="pl-kd-daynum">{c.day}</span>
            {dayEvents.map(e => (
              <div
                key={e.id}
                className="pl-kd-event"
                style={{ background: kdCategory(e.category).color }}
                title={e.name}
                onClick={() => onSelect(e)}
              >
                {e.name}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function CampaignForm({ initial, suppliers, products, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    name: "", type: "focus", supplier: "", productId: "", startDate: "", endDate: "", notes: "",
  });
  const supplierProducts = useMemo(() => products.filter(p => p.supplier === form.supplier), [products, form.supplier]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v, ...(k === "supplier" ? { productId: "" } : {}) }));

  return (
    <div className="pl-modal-overlay" onClick={onCancel}>
      <div className="pl-modal" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit campaign" : "New campaign"}</h2>
        <div className="pl-field">
          <label>Campaign name</label>
          <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Indeed Summer Push" />
        </div>
        <div className="pl-field">
          <label>Type</label>
          <select value={form.type} onChange={e => set("type", e.target.value)}>
            {CAMPAIGN_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>Supplier</label>
          <select value={form.supplier} onChange={e => set("supplier", e.target.value)}>
            <option value="">Select a supplier...</option>
            {suppliers.map(s => <option key={s.name} value={s.name}>{titleCase(s.name)}</option>)}
          </select>
        </div>
        <div className="pl-field">
          <label>Product (optional)</label>
          <select value={form.productId} onChange={e => set("productId", e.target.value)} disabled={!form.supplier}>
            <option value="">Whole supplier focus</option>
            {supplierProducts.map(p => <option key={p.id} value={p.id}>{titleCase(p.name)}</option>)}
          </select>
        </div>
        <div className="pl-field-row">
          <div className="pl-field">
            <label>Start date</label>
            <input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} />
          </div>
          <div className="pl-field">
            <label>End date</label>
            <input type="date" value={form.endDate} onChange={e => set("endDate", e.target.value)} />
          </div>
        </div>
        <div className="pl-field">
          <label>Notes</label>
          <textarea rows="3" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="What sales reps are pushing, deal terms, etc." />
        </div>
        <div className="pl-modal-actions">
          <button className="pl-btn-ghost" onClick={onCancel}>Cancel</button>
          <button
            className="pl-btn-primary"
            onClick={() => { if (form.name.trim() && form.supplier) onSave(form); }}
          >
            {initial ? "Save changes" : "Add campaign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("portfolio");
  const [toast, setToast] = useState(null);
  const [showExport, setShowExport] = useState(false);
  const [portfolioView, setPortfolioView] = useState("suppliers"); // suppliers | products
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(PRODUCTS_RAW);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [campaignView, setCampaignView] = useState("list"); // list | timeline
  const [timelineSupplier, setTimelineSupplier] = useState("all");
  const [timelineYear, setTimelineYear] = useState(new Date().getFullYear());
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  const [keyDates, setKeyDates] = useState([]);
  const [kdView, setKdView] = useState("month"); // month | list
  const [kdCatFilter, setKdCatFilter] = useState("all");
  const [kdMonth, setKdMonth] = useState(new Date().getMonth());
  const [kdYear, setKdYear] = useState(new Date().getFullYear());
  const [showKdForm, setShowKdForm] = useState(false);
  const [editingKd, setEditingKd] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [showEmployeeManager, setShowEmployeeManager] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [posts, setPosts] = useState([]);
  const [postView, setPostView] = useState("calendar"); // calendar | spreadsheet
  const [postStatusTab, setPostStatusTab] = useState("draft");
  const [postMonth, setPostMonth] = useState(new Date().getMonth());
  const [postYear, setPostYear] = useState(new Date().getFullYear());
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [detailPost, setDetailPost] = useState(null);
  const [detailKd, setDetailKd] = useState(null);

  const [postTargets, setPostTargets] = useState({});
  const [todoOpen, setTodoOpen] = useState(true);
  const [showTargetsForm, setShowTargetsForm] = useState(false);

  const [dsdLinks, setDsdLinks] = useState([]);
  const [dsdYear, setDsdYear] = useState(new Date().getFullYear());
  const [showDsdForm, setShowDsdForm] = useState(false);
  const [editingDsd, setEditingDsd] = useState(null);

  const [projects, setProjects] = useState([]);
  const [projStatusFilter, setProjStatusFilter] = useState("all");
  const [showProjForm, setShowProjForm] = useState(false);
  const [editingProj, setEditingProj] = useState(null);

  const [supplierRels, setSupplierRels] = useState({});
  const [showRelForm, setShowRelForm] = useState(false);
  const [showInteractionForm, setShowInteractionForm] = useState(false);

  const [assets, setAssets] = useState([]);
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [assetSupplierFilter, setAssetSupplierFilter] = useState("all");
  const [assetSearch, setAssetSearch] = useState("");
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const [csvPreview, setCsvPreview] = useState(null); // { added, updated, unchanged, missing }
  const [showCsvPreview, setShowCsvPreview] = useState(false);

  const [analyticsData, setAnalyticsData] = useState([]);
  const [analyticsPlatformFilter, setAnalyticsPlatformFilter] = useState("all");
  const [showAnalyticsForm, setShowAnalyticsForm] = useState(false);
  const [editingAnalytics, setEditingAnalytics] = useState(null);

  const [budgets, setBudgets] = useState([]);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [showSpendForm, setShowSpendForm] = useState(false);
  const [spendTargetBudgetId, setSpendTargetBudgetId] = useState(null);
  const [budgetYearFilter, setBudgetYearFilter] = useState(new Date().getFullYear().toString());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [
          prods, camps, kd, emps, posts_, postsT, dsd, projs, rels, assets_, anal, budg
        ] = await Promise.all([
          sbGet("pourline-products"),
          sbGet("pourline-campaigns"),
          sbGet("pourline-keydates"),
          sbGet("pourline-employees"),
          sbGet("pourline-posts"),
          sbGet("pourline-posttargets"),
          sbGet("pourline-dsdlinks"),
          sbGet("pourline-projects"),
          sbGet("pourline-supplierrels"),
          sbGet("pourline-assets"),
          sbGet("pourline-analytics"),
          sbGet("pourline-budgets"),
        ]);
        if (prods) setProducts(prods);
        if (camps) setCampaigns(camps);
        if (kd) setKeyDates(kd);
        if (emps) setEmployees(emps);
        if (posts_) setPosts(posts_);
        if (postsT) setPostTargets(postsT);
        if (dsd) setDsdLinks(dsd);
        if (projs) setProjects(projs);
        if (rels) setSupplierRels(rels);
        if (assets_) setAssets(assets_);
        if (anal) setAnalyticsData(anal);
        if (budg) setBudgets(budg);
      } catch (e) {
        console.error("Failed to load from Supabase:", e);
      }

      // Seed national days if not already seeded
      const isSeeded = !!localStorage.getItem("pourline-national-seeded-v2");
      if (!isSeeded) {
        setKeyDates(prev => {
          const existing = new Set(prev.map(k => k.id));
          const toAdd = NATIONAL_DAYS_SEED.filter(d => !existing.has(d.id));
          return [...prev, ...toAdd];
        });
        localStorage.setItem("pourline-national-seeded-v2", "1");
      }

      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-products", products).catch(e => console.error(e));
  }, [products, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-campaigns", campaigns).catch(e => console.error(e));
  }, [campaigns, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-keydates", keyDates).catch(e => console.error(e));
  }, [keyDates, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-employees", employees).catch(e => console.error(e));
  }, [employees, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-posts", posts).catch(e => console.error(e));
  }, [posts, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-posttargets", postTargets).catch(e => console.error(e));
  }, [postTargets, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-dsdlinks", dsdLinks).catch(e => console.error(e));
  }, [dsdLinks, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-projects", projects).catch(e => console.error(e));
  }, [projects, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-supplierrels", supplierRels).catch(e => console.error(e));
  }, [supplierRels, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-assets", assets).catch(e => console.error(e));
  }, [assets, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-analytics", analyticsData).catch(e => console.error(e));
  }, [analyticsData, loaded]);

  useEffect(() => {
    if (!loaded) return;
    sbSet("pourline-budgets", budgets).catch(e => console.error(e));
  }, [budgets, loaded]);

  function saveAnalytics(form) {
    if (editingAnalytics) {
      setAnalyticsData(ds => ds.map(d => d.id === editingAnalytics.id ? { ...form, id: editingAnalytics.id } : d));
    } else {
      setAnalyticsData(ds => [...ds, { ...form, id: Date.now().toString() }]);
    }
    setShowAnalyticsForm(false);
    setEditingAnalytics(null);
  }

  function deleteAnalytics(id) {
    setAnalyticsData(ds => ds.filter(d => d.id !== id));
    setShowAnalyticsForm(false);
    setEditingAnalytics(null);
  }

  function saveBudget(form) {
    if (editingBudget) {
      setBudgets(bs => bs.map(b => b.id === editingBudget.id ? { ...form, id: editingBudget.id, spendLog: editingBudget.spendLog || [] } : b));
    } else {
      setBudgets(bs => [...bs, { ...form, id: Date.now().toString(), spendLog: [] }]);
    }
    setShowBudgetForm(false);
    setEditingBudget(null);
  }

  function deleteBudget(id) {
    setBudgets(bs => bs.filter(b => b.id !== id));
    setShowBudgetForm(false);
    setEditingBudget(null);
  }

  function logSpend(budgetId, entry) {
    setBudgets(bs => bs.map(b => b.id === budgetId
      ? { ...b, spendLog: [...(b.spendLog || []), { ...entry, id: Date.now().toString() }] }
      : b
    ));
    setShowSpendForm(false);
    setSpendTargetBudgetId(null);
  }

  function deleteSpend(budgetId, spendId) {
    setBudgets(bs => bs.map(b => b.id === budgetId
      ? { ...b, spendLog: (b.spendLog || []).filter(s => s.id !== spendId) }
      : b
    ));
  }

  const filteredBudgets = useMemo(() => {
    return budgets.filter(b => b.year === budgetYearFilter)
      .sort((a, b) => a.supplier.localeCompare(b.supplier));
  }, [budgets, budgetYearFilter]);

  const analyticsByPlatform = useMemo(() => {
    const list = analyticsPlatformFilter === "all"
      ? analyticsData
      : analyticsData.filter(d => d.platform === analyticsPlatformFilter);
    return [...list].sort((a, b) => {
      if (a.platform !== b.platform) return a.platform.localeCompare(b.platform);
      return b.month.localeCompare(a.month);
    });
  }, [analyticsData, analyticsPlatformFilter]);


  function parseProductCSV(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return null;
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      // Handle quoted fields with commas
      const cols = [];
      let cur = '', inQ = false;
      for (const ch of lines[i]) {
        if (ch === '"') { inQ = !inQ; }
        else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
        else { cur += ch; }
      }
      cols.push(cur.trim());
      if (cols.length < 2) continue;
      const row = {};
      headers.forEach((h, idx) => { row[h] = (cols[idx] || '').replace(/^"|"$/g, '').trim(); });
      if (!row['Product Name'] && !row['Product ID']) continue;
      rows.push({
        id: row['Product ID'] || '',
        name: row['Product Name'] || '',
        supplier: row['Supplier'] || '',
        brandFamily: row['Brand Family'] || '',
        type: row['Product Type'] || '',
        package: row['Package'] || '',
        seasonality: row['Annual or Seasonal'] || 'Annual',
        status: row['Status'] || 'Active',
      });
    }
    return rows;
  }

  function handleCsvReimport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const parsed = parseProductCSV(ev.target.result);
      if (!parsed || parsed.length === 0) {
        showToast('Could not read CSV — make sure it matches the Encompass export format.');
        return;
      }
      const existingById = {};
      products.forEach(p => { if (p.id) existingById[p.id] = p; });
      const incomingIds = new Set(parsed.map(p => p.id).filter(Boolean));

      const added = [];
      const updated = [];
      const unchanged = [];

      parsed.forEach(incoming => {
        const existing = existingById[incoming.id];
        if (!existing) {
          added.push(incoming);
        } else {
          const changed = Object.keys(incoming).some(k => incoming[k] !== existing[k]);
          if (changed) updated.push({ old: existing, new: incoming });
          else unchanged.push(incoming);
        }
      });

      const missing = products.filter(p => p.id && !incomingIds.has(p.id));

      setCsvPreview({ added, updated, unchanged, missing, parsed });
      setShowCsvPreview(true);
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function applyCsvMerge() {
    if (!csvPreview) return;
    setProducts(prev => {
      const byId = {};
      prev.forEach(p => { if (p.id) byId[p.id] = p; });
      // Apply updates
      csvPreview.updated.forEach(u => { byId[u.new.id] = u.new; });
      // Add new
      csvPreview.added.forEach(a => { byId[a.id || Date.now().toString()] = a; });
      // Keep missing products as-is (don't delete)
      return Object.values(byId);
    });
    setShowCsvPreview(false);
    setCsvPreview(null);
    showToast(`CSV merged — ${csvPreview.added.length} added, ${csvPreview.updated.length} updated.`);
  }

  function saveAsset(form) {
    if (editingAsset) {
      setAssets(as => as.map(a => a.id === editingAsset.id ? { ...form, id: editingAsset.id } : a));
    } else {
      setAssets(as => [...as, { ...form, id: Date.now().toString() }]);
    }
    setShowAssetForm(false);
    setEditingAsset(null);
  }

  function deleteAsset(id) {
    setAssets(as => as.filter(a => a.id !== id));
    setShowAssetForm(false);
    setEditingAsset(null);
  }

  const filteredAssets = useMemo(() => {
    let list = assets;
    if (assetTypeFilter !== "all") list = list.filter(a => a.type === assetTypeFilter);
    if (assetSupplierFilter !== "all") list = list.filter(a => a.supplier === assetSupplierFilter);
    if (assetSearch) {
      const q = assetSearch.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q) || (a.notes || "").toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => (b.dateCreated || "").localeCompare(a.dateCreated || ""));
  }, [assets, assetTypeFilter, assetSupplierFilter, assetSearch]);


  function saveRelationship(supplierName, form) {
    setSupplierRels(rs => ({
      ...rs,
      [supplierName]: { ...(rs[supplierName] || {}), ...form },
    }));
    setShowRelForm(false);
  }

  function logInteraction(supplierName, entry) {
    setSupplierRels(rs => {
      const rel = rs[supplierName] || {};
      const log = rel.interactionLog || [];
      return {
        ...rs,
        [supplierName]: {
          ...rel,
          interactionLog: [{ ...entry, id: Date.now().toString() }, ...log],
        },
      };
    });
    setShowInteractionForm(false);
  }

  function deleteInteraction(supplierName, id) {
    setSupplierRels(rs => {
      const rel = rs[supplierName] || {};
      return {
        ...rs,
        [supplierName]: {
          ...rel,
          interactionLog: (rel.interactionLog || []).filter(e => e.id !== id),
        },
      };
    });
  }

  const atRiskSuppliers = useMemo(() => {
    return Object.entries(supplierRels)
      .filter(([, rel]) => rel.health === "at-risk" || rel.health === "needs-attention")
      .map(([name, rel]) => ({ name, ...rel }));
  }, [supplierRels]);

  const overdueFollowUps = useMemo(() => {
    const today = todayISO();
    return Object.entries(supplierRels)
      .filter(([, rel]) => rel.nextFollowUp && rel.nextFollowUp < today)
      .map(([name, rel]) => ({ name, ...rel }));
  }, [supplierRels]);

  function saveProject(form) {
    if (editingProj) {
      setProjects(ps => ps.map(p => p.id === editingProj.id ? { ...form, id: editingProj.id } : p));
    } else {
      setProjects(ps => [...ps, { ...form, id: Date.now().toString() }]);
    }
    setShowProjForm(false);
    setEditingProj(null);
  }

  function deleteProject(id) {
    setProjects(ps => ps.filter(p => p.id !== id));
    setShowProjForm(false);
    setEditingProj(null);
  }

  const filteredProjects = useMemo(() => {
    const statusOrder = { "in-progress": 0, "planning": 1, "concept": 2, "hold": 3, "complete": 4 };
    let list = projStatusFilter === "all" ? projects : projects.filter(p => p.status === projStatusFilter);
    return [...list].sort((a, b) => (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5));
  }, [projects, projStatusFilter]);


  function saveDsdLink(form) {
    if (editingDsd) {
      setDsdLinks(ls => ls.map(l => l.id === editingDsd.id ? { ...form, id: editingDsd.id } : l));
    } else {
      setDsdLinks(ls => [...ls, { ...form, id: Date.now().toString() }]);
    }
    setShowDsdForm(false);
    setEditingDsd(null);
  }

  function deleteDsdLink(id) {
    setDsdLinks(ls => ls.filter(l => l.id !== id));
    setShowDsdForm(false);
    setEditingDsd(null);
  }

  const dsdActiveCount = useMemo(() => {
    const today = todayISO();
    return dsdLinks.filter(l => l.startDate <= today && (!l.endDate || l.endDate >= today)).length;
  }, [dsdLinks]);

  const dsdOpenSlots = Math.max(DSD_CAPACITY - dsdActiveCount, 0);

  function dsdActiveCountOn(dateStr) {
    return dsdLinks.filter(l => l.startDate <= dateStr && (!l.endDate || l.endDate >= dateStr)).length;
  }

  const dsdUpcomingGap = useMemo(() => {
    // Only relevant if we're at full capacity today — otherwise the "open now" item already covers it.
    if (dsdOpenSlots > 0) return null;
    for (let d = 1; d <= 7; d++) {
      const future = new Date();
      future.setDate(future.getDate() + d);
      const futureStr = future.toISOString().slice(0, 10);
      const count = dsdActiveCountOn(futureStr);
      if (count < DSD_CAPACITY) {
        return { date: futureStr, count, openSlots: DSD_CAPACITY - count, daysOut: d };
      }
    }
    return null;
  }, [dsdLinks, dsdOpenSlots]);

  const weekRange = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const fmt = d => d.toISOString().slice(0, 10);
    return { start: fmt(start), end: fmt(end) };
  }, []);

  const todoItems = useMemo(() => {
    const weekPosts = posts.filter(p => p.date >= weekRange.start && p.date <= weekRange.end && p.status !== "draft");
    const items = [];
    PLATFORMS.forEach(plat => {
      const target = Number(postTargets[plat]) || 0;
      if (target <= 0) return;
      const count = weekPosts.filter(p => getPlatforms(p).includes(plat)).length;
      if (count < target) {
        items.push({
          type: "platform",
          label: `Add ${target - count} more ${plat} post${(target - count) !== 1 ? "s" : ""} this week`,
          sub: `${count}/${target}`,
          linkTab: "calendar",
          linkView: "calendar",
        });
      }
    });
    if (dsdOpenSlots > 0) {
      items.push({
        type: "dsd",
        label: `${dsdOpenSlots} DSD Link slot${dsdOpenSlots !== 1 ? "s" : ""} open — fill to stay at capacity`,
        sub: `${dsdActiveCount}/${DSD_CAPACITY}`,
        linkTab: "calendar",
        linkView: "dsd",
      });
    } else if (dsdUpcomingGap) {
      items.push({
        type: "dsd-upcoming",
        label: `Heads up — ${dsdUpcomingGap.openSlots} DSD Link slot${dsdUpcomingGap.openSlots !== 1 ? "s" : ""} will open ${formatDate(dsdUpcomingGap.date)}, line up the next link`,
        sub: `in ${dsdUpcomingGap.daysOut} day${dsdUpcomingGap.daysOut !== 1 ? "s" : ""}`,
        linkTab: "calendar",
        linkView: "dsd",
      });
    }
    return items;
  }, [posts, postTargets, weekRange, dsdOpenSlots, dsdActiveCount, dsdUpcomingGap]);

  const twoWeekPosts = useMemo(() => {
    const today = todayISO();
    const end = new Date();
    end.setDate(end.getDate() + 13);
    const endStr = end.toISOString().slice(0, 10);
    return [...posts]
      .filter(p => p.date >= today && p.date <= endStr)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [posts]);

  const needsAttentionCampaigns = useMemo(() => {
    return campaigns
      .map(c => ({ ...c, status: campaignStatus(c) }))
      .filter(c => c.status === "active" || c.status === "upcoming")
      .filter(c => {
        const supporting = posts.filter(p =>
          p.supplier === c.supplier &&
          p.status !== "draft" &&
          (!c.startDate || !p.date || p.date >= c.startDate) &&
          (!c.endDate || !p.date || p.date <= c.endDate)
        );
        return supporting.length === 0;
      });
  }, [campaigns, posts]);


  function savePost(form) {
    if (editingPost) {
      setPosts(ps => ps.map(p => p.id === editingPost.id ? { ...form, id: editingPost.id } : p));
    } else {
      setPosts(ps => [...ps, { ...form, id: Date.now().toString() }]);
    }
    setShowPostForm(false);
    setEditingPost(null);
  }

  function deletePost(id) {
    setPosts(ps => ps.filter(p => p.id !== id));
    setShowPostForm(false);
    setEditingPost(null);
  }

  const postsByStatusSorted = useMemo(() => {
    return [...posts].filter(p => p.status === postStatusTab).sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  }, [posts, postStatusTab]);


  function saveEmployee(form) {
    if (editingEmployee) {
      setEmployees(es => es.map(e => e.id === editingEmployee.id ? { ...form, id: editingEmployee.id } : e));
    } else {
      setEmployees(es => [...es, { ...form, id: Date.now().toString() }]);
    }
    setShowEmployeeForm(false);
    setEditingEmployee(null);
  }

  function deleteEmployee(id) {
    setEmployees(es => es.filter(e => e.id !== id));
    setShowEmployeeForm(false);
    setEditingEmployee(null);
  }

  const generatedAnniversaries = useMemo(() => generateAnniversaries(employees), [employees]);
  const allKeyDates = useMemo(() => [...keyDates, ...generatedAnniversaries], [keyDates, generatedAnniversaries]);

  const comingUpKeyDates = useMemo(() => {
    const today = todayISO();
    const end = new Date();
    end.setDate(end.getDate() + 13);
    const endStr = end.toISOString().slice(0, 10);
    return [...allKeyDates]
      .filter(k => k.date >= today && k.date <= endStr)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [allKeyDates]);


  function saveKeyDate(form) {
    if (editingKd) {
      setKeyDates(ks => ks.map(k => k.id === editingKd.id ? { ...form, id: editingKd.id } : k));
    } else {
      setKeyDates(ks => [...ks, { ...form, id: Date.now().toString() }]);
    }
    setShowKdForm(false);
    setEditingKd(null);
  }

  function deleteKeyDate(id) {
    setKeyDates(ks => ks.filter(k => k.id !== id));
  }

  const filteredKeyDates = useMemo(() => {
    let list = allKeyDates;
    if (kdCatFilter !== "all") list = list.filter(k => k.category === kdCatFilter);
    return list;
  }, [allKeyDates, kdCatFilter]);

  const monthKeyDates = useMemo(() => {
    const prefix = `${kdYear}-${String(kdMonth + 1).padStart(2, "0")}`;
    return filteredKeyDates.filter(k => k.date && k.date.startsWith(prefix));
  }, [filteredKeyDates, kdYear, kdMonth]);

  const upcomingKeyDates = useMemo(() => {
    const today = todayISO();
    return [...filteredKeyDates].filter(k => k.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredKeyDates]);

  const pastKeyDates = useMemo(() => {
    const today = todayISO();
    return [...filteredKeyDates].filter(k => k.date < today).sort((a, b) => b.date.localeCompare(a.date));
  }, [filteredKeyDates]);


  function saveCampaign(form) {
    if (editingCampaign) {
      setCampaigns(cs => cs.map(c => c.id === editingCampaign.id ? { ...form, id: editingCampaign.id } : c));
    } else {
      setCampaigns(cs => [...cs, { ...form, id: Date.now().toString() }]);
    }
    setShowCampaignForm(false);
    setEditingCampaign(null);
  }

  function deleteCampaign(id) {
    setCampaigns(cs => cs.filter(c => c.id !== id));
  }

  const sortedCampaigns = useMemo(() => {
    const order = { active: 0, upcoming: 1, ended: 2 };
    let list = campaigns.map(c => ({ ...c, status: campaignStatus(c) }));
    if (campaignFilter !== "all") list = list.filter(c => c.status === campaignFilter);
    return list.sort((a, b) => order[a.status] - order[b.status] || (a.startDate || "").localeCompare(b.startDate || ""));
  }, [campaigns, campaignFilter]);


  const suppliers = useMemo(() => {
    const map = {};
    products.forEach(p => {
      if (!p.supplier) return;
      if (!map[p.supplier]) map[p.supplier] = { name: p.supplier, count: 0, seasonal: 0 };
      map[p.supplier].count += 1;
      if (p.seasonality === "Seasonal") map[p.supplier].seasonal += 1;
    });
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const filteredSuppliers = useMemo(() => {
    if (!search) return suppliers;
    const q = search.toLowerCase();
    return suppliers.filter(s => s.name.toLowerCase().includes(q));
  }, [suppliers, search]);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedSupplier) list = list.filter(p => p.supplier === selectedSupplier);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q));
    }
    return list;
  }, [products, selectedSupplier, search]);

  function handleExport() {
    setShowExport(true);
  }

  function getExportJSON() {
    const today = new Date().toISOString().slice(0, 10);
    const data = {
      exportedAt: new Date().toISOString(),
      version: 1,
      products,
      campaigns,
      keyDates,
      employees,
      posts,
      dsdLinks,
      postTargets,
      projects,
      supplierRels,
      assets,
      analyticsData,
      budgets,
    };
    return JSON.stringify(data, null, 2);
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.campaigns) setCampaigns(data.campaigns);
        if (data.products) setProducts(data.products);
        if (data.keyDates) setKeyDates(data.keyDates);
        if (data.employees) setEmployees(data.employees);
        if (data.posts) setPosts(data.posts);
        if (data.dsdLinks) setDsdLinks(data.dsdLinks);
        if (data.postTargets) setPostTargets(data.postTargets);
        if (data.projects) setProjects(data.projects);
        if (data.supplierRels) setSupplierRels(data.supplierRels);
        if (data.assets) setAssets(data.assets);
        if (data.analyticsData) setAnalyticsData(data.analyticsData);
        if (data.budgets) setBudgets(data.budgets);
        // Explicitly push all data to Supabase
        await Promise.all([
          data.campaigns && sbSet("pourline-campaigns", data.campaigns),
          data.products && sbSet("pourline-products", data.products),
          data.keyDates && sbSet("pourline-keydates", data.keyDates),
          data.employees && sbSet("pourline-employees", data.employees),
          data.posts && sbSet("pourline-posts", data.posts),
          data.dsdLinks && sbSet("pourline-dsdlinks", data.dsdLinks),
          data.postTargets && sbSet("pourline-posttargets", data.postTargets),
          data.projects && sbSet("pourline-projects", data.projects),
          data.supplierRels && sbSet("pourline-supplierrels", data.supplierRels),
          data.assets && sbSet("pourline-assets", data.assets),
          data.analyticsData && sbSet("pourline-analytics", data.analyticsData),
          data.budgets && sbSet("pourline-budgets", data.budgets),
        ].filter(Boolean));
        showToast("Data imported and synced to cloud!");
      } catch (err) {
        showToast("Import failed — make sure the file is a valid Marketing OS backup.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const NAV = [
    { id: "dashboard",  label: "Dashboard" },
    { id: "calendar",   label: "Post Calendar" },
    { id: "keydates",   label: "Key Dates" },
    { id: "campaigns",  label: "Campaigns" },
    { id: "projects",   label: "Projects" },
    { id: "budget",     label: "Budget" },
    { id: "portfolio",  label: "Portfolio" },
  ];

  return (
    <div className="pl-app">
      <style>{STYLE}</style>
      <div className="pl-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className="pl-logo">Marketing OS</h1>
            <p className="pl-tagline">Campaigns, content & coverage — coordinated in one place.</p>
          </div>
          <div className="pl-header-actions">
            <button className="pl-header-btn" onClick={handleExport}>
              <IconDownload /> Export
            </button>
            <button className="pl-header-btn" onClick={() => document.getElementById("pl-import-input").click()}>
              <IconUpload /> Import
            </button>
            <input
              id="pl-import-input"
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleImport}
            />
          </div>
        </div>
        <div className="pl-nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={"pl-nav-btn" + (tab === n.id ? " active" : "")}
              onClick={() => setTab(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pl-body">
        {toast && <div className="pl-import-success">{toast}</div>}

        {showExport && (() => {
          const json = getExportJSON();
          const today = new Date().toISOString().slice(0, 10);
          return (
            <div className="pl-modal-overlay" onClick={() => setShowExport(false)}>
              <div className="pl-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
                <h2>Export backup</h2>
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: -10, marginBottom: 14 }}>
                  Copy the text below, paste it into a text editor (like Notepad), and save it as <strong>pourline-backup-{today}.json</strong> in your Google Drive or a safe folder.
                </p>
                <textarea
                  className="pl-export-box"
                  readOnly
                  value={json}
                  onFocus={e => e.target.select()}
                />
                <div className="pl-modal-actions" style={{ justifyContent: "space-between", marginTop: 14 }}>
                  <button
                    className="pl-btn-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(json).then(() => {
                        showToast("Copied to clipboard!");
                        setShowExport(false);
                      }).catch(() => {
                        showToast("Select all text in the box and copy manually.");
                      });
                    }}
                  >
                    Copy to clipboard
                  </button>
                  <button className="pl-btn-ghost" onClick={() => setShowExport(false)}>Close</button>
                </div>
              </div>
            </div>
          );
        })()}

        {tab === "dashboard" && (
          <div>
            <div className="pl-todo-panel">
              <div className="pl-todo-header" onClick={() => setTodoOpen(o => !o)}>
                <h3>To-Do — this week's gaps {todoItems.length > 0 && <span className="pl-todo-badge" style={{ marginLeft: 8 }}>{todoItems.length}</span>}</h3>
                <span style={{ display: "inline-flex", transform: todoOpen ? "rotate(90deg)" : "rotate(-90deg)", transition: "transform .15s ease", color: "var(--ink-soft)" }}><IconBack /></span>
              </div>
              {todoOpen && (
                <div className="pl-todo-body">
                  {todoItems.length === 0 ? (
                    <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: "8px 0" }}>
                      You're on track with your weekly posting targets and DSD Link capacity — nice work.
                    </p>
                  ) : (
                    todoItems.map((item, i) => (
                      <div
                        className="pl-todo-item"
                        key={i}
                        style={{ cursor: "pointer" }}
                        onClick={() => { setTab(item.linkTab); if (item.linkView) setPostView(item.linkView); }}
                      >
                        <span className="pl-link" style={{ fontWeight: 400, color: "var(--ink)" }}>{item.label}</span>
                        <span style={{ color: "var(--ink-soft)", fontSize: 12 }}>{item.sub}</span>
                      </div>
                    ))
                  )}
                  <div style={{ marginTop: 10 }}>
                    <span className="pl-link" onClick={() => setShowTargetsForm(true)}>Set posting targets</span>
                  </div>
                </div>
              )}
            </div>

            {(needsAttentionCampaigns.length > 0 || atRiskSuppliers.length > 0 || overdueFollowUps.length > 0) && (
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Needs attention</h2>
                <div className="pl-card">
                  {needsAttentionCampaigns.map(c => {
                    const typeInfo = CAMPAIGN_TYPES.find(t => t.id === c.type) || CAMPAIGN_TYPES[0];
                    return (
                      <div className="pl-kd-list-item" key={c.id} style={{ cursor: "pointer" }} onClick={() => setTab("campaigns")}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 13.5 }}>{c.name}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                            {titleCase(c.supplier)} · {typeInfo.label}
                            {c.startDate && ` · ${formatDate(c.startDate)}${c.endDate ? ` – ${formatDate(c.endDate)}` : ""}`}
                          </div>
                        </div>
                        <span style={{ fontSize: 12, color: "#A8456A", fontWeight: 600, whiteSpace: "nowrap" }}>No posts scheduled</span>
                      </div>
                    );
                  })}
                  {atRiskSuppliers.map(s => {
                    const h = healthStatus(s.health);
                    return (
                      <div className="pl-kd-list-item" key={s.name} style={{ cursor: "pointer" }} onClick={() => { setTab("portfolio"); setSelectedSupplier(s.name); setPortfolioView("products"); }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 13.5 }}>{titleCase(s.name)}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Supplier relationship</div>
                        </div>
                        <span className={"pl-rel-health " + h.cls}>{h.label}</span>
                      </div>
                    );
                  })}
                  {overdueFollowUps.map(s => (
                    <div className="pl-kd-list-item" key={"fu-" + s.name} style={{ cursor: "pointer" }} onClick={() => { setTab("portfolio"); setSelectedSupplier(s.name); setPortfolioView("products"); }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{titleCase(s.name)}</div>
                        <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Follow-up was due {formatDate(s.nextFollowUp)}</div>
                      </div>
                      <span style={{ fontSize: 12, color: "#A8456A", fontWeight: 600, whiteSpace: "nowrap" }}>Overdue follow-up</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {needsAttentionCampaigns.length === 0 && atRiskSuppliers.length === 0 && overdueFollowUps.length === 0 && (
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Needs attention</h2>
                <div className="pl-card" style={{ padding: "16px 18px", fontSize: 13.5, color: "var(--ink-soft)" }}>
                  You're caught up — no campaigns missing posts, no at-risk suppliers, no overdue follow-ups.
                </div>
              </div>
            )}

            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Next two weeks</h2>
            {twoWeekPosts.length === 0 ? (
              <div className="pl-card pl-empty" style={{ marginBottom: 22 }}>
                <div className="pl-empty-icon"><IconPackage /></div>
                <h3>Nothing scheduled yet</h3>
                <p>Posts added to the Post Calendar will show up here.</p>
              </div>
            ) : (
              <div className="pl-card" style={{ marginBottom: 22 }}>
                {twoWeekPosts.map(p => {
                  const product = products.find(pr => pr.id === p.productId);
                  return (
                    <div
                      className="pl-kd-list-item"
                      key={p.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => setDetailPost(p)}
                    >
                      <span className="pl-kd-list-date">{formatDate(p.date)}</span>
                      {getPlatforms(p).map(pl => <span key={pl} className="pl-platform-tag" style={{marginRight:3}}>{pl}</span>)}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{p.topic}</div>
                        <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                          {p.postType}{p.supplier ? ` · ${titleCase(p.supplier)}` : ""}{product ? ` · ${titleCase(product.name)}` : ""}
                        </div>
                      </div>
                      <span className={"pl-status-pill " + p.status}>{POST_STATUSES.find(s => s.id === p.status).label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ display: "flex", gap: 14 }}>
              <div className="pl-card" style={{ flex: 1, padding: 16 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--rose-deep)" }}>{suppliers.length}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Suppliers in portfolio</div>
              </div>
              <div className="pl-card" style={{ flex: 1, padding: 16 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--rose-deep)" }}>{products.length}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Active products</div>
              </div>
              <div className="pl-card" style={{ flex: 1, padding: 16 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--rose-deep)" }}>{campaigns.filter(c => campaignStatus(c) === "active").length}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Active campaigns</div>
              </div>
            </div>

            {detailPost && !showPostForm && (
              <PostDetailModal
                post={detailPost}
                products={products}
                onEdit={() => { setEditingPost(detailPost); setDetailPost(null); setShowPostForm(true); }}
                onClose={() => setDetailPost(null)}
              />
            )}
            {showPostForm && (
              <PostForm
                initial={editingPost}
                suppliers={suppliers}
                products={products}
                onSave={savePost}
                onCancel={() => { setShowPostForm(false); setEditingPost(null); }}
                onDelete={deletePost}
              />
            )}
            {showTargetsForm && (
              <TargetsForm
                targets={postTargets}
                onSave={(t) => { setPostTargets(t); setShowTargetsForm(false); }}
                onCancel={() => setShowTargetsForm(false)}
              />
            )}
          </div>
        )}

        {tab === "calendar" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                {postView === "dsd" ? `${dsdActiveCount}/${DSD_CAPACITY} DSD slots active` : `${posts.length} post${posts.length !== 1 ? "s" : ""}`}
              </div>
              <div className="pl-subnav" style={{ marginBottom: 0 }}>
                <button className={"pl-pill" + (postView === "calendar" ? " active" : "")} onClick={() => setPostView("calendar")}>Calendar</button>
                <button className={"pl-pill" + (postView === "spreadsheet" ? " active" : "")} onClick={() => setPostView("spreadsheet")}>Spreadsheet</button>
                <button className={"pl-pill" + (postView === "dsd" ? " active" : "")} onClick={() => setPostView("dsd")}>DSD Links</button>
                <button className={"pl-pill" + (postView === "analytics" ? " active" : "")} onClick={() => setPostView("analytics")}>Analytics</button>
              </div>
            </div>

            {postView === "calendar" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span className="pl-link" onClick={() => {
                    if (postMonth === 0) { setPostMonth(11); setPostYear(y => y - 1); } else { setPostMonth(m => m - 1); }
                  }}><IconBack /></span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{MONTH_LABELS[postMonth]} {postYear}</span>
                  <span className="pl-link" style={{ display: "inline-flex", transform: "rotate(180deg)" }} onClick={() => {
                    if (postMonth === 11) { setPostMonth(0); setPostYear(y => y + 1); } else { setPostMonth(m => m + 1); }
                  }}><IconBack /></span>
                  <span className="pl-link" style={{ marginLeft: 6 }} onClick={() => { setPostMonth(new Date().getMonth()); setPostYear(new Date().getFullYear()); }}>Jump to today</span>
                </div>
                <PostMonthGrid
                  posts={posts}
                  year={postYear}
                  month={postMonth}
                  onSelect={p => setDetailPost(p)}
                />
                <div className="pl-tl-legend">
                  <span><span className="sw" style={{ background: "#9A8A93" }}></span>Draft</span>
                  <span><span className="sw" style={{ background: "#C45C7C" }}></span>Scheduled</span>
                  <span><span className="sw" style={{ background: "#3F8F5C" }}></span>Published</span>
                </div>
              </>
            )}

            {postView === "spreadsheet" && (
              <>
                <div className="pl-filter-row">
                  {POST_STATUSES.map(s => (
                    <button
                      key={s.id}
                      className={"pl-pill" + (postStatusTab === s.id ? " active" : "")}
                      onClick={() => setPostStatusTab(s.id)}
                    >
                      {s.label} ({posts.filter(p => p.status === s.id).length})
                    </button>
                  ))}
                </div>
                {postsByStatusSorted.length === 0 ? (
                  <div className="pl-card pl-empty">
                    <div className="pl-empty-icon"><IconPackage /></div>
                    <h3>No {POST_STATUSES.find(s => s.id === postStatusTab).label.toLowerCase()} posts</h3>
                    <p>Add one to start planning what's next.</p>
                  </div>
                ) : (
                  <div className="pl-card" style={{ overflowX: "auto" }}>
                    <table className="pl-sheet">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Platform</th>
                          <th>Type</th>
                          <th>Topic</th>
                          <th>Supplier / Product</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {postsByStatusSorted.map(p => {
                          const product = products.find(pr => pr.id === p.productId);
                          return (
                            <tr key={p.id}>
                              <td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>{formatDate(p.date)}</td>
                              <td>{getPlatforms(p).map(pl => <span key={pl} className="pl-platform-tag" style={{marginRight:3}}>{pl}</span>)}</td>
                              <td style={{ fontSize: 12, color: "var(--ink-soft)", whiteSpace: "nowrap" }}>{p.postType}<br/><span style={{ fontSize: 11 }}>{p.mediaType}</span></td>
                              <td style={{ maxWidth: 280 }}>{p.topic}</td>
                              <td style={{ color: "var(--ink-soft)" }}>
                                {p.supplier ? titleCase(p.supplier) : "—"}{product ? ` · ${titleCase(product.name)}` : ""}
                              </td>
                              <td><span className={"pl-status-pill " + p.status}>{POST_STATUSES.find(s => s.id === p.status).label}</span></td>
                              <td>
                                <div className="pl-sheet-actions">
                                  <span onClick={() => { setEditingPost(p); setShowPostForm(true); }}>Edit</span>
                                  <span onClick={() => deletePost(p.id)}>Delete</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {postView === "dsd" && (
              <>
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 14 }}>
                  You can run up to {DSD_CAPACITY} DSD Link Adds at once. Aim to keep all {DSD_CAPACITY} slots filled.
                </p>
                {dsdOpenSlots > 0 && (
                  <div className="pl-card" style={{ marginBottom: 14, padding: "12px 16px", borderLeft: "3px solid var(--rose)", fontSize: 13 }}>
                    {dsdOpenSlots} slot{dsdOpenSlots !== 1 ? "s" : ""} open right now — book {dsdOpenSlots === 1 ? "it" : "them"} to get back to {DSD_CAPACITY}/{DSD_CAPACITY}.
                  </div>
                )}
                {dsdOpenSlots === 0 && dsdUpcomingGap && (
                  <div className="pl-card" style={{ marginBottom: 14, padding: "12px 16px", borderLeft: "3px solid var(--rose)", fontSize: 13 }}>
                    Heads up — {dsdUpcomingGap.openSlots} slot{dsdUpcomingGap.openSlots !== 1 ? "s" : ""} will open {formatDate(dsdUpcomingGap.date)} ({dsdUpcomingGap.daysOut} day{dsdUpcomingGap.daysOut !== 1 ? "s" : ""} out). Line up the next link now so it's ready to go.
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span className="pl-link" onClick={() => setDsdYear(y => y - 1)}><IconBack /></span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{dsdYear}</span>
                  <span className="pl-link" style={{ display: "inline-flex", transform: "rotate(180deg)" }} onClick={() => setDsdYear(y => y + 1)}><IconBack /></span>
                </div>
                <DSDLinkTimeline links={dsdLinks} year={dsdYear} products={products} />
                {dsdLinks.length > 0 && (
                  <div className="pl-card" style={{ marginTop: 16 }}>
                    {dsdLinks.sort((a, b) => a.startDate.localeCompare(b.startDate)).map(l => (
                      <div className="pl-row" key={l.id}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{l.title}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                            {titleCase(l.supplier)} · {formatDate(l.startDate)}{l.endDate ? ` – ${formatDate(l.endDate)}` : ""}
                          </div>
                        </div>
                        <div className="pl-sheet-actions">
                          <span onClick={() => { setEditingDsd(l); setShowDsdForm(true); }}>Edit</span>
                          <span onClick={() => deleteDsdLink(l.id)}>Delete</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {postView === "analytics" && (
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                  <div className="pl-filter-row" style={{ marginBottom: 0 }}>
                    <button className={"pl-pill" + (analyticsPlatformFilter === "all" ? " active" : "")} onClick={() => setAnalyticsPlatformFilter("all")}>All</button>
                    {PLATFORMS.map(p => (
                      <button key={p} className={"pl-pill" + (analyticsPlatformFilter === p ? " active" : "")} onClick={() => setAnalyticsPlatformFilter(p)}>{p}</button>
                    ))}
                  </div>
                </div>
                {analyticsByPlatform.length === 0 ? (
                  <div className="pl-card pl-empty">
                    <div className="pl-empty-icon"><IconPackage /></div>
                    <h3>No snapshots yet</h3>
                    <p>Log your first monthly platform snapshot to start tracking performance.</p>
                  </div>
                ) : (
                  <div className="pl-card" style={{ overflowX: "auto" }}>
                    <table className="pl-analytics-table">
                      <thead>
                        <tr>
                          <th>Platform</th>
                          <th>Month</th>
                          <th>Followers</th>
                          <th>Reach</th>
                          <th>Engagement</th>
                          <th>Notes</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsByPlatform.map((d, i) => {
                          const prev = analyticsByPlatform.find((r, j) => j > i && r.platform === d.platform);
                          const trend = (field) => {
                            if (!prev || !prev[field] || !d[field]) return null;
                            const diff = Number(d[field]) - Number(prev[field]);
                            if (diff > 0) return <span className="pl-trend-up">↑ {diff.toLocaleString()}</span>;
                            if (diff < 0) return <span className="pl-trend-down">↓ {Math.abs(diff).toLocaleString()}</span>;
                            return <span className="pl-trend-flat">—</span>;
                          };
                          return (
                            <tr key={d.id}>
                              <td><span className="pl-platform-tag">{d.platform}</span></td>
                              <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{d.month}</td>
                              <td>
                                {d.followers ? Number(d.followers).toLocaleString() : "—"}
                                {d.followers && <div>{trend("followers")}</div>}
                              </td>
                              <td>
                                {d.reach ? Number(d.reach).toLocaleString() : "—"}
                                {d.reach && <div>{trend("reach")}</div>}
                              </td>
                              <td>
                                {d.engagement ? Number(d.engagement).toLocaleString() : "—"}
                                {d.engagement && <div>{trend("engagement")}</div>}
                              </td>
                              <td style={{ maxWidth: 200, fontSize: 12, color: "var(--ink-soft)" }}>{d.notes}</td>
                              <td>
                                <div className="pl-sheet-actions">
                                  <span onClick={() => { setEditingAnalytics(d); setShowAnalyticsForm(true); }}>Edit</span>
                                  <span onClick={() => deleteAnalytics(d.id)}>Delete</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                {showAnalyticsForm && (
                  <AnalyticsForm
                    initial={editingAnalytics}
                    onSave={saveAnalytics}
                    onCancel={() => { setShowAnalyticsForm(false); setEditingAnalytics(null); }}
                    onDelete={deleteAnalytics}
                  />
                )}
              </div>
            )}

            <button
              className="pl-fab"
              onClick={() => {
                if (postView === "dsd") { setEditingDsd(null); setShowDsdForm(true); }
                else if (postView === "analytics") { setEditingAnalytics(null); setShowAnalyticsForm(true); }
                else { setEditingPost(null); setShowPostForm(true); }
              }}
            >+</button>

            {detailPost && !showPostForm && (
              <PostDetailModal
                post={detailPost}
                products={products}
                onEdit={() => { setEditingPost(detailPost); setDetailPost(null); setShowPostForm(true); }}
                onClose={() => setDetailPost(null)}
              />
            )}
            {showPostForm && (
              <PostForm
                initial={editingPost}
                suppliers={suppliers}
                products={products}
                onSave={savePost}
                onCancel={() => { setShowPostForm(false); setEditingPost(null); }}
                onDelete={deletePost}
              />
            )}

            {showDsdForm && (
              <DSDLinkForm
                initial={editingDsd}
                suppliers={suppliers}
                products={products}
                onSave={saveDsdLink}
                onCancel={() => { setShowDsdForm(false); setEditingDsd(null); }}
                onDelete={deleteDsdLink}
              />
            )}

            {showTargetsForm && (
              <TargetsForm
                targets={postTargets}
                onSave={(t) => { setPostTargets(t); setShowTargetsForm(false); }}
                onCancel={() => setShowTargetsForm(false)}
              />
            )}
          </div>
        )}

        {tab === "keydates" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                {allKeyDates.length} key date{allKeyDates.length !== 1 ? "s" : ""} · <span className="pl-link" onClick={() => setShowEmployeeManager(true)}>Manage employees</span>
              </div>
              <div className="pl-subnav" style={{ marginBottom: 0 }}>
                <button className={"pl-pill" + (kdView === "month" ? " active" : "")} onClick={() => setKdView("month")}>Month</button>
                <button className={"pl-pill" + (kdView === "list" ? " active" : "")} onClick={() => setKdView("list")}>List</button>
              </div>
            </div>

            <div className="pl-filter-row">
              <button className={"pl-pill" + (kdCatFilter === "all" ? " active" : "")} onClick={() => setKdCatFilter("all")}>All</button>
              {KD_CATEGORIES.map(c => (
                <button
                  key={c.id}
                  className={"pl-pill" + (kdCatFilter === c.id ? " active" : "")}
                  onClick={() => setKdCatFilter(c.id)}
                  style={kdCatFilter === c.id ? { background: c.color, borderColor: c.color } : {}}
                >
                  <span className="pl-kd-cat-pill"><span className="sw" style={{ background: kdCatFilter === c.id ? "#fff" : c.color }}></span>{c.label}</span>
                </button>
              ))}
            </div>

            {kdView === "month" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span className="pl-link" onClick={() => {
                    if (kdMonth === 0) { setKdMonth(11); setKdYear(y => y - 1); } else { setKdMonth(m => m - 1); }
                  }}><IconBack /></span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{MONTH_LABELS[kdMonth]} {kdYear}</span>
                  <span className="pl-link" style={{ display: "inline-flex", transform: "rotate(180deg)" }} onClick={() => {
                    if (kdMonth === 11) { setKdMonth(0); setKdYear(y => y + 1); } else { setKdMonth(m => m + 1); }
                  }}><IconBack /></span>
                  <span className="pl-link" style={{ marginLeft: 6 }} onClick={() => { setKdMonth(new Date().getMonth()); setKdYear(new Date().getFullYear()); }}>Jump to today</span>
                </div>
                <KeyDateMonthGrid
                  events={filteredKeyDates}
                  year={kdYear}
                  month={kdMonth}
                  onSelect={e => setDetailKd(e)}
                />
              </>
            )}

            {kdView === "list" && (
              <div>
                {upcomingKeyDates.length === 0 && pastKeyDates.length === 0 ? (
                  <div className="pl-card pl-empty">
                    <div className="pl-empty-icon"><IconPackage /></div>
                    <h3>No key dates yet</h3>
                    <p>Add anniversaries, holidays, and promo dates to track them here.</p>
                  </div>
                ) : (
                  <>
                    {upcomingKeyDates.length > 0 && (
                      <div className="pl-card" style={{ marginBottom: 16 }}>
                        <div style={{ padding: "12px 18px", fontWeight: 700, fontSize: 13, borderBottom: "1px solid var(--line)" }}>Upcoming</div>
                        {upcomingKeyDates.map(k => (
                          <div className="pl-kd-list-item" key={k.id} onClick={() => setDetailKd(k)} style={{ cursor: "pointer" }}>
                            <span className="pl-kd-list-date">{formatDate(k.date)}</span>
                            <span className="pl-kd-cat-pill"><span className="sw" style={{ background: kdCategory(k.category).color }}></span></span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{k.name}</div>
                              {k.notes && <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{k.notes}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {pastKeyDates.length > 0 && (
                      <div className="pl-card">
                        <div style={{ padding: "12px 18px", fontWeight: 700, fontSize: 13, borderBottom: "1px solid var(--line)", color: "var(--ink-soft)" }}>Past</div>
                        {pastKeyDates.map(k => (
                          <div className="pl-kd-list-item" key={k.id} onClick={() => setDetailKd(k)} style={{ cursor: "pointer", opacity: 0.65 }}>
                            <span className="pl-kd-list-date">{formatDate(k.date)}</span>
                            <span className="pl-kd-cat-pill"><span className="sw" style={{ background: kdCategory(k.category).color }}></span></span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{k.name}</div>
                              {k.notes && <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{k.notes}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            <button className="pl-fab" onClick={() => { setEditingKd(null); setShowKdForm(true); }}>+</button>

            {detailKd && !showKdForm && !showEmployeeManager && (
              <KeyDateDetailModal
                event={detailKd}
                isGenerated={!!detailKd.generated}
                onEdit={() => {
                  if (detailKd.generated) {
                    setDetailKd(null);
                    setShowEmployeeManager(true);
                  } else {
                    setEditingKd(detailKd);
                    setDetailKd(null);
                    setShowKdForm(true);
                  }
                }}
                onClose={() => setDetailKd(null)}
              />
            )}
            {showKdForm && (
              <KeyDateForm
                initial={editingKd}
                onSave={saveKeyDate}
                onCancel={() => { setShowKdForm(false); setEditingKd(null); }}
                onDelete={(id) => { deleteKeyDate(id); setShowKdForm(false); setEditingKd(null); }}
              />
            )}

            {showEmployeeManager && !showEmployeeForm && (
              <EmployeeManager
                employees={employees}
                onAdd={() => { setEditingEmployee(null); setShowEmployeeForm(true); }}
                onEdit={(emp) => { setEditingEmployee(emp); setShowEmployeeForm(true); }}
                onClose={() => setShowEmployeeManager(false)}
              />
            )}

            {showEmployeeForm && (
              <EmployeeForm
                initial={editingEmployee}
                onSave={saveEmployee}
                onCancel={() => { setShowEmployeeForm(false); setEditingEmployee(null); }}
                onDelete={deleteEmployee}
              />
            )}
          </div>
        )}

        {tab === "campaigns" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""} · {campaigns.filter(c => campaignStatus(c) === "active").length} active
              </div>
              <div className="pl-subnav" style={{ marginBottom: 0 }}>
                <button className={"pl-pill" + (campaignView === "list" ? " active" : "")} onClick={() => setCampaignView("list")}>List</button>
                <button className={"pl-pill" + (campaignView === "timeline" ? " active" : "")} onClick={() => setCampaignView("timeline")}>Timeline</button>
              </div>
            </div>

            {campaignView === "list" && (
              <div className="pl-filter-row">
                {["all", "active", "upcoming", "ended"].map(f => (
                  <button
                    key={f}
                    className={"pl-pill" + (campaignFilter === f ? " active" : "")}
                    onClick={() => setCampaignFilter(f)}
                  >
                    {f === "all" ? "All" : STATUS_META[f].label}
                  </button>
                ))}
              </div>
            )}

            {campaignView === "timeline" && (
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <select
                  className="pl-input"
                  style={{ minWidth: 220 }}
                  value={timelineSupplier}
                  onChange={e => setTimelineSupplier(e.target.value)}
                >
                  <option value="all">All suppliers</option>
                  {suppliers.map(s => <option key={s.name} value={s.name}>{titleCase(s.name)}</option>)}
                </select>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="pl-link" onClick={() => setTimelineYear(y => y - 1)}><IconBack /></span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{timelineYear}</span>
                  <span className="pl-link" style={{ display: "inline-flex", transform: "rotate(180deg)" }} onClick={() => setTimelineYear(y => y + 1)}><IconBack /></span>
                </div>
              </div>
            )}

            {campaignView === "list" ? (
              sortedCampaigns.length === 0 ? (
                <div className="pl-card pl-empty">
                  <div className="pl-empty-icon"><IconPackage /></div>
                  <h3>No campaigns yet</h3>
                  <p>Add one to start planning what's next.</p>
                </div>
              ) : (
                sortedCampaigns.map(c => {
                  const meta = STATUS_META[c.status];
                  const typeInfo = CAMPAIGN_TYPES.find(t => t.id === c.type) || CAMPAIGN_TYPES[0];
                  const product = products.find(p => p.id === c.productId);
                  return (
                    <div className="pl-camp-card" key={c.id}>
                      <div className="pl-camp-top">
                        <div>
                          <p className="pl-camp-name">{c.name}</p>
                          <p className="pl-camp-meta">
                            {titleCase(c.supplier)}{product ? ` · ${titleCase(product.name)}` : ""}
                            {c.startDate && ` · ${formatDate(c.startDate)}${c.endDate ? ` – ${formatDate(c.endDate)}` : ""}`}
                          </p>
                        </div>
                        <span className={"pl-camp-type " + c.type}>{typeInfo.label}</span>
                      </div>
                      {c.notes && <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 8, marginBottom: 0 }}>{c.notes}</p>}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                        <span className="pl-status-dot">
                          <span className="dot" style={{ background: meta.color }}></span>
                          {meta.label}
                        </span>
                        <div className="pl-camp-actions">
                          <span onClick={() => { setEditingCampaign(c); setShowCampaignForm(true); }}>Edit</span>
                          <span onClick={() => deleteCampaign(c.id)}>Delete</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              <CampaignTimeline
                campaigns={campaigns}
                products={products}
                year={timelineYear}
                supplierFilter={timelineSupplier}
              />
            )}

            <button className="pl-fab" onClick={() => { setEditingCampaign(null); setShowCampaignForm(true); }}>+</button>

            {showCampaignForm && (
              <CampaignForm
                initial={editingCampaign}
                suppliers={suppliers}
                products={products}
                onSave={saveCampaign}
                onCancel={() => { setShowCampaignForm(false); setEditingCampaign(null); }}
              />
            )}
          </div>
        )}

        {tab === "projects" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                {projects.length} project{projects.length !== 1 ? "s" : ""} · {projects.filter(p => p.status === "in-progress").length} in progress
              </div>
            </div>

            <div className="pl-filter-row">
              <button className={"pl-pill" + (projStatusFilter === "all" ? " active" : "")} onClick={() => setProjStatusFilter("all")}>All</button>
              {PROJECT_STATUSES.map(s => (
                <button
                  key={s.id}
                  className={"pl-pill" + (projStatusFilter === s.id ? " active" : "")}
                  onClick={() => setProjStatusFilter(s.id)}
                >
                  {s.label} ({projects.filter(p => p.status === s.id).length})
                </button>
              ))}
            </div>

            {filteredProjects.length === 0 ? (
              <div className="pl-card pl-empty">
                <div className="pl-empty-icon"><IconPackage /></div>
                <h3>No projects here</h3>
                <p>Add a project to start tracking your work.</p>
              </div>
            ) : (
              filteredProjects.map(proj => {
                const st = projStatus(proj.status);
                const isOverdue = !proj.openEnded && proj.dueDate && proj.dueDate < todayISO() && proj.status !== "complete";
                return (
                  <div className="pl-proj-card" key={proj.id}>
                    <div className="pl-camp-top">
                      <div style={{ flex: 1 }}>
                        <p className="pl-proj-title">{proj.title}</p>
                        <p className="pl-proj-meta">
                          {proj.openEnded
                            ? "Open-ended"
                            : proj.dueDate
                              ? `Due ${formatDate(proj.dueDate)}`
                              : "No due date"}
                          {isOverdue && <span style={{ color: "#A8456A", fontWeight: 700 }}> — Overdue</span>}
                        </p>
                      </div>
                      <span className={"pl-proj-status " + st.cls}>{st.label}</span>
                    </div>
                    {proj.notes && <div className="pl-proj-notes">{proj.notes}</div>}
                    <div className="pl-proj-footer">
                      <div className="pl-camp-actions">
                        <span onClick={() => { setEditingProj(proj); setShowProjForm(true); }}>Edit</span>
                        <span onClick={() => deleteProject(proj.id)}>Delete</span>
                      </div>
                      {proj.status !== "complete" && (
                        <span
                          className="pl-link"
                          style={{ fontSize: 12 }}
                          onClick={() => setProjects(ps => ps.map(p => p.id === proj.id ? { ...p, status: "complete" } : p))}
                        >
                          Mark complete
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            <button className="pl-fab" onClick={() => { setEditingProj(null); setShowProjForm(true); }}>+</button>

            {showProjForm && (
              <ProjectForm
                initial={editingProj}
                onSave={saveProject}
                onCancel={() => { setShowProjForm(false); setEditingProj(null); }}
                onDelete={deleteProject}
              />
            )}
          </div>
        )}

        {tab === "budget" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>Year:</span>
                {[String(new Date().getFullYear() - 1), String(new Date().getFullYear()), String(new Date().getFullYear() + 1)].map(y => (
                  <button key={y} className={"pl-pill" + (budgetYearFilter === y ? " active" : "")} onClick={() => setBudgetYearFilter(y)}>{y}</button>
                ))}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                {filteredBudgets.length} budget{filteredBudgets.length !== 1 ? "s" : ""} ·{" "}
                <strong style={{ color: "var(--ink)" }}>
                  ${filteredBudgets.reduce((sum, b) => sum + Number(b.amount || 0), 0).toLocaleString()}
                </strong> total
              </div>
            </div>

            {filteredBudgets.length === 0 ? (
              <div className="pl-card pl-empty">
                <div className="pl-empty-icon"><IconPackage /></div>
                <h3>No budgets yet</h3>
                <p>Add a co-marketing budget for each supplier to start tracking spend.</p>
              </div>
            ) : (
              filteredBudgets.map(b => {
                const spent = (b.spendLog || []).reduce((sum, s) => sum + Number(s.amount || 0), 0);
                const total = Number(b.amount || 0);
                const pct = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
                const remaining = total - spent;
                const overBudget = spent > total;
                return (
                  <div className="pl-budget-card" key={b.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--ink)" }}>{titleCase(b.supplier)}</div>
                        <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{b.period} {b.year}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>${total.toLocaleString()}</div>
                        <div style={{ fontSize: 12, color: overBudget ? "#A8456A" : "var(--ink-soft)", fontWeight: overBudget ? 700 : 400 }}>
                          {overBudget ? `$${(spent - total).toLocaleString()} over` : `$${remaining.toLocaleString()} remaining`}
                        </div>
                      </div>
                    </div>
                    <div className="pl-budget-bar-bg">
                      <div className="pl-budget-bar-fill" style={{ width: pct + "%", background: overBudget ? "#A8456A" : pct > 80 ? "#C97A4A" : "#3F8F5C" }} />
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 10 }}>
                      ${spent.toLocaleString()} spent of ${total.toLocaleString()} ({Math.round(pct)}%)
                    </div>
                    {b.notes && <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 10 }}>{b.notes}</div>}

                    {(b.spendLog || []).length > 0 && (
                      <div style={{ marginTop: 8 }}>
                        {[...(b.spendLog || [])].sort((a, c) => a.date > c.date ? -1 : 1).map(s => (
                          <div className="pl-spend-entry" key={s.id}>
                            <div>
                              <div style={{ fontWeight: 600 }}>{s.description}</div>
                              <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{formatDate(s.date)}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ fontWeight: 700 }}>${Number(s.amount).toLocaleString()}</span>
                              <span className="pl-link" style={{ fontSize: 11 }} onClick={() => deleteSpend(b.id, s.id)}>Remove</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                      <div className="pl-camp-actions">
                        <span onClick={() => { setEditingBudget(b); setShowBudgetForm(true); }}>Edit</span>
                        <span onClick={() => deleteBudget(b.id)}>Delete</span>
                      </div>
                      <span className="pl-link" onClick={() => { setSpendTargetBudgetId(b.id); setShowSpendForm(true); }}>+ Log spend</span>
                    </div>
                  </div>
                );
              })
            )}

            <button className="pl-fab" onClick={() => { setEditingBudget(null); setShowBudgetForm(true); }}>+</button>

            {showBudgetForm && (
              <BudgetForm
                initial={editingBudget}
                suppliers={suppliers}
                onSave={saveBudget}
                onCancel={() => { setShowBudgetForm(false); setEditingBudget(null); }}
                onDelete={deleteBudget}
              />
            )}
            {showSpendForm && (
              <SpendForm
                onSave={(entry) => logSpend(spendTargetBudgetId, entry)}
                onCancel={() => { setShowSpendForm(false); setSpendTargetBudgetId(null); }}
              />
            )}
          </div>
        )}

        {tab === "portfolio" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
              <div className="pl-subnav" style={{ marginBottom: 0 }}>
                <button
                  className={"pl-pill" + (portfolioView === "suppliers" ? " active" : "")}
                  onClick={() => { setPortfolioView("suppliers"); setSelectedSupplier(null); setSearch(""); }}
                >
                  Suppliers ({suppliers.length})
                </button>
                <button
                  className={"pl-pill" + (portfolioView === "products" ? " active" : "")}
                  onClick={() => { setPortfolioView("products"); setSelectedSupplier(null); setSearch(""); }}
                >
                  Products ({products.length})
                </button>
                <button
                  className={"pl-pill" + (portfolioView === "library" ? " active" : "")}
                  onClick={() => { setPortfolioView("library"); setSelectedSupplier(null); setSearch(""); }}
                >
                  Content Library ({assets.length})
                </button>
              </div>
              <div>
                <button
                  className="pl-header-btn"
                  style={{ background: "var(--rose)", border: "none", color: "#fff", padding: "7px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                  onClick={() => document.getElementById("pl-csv-reimport").click()}
                >
                  ↑ Re-import CSV
                </button>
                <input
                  id="pl-csv-reimport"
                  type="file"
                  accept=".csv"
                  style={{ display: "none" }}
                  onChange={handleCsvReimport}
                />
              </div>
            </div>

            {portfolioView !== "library" && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
                  <span style={{ position: "absolute", left: 11, top: 10, color: "var(--ink-soft)" }}><IconSearch /></span>
                  <input
                    className="pl-input"
                    style={{ width: "100%", paddingLeft: 32 }}
                    placeholder={portfolioView === "suppliers" ? "Search suppliers..." : "Search products..."}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                {selectedSupplier && (
                  <span className="pl-link" style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={() => setSelectedSupplier(null)}>
                    <IconBack /> Clear supplier filter
                  </span>
                )}
              </div>
            )}

            {portfolioView === "suppliers" && (
              filteredSuppliers.length === 0 ? (
                <div className="pl-card pl-empty">
                  <div className="pl-empty-icon"><IconBuilding /></div>
                  <h3>No suppliers found</h3>
                  <p>Try a different search term.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
                  {filteredSuppliers.map(s => (
                    <div
                      key={s.name}
                      className="pl-supplier-card"
                      onClick={() => { setSelectedSupplier(s.name); setPortfolioView("products"); setSearch(""); }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <p className="pl-supplier-name">{titleCase(s.name)}</p>
                          <p className="pl-supplier-meta">{s.count} product{s.count !== 1 ? "s" : ""}{s.seasonal ? ` · ${s.seasonal} seasonal` : ""}</p>
                        </div>
                        <span className="pl-count-badge">{s.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {portfolioView === "products" && (
              filteredProducts.length === 0 ? (
                <div className="pl-card pl-empty">
                  <div className="pl-empty-icon"><IconPackage /></div>
                  <h3>No products found</h3>
                  <p>Try a different search term or supplier.</p>
                </div>
              ) : (
                <div className="pl-card">
                  {selectedSupplier && (
                    <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", fontWeight: 700, fontSize: 13.5, color: "var(--blush-deep)" }}>
                      {titleCase(selectedSupplier)} — {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                    </div>
                  )}
                  <div style={{ maxHeight: 560, overflowY: "auto" }}>
                    {filteredProducts.map(p => (
                      <div className="pl-row" key={p.id}>
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--ink)" }}>{titleCase(p.name)}</div>
                          {!selectedSupplier && <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{titleCase(p.supplier)} · {p.package}</div>}
                          {selectedSupplier && <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{p.package} · {p.type}</div>}
                        </div>
                        <span className={"pl-tag " + (p.seasonality === "Seasonal" ? "seasonal" : "annual")}>{p.seasonality}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

            {portfolioView === "library" && (
              <div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                    <span style={{ position: "absolute", left: 11, top: 10, color: "var(--ink-soft)" }}><IconSearch /></span>
                    <input
                      className="pl-input"
                      style={{ width: "100%", paddingLeft: 32, boxSizing: "border-box" }}
                      placeholder="Search assets..."
                      value={assetSearch}
                      onChange={e => setAssetSearch(e.target.value)}
                    />
                  </div>
                  <select
                    className="pl-input"
                    value={assetSupplierFilter}
                    onChange={e => setAssetSupplierFilter(e.target.value)}
                    style={{ minWidth: 180 }}
                  >
                    <option value="all">All suppliers</option>
                    {suppliers.map(s => <option key={s.name} value={s.name}>{titleCase(s.name)}</option>)}
                  </select>
                </div>
                <div className="pl-filter-row">
                  <button className={"pl-pill" + (assetTypeFilter === "all" ? " active" : "")} onClick={() => setAssetTypeFilter("all")}>All</button>
                  {ASSET_TYPES.map(t => (
                    <button key={t.id} className={"pl-pill" + (assetTypeFilter === t.id ? " active" : "")} onClick={() => setAssetTypeFilter(t.id)}>
                      {t.label} ({assets.filter(a => a.type === t.id).length})
                    </button>
                  ))}
                </div>
                {filteredAssets.length === 0 ? (
                  <div className="pl-card pl-empty">
                    <div className="pl-empty-icon"><IconPackage /></div>
                    <h3>No assets found</h3>
                    <p>Add photos, videos, graphics, and logos to build your library.</p>
                  </div>
                ) : (
                  <div className="pl-asset-grid">
                    {filteredAssets.map(a => {
                      const t = assetType(a.type);
                      const product = products.find(p => p.id === a.productId);
                      return (
                        <div className="pl-asset-card" key={a.id}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <span className={"pl-asset-type " + t.cls}>{t.label}</span>
                            <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>{formatDate(a.dateCreated)}</span>
                          </div>
                          <div className="pl-asset-name">{a.name}</div>
                          <div className="pl-asset-meta">
                            {a.supplier ? titleCase(a.supplier) : "No supplier"}{product ? ` · ${titleCase(product.name)}` : ""}
                          </div>
                          {a.fileLocation && (
                            <div className="pl-asset-link" onClick={() => { if (a.fileLocation.startsWith("http")) window.open(a.fileLocation, "_blank"); }}>
                              {a.fileLocation.startsWith("http") ? "Open file ↗" : a.fileLocation}
                            </div>
                          )}
                          {a.notes && <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{a.notes}</div>}
                          <div className="pl-camp-actions" style={{ marginTop: 6 }}>
                            <span onClick={() => { setEditingAsset(a); setShowAssetForm(true); }}>Edit</span>
                            <span onClick={() => deleteAsset(a.id)}>Delete</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {showAssetForm && (
                  <AssetForm
                    initial={editingAsset}
                    suppliers={suppliers}
                    products={products}
                    onSave={saveAsset}
                    onCancel={() => { setShowAssetForm(false); setEditingAsset(null); }}
                    onDelete={deleteAsset}
                  />
                )}
              </div>
            )}

            {selectedSupplier && (() => {
              const supplierCampaigns = campaigns
                .map(c => ({ ...c, status: campaignStatus(c) }))
                .filter(c => c.supplier === selectedSupplier && (c.status === "active" || c.status === "upcoming"))
                .sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
              if (supplierCampaigns.length === 0) return null;
              return (
                <div style={{ marginTop: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "var(--ink)" }}>
                    Active & upcoming campaigns
                  </h3>
                  {supplierCampaigns.map(c => {
                    const typeInfo = CAMPAIGN_TYPES.find(t => t.id === c.type) || CAMPAIGN_TYPES[0];
                    const meta = STATUS_META[c.status];
                    const product = products.find(p => p.id === c.productId);
                    const postCount = posts.filter(p =>
                      p.supplier === c.supplier &&
                      p.status !== "draft" &&
                      (!c.startDate || p.date >= c.startDate) &&
                      (!c.endDate || p.date <= c.endDate)
                    ).length;
                    return (
                      <div
                        className="pl-camp-card"
                        key={c.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => setTab("campaigns")}
                      >
                        <div className="pl-camp-top">
                          <div>
                            <p className="pl-camp-name">{c.name}</p>
                            <p className="pl-camp-meta">
                              {product ? titleCase(product.name) : "Whole supplier focus"}
                              {c.startDate && ` · ${formatDate(c.startDate)}${c.endDate ? ` – ${formatDate(c.endDate)}` : ""}`}
                            </p>
                          </div>
                          <span className={"pl-camp-type " + c.type}>{typeInfo.label}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                          <span className="pl-status-dot">
                            <span className="dot" style={{ background: meta.color }}></span>
                            {meta.label}
                          </span>
                          <span style={{ fontSize: 12, color: postCount === 0 ? "#A8456A" : "var(--ink-soft)", fontWeight: postCount === 0 ? 700 : 400 }}>
                            {postCount === 0 ? "No posts scheduled" : `${postCount} post${postCount !== 1 ? "s" : ""} scheduled`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {selectedSupplier && (() => {
              const supplierAssets = assets.filter(a => a.supplier === selectedSupplier)
                .sort((a, b) => (b.dateCreated || "").localeCompare(a.dateCreated || ""));
              if (supplierAssets.length === 0) return null;
              return (
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Content assets ({supplierAssets.length})</h3>
                    <span className="pl-link" onClick={() => { setPortfolioView("library"); setAssetSupplierFilter(selectedSupplier); }}>View all in library</span>
                  </div>
                  <div className="pl-asset-grid">
                    {supplierAssets.slice(0, 4).map(a => {
                      const t = assetType(a.type);
                      const product = products.find(p => p.id === a.productId);
                      return (
                        <div className="pl-asset-card" key={a.id}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <span className={"pl-asset-type " + t.cls}>{t.label}</span>
                            <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>{formatDate(a.dateCreated)}</span>
                          </div>
                          <div className="pl-asset-name">{a.name}</div>
                          {product && <div className="pl-asset-meta">{titleCase(product.name)}</div>}
                          {a.fileLocation && (
                            <div className="pl-asset-link" onClick={() => { if (a.fileLocation.startsWith("http")) window.open(a.fileLocation, "_blank"); }}>
                              {a.fileLocation.startsWith("http") ? "Open file ↗" : a.fileLocation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {supplierAssets.length > 4 && (
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                      <span className="pl-link" onClick={() => { setPortfolioView("library"); setAssetSupplierFilter(selectedSupplier); }}>
                        + {supplierAssets.length - 4} more assets in library
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            {selectedSupplier && (() => {
              const rel = supplierRels[selectedSupplier] || {};
              const h = healthStatus(rel.health || "good");
              const log = rel.interactionLog || [];
              const isOverdueFollowUp = rel.nextFollowUp && rel.nextFollowUp < todayISO();
              return (
                <div className="pl-rel-section">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Supplier relationship</h3>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {rel.health && <span className={"pl-rel-health " + h.cls}>{h.label}</span>}
                      <span className="pl-link" onClick={() => setShowRelForm(true)}>
                        {rel.contactName ? "Edit details" : "Add details"}
                      </span>
                    </div>
                  </div>

                  {rel.contactName && (
                    <div className="pl-card" style={{ padding: "14px 18px", marginBottom: 14 }}>
                      {rel.contactName && (
                        <div className="pl-detail-row">
                          <span className="pl-detail-label">Contact</span>
                          <span className="pl-detail-value">{rel.contactName}</span>
                        </div>
                      )}
                      {(rel.contactEmail || rel.contactPhone) && (
                        <div className="pl-detail-row">
                          <span className="pl-detail-label">Reach</span>
                          <span className="pl-detail-value">
                            {rel.contactEmail}{rel.contactEmail && rel.contactPhone ? " · " : ""}{rel.contactPhone}
                          </span>
                        </div>
                      )}
                      {rel.nextFollowUp && (
                        <div className="pl-detail-row">
                          <span className="pl-detail-label">Follow-up</span>
                          <span className="pl-detail-value" style={{ color: isOverdueFollowUp ? "#A8456A" : "var(--ink)", fontWeight: isOverdueFollowUp ? 700 : 400 }}>
                            {formatDate(rel.nextFollowUp)}{isOverdueFollowUp ? " — Overdue" : ""}
                          </span>
                        </div>
                      )}
                      {rel.coMarketingBudget && (
                        <div className="pl-detail-row">
                          <span className="pl-detail-label">Co-mktg</span>
                          <span className="pl-detail-value">{rel.coMarketingBudget}</span>
                        </div>
                      )}
                      {rel.notes && (
                        <div className="pl-detail-row">
                          <span className="pl-detail-label">Notes</span>
                          <div className="pl-detail-notes">{rel.notes}</div>
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>
                      Interaction log {log.length > 0 && <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>({log.length})</span>}
                    </span>
                    <span className="pl-link" onClick={() => setShowInteractionForm(true)}>+ Log interaction</span>
                  </div>
                  {log.length === 0 ? (
                    <div className="pl-card" style={{ padding: "16px 18px", fontSize: 13, color: "var(--ink-soft)" }}>
                      No interactions logged yet. Add your first one above.
                    </div>
                  ) : (
                    <div className="pl-card">
                      {log.map(entry => (
                        <div className="pl-log-entry" key={entry.id}>
                          <div className="pl-log-meta">
                            <span className="pl-log-type">{entry.type}</span>
                            <span className="pl-log-date">{formatDate(entry.date)}</span>
                            <span className="pl-link" style={{ fontSize: 11, marginLeft: "auto" }} onClick={() => deleteInteraction(selectedSupplier, entry.id)}>Remove</span>
                          </div>
                          <div className="pl-log-notes">{entry.notes}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showRelForm && (
                    <RelationshipForm
                      initial={rel.contactName ? rel : null}
                      onSave={(form) => saveRelationship(selectedSupplier, form)}
                      onCancel={() => setShowRelForm(false)}
                    />
                  )}
                  {showInteractionForm && (
                    <InteractionForm
                      onSave={(entry) => logInteraction(selectedSupplier, entry)}
                      onCancel={() => setShowInteractionForm(false)}
                    />
                  )}
                </div>
              );
            })()}

            <button
              className="pl-fab"
              onClick={() => { if (portfolioView === "library") { setEditingAsset(null); setShowAssetForm(true); } }}
              style={{ display: portfolioView === "library" ? "flex" : "none" }}
            >+</button>

            {showCsvPreview && csvPreview && (
              <div className="pl-modal-overlay" onClick={() => setShowCsvPreview(false)}>
                <div className="pl-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
                  <h2>Review CSV import</h2>
                  <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: -10, marginBottom: 18 }}>
                    Here's what will change. Existing connections (campaigns, posts, assets) won't be affected.
                  </p>
                  <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                    <div className="pl-csv-stat" style={{ background: "#D4E8DA" }}>
                      <div className="pl-num" style={{ color: "#2F6B45" }}>{csvPreview.added.length}</div>
                      <div className="pl-lbl">New products</div>
                    </div>
                    <div className="pl-csv-stat" style={{ background: "var(--lavender)" }}>
                      <div className="pl-num" style={{ color: "#4A3A63" }}>{csvPreview.updated.length}</div>
                      <div className="pl-lbl">Updated</div>
                    </div>
                    <div className="pl-csv-stat" style={{ background: "var(--cream-deep)" }}>
                      <div className="pl-num" style={{ color: "var(--ink-soft)" }}>{csvPreview.unchanged.length}</div>
                      <div className="pl-lbl">Unchanged</div>
                    </div>
                    <div className="pl-csv-stat" style={{ background: "var(--peach)" }}>
                      <div className="pl-num" style={{ color: "#7A4A30" }}>{csvPreview.missing.length}</div>
                      <div className="pl-lbl">Not in CSV*</div>
                    </div>
                  </div>
                  {csvPreview.missing.length > 0 && (
                    <p style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 16 }}>
                      * {csvPreview.missing.length} product{csvPreview.missing.length !== 1 ? "s" : ""} in Marketing OS weren't in this CSV — they'll be kept as-is and not deleted.
                    </p>
                  )}
                  {csvPreview.updated.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>Sample updates:</div>
                      <div className="pl-card" style={{ maxHeight: 140, overflowY: "auto" }}>
                        {csvPreview.updated.slice(0, 8).map(u => (
                          <div key={u.new.id} className="pl-row" style={{ fontSize: 12 }}>
                            <span style={{ fontWeight: 600 }}>{titleCase(u.new.name)}</span>
                          </div>
                        ))}
                        {csvPreview.updated.length > 8 && (
                          <div className="pl-row" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                            + {csvPreview.updated.length - 8} more...
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="pl-modal-actions">
                    <button className="pl-btn-ghost" onClick={() => setShowCsvPreview(false)}>Cancel</button>
                    <button className="pl-btn-primary" onClick={applyCsvMerge}>Apply merge</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
