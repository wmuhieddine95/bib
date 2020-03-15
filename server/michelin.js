const axios = require('axios');
const cheerio = require('cheerio');
/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  var nm = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > h2').text();
    var name = ""; 
    for( var i = 0; i < nm.length; i++ ) 
    if( !(nm[i] == '\n' || nm[i] == '\r' || nm[i] == ' ' || nm[i] == '=' || nm[i] == '\n' ) ) 
    name += nm[i];
  //________________________________________________________________________________________________________
    var ad = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul').text();
    var address = ""; 
    for( var i = 0; i < ad.length; i++ ) 
    if( !(ad[i] == '\n' || ad[i] == '\r' || ad[i] == ' ' || ad[i] == '=' || ad[i] == '\n' ) ) 
    address += ad[i];
  //________________________________________________________________________________________________________
    var ex = $('#experience-section').text();
    var experience = ""; 
    for( var i = 0; i < ex.length; i++ ) 
    if( !(ex[i] == '\n' || ex[i] == '\r' || ex[i] == ' ' || ex[i] == '=' || ex[i] == '\n' ) ) 
    experience += ex[i];
  //________________________________________________________________________________________________________
    var sp = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section.sectionn.section-main.section__text-componets > div').text();
    var specialties = ""; 
    for( var i = 0; i < sp.length; i++ ) 
    if( !(sp[i] == '\n' || sp[i] == '\r' || sp[i] == ' ' || sp[i] == '=' || sp[i] == '\n'|| sp[i] == '+') ) 
    specialties += sp[i];
  //__________________________________________________________________________________________________________
    var web = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div.collapse__block-item.link-item').text();
    var website = ""; 
    for( var i = 0; i < web.length; i++ ) 
    if( !(web[i] == '\n' || web[i] == '\r' || web[i] == ' ' || web[i] == '=' || web[i] == '\n'|| web[i] == '+') ) 
    website += web[i];
  //____________________________________________________________________________________________________________
    var ph = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > span.flex-fill').text();
    var phone = "";
	ph=ph.toString().replace(/\s*/g,"");
	ph=ph.replace("+33","0");
	phone += ph;
	
  //_____________________________________________________________________________________________________________
    
    return {name, address, experience, specialties, website, phone};
  };
module.exports.scrapeRestaurant = async url => {

var arr= new Array(561);
for(var i=1;i<=15;i++)
{
 const response = await axios(url+i);
 const {data, status} = response;
 if (status >= 200 && status < 300)
 {
 const $ = cheerio.load(data);
 var totalItem=$('body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status > div.flex-fill > h1 > span').text();
 totalItem=totalItem.trim();
 const match=totalItem.search("-");
 var length=parseInt(totalItem.substring(match+1,totalItem.length))-parseInt(totalItem.substring(0,match))
 const host='https://guide.michelin.com';
 var rest="sfd";
 for(var j=1;j<=length+1;j++)
 {
rest = $('body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child('+j+') > div > a').attr('href');
const response1 = await axios(host+rest);
 const {data, status} = response1;
 if (status >= 200 && status < 300)
 {
	arr.push(parse(data));
 }
 
}
 }
}
return arr;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
