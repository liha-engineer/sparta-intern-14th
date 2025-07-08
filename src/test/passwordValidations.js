// 2~8자 한글, 영대소문자, 숫자, 키보드위 숫자 특수문자
export const isValidPassword = (value) => {
    const password = (value || '');
    if (password.length < 2 || password.length > 8) {
        return false;
    } else if (password.includes(' ')) {
        return false;
    } if (/^[A-Za-z0-9!@#$%^&*()_+]+$/.test(username)) {
        return false;
    }
    return true;
}
