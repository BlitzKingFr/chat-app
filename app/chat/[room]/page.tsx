import ChatRoom from "./ChatRoom";

interface PageProps {
  params: Promise<{
    room: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { room } = await params;
  return (
    <ChatRoom room={room} />
  );
};

export default Page;