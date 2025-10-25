# 🛒 Online Store
Online Store is an e-commerce platform for professional cleaning products and equipment.

🔗Live Demo: [online-store.bendyukov.de](http://online-store.bendyukov.de/)

🎨 Figma Prototype: [View on Figma](https://www.figma.com/design/gYx8nWKpOlOYX3OVhDHNk0/PROFF-CLEAN-MARKET)


## ✨ Key Features
The project was designed as a full-stack online store featuring:
- Responsive, minimalist UI/UX
- Product catalog with tree-structured categories, filters, and detail page
- User authentication and authorization with JWT
- Shopping cart and checkout process
- REST API built with Django REST Framework
- PostgreSQL database with relational models
- Frontend built with React, TypeScript, and Redux Toolkit
- Integration with payment and shipping APIs
- Persistent cart data in LocalStorage
- Deployment using Nginx, Gunicorn, and GitHub Actions


## 🚀 Quick Start
```
# 1. Clone repository
git clone https://github.com/arseniybendyukov/online-store.git
cd online-store

# 2. Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd project/project
cp .env.example .env # fill your own settings
cd ..
python manage.py migrate app && python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# 3. Frontend setup
cd ../../frontend
npm install
cp .env.example .env # fill your own settings
npm run dev
```


## 📁 Project Structure
```
online-store/
│
├── backend/
│   ├── venv/                     # Python virtual environment
│   ├── project/
│   │   ├── project/
│   │   │   ├── .env              # Backend environment variables
│   │   │   └── ...
│   │   ├── manage.py
│   │   └── ...
│   ├── requirements.txt          # Backend dependencies
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page-level components (routes)
│   │   ├── redux/                # State management setup
│   │   └── ...
│   ├── ...
│   └── .env                      # Frontend environment variables
│
└── README.md
```


## 📄 Pages
- Catalog
- Product detail (with reviews, "similar", and “bought together” sections)
- Cart (checkout)
- Authentication (login, registration, email verification)
- Profile (orders, info, saved products, reviews)
- Homepage
- About / Contact us / How to buy
- Blog & Blog detail
- Admin panel


## 🛠 Technologies
**Frontend**:
  - TypeScript, React, Redux Toolkit
  - CSS Modules, Formik, Swiper, React Toastify

**Backend**:
  - Django, Django REST Framework, PostgreSQL

**Deployment**:
  - Nginx, Gunicorn, VPS hosting
  - CI/CD with GitHub Actions

## 🧑‍💻 Author
**Arseniy Bendyukov**  
GitHub: https://github.com/arseniybendyukov
