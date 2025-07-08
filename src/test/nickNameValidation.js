// 2~8자 한글, 영대소문자, 숫자
export const isValidNickname = async (value) => {
    const nickname = (value || '');
    if (nickname.length < 2 || nickname.length > 8) {
        return false;
    } else if (nickname.includes(' ')) {
        return false;
    } if (/^[A-Za-z0-9]+$/.test(nickname)) {
        return false;
    }
    return true;
}
