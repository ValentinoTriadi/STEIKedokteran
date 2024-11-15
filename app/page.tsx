"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import RightBubbleChat from "@/components/right-bubble-chat";
import LeftBubbleChat from "@/components/left-bubble-chat";

const formSchema = z.object({
  prompt: z.string().min(1).max(255),
});

export default function Home() {
  const [messages, setMessages] = useState<
    { message: string; isUser: boolean }[]
  >([]);
  const [isResponding, setIsResponding] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const autoReplies = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Integer tincidunt nisl at lectus consectetur, et volutpat arcu dictum. Duis eget justo in leo vestibulum ultricies.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Nulla facilisi. Cras fermentum odio eu feugiat. Vivamus eget sagittis quam. Vestibulum aliquam, enim non suscipit varius, ipsum mi venenatis justo, eu efficitur ligula ligula non libero.",
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userMessage = { message: values.prompt, isUser: true };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: "Responding...", isUser: false },
    ]);
    setIsResponding(true);

    const chatbotResponse = await fetch("http://localhost:8000/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: values.prompt }),
    });

    const data = await chatbotResponse.json();

    const replyMessage = { message: data, isUser: false };

    form.reset();

    setTimeout(() => {
      const temp = [...messages];
      console.log(temp);
      setMessages(temp.concat([userMessage, replyMessage]));
    }, 500);
    setIsResponding(false);
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-[90%] flex flex-col justify-end px-8">
      {/* Display Messages */}
      <div className="flex flex-col gap-y-4 mb-4 max-h-[550px] overflow-y-auto">
        {messages.map((msg, index) =>
          msg.isUser ? (
            <RightBubbleChat key={index} message={msg.message} />
          ) : (
            <LeftBubbleChat key={index} message={msg.message} />
          )
        )}
        {/* Dummy div to always scroll to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* For Prompt Input */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full border-2 border-black/5 rounded-xl p-2"
        >
          <div className="w-full flex items-center gap-x-2">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      disabled={isResponding}
                      placeholder="Enter prompt here..."
                      {...field}
                      className="ring-0 focus-visible:ring-transparent border-none w-full flex-grow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={isResponding}
              type="submit"
              className="bg-[#00eebc] text-white hover:bg-[#00eebc]/75 flex items-center gap-x-2 group transition duration-200 ease-in-out"
            >
              <p className="hidden group-hover:block transition duration-200 ease-in-out">
                Send
              </p>
              <SendHorizontal />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
