
import { DsCustomButton, DsTypography,DsBox } from "@crypto/ui";


export default function NotFound() {
  return (
    <DsBox className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center space-y-5">
        <DsTypography as={"span"} color="textMuted" variant="h1" >404</DsTypography>
        <DsTypography as={"span"} color="textMuted300" variant="h1" >Page Not Found</DsTypography>
        <DsTypography as={"span"} color="textMuted300" variant="helperText" >
            The page you are looking for does not exist or mayhave been moved.
        </DsTypography>
        <DsCustomButton color="tertiary200" href="/" size="sm"> Back to Home</DsCustomButton>
    </DsBox>
  );
}
