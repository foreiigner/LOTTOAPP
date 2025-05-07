import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogIn, UserPlus, Phone, Eye, EyeOff } from "lucide-react";
import { AppLogo } from "@/components/ui/lottery-logos";

// Form validation schemas
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      phone: "",
    },
  });

  const onLoginSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate({
      ...values,
      points: 0,
      accountNumber: "", // Adding empty accountNumber to satisfy type requirements
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Left column - Auth forms */}
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center p-4 sm:p-8">
        <div className="flex items-center mb-8">
          <AppLogo className="h-12 w-12 mr-3" />
          <h1 className="text-3xl font-bold">32x Scanner</h1>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="pt-6">
              {/* Login form */}
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type={showLoginPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                {...field} 
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showLoginPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full mt-6"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <LogIn className="h-4 w-4 mr-2" />
                      )}
                      Login
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* Register form */}
              <TabsContent value="signup">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type={showRegisterPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                {...field} 
                              />
                            </FormControl>
                            <button
                              type="button"
                              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showRegisterPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full mt-6"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <UserPlus className="h-4 w-4 mr-2" />
                      )}
                      Create Account
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
          </Tabs>

          <CardFooter className="bg-muted/50 px-6 py-4 flex flex-col sm:flex-row items-center">
            <Phone className="h-4 w-4 mr-2" />
            <p className="text-sm text-muted-foreground">
              Need help? Contact support at <a href="tel:+123456789" className="text-primary hover:underline">+12 345 6789</a>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Right column - Hero section */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center text-white">
        <div className="max-w-md p-8">
          <h2 className="text-4xl font-bold mb-6">
            Scan, Save & Win with 32x Scanner
          </h2>
          <p className="text-lg mb-8">
            The ultimate lottery management app that helps you track your tickets, analyze your winnings, and maximize your chances of hitting the jackpot.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Easy Scanning</h3>
              <p className="text-sm">Quickly scan paper tickets to digitize them</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Win Analysis</h3>
              <p className="text-sm">Track your winnings and analyze your success rates</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
              <p className="text-sm">Never lose a winning ticket again</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Instant Notifications</h3>
              <p className="text-sm">Get alerts for draws and winning tickets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}