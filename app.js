let currentLocation = {
    city: '',
    barangay: '',
    latitude: null,
    longitude: null
};

let currentTab = 'police';
let favorites = JSON.parse(localStorage.getItem('emergencyFavorites')) || [];
let allHotlines = [];

const locationData = {
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

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

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
    
    // Load initial hotlines
    loadHotlines();
}

// Location Functions
function populateCitySelect() {
    const citySelect = document.getElementById('citySelect');
    locationData.cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

function updateBarangaySelect() {
    const cityId = document.getElementById('citySelect').value;
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

function showManualLocationForm() {
    document.getElementById('manualLocationForm').classList.remove('hidden');
}

function confirmManualLocation() {
    const cityId = document.getElementById('citySelect').value;
    const barangay = document.getElementById('barangaySelect').value;
    
    if (!cityId) {
        alert('Please select a city');
        return;
    }
    
    currentLocation.city = cityId;
    currentLocation.barangay = barangay || 'all';
    
    const cityName = locationData.cities.find(c => c.id === cityId).name;
    const locationText = barangay ? `${cityName}, ${barangay}` : cityName;
    
    updateLocationDisplay(locationText);
    document.getElementById('manualLocationForm').classList.add('hidden');
    loadHotlines();
}

function updateLocationDisplay(text) {
    document.getElementById('currentLocationDisplay').classList.remove('hidden');
    document.getElementById('locationText').textContent = text;
}

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

// Load and Display Hotlines
function loadHotlines() {
    let filteredHotlines;
    
    if (currentTab === 'favorites') {
        filteredHotlines = allHotlines.filter(h => favorites.includes(h.id));
    } else {
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
                return false;
            });
        }
    }
    
    displayHotlines(filteredHotlines);
}

function displayHotlines(hotlines) {
    const container = document.getElementById('hotlinesContainer');
    
    if (hotlines.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No hotlines found</h3>
                <p>${currentTab === 'favorites' ? 'You haven\'t added any favorites yet' : 'Try selecting a different location or category'}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = hotlines.map(hotline => createHotlineCard(hotline)).join('');
    
    // Add event listeners
    container.querySelectorAll('.btn-call').forEach(btn => {
        btn.addEventListener('click', function() {
            callNumber(this.dataset.phone);
        });
    });
    
    container.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleFavorite(parseInt(this.dataset.id));
        });
    });
}

function createHotlineCard(hotline) {
    const isFavorite = favorites.includes(hotline.id);
    const locationText = hotline.barangay !== 'all' ? hotline.barangay : 
                        hotline.city === 'national' ? 'National' : 
                        locationData.cities.find(c => c.id === hotline.city)?.name || 'Local';
    
    return `
        <div class="hotline-card">
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

// Call Function (One-Tap Call)
function callNumber(phoneNumber) {
    // Clean the phone number
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
    
    // Initiate call
    window.location.href = `tel:${cleanNumber}`;
}

// Favorites Management
function toggleFavorite(hotlineId) {
    const index = favorites.indexOf(hotlineId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(hotlineId);
    }
    
    // Save to localStorage
    localStorage.setItem('emergencyFavorites', JSON.stringify(favorites));
    
    // Reload hotlines
    loadHotlines();
}

// Search Functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        loadHotlines();
        return;
    }
    
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
