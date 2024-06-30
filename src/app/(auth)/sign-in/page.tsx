"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [userName, setUserName] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUserName, setIsCheckingUserName] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  return <div>page</div>;
};

export default page;
