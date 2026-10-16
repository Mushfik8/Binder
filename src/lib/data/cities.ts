// Country → City data for Binder
// Bangladesh has all 64 districts. Other countries have major cities.

export interface CityOption {
  city: string;
  country: string;
  countryCode: string;
}

const bangladeshCities = [
  'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Rangpur', 'Barisal', 'Mymensingh',
  'Comilla', 'Gazipur', 'Narayanganj', 'Tongi', 'Bogra', 'Cox\'s Bazar', 'Dinajpur', 'Faridpur',
  'Jessore', 'Kushtia', 'Brahmanbaria', 'Tangail', 'Narsingdi', 'Savar', 'Nawabganj', 'Habiganj',
  'Moulvibazar', 'Sunamganj', 'Netrokona', 'Kishoreganj', 'Chandpur', 'Lakshmipur', 'Noakhali',
  'Feni', 'Rangamati', 'Khagrachhari', 'Bandarban', 'Patuakhali', 'Jhalokati', 'Pirojpur',
  'Barguna', 'Satkhira', 'Bagerhat', 'Narail', 'Magura', 'Meherpur', 'Chuadanga', 'Jhenaidah',
  'Pabna', 'Sirajganj', 'Natore', 'Naogaon', 'Chapainawabganj', 'Joypurhat', 'Gaibandha',
  'Kurigram', 'Nilphamari', 'Lalmonirhat', 'Thakurgaon', 'Panchagarh', 'Sherpur', 'Jamalpur',
  'Manikganj', 'Munshiganj', 'Gopalganj', 'Madaripur', 'Shariatpur', 'Rajbari',
];

const countryCities: Record<string, { code: string; cities: string[] }> = {
  'Bangladesh': { code: 'BD', cities: bangladeshCities },
  'India': {
    code: 'IN',
    cities: [
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
      'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Vadodara',
      'Goa', 'Surat', 'Coimbatore', 'Kochi', 'Chandigarh', 'Guwahati', 'Agartala',
    ],
  },
  'Pakistan': {
    code: 'PK',
    cities: [
      'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Multan',
      'Quetta', 'Sialkot', 'Hyderabad',
    ],
  },
  'Nepal': {
    code: 'NP',
    cities: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Bharatpur', 'Birgunj'],
  },
  'Sri Lanka': {
    code: 'LK',
    cities: ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Trincomalee'],
  },
  'Myanmar': {
    code: 'MM',
    cities: ['Yangon', 'Mandalay', 'Naypyidaw', 'Mawlamyine'],
  },
  'Malaysia': {
    code: 'MY',
    cities: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Kota Kinabalu', 'Malacca', 'Ipoh'],
  },
  'Singapore': {
    code: 'SG',
    cities: ['Singapore'],
  },
  'United Arab Emirates': {
    code: 'AE',
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'],
  },
  'Saudi Arabia': {
    code: 'SA',
    cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Dhahran'],
  },
  'Qatar': {
    code: 'QA',
    cities: ['Doha', 'Al Wakrah', 'Al Khor'],
  },
  'Kuwait': {
    code: 'KW',
    cities: ['Kuwait City', 'Hawalli', 'Salmiya'],
  },
  'Bahrain': {
    code: 'BH',
    cities: ['Manama', 'Riffa', 'Muharraq'],
  },
  'Oman': {
    code: 'OM',
    cities: ['Muscat', 'Salalah', 'Sohar'],
  },
  'United Kingdom': {
    code: 'GB',
    cities: ['London', 'Birmingham', 'Manchester', 'Leeds', 'Liverpool', 'Bristol', 'Edinburgh', 'Glasgow'],
  },
  'United States': {
    code: 'US',
    cities: [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Dallas', 'San Francisco', 'Miami',
      'Boston', 'Seattle', 'Atlanta', 'Washington DC', 'Philadelphia',
    ],
  },
  'Canada': {
    code: 'CA',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'],
  },
  'Australia': {
    code: 'AU',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast'],
  },
  'Germany': {
    code: 'DE',
    cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart'],
  },
  'Italy': {
    code: 'IT',
    cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence', 'Venice'],
  },
  'Japan': {
    code: 'JP',
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Sapporo'],
  },
  'South Korea': {
    code: 'KR',
    cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  },
  'Turkey': {
    code: 'TR',
    cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
  },
  'Egypt': {
    code: 'EG',
    cities: ['Cairo', 'Alexandria', 'Giza', 'Luxor'],
  },
  'South Africa': {
    code: 'ZA',
    cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'],
  },
  'Nigeria': {
    code: 'NG',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan'],
  },
  'Thailand': {
    code: 'TH',
    cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya'],
  },
  'Indonesia': {
    code: 'ID',
    cities: ['Jakarta', 'Surabaya', 'Bandung', 'Bali', 'Medan', 'Yogyakarta'],
  },
  'Philippines': {
    code: 'PH',
    cities: ['Manila', 'Cebu', 'Davao', 'Quezon City'],
  },
  'Vietnam': {
    code: 'VN',
    cities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong'],
  },
  'China': {
    code: 'CN',
    cities: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hong Kong'],
  },
  'France': {
    code: 'FR',
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  },
  'Spain': {
    code: 'ES',
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'],
  },
  'Brazil': {
    code: 'BR',
    cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Curitiba'],
  },
  'Mexico': {
    code: 'MX',
    cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Cancún', 'Puebla'],
  },
};

