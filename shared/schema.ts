import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  phone: text("phone"),
  points: integer("points").default(0),
  accountNumber: text("account_number").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
}).extend({
  // We manually extend the schema to ensure password is always required
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Promotion model
export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  discount: integer("discount"),
  bgColor: text("bg_color").default("blue"),
});

export const insertPromotionSchema = createInsertSchema(promotions).omit({
  id: true,
});

export type InsertPromotion = z.infer<typeof insertPromotionSchema>;
export type Promotion = typeof promotions.$inferSelect;

// Lottery Ticket model
export const lotteryTickets = pgTable("lottery_tickets", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  status: text("status").notNull(),
  potentialWinnings: integer("potential_winnings").notNull(),
  discount: integer("discount"),
  rating: varchar("rating", { length: 3 }).notNull(),
  isFavorite: boolean("is_favorite").default(false),
  title: text("title"),
  points: integer("points").default(0),
  available: integer("available").default(0),
  barcode: text("barcode"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const insertLotteryTicketSchema = createInsertSchema(lotteryTickets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLotteryTicket = z.infer<typeof insertLotteryTicketSchema>;
export type LotteryTicket = typeof lotteryTickets.$inferSelect;
