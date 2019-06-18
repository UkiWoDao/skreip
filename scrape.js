const request = require('request-promise'),
      cheerio = require('cheerio'),

      // target
      url = 'https://www.imdb.com/title/tt4154796/';

// async iffe
(async () => {
    const response = await request({
        uri: url,
        // simulate real request header from our browser
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            // 'Cookie': 'uu=BCYh3s7CNXO3hxfMBxxK0NOAuFm…0nNBIv2i3cclmljGBY1ZT2R+TxHX/',
            'Host': 'www.imdb.com',
            'Referer': 'https://www.google.com/',
            'Upgrade-Insecure-Requests': '1',
            // no need to give own browser info
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; …) Gecko/20100101 Firefox/67.0'
            'User-Agent': 'Chrome: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
        },
        // solve encoded response ('Content-encoding : gzip')
         gzip : true
    });
    // console.log(response);

    const $ = cheerio.load(response);

    const title = $('.title_wrapper > h1')
    // grab text of returned element
        .text();
    const rating = $('span[itemprop="ratingValue"]').text();
    console.log(title, rating);
    
})();