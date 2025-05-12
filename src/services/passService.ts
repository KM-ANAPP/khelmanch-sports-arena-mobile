
export interface PassData {
  code: string;
  purchaseDate: string;
  expiryDate: string;
  remainingUses: number;
  discount: number;
  type: 'basic' | 'standard' | 'premium' | 'ultimate';
  name: string;
}

export interface PassTier {
  id: string;
  name: string;
  uses: number;
  discount: number;
  price: number;
  validity: number; // days
  type: 'basic' | 'standard' | 'premium' | 'ultimate';
}

class PassService {
  private static instance: PassService;
  private readonly STORAGE_KEY = 'khelmanchPass';
  
  public readonly passTiers: PassTier[] = [
    {
      id: 'basic',
      name: 'Basic Pass',
      uses: 3,
      discount: 15,
      price: 29900, // ₹299 in paise
      validity: 90,
      type: 'basic'
    },
    {
      id: 'standard',
      name: 'Standard Pass',
      uses: 5,
      discount: 20,
      price: 49900, // ₹499 in paise
      validity: 120,
      type: 'standard'
    },
    {
      id: 'premium',
      name: 'Premium Pass',
      uses: 7,
      discount: 25,
      price: 69900, // ₹699 in paise
      validity: 150,
      type: 'premium'
    },
    {
      id: 'ultimate',
      name: 'Ultimate Pass',
      uses: 12,
      discount: 30,
      price: 99900, // ₹999 in paise
      validity: 180,
      type: 'ultimate'
    }
  ];
  
  private constructor() {}
  
  public static getInstance(): PassService {
    if (!PassService.instance) {
      PassService.instance = new PassService();
    }
    return PassService.instance;
  }
  
  public purchasePass(paymentId: string, passType: 'basic' | 'standard' | 'premium' | 'ultimate'): PassData {
    // Find the pass tier
    const passTier = this.passTiers.find(tier => tier.type === passType) || this.passTiers[0];
    
    // Generate a unique coupon code
    const code = `KMP-${this.generateRandomCode(6)}`;
    
    // Set expiry date based on validity days
    const purchaseDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + passTier.validity);
    
    const passData: PassData = {
      code,
      purchaseDate: purchaseDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      remainingUses: passTier.uses,
      discount: passTier.discount,
      type: passType,
      name: passTier.name
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
