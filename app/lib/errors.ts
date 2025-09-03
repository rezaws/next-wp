interface ErrorMap {
  [statusCode: number]: string
}

export const httpErrorMessages: ErrorMap = {
  400: 'درخواست نامعتبر بود 🛠️',
  401: 'رمز عبور اشتباه است 😔',
  403: 'اجازه‌ی این کار رو نداری 🧱',
  404: 'منبع پیدا نشد 👀',
  409: 'این نام کاربری یا ایمیل قبلاً سلطنت شده 👤',
  500: 'خطای سرور. بعداً دوباره امتحان کن 🔧',
}

interface WPErrorCodeMap {
  [code: string]: string
}

export const wpErrorMessages: WPErrorCodeMap = {
  incorrect_password: 'رمز عبور اشتباهه. دوباره تلاش کن 🔑',
  invalid_username: 'نام کاربری پیدا نشد 😕',
  empty_username: 'نام کاربری نمی‌تونه خالی باشه 📭',
  empty_password: 'رمز عبور الزامی‌ه 🔐',
  jwt_auth: 'توکن معتبر نیست یا منقضی شده 💣',
}
