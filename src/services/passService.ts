
interface PassData {
  code: string;
  purchaseDate: string;
  expiryDate: string;
  remainingUses: number;
  discount: number;
}

class PassService {
  private static instance: PassService;
  private readonly STORAGE_KEY = 'khelmanchPass';
  
  private constructor() {}
  
  public static getInstance(): PassService {
    if (!PassService.instance) {
      PassService.instance = new PassService();
    }
    return PassService.instance;
  }
  
  public purchasePass(paymentId: string): PassData {
    // Generate a unique coupon code
    const code = `KMP-${this.generateRandomCode(6)}`;
    
    // Set expiry date to 90 days from now
    const purchaseDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 90);
    
    const passData: PassData = {
      code,
      purchaseDate: purchaseDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      remainingUses: 3,
      discount: 15
    };
    
    // Store in localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(passData));
    
    return passData;
  }
  
  public getActivePass(): PassData | null {
    const passData = localStorage.getItem(this.STORAGE_KEY);
    if (!passData) return null;
    
    const pass = JSON.parse(passData) as PassData;
    
    // Check if pass is still valid
    if (new Date(pass.expiryDate) < new Date() || pass.remainingUses <= 0) {
      // Pass has expired or all uses consumed
      return null;
    }
    
    return pass;
  }
  
  public consumePass(): boolean {
    const pass = this.getActivePass();
    if (!pass) return false;
    
    // Reduce remaining uses
    pass.remainingUses -= 1;
    
    // Update storage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pass));
    
    return true;
  }
  
  public getDiscountAmount(originalAmount: number): number {
    const pass = this.getActivePass();
    if (!pass) return 0;
    
    return Math.round((originalAmount * pass.discount) / 100);
  }
  
  public hasActivePass(): boolean {
    return this.getActivePass() !== null;
  }
  
  private generateRandomCode(length: number): string {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

export const passService = PassService.getInstance();
