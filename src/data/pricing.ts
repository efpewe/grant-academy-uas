export const pricingData = [
  {
    id: 1,
    title: 'Basic',
    price: 'Gratis',
    duration: 'Selamanya',
    features: ['Akses kursus gratis', 'Sertifikat (bayar)', 'Forum komunitas', '-'],
    isFeatured: false,
    buttonText: 'Mulai Gratis'
  },
  {
    id: 2,
    title: 'Pro',
    price: 'Rp 150.000',
    duration: 'per bulan',
    features: ['Akses semua kursus', 'Semua sertifikat', 'Forum komunitas', 'Mentoring 1-on-1 (Add-on)'],
    isFeatured: true, // Ini yang akan mentrigger style Best Seller
    buttonText: 'Pilih Pro'
  },
  {
    id: 3,
    title: 'Lifetime',
    price: 'Rp 1.500.000',
    duration: 'Sekali Bayar',
    features: ['Akses semua kursus selamanya', 'Semua sertifikat (gratis)', 'Forum prioritas', 'Semua update materi mendatang'],
    isFeatured: false,
    buttonText: 'Ambil Penawaran'
  }
]