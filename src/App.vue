<template>
  <div id="app">
    
    <!-- 1. واجهة البداية (تستعمل اللوغو الأول) -->
    <div v-if="currentView === 'welcome'" class="welcome-container">
      <div class="welcome-card">
        <div class="brand-logo-container">
          <img src="./assets/image.png" alt="Maestro Pédagogique Logo" class="app-logo" />
        </div>
        <h1 class="app-title">Maestro Pédagogique</h1>
        <p class="app-description">المنصة الذكية المتطورة للابتكار البيداغوجي وتوجيه المدرسين</p>
        
        <button class="start-btn" @click="goToDashboard">
          <span>ابدأ الآن</span>
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 2. واجهة لوحة التحكم الاحترافية (تستعمل اللوغو الثاني image2.png) -->
    <div v-else class="dashboard-container">
      
      <!-- الشريط العلوي الاحترافي -->
      <header class="top-navbar">
        <!-- الجهة اليمين: اللوغو الثاني واسم التطبيق -->
        <div class="nav-brand">
          <img src="./assets/image2.png" alt="Logo" class="top-logo" />
          <span class="top-app-name">Maestro Pédagogique</span>
        </div>

        <!-- الجهة اليسار: معلومات الأستاذ وزر الإعدادات -->
        <div class="nav-actions">
          <div class="user-badge">
            <span class="user-avatar">👨‍🏫</span>
            <span class="user-name">الأستاذ(ة)</span>
          </div>

          <div class="settings-dropdown-container">
            <button class="settings-btn" @click="toggleSettings">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span>{{ currentLang === 'ar' ? 'الإعدادات' : 'Settings' }}</span>
            </button>

            <!-- قائمة إعدادات اللغة -->
            <div v-if="showSettingsMenu" class="language-menu">
              <p class="menu-title">اختر اللغة / Langue</p>
              <button class="lang-option" @click="changeLanguage('ar')">🇲🇦 العربية</button>
              <button class="lang-option" @click="changeLanguage('fr')">🇫🇷 Français</button>
            </div>
          </div>
        </div>
      </header>

      <!-- محتوى لوحة التحكم الرئيسي -->
      <main class="main-content">
        <div class="content-header">
          <span class="badge-tag">الجيل الجديد للتعليم الذكي</span>
          <h2>منصة الابتكار البيداغوجي</h2>
          <p>أدخل تفاصيل الدرس أدناه لتوليد محتوى تعليمي تفاعلي متقدم</p>
        </div>

        <div class="form-card">
          
          <!-- الخانة الأولى: اسم المادة -->
          <div class="input-group">
            <label>إسم المادة</label>
            <div class="input-wrapper">
              <span class="input-icon">📚</span>
              <input type="text" v-model="subjectName" placeholder="مثال: الرياضيات، الفيزياء، الفلسفة..." />
            </div>
          </div>

          <!-- الخانة الثانية: اسم الدرس -->
          <div class="input-group">
            <label>إسم الدرس</label>
            <div class="input-wrapper">
              <span class="input-icon">📝</span>
              <input type="text" v-model="lessonName" placeholder="مثال: الدوال العددية، المتتاليات..." />
            </div>
          </div>

          <!-- الخانة الثالثة: المستوى التعليمي -->
          <div class="input-group">
            <label>المستوى التعليمي</label>
            <div class="input-wrapper">
              <span class="input-icon">🎓</span>
              <input type="text" v-model="educationLevel" placeholder="مثال: الأولى باكالوريا علوم، الجذع المشترك..." />
            </div>
          </div>

          <!-- زر إنشاء الدرس -->
          <button class="create-lesson-btn" @click="createInteractiveLesson">
            <span>أنشئ درسك التفاعلي الآن</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>

        </div>
      </main>

    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentView: 'welcome',
      showSettingsMenu: false,
      subjectName: '',
      lessonName: '',
      educationLevel: '',
      currentLang: 'ar'
    }
  },
  methods: {
    goToDashboard() {
      this.currentView = 'dashboard';
    },
    toggleSettings() {
      this.showSettingsMenu = !this.showSettingsMenu;
    },
    changeLanguage(lang) {
      this.currentLang = lang;
      this.showSettingsMenu = false;
    },
    createInteractiveLesson() {
      if (!this.subjectName || !this.lessonName || !this.educationLevel) {
        alert("المرجو ملء جميع الخانات لإنشاء الدرس!");
        return;
      }
      alert("تم البدء في إنشاء الدرس التفاعلي بنجاح!");
    }
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  direction: rtl;
  background-color: #f8fafc;
}

.welcome-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.welcome-card {
  background-color: #ffffff;
  padding: 50px 40px;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  text-align: center;
  max-width: 440px;
  width: 100%;
  border: 1px solid #e2e8f0;
}

.brand-logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.app-logo {
  width: 150px;
  height: auto;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.app-title {
  font-size: 2rem;
  color: #0f172a;
  margin-bottom: 12px;
  font-weight: 700;
}

.app-description {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 35px;
  line-height: 1.6;
}

.start-btn {
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 15px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 14px rgba(30, 58, 138, 0.35);
}

.start-btn:hover {
  background-color: #1e40af;
  transform: translateY(-2px);
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.top-navbar {
  background-color: #0b1329;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 35px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 15px;
}

.top-logo {
  width: 50px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(255, 255, 255, 0.2));
}

.top-app-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f8fafc;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #172038;
  padding: 6px 14px;
  border-radius: 30px;
  border: 1px solid #263353;
}

.user-avatar {
  font-size: 1.1rem;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f8fafc;
}

.settings-dropdown-container {
  position: relative;
}

.settings-btn {
  background: #172038;
  color: #cbd5e1;
  border: 1px solid #263353;
  padding: 9px 16px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.settings-btn:hover {
  background: #223055;
  color: white;
}

.language-menu {
  position: absolute;
  top: 45px;
  left: 0;
  width: 180px;
  background: #172038;
  border: 1px solid #2e3b5e;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.menu-title {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 8px;
  text-align: center;
}

.lang-option {
  background: transparent;
  color: white;
  border: none;
  width: 100%;
  padding: 8px;
  text-align: right;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.lang-option:hover {
  background: #2563eb;
}

.main-content {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-header {
  text-align: center;
  margin-bottom: 35px;
}

.badge-tag {
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 12px;
}

.content-header h2 {
  font-size: 2rem;
  color: #0f172a;
  margin-bottom: 8px;
  font-weight: 700;
}

.content-header p {
  color: #64748b;
  font-size: 1rem;
}

.form-card {
  background: white;
  padding: 45px 40px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
  width: 100%;
  max-width: 580px;
  border: 1px solid #e2e8f0;
}

.input-group {
  margin-bottom: 22px;
}

.input-group label {
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: 14px;
  font-size: 1.1rem;
}

.input-group input {
  width: 100%;
  padding: 14px 45px 14px 16px;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  color: #0f172a;
}

.input-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  background-color: white;
}

.create-lesson-btn {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border: none;
  width: 100%;
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  margin-top: 15px;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
}

.create-lesson-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.45);
}
</style>