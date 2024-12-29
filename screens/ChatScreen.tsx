import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  text: string;
  time: string;
  isRead?: boolean;
  sender: {
    id: string;
    name: string;
    avatar: any;
  };
};

type ChatPreview = {
  id: string;
  name: string;
  avatar: any;
  lastMessage: string;
  time: string;
  unread?: boolean;
};

const recentMatches = [
  {
    id: '1',
    name: 'James',
    avatar: require('../assets/square-avatar.png'),
    matches: 32,
  },
  {
    id: '2',
    name: 'Brandon',
    avatar: require('../assets/square-avatar.png'), 
  },
  {
    id: '3',
    name: 'Clara',
    avatar: require('../assets/square-avatar.png'),
  },
  {
    id: '4', 
    name: 'Amina',
    avatar: require('../assets/square-avatar.png'),
  }
];

const chatPreviews: ChatPreview[] = [
  {
    id: '1',
    name: 'Alfredo Calzoni',
    avatar: require('../assets/square-avatar.png'),
    lastMessage: 'What about that new jacket if i...',
    time: '09:18',
  },
  {
    id: '2', 
    name: 'Clara Hazel',
    avatar: require('../assets/square-avatar.png'),
    lastMessage: 'I know right 😊',
    time: '12:44',
    unread: true
  },
  {
    id: '3',
    name: 'Brandon Aminoff',
    avatar: require('../assets/square-avatar.png'),
    lastMessage: "I've already registered, can't wa...",
    time: '08:06',
    unread: true
  },
  {
    id: '4',
    name: 'Amina Mina',
    avatar: require('../assets/square-avatar.png'),
    lastMessage: 'It will have two lines of heading ...',
    time: '09:32'
  }
];

const ChatModal = ({ visible, chat, onClose, messages, onSend }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSend(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.modalHeaderInfo}>
            <Image source={chat?.avatar} style={styles.modalAvatar} />
            <Text style={styles.modalHeaderName}>{chat?.name}</Text>
          </View>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContent}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesContainer}
            inverted
            renderItem={({ item }) => (
              <View style={[
                styles.messageBubble,
                item.sender.id === 'currentUser' ? styles.sentMessage : styles.receivedMessage
              ]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            )}
          />

          <View style={styles.modalInputContainer}>
            <TextInput
              style={styles.modalInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor="#666"
            />
            <TouchableOpacity 
              style={styles.modalSendButton}
              onPress={handleSend}
            >
              <Ionicons name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default function ChatScreen() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Record<string, Message[]>>({});

  const handleSendMessage = (text: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: {
        id: 'currentUser',
        name: 'Me',
        avatar: require('../assets/square-avatar.png'),
      },
    };

    setChats(prev => ({
      ...prev,
      [selectedChat.id]: [newMessage, ...(prev[selectedChat.id] || [])],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={styles.recentMatchesContainer}>
        <Text style={styles.sectionTitle}>Recent Matches</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentMatches}>
          {recentMatches.map((match) => (
            <TouchableOpacity key={match.id} style={styles.recentMatchItem}>
              <Image source={match.avatar} style={styles.recentMatchAvatar} />
              {match.matches && (
                <View style={styles.matchesCount}>
                  <Ionicons name="heart" size={12} color="white" />
                  <Text style={styles.matchesNumber}>{match.matches}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={chatPreviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatPreview}
            onPress={() => setSelectedChat(item)}
          >
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            <View style={styles.chatMeta}>
              <Text style={styles.timeText}>{item.time}</Text>
              {item.unread && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        )}
      />

      <ChatModal
        visible={!!selectedChat}
        chat={selectedChat}
        messages={selectedChat ? chats[selectedChat.id] || [] : []}
        onClose={() => setSelectedChat(null)}
        onSend={handleSendMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D1B3D',
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  recentMatchesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 20,
    marginBottom: 10,
  },
  recentMatches: {
    paddingLeft: 20,
  },
  recentMatchItem: {
    marginRight: 15,
    position: 'relative',
  },
  recentMatchAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  matchesCount: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchesNumber: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 2,
  },
  chatPreview: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#rgba(255,255,255,0.7)',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#rgba(255,255,255,0.5)',
    marginBottom: 5,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E174FF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#2D1B3D',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3D2B4D',
  },
  backButton: {
    padding: 5,
  },
  modalHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  modalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalHeaderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  modalContent: {
    flex: 1,
  },
  messagesContainer: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  sentMessage: {
    backgroundColor: '#E174FF',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  receivedMessage: {
    backgroundColor: '#3D2B4D',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  messageTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  modalInputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#3D2B4D',
  },
  modalInput: {
    flex: 1,
    backgroundColor: '#4D3B5D',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    color: '#fff',
  },
  modalSendButton: {
    backgroundColor: '#E174FF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});