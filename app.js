// ===== simple state =====
let userLocation = {
    city: '',
    barangay: '',
    lat: null,
    lng: null
};

let activeCategory = 'police';
let favoriteIds = JSON.parse(localStorage.getItem('emergencyFavorites')) || [];
let hotlineCache = []; // TODO: replace with API later

// ===== location data =====
const locationInfo = {
    cities: [
        { id: 'mabalacat', name: 'Mabalacat City' },
        { id: 'angeles', name: 'Angeles City' },
        { id: 'san_fernando', name: 'San Fernando' },
        { id: 'mexico', name: 'Mexico' }
    ],
    barangays: {
        mabalacat: ['Atlu-Bola', 'Bundagul', 'Cacutud', 'Dapdap', 'Dau', 'Dolores', 'Duquit', 'Lakandula', 'Mabiga', 'Marcos Village', 'Paralaya', 'San Francisco', 'Sapang Bato', 'Santo Rosario'],
        angeles: ['Balibago', 'Cutcut', 'Pampang', 'Pulung Maragul', 'Santo Cristo', 'Santo Rosario', 'Sapang Bato', 'Salapungan'],
        san_fernando: ['Del Carmen', 'Del Pilar', 'Del Rosario', 'Dolores', 'Juliana', 'Lara', 'Lazatin', 'Maimpis', 'Sindalan'],
        mexico: ['Acli', 'Anao', 'Buenavista', 'Camuning', 'Divisoria', 'Lagundi', 'Masamat', 'Pandacaqui', 'Santo Rosario']
    }
};

// ===== boot app =====
document.addEventListener('DOMContentLoaded', () => {
    startApp();
});

function startApp() {
    hotlineCache = [...hotlinesDatabase];

    loadCityOptions();

    document.getElementById('useCurrentLocation')
        .addEventListener('click', getUserLocation);

    document.getElementById('useManualLocation')
        .addEventListener('click', () => {
            document.getElementById('manualLocationForm').classList.remove('hidden');
        });

    document.getElementById('citySelect')
        .addEventListener('change', populateBarangays);

    document.getElementById('confirmLocation')
        .addEventListener('click', saveManualLocation);

    document.getElementById('searchInput')
        .addEventListener('input', runSearch);

    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.tab;
            document.querySelectorAll('.tab-button')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            refreshHotlines();
        });
    });

    refreshHotlines();
}

// ===== location logic =====
function loadCityOptions() {
    const citySelect = document.getElementById('citySelect');

    locationInfo.cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.id;
        opt.textContent = city.name;
        citySelect.appendChild(opt);
    });
}

function populateBarangays() {
    const cityId = document.getElementById('citySelect').value;
    const brgySelect = document.getElementById('barangaySelect');

    brgySelect.innerHTML = '<option value="">Select Barangay</option>';

    if (!cityId) return;

    const list = locationInfo.barangays[cityId] || [];

    list.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        brgySelect.appendChild(opt);
    });
}

function getUserLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation not supported.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        pos => {
            userLocation.lat = pos.coords.latitude;
            userLocation.lng = pos.coords.longitude;

            // quick default (can improve later)
            userLocation.city = 'mabalacat';
            userLocation.barangay = 'all';

            updateLocationUI('Mabalacat City (Auto)');
            refreshHotlines();
        },
        () => {
            alert('Could not detect location. Please select manually.');
        }
    );
}

function saveManualLocation() {
    const cityId = document.getElementById('citySelect').value;
    const barangay = document.getElementById('barangaySelect').value;

    if (!cityId) {
        alert('City is required.');
        return;
    }

    userLocation.city = cityId;
    userLocation.barangay = barangay || 'all';

    const cityName = locationInfo.cities.find(c => c.id === cityId)?.name;
    const text = barangay ? ${cityName}, ${barangay} : cityName;

    updateLocationUI(text);
    document.getElementById('manualLocationForm').classList.add('hidden');

    refreshHotlines();
}

function updateLocationUI(text) {
    const box = document.getElementById('currentLocationDisplay');
    box.classList.remove('hidden');
    document.getElementById('locationText').textContent = text;
}

// ===== filtering logic =====
function refreshHotlines() {
    let results = [];

    if (activeCategory === 'favorites') {
        results = hotlineCache.filter(h => favoriteIds.includes(h.id));
    } else {
        results = hotlineCache.filter(h => h.category === activeCategory);

        if (userLocation.city) {
            results = results.filter(h => {
                const isNational = h.city === 'national';
                const sameCity = h.city === userLocation.city;

                if (!isNational && !sameCity) return false;

                if (userLocation.barangay !== 'all') {
                    return h.barangay === 'all' ||
                           h.barangay === userLocation.barangay;
                }

                return true;
            });
        }
    }

    renderHotlines(results);
}

// ===== render UI =====
function renderHotlines(list) {
    const container = document.getElementById('hotlinesContainer');

    if (!list.length) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No hotlines available</h3>
                <p>Try another category or location.</p>
            </div>
        `;
        return;
    }

    let html = '';
    list.forEach(item => {
        html += createCard(item);
    });

    container.innerHTML = html;

    container.querySelectorAll('.btn-call').forEach(btn => {
        btn.addEventListener('click', () => callHotline(btn.dataset.phone));
    });

    container.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', () => toggleFavorite(parseInt(btn.dataset.id)));
    });
}

function createCard(h) {
    const isFav = favoriteIds.includes(h.id);

    return `
        <div class="hotline-card">
            <h4>${h.name}</h4>
            <p>${h.description}</p>
            <div>${h.phone}</div>
            <div class="hotline-actions">
                <button class="btn-call" data-phone="${h.phone}">Call</button>
                <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${h.id}">
                    ★
                </button>
            </div>
        </div>
    `;
}

// ===== actions =====
function callHotline(num) {
    const cleaned = num.replace(/[^0-9+]/g, '');
    window.location.href = tel:${cleaned};
}

function toggleFavorite(id) {
    const index = favoriteIds.indexOf(id);

    if (index >= 0) {
        favoriteIds.splice(index, 1);
    } else {
        favoriteIds.push(id);
    }

    localStorage.setItem('emergencyFavorites', JSON.stringify(favoriteIds));
    refreshHotlines();
}

// ===== search =====
function runSearch(e) {
    const term = e.target.value.toLowerCase().trim();

    if (!term) {
        refreshHotlines();
        return;
    }

    let matches = hotlineCache.filter(h =>
        h.name.toLowerCase().includes(term) ||
        h.description.toLowerCase().includes(term)
    );

    renderHotlines(matches);
}
