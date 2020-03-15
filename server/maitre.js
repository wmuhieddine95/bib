const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('query-string')


const parse = data => {
   const $ = cheerio.load(data);
	var nm = $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5 > span:nth-child(1) > strong').text();
    var name = ""; 
    for( var i = 0; i < nm.length; i++ ) 
    if( !(nm[i] == '\n' || nm[i] == '\r' || nm[i] == ' ' || nm[i] == '=' || nm[i] == '\n' ) ) 
    name += nm[i];
  
    var ad = $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-content-infos.row > div.ep-infos-txt > div.infos-complement > a').text();
    var address = ""; 

    for( var i = 0; i < ad.length; i++ ) 
    if( !(ad[i] == '\n' || ad[i] == '\r' || ad[i] == ' ' || ad[i] == '=' || ad[i] == '\n' ) ) 
    address += ad[i];
	
	var web = $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5 > a').text();
    var website = ""; 
    for( var i = 0; i < web.length; i++ ) 
    if( !(web[i] == '\n' || web[i] == '\r' || web[i] == ' ' || web[i] == '=' || web[i] == '\n'|| web[i] == '+') ) 
    website += web[i];

	var phone="";
	var allinfo= $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5').text();
	var telephone=allinfo.match(/(((\d{2})(\s)){4}(\d){2})|(\d{10})/g);
	/*if{
	for( var i = 0; i < telephone.length; i++ ) {
	if( !(telephone[i] == '\n' || telephone[i] == '\r' || telephone[i] == ' ' || telephone[i] == '=' || telephone[i] == '\n') ) 
	{console.log(telephone[i]);
	console.log("hi");
	telephones+=telephone[i];
	};
	};
	};*/
	if (telephone!=null){
	telephone=telephone.toString().replace(/\s*/g,"");
	phone+=telephone;
	}
  return {name,address,website,phone};
  };

module.exports.scrapeRestaurant = async page => {
	const payLoad={
		'page':page,
		'request_id':'f399d7f9d1db5d6bb15194afde629b20'};
	const options = {
		'url':'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
		'method':'POST',
		'headers':{'content-type':'application/x-www-form-urlencoded'},
		'data':querystring.stringify(payLoad)
	};
	const response=await axios(options);
	const{data,status}=response;
	const namelist = [];
	const urls=[];
	const telephones=[];
	const host='https://www.maitresrestaurateurs.fr';
	
	const $ = cheerio.load(data);const url_bis = $('.single_libel > a').each((i, element) => {
    var site="sfd";
	site = $(element).attr('href');
    urls.push(host + site);
  }); 
  
  for (var i=1;i<urls.length;i++){
	const response1 = await axios(urls[i]);
	const {data, status} = response1;
	if (status >= 200 && status < 300)
	{
		namelist.push(parse(data));
	}
  }
	return namelist;
	console.error(status);
	return null;
 
};

module.exports.get = () => {
  return [];
};
