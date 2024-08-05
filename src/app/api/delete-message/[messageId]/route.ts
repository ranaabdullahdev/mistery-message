import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

 export async function DELETE(messageId: string) {
  return axios.delete<ApiResponse>(`/api/delete-message/${messageId}`)
 }