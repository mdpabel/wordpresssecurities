import CustomerProfile from "@/components/chat/CustomerProfile";
import Messages from "../../../components/chat/Messages";
import prisma from "@/db/mongo";
import { currentUser, RedirectToSignIn } from "@clerk/nextjs";
import ChatInput from "@/components/chat/ChatInput";

const getMessages = async (chatRoomId: string) => {
  const initialMessages = await prisma.message.findMany({
    where: {
      chatRoomId: chatRoomId,
    },
  });

  return initialMessages;
};

const CustomerSupports = async () => {
  const user = await currentUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

  const initialMessages = await getMessages(user.id);

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <CustomerProfile />
      <div>
        <Messages
          userId={user?.id}
          channel={user?.id}
          initialMessages={initialMessages}
        />
        <ChatInput channel={user?.id} chatRoomId={user?.id} />
      </div>
    </div>
  );
};

export default CustomerSupports;
