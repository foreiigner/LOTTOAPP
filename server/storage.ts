import { 
  users, type User, type InsertUser,
  promotions, type Promotion, type InsertPromotion,
  lotteryTickets, type LotteryTicket, type InsertLotteryTicket
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // Session Store
  sessionStore: session.Store;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getOrCreateDefaultUser(): Promise<User>;
  
  // Promotions
  getPromotions(): Promise<Promotion[]>;
  createPromotion(promotion: InsertPromotion): Promise<Promotion>;
  
  // Lottery Tickets
  getLotteryTickets(): Promise<LotteryTicket[]>;
  getLotteryTicketById(id: number): Promise<LotteryTicket | undefined>;
  getWeeklyTickets(): Promise<LotteryTicket[]>;
  getSavedTickets(): Promise<LotteryTicket[]>;
  createLotteryTicket(ticket: Partial<InsertLotteryTicket>): Promise<LotteryTicket>;
  getTotalWinnings(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private promotions: Map<number, Promotion>;
  private lotteryTickets: Map<number, LotteryTicket>;
  private userIdCounter: number;
  private promotionIdCounter: number;
  private lotteryTicketIdCounter: number;
  public sessionStore: session.Store;
  
  constructor() {
    this.users = new Map();
    this.promotions = new Map();
    this.lotteryTickets = new Map();
    this.userIdCounter = 1;
    this.promotionIdCounter = 1;
    this.lotteryTicketIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with seed data
    this.seedData();
  }
  
  private seedData() {
    // Seed promotions
    const promotionsSeedData: InsertPromotion[] = [
      {
        title: "Promotions",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
        discount: 25,
        bgColor: "purple"
      },
      {
        title: "Speacials",
        image: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150",
        bgColor: "blue"
      }
    ];
    
    promotionsSeedData.forEach(promo => this.createPromotion(promo));
    
    // Seed lottery tickets
    const ticketsSeedData: Partial<InsertLotteryTicket>[] = [
      {
        type: "Lotto Tickets",
        status: "Live Tickets",
        potentialWinnings: 260,
        discount: 25,
        rating: "4.3",
        title: "R5.2 Million Reasons To Smile: Rustenburg Resident Claims Lotto Plus 2 Jackpot!",
        points: 1000,
        available: 87
      },
      {
        type: "Lotto Tickets",
        status: "Live Tickets",
        potentialWinnings: 180,
        rating: "4.3",
        title: "Congratulations to our latest winner from Johannesburg!",
        points: 500,
        available: 45
      },
      {
        type: "Powerball Tickets",
        status: "Live Tickets",
        potentialWinnings: 350,
        rating: "4.7",
        title: "Powerball rolls over to R100 Million!",
        points: 1500,
        available: 120
      }
    ];
    
    ticketsSeedData.forEach(ticket => this.createLotteryTicket(ticket));
    
    // Create a default user
    this.createUser({
      username: "demo_user",
      password: "password",
      points: 1764598,
      accountNumber: "767755884490"
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(userData: Partial<InsertUser>): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date().toISOString();
    
    const user: User = {
      id,
      username: userData.username || `user_${id}`,
      phone: userData.phone || null,
      points: userData.points || 0,
      accountNumber: userData.accountNumber || `${Math.floor(Math.random() * 10000000000)}`,
      password: userData.password || 'password', // Store password for auth
    };
    
    this.users.set(id, user);
    return user;
  }
  
  async getOrCreateDefaultUser(): Promise<User> {
    const defaultUser = await this.getUserByUsername("demo_user");
    
    if (defaultUser) {
      return defaultUser;
    }
    
    return this.createUser({
      username: "demo_user",
      password: "password",
      points: 1764598,
      accountNumber: "767755884490"
    });
  }
  
  // Promotion methods
  async getPromotions(): Promise<Promotion[]> {
    return Array.from(this.promotions.values());
  }
  
  async createPromotion(promotionData: InsertPromotion): Promise<Promotion> {
    const id = this.promotionIdCounter++;
    
    const promotion: Promotion = {
      id,
      title: promotionData.title,
      image: promotionData.image,
      discount: promotionData.discount || null,
      bgColor: promotionData.bgColor || "blue",
    };
    
    this.promotions.set(id, promotion);
    return promotion;
  }
  
  // Lottery Ticket methods
  async getLotteryTickets(): Promise<LotteryTicket[]> {
    return Array.from(this.lotteryTickets.values());
  }
  
  async getLotteryTicketById(id: number): Promise<LotteryTicket | undefined> {
    return this.lotteryTickets.get(id);
  }
  
  async getWeeklyTickets(): Promise<LotteryTicket[]> {
    // Return the first 3 tickets as "weekly tickets"
    return Array.from(this.lotteryTickets.values()).slice(0, 3);
  }
  
  async getSavedTickets(): Promise<LotteryTicket[]> {
    // For demo purposes, return all tickets as "saved tickets"
    return Array.from(this.lotteryTickets.values());
  }
  
  async createLotteryTicket(ticketData: Partial<InsertLotteryTicket>): Promise<LotteryTicket> {
    const id = this.lotteryTicketIdCounter++;
    const now = new Date().toISOString();
    
    const ticket: LotteryTicket = {
      id,
      type: ticketData.type || "Lotto Tickets",
      status: ticketData.status || "Live Tickets",
      potentialWinnings: ticketData.potentialWinnings || 0,
      discount: ticketData.discount || null,
      rating: ticketData.rating || "4.0",
      isFavorite: ticketData.isFavorite || false,
      title: ticketData.title || `Ticket #${id}`,
      points: ticketData.points || 0,
      available: ticketData.available || 0,
      barcode: ticketData.barcode || null,
      createdAt: now,
      updatedAt: now,
    };
    
    this.lotteryTickets.set(id, ticket);
    return ticket;
  }
  
  async getTotalWinnings(): Promise<number> {
    // Calculate total potential winnings of all tickets
    return Array.from(this.lotteryTickets.values())
      .reduce((total, ticket) => total + ticket.potentialWinnings, 0);
  }
}

export const storage = new MemStorage();
