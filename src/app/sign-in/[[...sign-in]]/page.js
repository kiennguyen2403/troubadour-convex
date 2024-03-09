import { SignIn } from "@clerk/nextjs";
import { Stack } from "@mui/material";
 
export default function Page() {
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <SignIn />
    </Stack>
  );
}
