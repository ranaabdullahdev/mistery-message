// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "./ui/button";
// import { X } from "lucide-react";
// import { Message } from "@/model/User";
// import { useToast } from "./ui/use-toast";
// import axios from "axios";
// import { ApiResponse } from "@/types/ApiResponse";

// type MessageCardProps = {
//   message: Message;
//   onMessageDelete: (messageId: string) => void;
// };

// const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
//   console.log(message);
//   const { toast } = useToast();

//   const handleDeleteConfirm = async () => {
//     const response = await axios.delete<ApiResponse>(
//       `/api/delete-messages/${message._id}`
//     );
//     toast({ title: response?.data.message });

//     onMessageDelete(message.id);
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Card Title</CardTitle>
    
//         <CardDescription>{message?.content}</CardDescription>
//       </CardHeader>
//       <CardContent></CardContent>
//       <CardFooter></CardFooter>
//     </Card>
//   );
// };

// export default MessageCard;


import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Message } from "@/model/User";
import Alert from "./alert-card";
type MessageCard = {
  message: Message;
};
export default function MessageCard({
  message,
  onDeleteMessage,
}: {
  message: Message;
  onDeleteMessage: (id: string) => void;
}) {
  const alert = {
    title: "Delete",
    textContent: "You are about to delete this message.",
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Message</CardTitle>
        <CardDescription>{message.content}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Alert
          alert={alert}
          alertConfirm={() => onDeleteMessage(message._id as string)}
        />
      </CardFooter>
    </Card>
  );
}