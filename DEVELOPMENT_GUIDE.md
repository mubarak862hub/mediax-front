# 📚 دليل تطوير MediaX

## 🎯 نظرة عامة على البنية

### هيكل الملفات

```
ui-design/
├── 📄 HTML Pages
│   ├── index.html          - الصفحة الرئيسية
│   ├── login.html          - تسجيل الدخول
│   ├── register.html       - إنشاء حساب
│   └── details.html        - تفاصيل المحتوى
│
├── 🎨 CSS Styles
│   ├── style.css           - الأنماط الرئيسية والمتغيرات
│   ├── auth.css            - أنماط صفحات المصادقة
│   └── details.css         - أنماط صفحة التفاصيل
│
├── ⚡ JavaScript
│   ├── main.js             - الوظائف الرئيسية
│   ├── auth.js             - وظائف المصادقة
│   └── details.js          - وظائف صفحة التفاصيل
│
└── 🖼️ Assets
    └── images/             - الصور والأيقونات
```

## 🎨 نظام التصميم

### المتغيرات الأساسية

```css
/* الألوان */
--primary-color: #e50914
--secondary-color: #0ea5e9
--accent-color: #f59e0b

/* المسافات */
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem

/* الحواف */
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px

/* الظلال */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.3)
--shadow-md: 0 4px 6px rgba(0,0,0,0.4)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.5)
```

### مكونات التصميم

#### 1. الأزرار (Buttons)

```html
<!-- زر رئيسي -->
<button class="btn btn-primary">
    <svg>...</svg>
    نص الزر
</button>

<!-- زر ثانوي -->
<button class="btn btn-secondary">نص الزر</button>

<!-- زر أيقونة -->
<button class="btn btn-icon">
    <svg>...</svg>
</button>
```

#### 2. البطاقات (Cards)

```html
<div class="content-card">
    <div class="card-image">
        <img src="..." alt="...">
        <div class="card-overlay">
            <button class="play-btn">...</button>
        </div>
    </div>
    <div class="card-info">
        <h4 class="card-title">العنوان</h4>
        <div class="card-meta">...</div>
    </div>
</div>
```

#### 3. النماذج (Forms)

```html
<div class="form-group">
    <label for="input" class="form-label">
        <svg>...</svg>
        التسمية
    </label>
    <input type="text" id="input" class="form-input" placeholder="...">
</div>
```

## 🔧 الوظائف الرئيسية

### 1. البحث

```javascript
// فتح نافذة البحث
window.MediaX.openSearch();

// إغلاق نافذة البحث
window.MediaX.closeSearch();
```

### 2. الإشعارات

```javascript
// عرض إشعار
window.MediaX.showNotification('الرسالة', 'success');
// الأنواع: success, error, info
```

### 3. السلايدر

```javascript
// التمرير في السلايدر
window.MediaX.scrollSlider(container, 'left');
// الاتجاهات: left, right
```

## 📱 التصميم المتجاوب

### نقاط التوقف (Breakpoints)

```css
/* موبايل صغير */
@media (max-width: 480px) { }

/* موبايل */
@media (max-width: 768px) { }

/* تابلت */
@media (max-width: 992px) { }

/* كمبيوتر */
@media (max-width: 1200px) { }
```

### أفضل الممارسات

1. **استخدم Grid و Flexbox**
   ```css
   .container {
       display: grid;
       grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
       gap: var(--spacing-lg);
   }
   ```

2. **الصور المتجاوبة**
   ```css
   img {
       max-width: 100%;
       height: auto;
   }
   ```

3. **النصوص المتجاوبة**
   ```css
   h1 {
       font-size: clamp(2rem, 5vw, 4rem);
   }
   ```

## 🎭 التأثيرات والحركات

### 1. التأثيرات الانتقالية

```css
.element {
    transition: all var(--transition-normal);
}

.element:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
}
```

### 2. الحركات (Animations)

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.element {
    animation: fadeIn 0.6s ease-out;
}
```

## 🔐 الأمان

### التحقق من المدخلات

```javascript
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}
```

### معالجة الأخطاء

```javascript
try {
    // الكود
} catch (error) {
    console.error('Error:', error);
    showNotification('حدث خطأ', 'error');
}
```

## 🚀 التحسينات

### 1. تحميل الصور التدريجي

```html
<img data-src="image.jpg" alt="..." class="lazy">
```

```javascript
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
        }
    });
});
```

### 2. Debounce و Throttle

```javascript
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

## 📊 اختبار الأداء

### أدوات الاختبار

1. **Lighthouse** (Chrome DevTools)
   - الأداء
   - إمكانية الوصول
   - أفضل الممارسات
   - SEO

2. **PageSpeed Insights**
   - سرعة التحميل
   - تجربة المستخدم
   - التحسينات المقترحة

### مقاييس الأداء

- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 3.5s
- **CLS** (Cumulative Layout Shift): < 0.1

## 🐛 تصحيح الأخطاء

### Console Logging

```javascript
console.log('Info:', data);
console.warn('Warning:', message);
console.error('Error:', error);
console.table(arrayData);
```

### Debugging في المتصفح

1. افتح DevTools (F12)
2. استخدم Breakpoints
3. راقب Network Requests
4. تحقق من Console Errors

## 📝 التوثيق

### تعليقات الكود

```javascript
/**
 * وصف الوظيفة
 * @param {string} param1 - وصف المعامل
 * @param {number} param2 - وصف المعامل
 * @returns {boolean} - وصف القيمة المرجعة
 */
function myFunction(param1, param2) {
    // الكود
}
```

### JSDoc للتوثيق التلقائي

```javascript
/**
 * @typedef {Object} User
 * @property {string} name - اسم المستخدم
 * @property {string} email - البريد الإلكتروني
 * @property {number} age - العمر
 */
```

## 🔄 التحديثات المستقبلية

### المرحلة 1: Backend Integration
- [ ] ربط مع Laravel API
- [ ] نظام المصادقة الحقيقي
- [ ] قاعدة البيانات

### المرحلة 2: ميزات متقدمة
- [ ] مشغل فيديو
- [ ] نظام الدفع
- [ ] لوحة التحكم الإدارية

### المرحلة 3: تطبيقات الموبايل
- [ ] React Native App
- [ ] iOS App
- [ ] Android App

## 💡 نصائح وحيل

### 1. استخدام CSS Variables

```css
:root {
    --primary: #e50914;
}

.element {
    background: var(--primary);
}

/* تغيير ديناميكي */
document.documentElement.style.setProperty('--primary', '#new-color');
```

### 2. Local Storage

```javascript
// حفظ
localStorage.setItem('key', 'value');

// قراءة
const value = localStorage.getItem('key');

// حذف
localStorage.removeItem('key');
```

### 3. Event Delegation

```javascript
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
        // معالجة النقر
    }
});
```

## 📞 الدعم والمساعدة

### الموارد المفيدة

- [MDN Web Docs](https://developer.mozilla.org)
- [CSS-Tricks](https://css-tricks.com)
- [Can I Use](https://caniuse.com)
- [W3C Validator](https://validator.w3.org)

### المجتمع

- [Stack Overflow](https://stackoverflow.com)
- [GitHub Discussions](https://github.com/discussions)
- [Discord Community](#)

---

<div align="center">
  <p>تم إنشاؤه بـ ❤️ للمطورين العرب</p>
  <p>© 2024 MediaX Development Team</p>
</div>
