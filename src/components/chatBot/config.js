import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DropPicture';

const config = {
  initialMessages: [createChatBotMessage(`Hi I'm Akira. I’m here to help you explain how I work.`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    widgets: [
        {
          widgetName: 'dogPicture',
          widgetFunc: (props) => <DogPicture {...props} />,
        },
      ],
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;