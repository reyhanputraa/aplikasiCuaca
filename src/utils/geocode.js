const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=646f788de30937ce94aafc8514b98c8c&query=${encodeURIComponent(address)}`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan', undefined);
        } else if (response.body.data.length === 0) {
            callback('Tidak dapat menemukan lokasi. Lakukan pencarian lokasi yang lain', undefined);
        } else {
            console.log('Geocode Response:', response.body);
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                location: response.body.data[0].label,
            });
        }
    });
};

module.exports = geocode;
