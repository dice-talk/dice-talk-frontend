import RoomEventManager from './RoomEventManager';

export default function ChatWrapper() {
  return (
    <RoomEventManager>
      <ChatScreen /> {/* 채팅 화면 */ }
    </RoomEventManager>
  );
}