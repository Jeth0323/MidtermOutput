<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fastline</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<!--Header section-->
<body>
    <header class="header">
        <div class="container">
            <div class="logo">
                <i class="fas fa-phone-volume"></i>
                <h1>Fastline</h1>
            </div>
        </div>
    </header>
    <section class="hero">
        <div class="container">
            <h2>Emergency Numbers at Your Fingertips</h2>
            <p>Quick access to local emergency services</p>
        </div>
    </section>

    <section class="location-section">
        <div class="container">
            <div class="location-card">
                <h3><i class="fas fa-map-marker-alt"></i> Select Your Location</h3>
                <div class="location-buttons">
                    <button id="useCurrentLocation" class="btn btn-primary">
                        <i class="fas fa-crosshairs"></i> Use Current Location
                    </button>
                    <button id="useManualLocation" class="btn btn-secondary">
                        <i class="fas fa-edit"></i> Select Manually
                    </button>
                </div>
                
                <div id="manualLocationForm" class="manual-location hidden">
                    <select id="citySelect" class="form-control">
                        <option value="">Select City</option>
                    </select>
                    <select id="barangaySelect" class="form-control">
                        <option value="">Select Barangay</option>
                    </select>
                    <button id="confirmLocation" class="btn btn-primary">Confirm Location</button>
                </div>

                <div id="currentLocationDisplay" class="current-location hidden">
                    <p><strong>Current Location:</strong> <span id="locationText">Not set</span></p>
                </div>
            </div>
        </div>
    </section>

    <section class="search-section">
        <div class="container">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="searchInput" placeholder="Search for emergency services (e.g., police, ambulance, fire)">
            </div>
        </div>
    </section>

    <section class="categories-section">
        <div class="container">
            <div class="tabs">
                <button class="tab-button active" data-tab="police">
                    <i class="fas fa-shield-alt"></i>
                    <span>Police & Security</span>
                </button>
                <button class="tab-button" data-tab="medical">
                    <i class="fas fa-ambulance"></i>
                    <span>Medical & Health</span>
                </button>
                <button class="tab-button" data-tab="fire">
                    <i class="fas fa-fire-extinguisher"></i>
                    <span>Fire & Rescue</span>
                </button>
                <button class="tab-button" data-tab="disaster">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Disaster & Safety</span>
                </button>
                <button class="tab-button" data-tab="favorites">
                    <i class="fas fa-star"></i>
                    <span>Favorites</span>
                </button>
            </div>

            <div id="hotlinesContainer" class="hotlines-container">
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 Fastline | All numbers verified and updated</p>
            <div class="contributors">
                <p><strong>Contributors:</strong></p>
                <ul>
                    <li>Justine Carl C. Tolentino - Emergency Hotline Directory</li>
                    <li>Al Francis S. Cabrera - Location-Based Hotlines</li>
                    <li>Jose Miguel E. Ayson - Search Feature</li>
                    <li>James Jethro P. Dizon - One-Tap Call Feature</li>
                    <li>Krisanta Armas - Quick Access & Favorites</li>
                </ul>
            </div>
        </div>
    </footer>

    <script src="app.js"></script>
</body>
</html>
