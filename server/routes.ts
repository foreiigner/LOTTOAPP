import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLotteryTicketSchema, insertPromotionSchema, insertUserSchema } from "@shared/schema";
import { v4 as uuidv4 } from 'uuid';
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // User routes - this route is already protected by auth middleware
  // app.get('/api/user') route is defined in auth.ts

  // Promotions routes
  app.get('/api/promotions', async (req, res) => {
    try {
      const promotions = await storage.getPromotions();
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch promotions' });
    }
  });

  app.post('/api/promotions', async (req, res) => {
    try {
      const promotionData = insertPromotionSchema.parse(req.body);
      const promotion = await storage.createPromotion(promotionData);
      res.status(201).json(promotion);
    } catch (error) {
      res.status(400).json({ error: 'Invalid promotion data' });
    }
  });

  // Tickets routes
  app.get('/api/tickets', async (req, res) => {
    try {
      const tickets = await storage.getLotteryTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tickets' });
    }
  });

  app.get('/api/tickets/weekly', async (req, res) => {
    try {
      const tickets = await storage.getWeeklyTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch weekly tickets' });
    }
  });

  app.get('/api/tickets/saved', async (req, res) => {
    try {
      const tickets = await storage.getSavedTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch saved tickets' });
    }
  });

  app.get('/api/tickets/winnings', async (req, res) => {
    try {
      const winnings = await storage.getTotalWinnings();
      res.json(winnings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch winnings' });
    }
  });

  app.get('/api/tickets/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const ticket = await storage.getLotteryTicketById(id);
      
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch ticket' });
    }
  });

  app.post('/api/tickets', async (req, res) => {
    try {
      const ticketData = insertLotteryTicketSchema.parse(req.body);
      const ticket = await storage.createLotteryTicket(ticketData);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ error: 'Invalid ticket data' });
    }
  });

  app.post('/api/tickets/scan', async (req, res) => {
    try {
      const { barcode } = req.body;
      
      if (!barcode) {
        return res.status(400).json({ error: 'Barcode is required' });
      }
      
      // Create a new ticket from the scanned barcode
      const ticketData = {
        type: 'Lotto Tickets',
        status: 'Live Tickets',
        potentialWinnings: Math.floor(Math.random() * 1000),
        rating: '4.3',
        title: 'New Scanned Ticket',
        points: 100,
        available: 99,
        barcode
      };
      
      const ticket = await storage.createLotteryTicket(ticketData);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ error: 'Failed to scan ticket' });
    }
  });

  // Auth routes
  app.post('/api/auth/send-code', async (req, res) => {
    try {
      const { country, phone } = req.body;
      
      if (!country || !phone) {
        return res.status(400).json({ error: 'Country and phone are required' });
      }
      
      // In a real app, this would send an SMS with a verification code
      // For demo purposes, just return success
      const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
      
      res.json({ success: true, message: 'Verification code sent' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send verification code' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
