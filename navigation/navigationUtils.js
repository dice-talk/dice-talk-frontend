/**
 * 네비게이션 영역 간 이동을 위한 유틸리티 함수들
 */

/**
 * 인증 영역으로 이동
 * @param {object} navigation - 네비게이션 객체
 * @param {string} screen - 이동할 화면 이름
 * @param {object} params - 전달할 파라미터 (선택사항)
 */
export const navigateToAuth = (navigation, screen, params) => {
  navigation.navigate('Auth', { screen, params });
};

/**
 * 메인 영역으로 이동
 * @param {object} navigation - 네비게이션 객체
 * @param {string} screen - 이동할 화면 이름
 * @param {object} params - 전달할 파라미터 (선택사항)
 */
export const navigateToMain = (navigation, screen, params) => {
  navigation.navigate('Main', { screen, params });
};

/**
 * 채팅 영역으로 이동
 * @param {object} navigation - 네비게이션 객체
 * @param {string} screen - 이동할 화면 이름
 * @param {object} params - 전달할 파라미터 (선택사항)
 */
export const navigateToChat = (navigation, screen, params) => {
  navigation.navigate('ChatTab', { screen, params });
};

/**
 * 마이페이지 영역으로 이동
 * @param {object} navigation - 네비게이션 객체
 * @param {string} screen - 이동할 화면 이름
 * @param {object} params - 전달할 파라미터 (선택사항)
 */
export const navigateToMyPage = (navigation, screen, params) => {
  navigation.navigate('MyPageTab', { screen, params });
};

/**
 * 로그인 후 메인 화면으로 이동
 * @param {object} navigation - 네비게이션 객체
 */
export const navigateAfterLogin = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Main', params: { screen: 'Home' } }],
  });
};

/**
 * 로그아웃 후 로그인 화면으로 이동
 * @param {object} navigation - 네비게이션 객체
 */
export const navigateAfterLogout = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Auth', params: { screen: 'LendingPage' } }],
  });
}; 