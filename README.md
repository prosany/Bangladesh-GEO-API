# 🇧🇩 Bangladesh GEO Public API

The Bangladesh GEO Public API provides hierarchical administrative and postal information for Bangladesh.  
It allows developers and users to retrieve **Divisions → Districts → Upazilas → Post Offices**.  

This API is useful for:
- Location selection (dropdowns in forms)
- Address validation for e-commerce & delivery
- Mapping & educational platforms
- Filtering data by location in dashboards

---

## 🚀 Base URL
https://bangladesh-geo-api.mahabubsany.com/api/v1

---

## 📌 Endpoints (Public)

### 🔹 Divisions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/divisions` | Get all divisions |
| GET | `/divisions/:id` | Get a specific division by ID |

---

### 🔹 Districts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/districts` | Get all districts |
| GET | `/districts/:id` | Get a specific district by ID |
| GET | `/districts/by-division/:division_id` | Get all districts under a specific division |

---

### 🔹 Upazilas
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/upazilas` | Get all upazilas |
| GET | `/upazilas/by-district/:district_id` | Get all upazilas under a specific district |

---

### 🔹 Post Offices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/postoffices` | Get all post offices |
| GET | `/postoffices/by-division-district?division_id=&district_id=` | Get post offices by division & district |
| GET | `/postoffices/by-upazila-name/:upazilaName` | Get post offices under a specific upazila (by name) |
