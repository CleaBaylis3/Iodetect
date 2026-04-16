# Iodetect
Iodetect is a portable point-of-care iodine screening system designed to measure urinary iodine levels in low-resource settings. This project includes the coding for the Arduino and ESP32 microcontrollers that control the device, collect and process sensor data, and transmit results wirelessly. The ESP32 sends recorded data to Firebase, where it is securely stored in the cloud. A web-based database is currently being developed to retrieve and display this data for tracking, analysis, and research purposes, supporting the goal of creating an accessible, low-cost solution for iodine deficiency screening.

# Iodetect Web Dashboard

## Overview

The Iodetect Web Dashboard is a browser-based interface for monitoring iodine concentration readings collected from the Iodetect diagnostic device.

The goal of the dashboard is to help clinicians, researchers, and public health teams:

* Monitor iodine levels across users and geographic regions
* View real-time and historical reading trends
* Identify areas with potential iodine deficiency or excess
* Filter and explore readings by country, status, gender, and user information
* Visualize geographic distribution through an interactive world map

This dashboard is currently built using mock data for proof-of-concept purposes. Firebase integration and live device uploads can be connected later.

---

## Current Features

### Authentication

* Firebase Authentication login page
* Protected dashboard route
* Logout functionality

### Dashboard Summary Metrics

Top-level metric cards include:

* Total readings
* Average iodine concentration
* Number of users
* Number of countries represented

These metrics automatically update based on the currently applied filters.

### Filters

Users can filter dashboard data by:

* Country
* Iodine status (Low / Normal / High)
* Gender
* Search term (city, country, or user ID)

A reset button is also included to quickly clear all filters.

### Country Insights

When a country is selected, the dashboard displays:

* Average iodine level for that country
* Number of readings
* Number of unique users
* Status breakdown (Low / Normal / High)

This helps support geographic trend analysis and public health monitoring.

### Interactive Map

The dashboard includes an interactive Leaflet world map with:

* Clustered markers
* Color-coded status markers

  * Red = Low
  * Yellow = Normal
  * Green = High
* Clickable popups for each reading
* Automatic map fitting based on filtered results

### Recent Readings Table

The dashboard includes a table of the most recent readings showing:

* Date
* Location
* User age
* User gender
* Status
* Iodine concentration

The table automatically updates based on the active filters.

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Mapping

* Leaflet
* React Leaflet
* React Leaflet Cluster

### Authentication

* Firebase Authentication

### Data Source

* Mock TypeScript data objects for proof of concept
* Planned Firebase Realtime Database integration

---

## Project Structure

```text
app/
└── web-dashboard/
    ├── public/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── lib/
    │   ├── types/
    │   └── ...
    ├── package.json
    └── README.md
```

Key folders:

* `src/app` → page routes and layout
* `src/components` → reusable UI components
* `src/lib` → Firebase config and mock data
* `src/types` → shared TypeScript types
* `public` → static assets such as logos and icons

---

## Running the Dashboard Locally

### 1. Clone the repository

```bash
git clone https://github.com/CleaBaylis3/Iodetect.git
cd Iodetect/app/web-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app

Open:

```text
http://localhost:3000
```

---

## Future Improvements

Potential next steps for the dashboard include:

* Firebase Realtime Database integration
* Historical trend graphs and analytics
* Country heatmap visualization
* Pagination or expandable data table
* Additional clinician/public health insights

---

## Status

This dashboard is currently a functional proof of concept. It demonstrates the planned architecture, user flow, filtering system, authentication flow, and geographic visualization strategy for the Iodetect platform.
