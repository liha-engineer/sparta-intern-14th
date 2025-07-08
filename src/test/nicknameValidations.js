// 6~20자 영대소문자, 특수문자
export const isValidNickname = (value) => {
    const nickname = (value || '');
    if (nickname.length < 6 || nickname.length > 20) {
        return false;
    } else if (nickname.includes(' ')) {
        return false;
    }
    return true;
}