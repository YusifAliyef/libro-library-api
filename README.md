# 📚 Libro Library Management API

Bu layihə, müasir kitabxana idarəetmə sisteminin backend infrastrukturunu təmin etmək üçün **Node.js**, **Express**, **TypeScript** və **TypeORM** (PostgreSQL) texnologiyaları istifadə edilərək yaradılmışdır. Layihə tam **Qatlı Arxitektura (Layered Architecture)** və Clean Code prinsiplərinə uyğun dizayn edilmişdir.

---

## 🏗️ Arxitektura Quruluşu

Layihə məlumatların təhlükəsizliyini, kodun oxunurluğunu və test edilə bilməsini təmin etmək üçün 3 əsas qata bölünmüşdür:
1. **Routing & Controllers (İdarəetmə Qatı):** HTTP sorğularını qəbul edir, validasiyadan keçirir və müvafiq servisə ötürür.
2. **Services (Biznes Məntiqi Qatı):** Layihənin bütün əsas biznes qaydaları və məntiqləri bu qatda icra olunur.
3. **Repositories & Entities (Məlumat Qatı):** TypeORM vasitəsilə PostgreSQL verilənlər bazası ilə birbaşa əlaqəni idarə edir.

> 💡 **Mühüm Qeyd (StackOverflowError Önliyi):** Entity-lərin birbaşa API cavabı kimi qaytarılmasının qarşısını almaq və dövri əlaqələrdə (Bidirectional Relationships) yaranan sonsuz rekursiya problemini həll etmək üçün tam **DTO (Data Transfer Object)** strukturu tətbiq edilmişdir.

---

## 🛠️ Texnologiya Steki

* **Dil:** TypeScript
* **Çərçivə (Framework):** Express.js
* **ORM:** TypeORM
* **Verilənlər Bazası:** PostgreSQL
* **Validasiya:** class-validator & class-transformer
* **Test Platforması:** Jest & ts-jest
* **Sənədləşmə:** Swagger UI & OpenAPI 3.0

---

## 🚀 Quraşdırma və İşə Salma Bələdçisi

### 1. Layihəni Klonlayın
İlk öncə repozitoriyanı yerli mühitinizə yükləyin:
```bash
git clone [https://github.com/istifadeci_adin/libro-library-api.git](https://github.com/istifadeci_adin/libro-library-api.git)
cd libro-library-api