// Detta är testkod för att vi snabbt ska kunna få igång API när det är klart från be-gruppen. När vi vet vad alla endpoints är och ahr testat dem kan denna fil ersättas eller korrigeras.


export interface User {
    uuid: string;
    firstname: string;
    lastname: string;
    saldo: number;
    github?: string;
    url?: string;
    stamps: string[];
  }
  
  export interface Transaction {
    seller: string;
    buyer: string;
    amount: number;
    stamp: string;
  }
  


  export const API_BASE_URL = 'https://yrgobanken.vip/api/test'; 

  // GET-funktion för att hämta meddelande
  export const getMessage = async (): Promise<any> => {
    try {
      console.log('Hämtar meddelande från API');
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('API-svar statuskod:', response.status);
      
      if (!response.ok) {
        console.log('API-fel, statuskod:', response.status);
        throw new Error(`Hämtning misslyckades: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API-svar data:', data);
      return data;
    } catch (error) {
      console.error('Fel vid hämtning:', error);
      throw error;
    }
  };

  export const verifyUser = async (startcode: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startcode, password }),
    });
    
    if (!response.ok) {
      throw new Error('Verifiering misslyckades');
    }
    
    return await response.json();
  };

  export const getUser = async (userId: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('Kunde inte hämta användardata');
    }
    
    return await response.json();
  };
  
  export const makePaymentGetStamp = async (
    sellerId: string, 
    buyerId: string, 
    amount: number, 
    stamp: string
  ): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seller: sellerId,
        buyer: buyerId,
        amount,
        stamp,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Betalning misslyckades');
    }
    
    return await response.json();
  };
  

  export const payoutWinnings = async (
    sellerId: string, 
    buyerId: string, 
    amount: number
  ): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seller: sellerId,
        buyer: buyerId,
        amount,
        stamp: '', 
      }),
    });
    
    if (!response.ok) {
      throw new Error('Utbetalning misslyckades');
    }
    
    return await response.json();
  };