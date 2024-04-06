import { Toaster } from "sonner";
import Layout from "./Layout";

function MainLayout() {
  return (
    <>
      <Layout/>
      <Toaster richColors />
    </>
  );
}

export default MainLayout;
