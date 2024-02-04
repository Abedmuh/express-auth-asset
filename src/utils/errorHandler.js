// middleware/errorHandler.js

const handleErrors = (err, req, res, next) => {
  // Tangani error dengan status code yang diberikan atau 500 jika tidak ada
  const statusCode = err.status || 500;

  // Menangani beberapa jenis kesalahan secara khusus
  if (err.name === 'ValidationError') {
    // Contoh: Kesalahan validasi
    return res.status(422).json({
      status: 'error',
      message: 'ValidationError',
      errors: err.errors,  // Mengambil pesan kesalahan validasi khusus
    });
  }

  if (err.name === 'CustomError') {
    // Contoh: Kesalahan kustom yang diidentifikasi
    return res.status(statusCode).json({
      status: 'error',
      message: 'Terjadi kesalahan kustom',
      details: err.details,  // Informasi tambahan untuk kesalahan kustom
    });
  }

  // Kode default untuk menangani kesalahan lainnya
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = {
  handleErrors,
};