// Country flag emojis
const countryFlags: Record<string, string> = {
  BD: '🇧🇩', IN: '🇮🇳', PK: '🇵🇰', NP: '🇳🇵', LK: '🇱🇰', MM: '🇲🇲',
  MY: '🇲🇾', SG: '🇸🇬', AE: '🇦🇪', SA: '🇸🇦', QA: '🇶🇦', KW: '🇰🇼',
  BH: '🇧🇭', OM: '🇴🇲', GB: '🇬🇧', US: '🇺🇸', CA: '🇨🇦', AU: '🇦🇺',
  DE: '🇩🇪', IT: '🇮🇹', JP: '🇯🇵', KR: '🇰🇷', TR: '🇹🇷', EG: '🇪🇬',
  ZA: '🇿🇦', NG: '🇳🇬', TH: '🇹🇭', ID: '🇮🇩', PH: '🇵🇭', VN: '🇻🇳',
  CN: '🇨🇳', FR: '🇫🇷', ES: '🇪🇸', BR: '🇧🇷', MX: '🇲🇽',
};

export function getCountries(): string[] {
  return Object.keys(countryCities);
}

export function getCitiesForCountry(country: string): string[] {
  return countryCities[country]?.cities || [];
}

export function getCountryCode(country: string): string {
  return countryCities[country]?.code || '';
}

export function getCountryFlag(country: string): string {
  const code = countryCities[country]?.code || '';
  return countryFlags[code] || '🌍';
}

export function searchCities(query: string): CityOption[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: CityOption[] = [];

  for (const [country, data] of Object.entries(countryCities)) {
    for (const city of data.cities) {
      if (city.toLowerCase().includes(q)) {
        results.push({ city, country, countryCode: data.code });
      }
    }
    // Also match country name
    if (country.toLowerCase().includes(q)) {
      for (const city of data.cities.slice(0, 5)) {
        if (!results.find((r) => r.city === city && r.country === country)) {
          results.push({ city, country, countryCode: data.code });
        }
      }
    }
  }

  // Sort: Bangladesh cities first, then alphabetical
  return results
    .sort((a, b) => {
      if (a.countryCode === 'BD' && b.countryCode !== 'BD') return -1;
      if (b.countryCode === 'BD' && a.countryCode !== 'BD') return 1;
      return a.city.localeCompare(b.city);
    })
    .slice(0, 20);
}

export function formatCityCountry(city: string, country: string): string {
  const flag = getCountryFlag(country);
  return `${flag} ${city}, ${country}`;
}
