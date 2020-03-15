/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const maitre = require('./maitre');

async function sandbox (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/') {
  try {
	
    const restaurant = await michelin.scrapeRestaurant(searchLink);
	const allinfomaitre=[];
	/*for(var i =1;i<=155;i++){
	const infomaitre =await maitre.scrapeRestaurant(i);
	allinfomaitre.push(infomaitre);
	console.log(i+" page is done");
	}*/
	var fs = require('fs');
	var jsonData = JSON.stringify(restaurant,null,6);
	fs.writeFileSync('michelin.json',jsonData);
	
	/*var jsonData2 = JSON.stringify(allinfomaitre,null,4);
	fs.writeFileSync('maitre.json',jsonData2);*/
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;

sandbox(searchLink);
