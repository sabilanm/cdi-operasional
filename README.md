# Aturan Pengembangan Frontend React

Dokumentasi ini menjelaskan struktur folder dan aturan pengembangan frontend menggunakan React pada project ini.

---

## Project Structure

```
.
src/
├─ components/              # Reusable UI components
│  ├─ InputText.jsx
│  ├─ InputRadio.jsx
│  └─ ...
│
├─ features/                # Feature-based modules (modular & scalable)
│  └─ user/                 # Contoh fitur: User Management (CRUD)
│     ├─ ui/                # Layer tampilan (komponen spesifik fitur)
│     │  ├─ UserList.jsx
│     │  ├─ UserForm.jsx
│     │  └─ UserDetail.jsx
│     │
│     ├─ services/          # API calls dan logic khusus fitur user
│     │  ├─ userService.js  # Contoh: getUsers(), createUser(), updateUser()
│     │  └─ userValidation.js
│     │
│     ├─ models/            # Entity / type / data structure
│     │  └─ userModel.js
│     │
│     └─ hooks/             # (opsional) Hook khusus fitur user
│        └─ useUserForm.js
│
├─ pages/                   # Route-level components
│  ├─ DashboardPage.jsx
│  └─ UserPage.jsx
│
├─ api/                     # Centralized API client / base URL / interceptors
│  └─ axiosInstance.js
│
├─ hooks/                   # Global reusable hooks
│  ├─ useFetch.js
│  └─ useDebounce.js
│
├─ utils/                   # Helper / formatter / converter
│  ├─ formatDate.js
│  └─ calculateAge.js
│
├─ types/                   # Global type definitions (optional)
│  └─ userTypes.js
│
├─ constants/               # Constant values, enums, config
│  └─ roles.js
│
└─ assets/                  # Static assets (images, icons, fonts)
   └─ logo.svg
```


## Example

```
.
features/auth/
├─ ui/           # Komponen spesifik tampilan: Login.jsx
├─ hooks/        # Hook khusus: useLoginForm.js
├─ services/     # API call / logic: authService.js
└─ css/          # CSS khusus untuk auth (Login.css)

features/dashboard/
├─ ui/           # Komponen utama Dashboard.jsx
├─ services/     # fetch dashboard data
├─ hooks/        # useDashboardData, dsb
└─ components/   # Komponen kecil: DashboardList.jsx, Cards, Table, dsb

```

---
## Pedoman Pengembangan
### 1. Komponen
- Simpan semua **UI yang reusable** di folder `components/`.
- Penamaan file gunakan **PascalCase** untuk React components.
- Komponen harus **stateless** jika memungkinkan, menerima data lewat `props`.

### 2. Features
- Setiap fitur ditempatkan di folder `features/<FeatureName>/`.
- Pisahkan `ui/`, `services/`, dan `models/` untuk memisahkan:
  - UI presentation
  - Logic / API / use case
  - Entitas data
- React component **tidak langsung memanggil API**; gunakan service/use case.

### 3. Pages
- Folder `pages/` berisi halaman yang di-route.
- Halaman sebaiknya hanya mengatur layout dan menggabungkan feature components.

### 4. API
- Semua endpoint API didefinisikan di folder `api/`.
- Gunakan `axios` instance atau service centralized untuk header, token, baseURL.

### 5. Hooks
- Buat custom hook untuk reusable logic stateful.
- Contoh: `usePagination`, `useDebounce`, `useChatService`.

### 6. Utils
- Fungsi helper umum (format date, validations, constants) diletakkan di folder `utils/`.
- Jangan letakkan logic spesifik fitur di sini.

---

## Best Practices

- Gunakan **feature-based foldering** untuk kemudahan scaling.
- Ikuti prinsip **Clean Architecture**:
  - UI (React) hanya presentation
  - Logic dan API dipisahkan di service/use case
  - Entities / Models untuk mendefinisikan tipe data
- Gunakan **PascalCase** untuk component dan **camelCase** untuk fungsi/variable.
- Selalu hapus console.log sebelum merge PR.
- Gunakan ESLint + Prettier untuk konsistensi kode.
