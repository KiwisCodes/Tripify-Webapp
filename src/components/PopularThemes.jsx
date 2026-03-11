import React from 'react';

const themes = [
    {
        title: 'Tokyo Neon Lights',
        price: '$850',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJWdeZz12iFT1971kHL5V8RpXvwd_gVpKaUtiaa9QceiJOYhVV4QRJF0sOwW7Wjug0_sGfp-XF2FEo5wSqeZYqNwgBMcJBpA0ED3rR_-5mdA8PIWBhorBEYwQ-EkABnqks0kQl2tZ99F7Vog2Oz3ueyWyk3UBQESBHVFqUBAR2OYCnle7FZR-V0nhC1f0SnluXieQnULk_yAFeg9BSe3mWdsuqOkCsbBrpIAxXQbK5MHKmO3dzatigU94_7ATX2ucKEiwwR1E',
        description: 'Experience the futuristic vibes of Japan. Navigate hidden izakayas, neon-drenched streets, and ancient temples in one electric journey.',
        details: ['5 Days', '8 Stops', 'Intense Pace']
    },
    {
        title: 'Tuscan Wine Tasting',
        price: '$1,200',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-riuQs_dVJOqrNOCu_E48iAoQOIlm60DcDBRJIWmLq3QwqBlsGC_w4jAOng_R-ZzdNAAWx4q1KyEoTNBq6NuPX2WJKBWkig9huiQT-z77EGbcjdrrgdYYuAbY5z4xU8KlAZX6FP-39RbRTPB1bdDlvpxwMguutD4ElMJAjoPDNgEoo64eV_3NZeEn-LHpAD9IRHUhuByE1i6X3iQncZiLhyag0ekD1n5z3AUupMRv7wQtBaxm7RLfIy99UvUsxOod59An9do',
        description: 'A rustic journey through Italian vineyards. Savor world-class vintage wines and homemade pasta under the Tuscan sun.',
        details: ['7 Nights', '4 Trails', 'Leisurely Pace']
    },
    {
        title: 'Parisian Romance',
        price: '$950',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjIxb_DHs8qnhIqC7q6fZFiSwK72SDhfAnxr4B__IPrYs7vt24t5EeWZ7lJCf6O3axwcX1P8lQp46Kp0oqhviT34kiCGjj0bXZNwmw6o_muA8_pn5ku49k3zf1M7GC5qjntpkmrEkkwGXzb0NKkPzvybIoa8DggWppBW4Y9_VafBBMStrYMmz3IGynKFA0KqNUaDuY-2LuZfHRUdIckfNRZvV4wEBaE3c35vaodjx0fYJWeNAcK27zqwiFf0sXBPJacQHXwl4',
        description: 'Classic art, cafes, and city strolls. Rediscover the City of Light through its most intimate and artistic neighborhoods.',
        details: ['4 Days', '12 Landmarks', 'Moderate Pace']
    },
    {
        title: 'Bali Secret Surf',
        price: '$650',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChumUNedGb0Z3QcAdV3e_6b_9D8qTl2v-F0WM-FYElWsYmM15DkpL-6a7yYWKaVoOzyRHqA_TsInhwXf3QQ-TdIi5_cmpNkP91cJjUd1CA96ZbrO2moXKPbO3lw-WqD2S0J7aFZJSBoLlzF8mnpbysRbuYB65wcRnR7x9aSagxV6fcYgz86tTx9-ymw6Wzc-synv6eUZDPuKOSUf6RDh5-hxVQpbL4SDvRczP6h4VysR_CUqgMhhfEZx28SRUAw2C1rReiqPM',
        description: 'Find the hidden waves of Indonesia. A tropical escape for those seeking adventure, spiritual growth, and the perfect swell.',
        details: ['10 Days', '6 Secret Spots', 'Active Pace']
    }
];

const PopularThemes = () => {
    return (
        <section className="py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Popular Adventure Themes</h2>
            </div>
            <div className="flex gap-6 overflow-x-auto px-4 md:px-[calc((100vw-80rem)/2)] no-scrollbar scroll-smooth pb-8">
                {themes.map((theme, index) => (
                    <div key={index} className="min-w-[320px] md:min-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden relative group cursor-pointer shrink-0 shadow-lg">
                        <img alt={theme.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={theme.img} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div className="absolute top-6 right-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold border border-white/20">
                            {theme.price}
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-2xl font-bold text-white">{theme.title}</h3>
                            </div>
                            <p className="text-white/80 text-sm mb-4 line-clamp-2 leading-relaxed">{theme.description}</p>
                            <div className="flex items-center gap-3 text-[11px] font-semibold text-white/90 uppercase tracking-wider py-2 px-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                {theme.details.map((detail, idx) => (
                                    <React.Fragment key={idx}>
                                        <span>{detail}</span>
                                        {idx < theme.details.length - 1 && <span className="opacity-30">|</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularThemes;
