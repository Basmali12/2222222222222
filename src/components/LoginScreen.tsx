import React, { useState } from 'react';
import { LionLogo } from './LionLogo';
import { ArrowRight, Check } from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (userData: { name: string; phone: string; role: string }) => void;
  onContinueGuest: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onLoginSuccess,
  onContinueGuest,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [identifier, setIdentifier] = useState('fan@alrajaa.iq');
  const [name, setName] = useState('علي الكرخي');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: authMode === 'register' ? (name || 'مشجع رجاوي') : 'علي الكرخي',
        phone: identifier.includes('@') ? '+964 770 123 4567' : identifier,
        role: 'عضو ذهبي',
      });
    }, 450);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const providerNames = {
        google: 'Google',
        facebook: 'Facebook',
        apple: 'Apple ID',
      };
      onLoginSuccess({
        name: `مشجع عبر ${providerNames[provider]}`,
        phone: '+964 770 888 9900',
        role: 'مشجع رجاوي',
      });
    }, 400);
  };

  return (
    <div
      id="login-screen"
      className="w-full h-full flex flex-col justify-between p-6 overflow-y-auto fade-in-screen relative"
      style={{
        backgroundColor: '#070d1a',
        backgroundImage: 'radial-gradient(circle at center 20%, #17274a 0%, #070d1a 65%)',
        color: 'var(--text-white)',
      }}
    >
      {/* Top action bar */}
      <div className="flex items-center justify-between w-full mb-2">
        <button
          onClick={onBack}
          type="button"
          aria-label="الرجوع"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onContinueGuest}
          type="button"
          className="text-xs text-[#8c96aa] hover:text-white font-bold transition-colors px-2 py-1"
        >
          تخطي كزائر
        </button>
      </div>

      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center my-auto">
        {/* Login Header (الكليشة 2) */}
        <div className="login-header text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#e30613]/25 blur-xl rounded-full"></div>
              <LionLogo size={68} className="relative z-10" />
            </div>
          </div>
          <h2 className="login-title text-[24px] font-extrabold text-white">الرجاء العراقي</h2>
          <p className="login-subtitle text-[14px] text-[#8c96aa] mt-1 font-semibold">
            نادي الرجاء العراقي
          </p>
        </div>

        {/* Auth Toggle (الكليشة 2) */}
        <div className="auth-toggle flex bg-[#121c2e] rounded-full p-1 mb-6 border border-white/5">
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`auth-toggle-btn flex-1 py-2.5 text-center text-[13px] font-bold rounded-full transition-all cursor-pointer ${
              authMode === 'register'
                ? 'active bg-[#1a2744] text-white shadow-[0_4px_10px_rgba(0,0,0,0.3)]'
                : 'text-[#8c96aa] hover:text-white'
            }`}
          >
            إنشاء حساب
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`auth-toggle-btn flex-1 py-2.5 text-center text-[13px] font-bold rounded-full transition-all cursor-pointer ${
              authMode === 'login'
                ? 'active bg-[#1a2744] text-white shadow-[0_4px_10px_rgba(0,0,0,0.3)]'
                : 'text-[#8c96aa] hover:text-white'
            }`}
          >
            تسجيل الدخول
          </button>
        </div>

        {/* Login / Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div className="input-group relative">
              <i className="fa-regular fa-id-card input-icon right absolute right-5 top-1/2 -translate-y-1/2 text-[#8c96aa] text-[15px]"></i>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
                className="input-field w-full bg-[#121c2e] border border-white/10 rounded-[20px] py-4 pr-12 pl-4 text-white text-[14px] outline-none placeholder:text-[#8c96aa] focus:border-white/30 transition-all"
              />
            </div>
          )}

          {/* Identifier Input */}
          <div className="input-group relative">
            <i className="fa-regular fa-user input-icon right absolute right-5 top-1/2 -translate-y-1/2 text-[#8c96aa] text-[15px]"></i>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="البريد الإلكتروني أو رقم الهاتف"
              className="input-field w-full bg-[#121c2e] border border-white/10 rounded-[20px] py-4 pr-12 pl-4 text-white text-[14px] outline-none placeholder:text-[#8c96aa] focus:border-white/30 transition-all text-right"
            />
          </div>

          {/* Password Input */}
          <div className="input-group relative">
            <i className="fa-solid fa-lock input-icon right absolute right-5 top-1/2 -translate-y-1/2 text-[#8c96aa] text-[15px]"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="input-field w-full bg-[#121c2e] border border-white/10 rounded-[20px] py-4 pr-12 pl-12 text-white text-[14px] outline-none placeholder:text-[#8c96aa] focus:border-white/30 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              className="input-icon left absolute left-5 top-1/2 -translate-y-1/2 text-[#8c96aa] hover:text-white text-[15px] cursor-pointer"
            >
              {showPassword ? (
                <i className="fa-regular fa-eye"></i>
              ) : (
                <i className="fa-regular fa-eye-slash"></i>
              )}
            </button>
          </div>

          {/* Options: Remember Me & Forgot Password */}
          <div className="login-options flex justify-between items-center text-[13px] pt-1 pb-1">
            <label className="remember-me flex items-center gap-2 text-[#8c96aa] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-[13px] text-[#8c96aa]">تذكرني</span>
            </label>
            <button
              type="button"
              onClick={() => setForgotModalOpen(true)}
              className="forgot-password text-[#8c96aa] hover:text-white transition-colors text-[13px]"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full bg-[#e30613] hover:bg-[#c40510] text-white py-4 rounded-[30px] font-bold text-[16px] cursor-pointer transition-all active:scale-[0.98] shadow-[0_4px_15px_rgba(227,6,19,0.35)] flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>{authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}</span>
            )}
          </button>
        </form>

        {/* Social Login Section (الكليشة 2) */}
        <div className="social-login-section mt-7 text-center">
          <div className="social-divider relative text-[13px] text-[#8c96aa] mb-5 flex items-center justify-center">
            <div className="flex-1 h-[1px] bg-white/10 ml-3"></div>
            <span>تسجيل الدخول عبر</span>
            <div className="flex-1 h-[1px] bg-white/10 mr-3"></div>
          </div>

          <div className="social-buttons flex justify-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="social-btn google w-[52px] h-[52px] bg-white rounded-[18px] flex items-center justify-center text-[22px] text-[#DB4437] shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="تسجيل الدخول بواسطة Google"
            >
              <i className="fa-brands fa-google"></i>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="social-btn facebook w-[52px] h-[52px] bg-white rounded-[18px] flex items-center justify-center text-[22px] text-[#1877F2] shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="تسجيل الدخول بواسطة Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="social-btn apple w-[52px] h-[52px] bg-white rounded-[18px] flex items-center justify-center text-[22px] text-black shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="تسجيل الدخول بواسطة Apple"
            >
              <i className="fa-brands fa-apple"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Terms Text */}
      <p className="terms-text text-center text-[11px] text-[#8c96aa] mt-4">
        بالدخول أنت توافق على الشروط والسياسة
      </p>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121c2e] border border-white/10 rounded-2xl p-6 max-w-xs w-full text-center">
            <div className="w-12 h-12 rounded-full bg-[#e30613]/20 text-[#e30613] flex items-center justify-center mx-auto mb-3">
              <i className="fa-solid fa-key text-lg"></i>
            </div>
            <h3 className="font-extrabold text-base text-white mb-1">استعادة كلمة المرور</h3>
            <p className="text-xs text-[#8c96aa] mb-4">
              أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لإعادة تعيين كلمة المرور فوراً.
            </p>

            {forgotSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-400 font-semibold mb-4 flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>تم إرسال رابط التعيين بنجاح!</span>
              </div>
            ) : (
              <div className="mb-4">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#070d1a] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-[#8c96aa] focus:outline-none focus:border-[#e30613]"
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(false);
                  setForgotSubmitted(false);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-[#8c96aa] bg-white/5 hover:bg-white/10"
              >
                إغلاق
              </button>
              {!forgotSubmitted && (
                <button
                  type="button"
                  onClick={() => setForgotSubmitted(true)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-[#e30613] hover:bg-[#c40510]"
                >
                  إرسال
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
