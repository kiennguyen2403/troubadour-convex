import { useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useDispatch } from "react-redux";
import { setUserID } from "@/redux/auth-slice";

export default function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const dispatch = useDispatch();
  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState<Id<"user"> | null>(null);
  const storeUser = useMutation(api.user.store);
  const createHistory =
    // Call the `storeUser` mutation function to store
    // the current user in the `users` table and return the `Id` value.
    useEffect(() => {
      // If the user is not logged in don't do anything
      if (!isAuthenticated) {
        dispatch(setUserID(null));
        return;
      }
      // Store the user in the database.
      // Recall that `storeUser` gets the user information via the `auth`
      // object on the server. You don't need to pass anything manually here.
      async function createUser() {
        console.log("creating user")
        const id = await storeUser({ role: "artist" });
        setUserId(id);
        dispatch(setUserID(id));
      }
      createUser();
      return () => setUserId(null);
      // Make sure the effect reruns if the user logs in with
      // a different identity
    }, [isAuthenticated, storeUser, user?.id]);
  return userId;
}
