"use client"
import { currentUser } from "@clerk/nextjs/server";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUserQuery() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      console.log("HI");
      try {
        const user = await currentUser()
        console.log(user);
        return user;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  })
}
