const request = require('request');

const API_KEY = 'AIzaSyAS07Jy1akNVUMWJf2m8q6TbI2OkdUd32U';

const mapImageItem = item => ({
  url: item.link,
  alt: item.title,
  pageUrl: item.image.contextLink,
});

const searchImages = (query, offset) => new Promise((resolve, reject) => {
  const requestOptions = {
    uri: 'https://www.googleapis.com/customsearch/v1',
    qs: {
      q: query,
      cx: '013593036662920643278:zcxp6n5qyxs',
      searchType: 'image',
      key: API_KEY,
    }
  };

  if (offset) {
    requestOptions.qs.start = Number(offset);
  }

  return request(requestOptions, (err, res, body) => {
    if (err) reject(err);
    if (res && res.statusCode === 200) {
      resolve(JSON.parse(body).items);
    } else {
      reject(res);
    }
  });
});

const getImages = (query, offset) =>
  searchImages(query, offset)
    .then(items => items.map(mapImageItem));

module.exports = {
  getImages,
};
