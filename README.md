# ChatGPT React Native App

This is a **React Native** application developed for **iOS**, featuring a chat interface integrated with **OpenAI's GPT-4 Turbo**.

---

## **Features**

- User authentication with secure storage
- Chat interface with **GPT-4 Turbo** integration
- File and image uploads within the chat
  - Support for multiple file types (text, images, documents)
  - Image compression and optimization
  - File caching for better performance
- User profile management
- Real-time chat streaming
- Error handling and retry mechanisms

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
- **Chat:**
  - Send messages to ChatGPT and receive real-time streaming responses
  - Upload files and images by clicking the attachment button
  - Supported file types: text files, images (JPEG, PNG, GIF, WebP)
  - Maximum file size: 10MB
  - Maximum files per message: 10
- **Profile:** View user information and log out from the profile screen

---

## **Project Structure**

```
├── src
│   ├── components         # Reusable components (e.g., Txt, Input, Button)
│   ├── screens            # App screens (Login, Chat, Profile)
│   ├── store              # Redux store and slices
│   ├── api                # API integrations (e.g., chatApi.ts)
│   ├── theme              # Theme and styling variables
│   ├── types              # TypeScript type definitions
│   └── utils              # Utility functions and helpers
```

---

## **Technologies Used**

- **React Native** with **TypeScript**
- **Redux Toolkit** for state management
- **Axios** for API requests
- **React Navigation** for app navigation
- **OpenAI GPT-4 Turbo** API integration
- **React Native Document Picker** for file selection
- **React Native Image Resizer** for image optimization
- **RNFetchBlob** for file handling

## **Contributing**

Feel free to submit issues and enhancement requests.
