const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')

const app = express()

// mendefenisikan jalur/part untuk konfigurasi ekspress
const directoryPublic = path.join(__dirname,'../public')
const directoryViews = path.join(__dirname,'../templates/views')
const directoryPartials = path.join(__dirname,'../templates/partials')

// setup handlerbars engine dan lokasi folder view
app.set('view engine', 'hbs')
app.set('views', directoryViews)
hbs.registerPartials(directoryPartials)

// setup directory statis
app.use(express.static(directoryPublic))

//ini halaman utama
app.get('', (req, res) => {
    res.render('index', {
    judul: 'Aplikasi Cek Cuaca',
    nama: 'Reyhan'
    })
})

//ini halaman tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
    judul: 'Tentang Saya',
    nama: 'Reyhan'
    })
})
    
    //ini halaman
app.get('/infocuaca', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Kamu harus memasukan lokasi yang ingin dicari'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude,location } = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error){
                return res.send({error})
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})
        


app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        nama: 'Reyhan',
        teksBantuan: 'ini teks bantuan'
    })
})

app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul:'404',
        nama:'Reyhan',
        pesanKesalahan:'Artikel yg dicari tidak ditemukan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        judul:'404',
        nama:'Reyhan',
        pesanKesalahan:'Halaman tidak ditemukan'
    })
})

app.listen(4000, () => {
console.log('Server berjalan pada port 4000.')
})