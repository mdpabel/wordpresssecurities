import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { auth } from "@clerk/nextjs";

export default async function UnAuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <>
      <header>
        <Header isLoggedIn={!!userId} />
      </header>
      <section>{children}</section>
      <Footer />
    </>
  );
}
