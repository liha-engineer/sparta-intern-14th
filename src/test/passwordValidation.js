// 6~20자 영대소문자, 특수문자, 숫자키 특수문자
export const isValidPassword = async (value) => {
    const password = (value || '');
    if (password.length < 6 || password.length > 20) {
        return false;
    } else if (password.includes(' ')) {
        return false;
    } else if (/[^A-Za-z0-9!@#$%^&*()_+]/g.test(password)) {
        return false;
    }
    return true;
}