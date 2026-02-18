// ===== simple state =====
let userLocation = {
let currentLocation = {
    city: '',
    barangay: '',
    lat: null,
    lng: null
    latitude: null,
    longitude: null
};

let activeCategory = 'police';
let favoriteIds = JSON.parse(localStorage.getItem('emergencyFavorites')) || [];
let hotlineCache = []; // TODO: replace with API later
let currentTab = 'police';
let favorites = JSON.parse(localStorage.getItem('emergencyFavorites')) || [];
let allHotlines = [];

// ===== location data =====
const locationInfo = {
const locationData = {
    cities: [
        { id: 'mabalacat', name: 'Mabalacat City' },
        { id: 'angeles', name: 'Angeles City' },
@@ -26,236 +24,449 @@ const locationInfo = {
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
const hotlinesDatabase = [
//police & Security category
    {
        id: 1,
        name: 'PNP Emergency Hotline',
        category: 'police',
        phone: '911',
        description: 'National Police Emergency Hotline',
        city: 'national',
        barangay: 'all'
    },
    {
        id: 2,
        name: 'Mabalacat Police Station',
        category: 'police',
        phone: '09485524384',
        description: 'Mabalacat City Police Station',
        city: 'mabalacat',
        barangay: 'all'
    },
    {
        id: 3,
        name: 'Angeles City Police',
        category: 'police',
        phone: '(045) 888-3333',
        description: 'Angeles City Police Station',
        city: 'angeles',
        barangay: 'all'
    },
    {
        id: 4,
        name: 'Barangay Tanod - Dau',
        category: 'police',
        phone: '(045) 458-5678',
        description: 'Barangay Security Officers',
        city: 'mabalacat',
        barangay: 'Dau'
    },
    
    // Medical & Health
    {
        id: 5,
        name: 'Emergency Medical Services',
        category: 'medical',
        phone: '911',
        description: 'National Emergency Medical Services',
        city: 'national',
        barangay: 'all'
    },
    {
        id: 6,
        name: 'Mabalacat City Health Office',
        category: 'medical',
        phone: '(045) 458-2222',
        description: 'City Health Office Emergency',
        city: 'mabalacat',
        barangay: 'all'
    },
    {
        id: 7,
        name: 'Angeles University Foundation Medical Center',
        category: 'medical',
        phone: '(045) 888-4444',
        description: 'Hospital Emergency Room',
        city: 'angeles',
        barangay: 'all'
    },
    {
        id: 8,
        name: 'Red Cross Pampanga',
        category: 'medical',
        phone: '(045) 961-2294',
        description: 'Emergency Medical Response',
        city: 'san_fernando',
        barangay: 'all'
    },
    {
        id: 9,
        name: 'Barangay Health Center - Dau',
        category: 'medical',
        phone: '(045) 458-3456',
        description: 'Barangay Health Services',
        city: 'mabalacat',
        barangay: 'Dau'
    },
    
    // Fire & Rescue
    {
        id: 10,
        name: 'Bureau of Fire Protection',
        category: 'fire',
        phone: '911',
        description: 'National Fire Emergency',
        city: 'national',
        barangay: 'all'
    },
    {
        id: 11,
        name: 'Mabalacat Fire Station',
        category: 'fire',
        phone: '(045) 458-3333',
        description: 'City Fire Department',
        city: 'mabalacat',
        barangay: 'all'
    },
    {
        id: 12,
        name: 'Angeles City Fire Department',
        category: 'fire',
        phone: '(045) 888-2222',
        description: 'Fire and Rescue Services',
        city: 'angeles',
        barangay: 'all'
    },
    {
        id: 13,
        name: 'BFP San Fernando',
        category: 'fire',
        phone: '(045) 961-2345',
        description: 'Fire Protection Bureau',
        city: 'san_fernando',
        barangay: 'all'
    },
    
    // Disaster & Safety
    {
        id: 14,
        name: 'NDRRMC Hotline',
        category: 'disaster',
        phone: '911-1406',
        description: 'National Disaster Risk Reduction',
        city: 'national',
        barangay: 'all'
    },
    {
        id: 15,
        name: 'Mabalacat DRRMO',
        category: 'disaster',
        phone: '(045) 458-4444',
        description: 'Disaster Risk Reduction Management',
        city: 'mabalacat',
        barangay: 'all'
    },
    {
        id: 16,
        name: 'PAGASA Weather Updates',
        category: 'disaster',
        phone: '(02) 8284-0800',
        description: 'Weather Information and Warnings',
        city: 'national',
        barangay: 'all'
    },
    {
        id: 17,
        name: 'Angeles City DRRM',
        category: 'disaster',
        phone: '(045) 888-5555',
        description: 'Disaster Response Management',
        city: 'angeles',
        barangay: 'all'
    },
    {
        id: 18,
        name: 'Barangay Emergency Response - Dau',
        category: 'disaster',
        phone: '(045) 458-6789',
        description: 'Local Disaster Response Team',
        city: 'mabalacat',
        barangay: 'Dau'
    }
];

    document.getElementById('searchInput')
        .addEventListener('input', runSearch);
// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.tab;
            document.querySelectorAll('.tab-button')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            refreshHotlines();
function initializeApp() {
    allHotlines = [...hotlinesDatabase];
    
    // Populate location dropdowns
    populateCitySelect();
    
    // Event Listeners
    document.getElementById('useCurrentLocation').addEventListener('click', requestCurrentLocation);
    document.getElementById('useManualLocation').addEventListener('click', showManualLocationForm);
    document.getElementById('citySelect').addEventListener('change', updateBarangaySelect);
    document.getElementById('confirmLocation').addEventListener('click', confirmManualLocation);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Tab switching
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    refreshHotlines();
    
    // Load initial hotlines
    loadHotlines();
}

// ===== location logic =====
function loadCityOptions() {
// Location Functions
function populateCitySelect() {
    const citySelect = document.getElementById('citySelect');

    locationInfo.cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.id;
        opt.textContent = city.name;
        citySelect.appendChild(opt);
    locationData.cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

function populateBarangays() {
function updateBarangaySelect() {
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
    const barangaySelect = document.getElementById('barangaySelect');
    
    // Clear existing options
    barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
    
    if (cityId && locationData.barangays[cityId]) {
        locationData.barangays[cityId].forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            barangaySelect.appendChild(option);
        });
    }
}

function getUserLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation not supported.');
        return;
function requestCurrentLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                currentLocation.latitude = position.coords.latitude;
                currentLocation.longitude = position.coords.longitude;
                
                currentLocation.city = 'mabalacat';
                currentLocation.barangay = 'all';
                
                updateLocationDisplay('Mabalacat City (Current Location)');
                loadHotlines();
            },
            function(error) {
                alert('Unable to get your location. Please select manually.');
                showManualLocationForm();
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please select manually.');
        showManualLocationForm();
    }
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
function showManualLocationForm() {
    document.getElementById('manualLocationForm').classList.remove('hidden');
}

function saveManualLocation() {
function confirmManualLocation() {
    const cityId = document.getElementById('citySelect').value;
    const barangay = document.getElementById('barangaySelect').value;

    
    if (!cityId) {
        alert('City is required.');
        alert('Please select a city');
        return;
    }

    userLocation.city = cityId;
    userLocation.barangay = barangay || 'all';

    const cityName = locationInfo.cities.find(c => c.id === cityId)?.name;
    const text = barangay ? ${cityName}, ${barangay} : cityName;

    updateLocationUI(text);
    
    currentLocation.city = cityId;
    currentLocation.barangay = barangay || 'all';
    
    const cityName = locationData.cities.find(c => c.id === cityId).name;
    const locationText = barangay ? `${cityName}, ${barangay}` : cityName;
    
    updateLocationDisplay(locationText);
    document.getElementById('manualLocationForm').classList.add('hidden');

    refreshHotlines();
    loadHotlines();
}

function updateLocationUI(text) {
    const box = document.getElementById('currentLocationDisplay');
    box.classList.remove('hidden');
function updateLocationDisplay(text) {
    document.getElementById('currentLocationDisplay').classList.remove('hidden');
    document.getElementById('locationText').textContent = text;
}

// ===== filtering logic =====
function refreshHotlines() {
    let results = [];
// Tab Switching
function switchTab(tabName) {
    currentTab = tabName;
    
// Update active tab button
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
// Load hotlines for this tab
    loadHotlines();
}

    if (activeCategory === 'favorites') {
        results = hotlineCache.filter(h => favoriteIds.includes(h.id));
// Load and Display Hotlines
function loadHotlines() {
    let filteredHotlines;
    
    if (currentTab === 'favorites') {
        filteredHotlines = allHotlines.filter(h => favorites.includes(h.id));
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
        filteredHotlines = allHotlines.filter(h => h.category === currentTab);
        
        // Filter by location if set
        if (currentLocation.city) {
            filteredHotlines = filteredHotlines.filter(h => {
                // Show national hotlines and city-specific hotlines
                if (h.city === 'national' || h.city === currentLocation.city) {
                    // If barangay is specified, also filter by barangay
                    if (currentLocation.barangay !== 'all') {
                        return h.barangay === 'all' || h.barangay === currentLocation.barangay;
                    }
                    return true;
                }

                return true;
                return false;
            });
        }
    }

    renderHotlines(results);
    
    displayHotlines(filteredHotlines);
}

// ===== render UI =====
function renderHotlines(list) {
function displayHotlines(hotlines) {
    const container = document.getElementById('hotlinesContainer');

    if (!list.length) {
    
    if (hotlines.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No hotlines available</h3>
                <p>Try another category or location.</p>
                <i class="fas fa-search"></i>
                <h3>No hotlines found</h3>
                <p>${currentTab === 'favorites' ? 'You haven\'t added any favorites yet' : 'Try selecting a different location or category'}</p>
            </div>
        `;
        return;
    }

    let html = '';
    list.forEach(item => {
        html += createCard(item);
    });

    container.innerHTML = html;

    
    container.innerHTML = hotlines.map(hotline => createHotlineCard(hotline)).join('');
    
    // Add event listeners
    container.querySelectorAll('.btn-call').forEach(btn => {
        btn.addEventListener('click', () => callHotline(btn.dataset.phone));
        btn.addEventListener('click', function() {
            callNumber(this.dataset.phone);
        });
    });

    
    container.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', () => toggleFavorite(parseInt(btn.dataset.id)));
        btn.addEventListener('click', function() {
            toggleFavorite(parseInt(this.dataset.id));
        });
    });
}

function createCard(h) {
    const isFav = favoriteIds.includes(h.id);

function createHotlineCard(hotline) {
    const isFavorite = favorites.includes(hotline.id);
    const locationText = hotline.barangay !== 'all' ? hotline.barangay : 
                        hotline.city === 'national' ? 'National' : 
                        locationData.cities.find(c => c.id === hotline.city)?.name || 'Local';
    
    return `
        <div class="hotline-card">
            <h4>${h.name}</h4>
            <p>${h.description}</p>
            <div>${h.phone}</div>
            <div class="hotline-header">
                <div>
                    <h4>${hotline.name}</h4>
                    <div class="location-badge">
                        <i class="fas fa-map-marker-alt"></i>
                        ${locationText}
                    </div>
                </div>
            </div>
            <p class="description">${hotline.description}</p>
            <div class="phone-number">
                <i class="fas fa-phone"></i>
                ${hotline.phone}
            </div>
            <div class="hotline-actions">
                <button class="btn-call" data-phone="${h.phone}">Call</button>
                <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${h.id}">
                    ★
                <button class="btn-call" data-phone="${hotline.phone}">
                    <i class="fas fa-phone-alt"></i>
                    Call Now
                </button>
                <button class="btn-favorite ${isFavorite ? 'active' : ''}" data-id="${hotline.id}">
                    <i class="fas fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

// ===== actions =====
function callHotline(num) {
    const cleaned = num.replace(/[^0-9+]/g, '');
    window.location.href = tel:${cleaned};
// Call Function (One-Tap Call)
function callNumber(phoneNumber) {
    // Clean the phone number
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
    
    // Initiate call
    window.location.href = `tel:${cleanNumber}`;
}

function toggleFavorite(id) {
    const index = favoriteIds.indexOf(id);

    if (index >= 0) {
        favoriteIds.splice(index, 1);
// Favorites Management
function toggleFavorite(hotlineId) {
    const index = favorites.indexOf(hotlineId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favoriteIds.push(id);
        favorites.push(hotlineId);
    }

    localStorage.setItem('emergencyFavorites', JSON.stringify(favoriteIds));
    refreshHotlines();
    
    // Save to localStorage
    localStorage.setItem('emergencyFavorites', JSON.stringify(favorites));
    
    // Reload hotlines
    loadHotlines();
}

// ===== search =====
function runSearch(e) {
    const term = e.target.value.toLowerCase().trim();

    if (!term) {
        refreshHotlines();
// Search Functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        loadHotlines();
        return;
    }

    let matches = hotlineCache.filter(h =>
        h.name.toLowerCase().includes(term) ||
        h.description.toLowerCase().includes(term)
    );

    renderHotlines(matches);
    
    // Search across all categories
    let searchResults = allHotlines.filter(h => {
        return h.name.toLowerCase().includes(searchTerm) ||
               h.description.toLowerCase().includes(searchTerm) ||
               h.category.toLowerCase().includes(searchTerm);
    });
    
    // Apply location filter if set
    if (currentLocation.city) {
        searchResults = searchResults.filter(h => {
            if (h.city === 'national' || h.city === currentLocation.city) {
                if (currentLocation.barangay !== 'all') {
                    return h.barangay === 'all' || h.barangay === currentLocation.barangay;
                }
                return true;
            }
            return false;
        });
    }
    
    displayHotlines(searchResults);
}
