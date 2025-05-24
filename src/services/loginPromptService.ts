
class LoginPromptService {
  private static instance: LoginPromptService;
  
  private constructor() {}

  public static getInstance(): LoginPromptService {
    if (!LoginPromptService.instance) {
      LoginPromptService.instance = new LoginPromptService();
    }
    return LoginPromptService.instance;
  }

  public shouldShowLoginPrompt(route: string, isAuthenticated: boolean): boolean {
    // Only show login prompt on checkout page if user is not authenticated
    if (route === '/checkout' && !isAuthenticated) {
      return true;
    }
    return false;
  }

  public markLoginPromptShown(): void {
    sessionStorage.setItem('loginPromptShown', 'true');
  }

  public hasLoginPromptBeenShown(): boolean {
    return sessionStorage.getItem('loginPromptShown') === 'true';
  }

  public clearLoginPromptStatus(): void {
    sessionStorage.removeItem('loginPromptShown');
  }
}

export default LoginPromptService.getInstance();
