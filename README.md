# 🌿 Fordeer Coffee - Web Shop

<p align="center">
  <img src="public/logo.png" alt="Fordeer Coffee Logo" width="200"/>
</p>

<p align="center">
  <strong>Website bán hàng trực tuyến cho chuỗi cửa hàng cà phê Fordeer Coffee</strong>
</p>

<p align="center">
  <a href="https://fordeer-shop.vercel.app">🌐 Live Demo</a> •
  <a href="#-tính-năng">Tính năng</a> •
  <a href="#-cài-đặt">Cài đặt</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

---

## 📸 Screenshots

<table>
  <tr>
    <td><img src="public/banner-home.png" alt="Home Page"/></td>
  </tr>
</table>

---

## ✨ Tính năng

### 🏠 Trang chủ

- Banner slider tự động với hiệu ứng chuyển cảnh mượt mà
- Marquee banner chạy chữ thông báo khuyến mãi
- Sản phẩm nổi bật theo danh mục (Cà phê, Trà sữa, Trà, Nước ép, Latte)
- Carousel sản phẩm với auto-slide và drag-to-scroll
- Section "Chuyện Nhà" giới thiệu thương hiệu
- Tìm cửa hàng gần nhất
- Tin tức mới nhất

### 🛒 Giỏ hàng & Thanh toán

- Thêm/xóa sản phẩm với chọn size (Nhỏ, Vừa, Lớn)
- Cập nhật số lượng realtime
- **Mã giảm giá demo:**
  | Mã | Giảm giá | Mô tả |
  |---|---|---|
  | `nguoingheo` | 50% | Giảm 50% cho người nghèo |
  | `noelvuive` | 25% | Giảm 25% mừng Noel |
  | `fordeer10` | 10% | Giảm 10% thành viên |
  | `freeship` | 30.000đ | Miễn phí ship |
  | `tet2025` | 20% | Giảm 20% mừng Tết |
- Miễn phí vận chuyển đơn từ 200.000đ
- Thanh toán: COD, SePay, Chuyển khoản ngân hàng

### 👤 Tài khoản khách hàng

- Đăng ký/Đăng nhập với Email hoặc Google (Firebase Auth)
- Quên mật khẩu & Reset password qua email
- Quản lý thông tin cá nhân
- Xem lịch sử đơn hàng
- Theo dõi trạng thái đơn hàng

### 📦 Đặt hàng

- Xem menu theo danh mục
- Tìm kiếm sản phẩm
- Chi tiết sản phẩm với modal popup
- Chọn size và thêm vào giỏ

### 📍 Cửa hàng

- Danh sách cửa hàng
- Tìm cửa hàng theo quận/huyện
- Thông tin địa chỉ, giờ mở cửa

### 📰 Tin tức & Tuyển dụng

- Bài viết tin tức mới nhất
- Thông tin tuyển dụng
- Quyền lợi nhân viên

### 🎨 UI/UX

- Responsive design (Mobile, Tablet, Desktop)
- Scroll animations với Intersection Observer
- Loading skeletons
- Toast notifications
- Smooth page transitions

---

## 🛠️ Tech Stack

| Công nghệ                                                                            | Mô tả          |
| ------------------------------------------------------------------------------------ | -------------- |
| ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)                    | UI Library     |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)      | Type Safety    |
| ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)                        | Build Tool     |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)   | Styling        |
| ![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)         | Authentication |
| ![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter) | Routing        |
| ![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-161618)                 | UI Components  |
| ![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565)                          | Icons          |

---

## 📦 Cài đặt

### Yêu cầu

- Node.js >= 18
- npm hoặc yarn

### Các bước

```bash
# 1. Clone repository
git clone https://github.com/your-username/fordeer-shop.git
cd fordeer-shop

# 2. Cài đặt dependencies
npm install

# 3. Tạo file môi trường
cp .env.example .env

# 4. Cấu hình .env (xem bên dưới)

# 5. Chạy development server
npm run dev

# 6. Mở trình duyệt
# http://localhost:5173
```

### Build production

```bash
npm run build
npm run preview
```

---

## ⚙️ Cấu hình môi trường

Tạo file `.env` tại thư mục gốc:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Lấy Firebase credentials

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào Project Settings > General > Your apps
4. Chọn Web app và copy config

---

## 📁 Cấu trúc thư mục

```
fordeer-shop/
├── public/                 # Static assets
│   ├── logo.png
│   ├── banner.png
│   └── ...
├── src/
│   ├── components/         # Shared components
│   │   ├── header.tsx      # Navigation header
│   │   ├── footer.tsx      # Footer
│   │   ├── scroll-to-top.tsx
│   │   └── ui/             # UI primitives (Button, Input, ...)
│   ├── pages/              # Page components
│   │   ├── home-page/      # Trang chủ
│   │   │   ├── hero.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-categories.tsx
│   │   │   ├── store-locator.tsx
│   │   │   └── news-section.tsx
│   │   ├── order-page/     # Menu đặt hàng
│   │   ├── cart-page/      # Giỏ hàng
│   │   ├── checkout-page/  # Thanh toán
│   │   ├── auth-page/      # Đăng nhập/Đăng ký
│   │   ├── orders-page/    # Lịch sử đơn hàng
│   │   ├── about-page/     # Giới thiệu
│   │   ├── news-page/      # Tin tức
│   │   ├── stores-page/    # Cửa hàng
│   │   └── recruitment-page/ # Tuyển dụng
│   ├── services/           # API services
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   ├── cartService.ts
│   │   ├── orderService.ts
│   │   └── sepayService.ts
│   ├── hooks/              # Custom hooks
│   │   └── use-scroll-animation.ts
│   ├── config/             # Configuration
│   │   └── firebase.ts
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── .env.example
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Import project vào [Vercel](https://vercel.com)
3. Cấu hình Environment Variables
4. Deploy!

### Netlify

```bash
npm run build
# Upload thư mục dist/ lên Netlify
```

---

## 🔗 Liên kết dự án

| Dự án            | Mô tả             | Link                              |
| ---------------- | ----------------- | --------------------------------- |
| **Fordeer Shop** | Web bán hàng      | [README](./README.md)             |
| **Fordeer App**  | Dashboard quản lý | [README](./foorder-app/README.md) |
| **LTW Backend**  | REST API          | [README](./ltw_backend/README.md) |

---

## 👥 Tác giả

- **Nguyen Hung** - _Developer_

---

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.
