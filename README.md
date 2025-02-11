
# ChatGPT React Native App

This is a **React Native** application developed for **iOS**, featuring a chat interface integrated with **OpenAI's GPT-3.5 Turbo**.

---

## **Features**

- User authentication (mocked credentials)
- Chat interface with **GPT-3.5 Turbo** integration
- File and image uploads within the chat
- User profile

---

## **Installation**

### **1. Set up the environment:**
Create a `.env` file in the root directory with your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### **2. Install dependencies:**
```bash
yarn
```

### **3. Install iOS dependencies:**
Navigate to the `ios` directory and install CocoaPods:
```bash
cd ios
pod install
```

### **4. Start the application:**
Run the following commands from the root directory:
```bash
yarn start
yarn ios
```

---

## **Usage Instructions**

- **Login:** Enter mocked credentials to log in (Email: `test@example.com`, Password: `password123`).
- **Chat:** Send messages to ChatGPT and receive real-time responses. You can also upload files and images.
- **Profile:** View user information and log out from the profile screen.

---

## **Project Structure**

```
├── src
│   ├── components         # Reusable components (e.g., Txt, Input, Button)
│   ├── screens            # App screens (Login, Chat, Profile)
│   ├── store              # Redux store and slices
│   ├── api                # API integrations (e.g., chatApi.ts)
│   └── theme              # Theme and styling variables
│   └── types              
│   └── utils              
```

---

## **Time Spent on Development Tasks**

| Task                         | Time Spent          |
|------------------------------|---------------------|
| Initial setup + navigation   | **1h 20m**          |
| Authentication + UI components + store setup | **4h 20m** |
| Chat interface               | **4h**              |
| File upload functionality    | **2h 30m**          |
| Profile screen               | **10m**             |

---

## **Technologies Used**

- **React Native** with **TypeScript**
- **Redux Toolkit** for state management
- **Axios** for API requests
- **React Navigation** for app navigation
- **OpenAI GPT-3.5 Turbo** API integration

