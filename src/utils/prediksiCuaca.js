const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c51bd73e3343d2b88d2680cc0361405a&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan cuaca!', undefined);
        } else if (response.body.error) {
            callback('Tidak dapat menemukan lokasi. Pastikan koordinat yang diberikan benar.', undefined);
        } else {
            // Bisa tambahkan logging untuk memeriksa response body
            console.log('API Response:', response.body);

            callback(undefined, 
                `Info Cuaca: ${response.body.current.weather_descriptions[0]}. ` +
                `Suhu saat ini adalah ${response.body.current.temperature} derajat. ` +
                `Index UV adalah ${response.body.current.uv_index}. ` +
                `Visibilitas ${response.body.current.visibility} kilometer.`
            );
        }
    });
}

module.exports = forecast;
