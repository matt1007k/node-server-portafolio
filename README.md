### MODEL DATABASE PORTFOLIO

#### 1. Users 
    _id: [ObjectId]
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'ROL_USER' 
    },
    avatar: String


#### 2. Categories
    _id: [ObjectId]
    title: {
        type: String,
        required: true
    },
    createdAt: String, //Timestamp: true
    updatedAt: String

#### 3. Projects
    _id: [ObjectId]
    title: {
        type: String,
        required: true
    },
    description: String,
    img: String,
    category: [ObjectId],
    createdAt: String, //Timestamp: true
    updatedAt: String

#### 4. Services
    _id: [ObjectId]
    title: {
        type: String,
        required: true
    },
    description: String,
    icon: String,
    createdAt: String, //Timestamp: true
    updatedAt: String

#### 5. Clients
    _id: [ObjectId]
    name: {
        type: String,
        required: true
    },
    position: String,
    img: String,
    createdAt: String, //Timestamp: true
    updatedAt: String

#### 6. Testimonials
    _id: [ObjectId]
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    client: [ObjectId],
    createdAt: String, //Timestamp: true
    updatedAt: String

#### 7. Messages
    _id: [ObjectId]
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: String, //Timestamp: true
    updatedAt: String
