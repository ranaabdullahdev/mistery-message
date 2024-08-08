"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const signInpage = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  //zod implmentation

  //@ts-nocheck
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.username,
      password: data.password,
    });

    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Incorrect Username or Password",
        variant: "destructive",
      });
      if (result?.url) {
        router.replace("/dashboard");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8  bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mistery Messages
          </h1>
          <p className="mb-4">Sign In to enjoy the adventure of Mistery App</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  {/* {isCheckingUserName && <Loader2 className="animate-spin" />} */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmiting}>
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>Already a member? </p>
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default signInpage;
